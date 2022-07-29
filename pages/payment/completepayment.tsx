import { Grid } from "@mui/material";
import Footer from "../../components/Footer";
import Head from "next/head";
import PaymentForm from "../../components/payment/PaymentForm";

// The complete payment page is identical to the payment page
// It is used to redirect to for mobile apps so the deeplinks don't get triggered again

export default function CompletePayment() {
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
        <PaymentForm />
      </Grid>
      {/* End body */}
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </>
  );
}
