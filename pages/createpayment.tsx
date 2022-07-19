import { Grid, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import lottie from "lottie-web";
import { Box } from "@mui/system";

export default function Payment() {
  // <========== Variables ==========>
  const router = useRouter();
  const [transactionID, setTransactionID] = useState("");

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
        localStorage.setItem("redirectURL", router.query.redirectURL as string);

        // We can't redirect using javascript else the deep links don't work
        setTransactionID(result.documentID);
        setTimeout(function () {
          document.getElementById("invisibleLink").click();
        }, 500);
      } else {
        console.log("Could not create transaction");
        console.log(result);
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
      animationData: require("../public/animations/loading.json"),
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
            href={`http://localhost:3000/payment?transactionID=${transactionID}`}
          ></a>
        </>
      )}
      {process.env.NODE_ENV === "production" && (
        <>
          <a
            id="invisibleLink"
            href={`https://www.occomy.com/payment?transactionID=${transactionID}`}
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
      </Grid>
    </>
  );
}
