import { Grid } from "@mui/material";
import Head from "next/head";
import ApprovalForm from "../../components/payment/ApprovalForm";
import Footer from "../../components/Footer";

export default function ApproveTransaction(props) {
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
        <ApprovalForm />
      </Grid>
      {/* End body */}
      {/* Footer */}
      <Footer />

      {/* End footer */}
    </>
  );
}
