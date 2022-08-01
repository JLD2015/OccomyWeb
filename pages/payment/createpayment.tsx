import { Container, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import lottie from "lottie-web";
import { Box } from "@mui/system";

export default function Payment() {
  // <========== Variables ==========>
  const router = useRouter();
  const [transactionID, setTransactionID] = useState("");
  const [transactionFailed, setTransactionFailed] = useState(false);

  // <========== Page Loads ==========>

  useEffect(() => {
    // In Next.js we need to wait for the page to be ready before accessing query parameters
    if (!router.isReady) return;

    const runAsync = async () => {
      // Create transaction
      const apiData = {
        amount: router.query.amount,
        description: router.query.description,
      };
      const JSONdata = JSON.stringify(apiData);

      const endpoint = "/api/transact/createtransaction";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: router.query.apikey as string,
        },
        body: JSONdata,
      };

      const response = await fetch(endpoint, options);
      const result = await response.json();

      if (result.status == "Success") {
        localStorage.setItem("amount", Number(router.query.amount).toFixed(2));
        localStorage.setItem("documentID", result.documentID);
        localStorage.setItem("transactionID", result.transactionID);
        localStorage.setItem(
          "merchantProfilePhotoURL",
          result.merchantProfilePhoto
        );
        localStorage.setItem("merchantName", result.merchantName);
        localStorage.setItem("orderid", router.query.orderid as string);
        localStorage.setItem("callback", router.query.callback as string);

        // We can't redirect using javascript else the deep links don't work
        setTransactionID(result.documentID);
        setTimeout(function () {
          document.getElementById("invisibleLink").click();
        }, 500);
      } else {
        // Need to indicate that the payment can't be processed
        setTransactionFailed(true);

        setTimeout(function () {
          const redirectString = `${router.query.callback}?orderid=${router.query.orderid}&status=declined&reference=${result.documentID}`;
          router.replace(redirectString);
        }, 5000);
      }
    };

    runAsync();
  }, [router]);

  useEffect(() => {
    // Load the lottie animation
    const instance = lottie.loadAnimation({
      container: document.getElementById("lottie"),
      renderer: "svg",
      autoplay: true,
      animationData: require("../../public/animations/loading.json"),
    });

    // Return clean up function here
    return () => instance.destroy();
  }, []);

  // <========== Body ==========>
  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <>
          <a
            id="invisibleLink"
            href={`http://localhost:3000/payment/processpayment?transactionID=${transactionID}`}
          ></a>
        </>
      )}
      {process.env.NODE_ENV === "production" && (
        <>
          <a
            id="invisibleLink"
            href={`https://www.occomy.com/payment/processpayment?transactionID=${transactionID}`}
          ></a>
        </>
      )}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        height={"100vh"}
        sx={{ backgroundColor: "#f5f5f5" }}
      >
        {/* If the transaction is successful */}
        {!transactionFailed && (
          <>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Box
                sx={{
                  width: 300,
                }}
              >
                <div id="lottie" />
              </Box>
            </Stack>
          </>
        )}

        {/* If the transaction fails */}
        {transactionFailed && (
          <>
            <Container>
              {/* Column 1 -> Forms outside of card */}
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "25px",
                  p: 2,
                  boxShadow: 2,
                }}
              >
                <Typography sx={{ fontSize: 40, fontWeight: 600}}>
                  Transaction Failed
                </Typography>
                <Typography sx={{ py: 1 }}>
                  Redirecting to merchant website ...
                </Typography>
              </Grid>
              {/* End column 1 -> Forms outside of card */}
            </Container>
          </>
        )}
      </Grid>
    </>
  );
}
