import {
  CircularProgress,
  Grid,
  useTheme,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Redirect() {
  // <========== Variables ==========>
  const router = useRouter();

  // <========== Page Loads ==========>
  useEffect(() => {
    if (router.isReady) {
      if (router.query.mode == "verifyEmail") {
        router.replace(
          "/authentication/verifyemail?oobCode=" + router.query.oobCode
        );
      } else if (router.query.mode == "resetPassword") {
        router.replace(
          "/authentication/resetpassword?oobCode=" + router.query.oobCode
        );
      }
    }
  }, [router]);

  // <========== Body ==========>
  return (
    <>
      {/* Page header */}
      <Head>
        <title>Occomy</title>
      </Head>

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Grid>
    </>
  );
}
