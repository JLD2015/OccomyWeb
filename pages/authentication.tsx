import { Grid, Stack, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import Image from "next/image";
import Footer from "../components/Footer";
import ResetPasswordForm from "../components/ResetPasswordForm";
import { useRouter } from "next/router";
import VerifyEmailForm from "../components/VerifyEmailForm";

export default function Authentication() {
  // <========== Variables ==========>
  const router = useRouter();
  const mode = router.query.mode;
  const theme = useTheme();

  // <========== Body ==========>
  return (
    <>
      {/* Page header */}
      <Head>
        <title>Reset Password</title>
      </Head>

      {/* Page body */}
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        height="100vh"
        sx={{
          backgroundImage: `url("/images/authenticationBackground.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
        {/* Occomy heading */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ paddingTop: 2 }}
        >
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <Image src="/images/logo.png" height={60} width={60} alt="Logo" />
          </Box>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Image src="/images/logo.png" height={70} width={70} alt="Logo" />
          </Box>

          {mode === "resetPassword" && (
            <Typography
              sx={{
                [theme.breakpoints.up("md")]: {
                  fontSize: 40,
                },
                [theme.breakpoints.down("md")]: {
                  fontSize: 32,
                },
                fontWeight: 600,
              }}
            >
              Reset Password
            </Typography>
          )}
          {mode === "verifyEmail" && (
            <Typography
              sx={{
                [theme.breakpoints.up("md")]: {
                  fontSize: 40,
                },
                [theme.breakpoints.down("md")]: {
                  fontSize: 32,
                },
                fontWeight: 600,
              }}
            >
              Verify Email
            </Typography>
          )}
        </Stack>
        {/* End Occomy heading */}

        {mode === "resetPassword" && <ResetPasswordForm />}
        {mode === "verifyEmail" && <VerifyEmailForm />}

        {/* Bottom spacer */}
        <Footer />
        {/* End bottom spacer */}
      </Grid>
    </>
  );
}
