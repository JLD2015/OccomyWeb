import { Grid } from "@mui/material";
import Footer from "../components/Footer";
import Head from "next/head";
import PaymentForm from "../components/payment/PaymentForm";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Payment({ data }) {
  // <========== Variables ==========>
  const router = useRouter();

  // <========== Page Loads ==========>
  useEffect(() => {
    router.query.transactionID = data.documentID;
    router.push(router);
  }, [data, router]);

  // <========== Body ==========>
  return (
    <>
      {/* Page header */}
      <Head>
        <title>Occomy Payment</title>
      </Head>

      {/* Body */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        height={"100vh"}
        sx={{
          backgroundColor: "#f5f5f5",
        }}
      >
        <PaymentForm {...data} />
      </Grid>
      {/* End body */}
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </>
  );
}

export async function getServerSideProps(context) {
  // The object which will return data to the page
  type PaymentRequest = {
    amount?: string;
    documentID?: string;
    transactionID?: string;
    merchantProfilePhoto?: string;
    merchantName?: string;
    redirectURL?: string;
  };

  const data: PaymentRequest = {};

  // Create transaction
  const apiData = {
    amount: context.query.amount,
    description: context.query.description,
  };
  const JSONdata = JSON.stringify(apiData);

  const endpoint = "https://www.occomy.com/api/transact/createtransaction";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: context.query.apikey,
    },
    body: JSONdata,
  };

  const response = await fetch(endpoint, options);
  const result = await response.json();

  if (result.status == "Success") {
    data.amount = Number(context.query.amount).toFixed(2);
    data.documentID = result.documentID;
    data.transactionID = result.transactionID;
    data.merchantProfilePhoto = result.merchantProfilePhoto;
    data.merchantName = result.merchantName;
    data.redirectURL = context.query.redirectURL;
  } else {
    console.log("Could not create transaction");
  }

  // Pass the necesary data to the page
  return {
    props: { data },
  };
}
