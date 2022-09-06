import { Grid, Stack, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SuccessAnimation from "../../components/animations/SuccessAnimation";
import FailedAnimation from "../../components/animations/FailedAnimation";
import LoadingAnimation from "../../components/animations/LoadingAnimation";
import { firebaseAuth } from "../../functions/initFirebase";
import { applyActionCode } from "firebase/auth";
import Footer from "../../components/Footer";

export default function VerifyEmail() {
  // <========== Variables ==========>
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const theme = useTheme();

  // <========== UI Appears ==========>
  // Used for validating the email address
  useEffect(() => {
    if (router.isReady) {
      applyActionCode(firebaseAuth, router.query.oobCode as string)
        .then(() => {
          setLoading(false);
          setSuccess(true);
          setTimeout(function () {
            router.replace("/");
          }, 4000);
        })
        .catch(() => {
          setLoading(false);
          setFailed(true);
          setTimeout(function () {
            router.replace("/");
          }, 4000);
        });
    }
  }, [router]);

  // <========== Body ==========>
  return (
    <>
      {/* Page header */}
      <Head>
        <title>Verify Email</title>
      </Head>

      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        height="100vh"
        sx={{
          backgroundImage: `url("/images/authenticationBackground.webp")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
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
        </Stack>
        {/* End Occomy heading */}

        {/* Email verification form */}
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            [theme.breakpoints.up("md")]: {
              paddingLeft: 20,
              paddingRight: 20,
            },
            [theme.breakpoints.down("md")]: {
              paddingLeft: 2,
              paddingRight: 2,
            },
          }}
        >
          {failed && (
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              {/* We need this to give the Stack width before anything renders */}
              <Typography></Typography>
              <Box
                sx={{
                  [theme.breakpoints.up("md")]: {
                    width: 200,
                    margin: -1000,
                  },
                  [theme.breakpoints.down("md")]: {
                    width: 150,
                    margin: -1000,
                  },
                  marginTop: 3,
                  marginBottom: 3,
                }}
              >
                <FailedAnimation />
              </Box>
              <Typography
                sx={{
                  [theme.breakpoints.up("md")]: {
                    fontSize: 32,
                    backgroundColor: "white",
                    borderRadius: "25px",
                    padding: 2,
                  },
                  [theme.breakpoints.down("md")]: {
                    fontSize: 22,
                    backgroundColor: "white",
                    borderRadius: "25px",
                    padding: 1.5,
                  },
                }}
              >
                Could not verify email
              </Typography>
            </Stack>
          )}

          {loading && (
            <Box
              sx={{
                [theme.breakpoints.up("md")]: {
                  width: 400,
                  margin: -1000,
                },
                [theme.breakpoints.down("md")]: {
                  width: 300,
                  margin: -1000,
                },
                marginTop: 3,
                marginBottom: 3,
              }}
            >
              <LoadingAnimation />
            </Box>
          )}

          {success && (
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              {/* We need this to give the Stack width before anything renders */}
              <Typography></Typography>
              <Box
                sx={{
                  [theme.breakpoints.up("md")]: {
                    width: 200,
                    margin: -1000,
                  },
                  [theme.breakpoints.down("md")]: {
                    width: 150,
                    margin: -1000,
                  },
                  marginTop: 3,
                  marginBottom: 3,
                }}
              >
                <SuccessAnimation />
              </Box>
              <Typography
                sx={{
                  [theme.breakpoints.up("md")]: {
                    fontSize: 32,
                    backgroundColor: "white",
                    borderRadius: "25px",
                    padding: 2,
                  },
                  [theme.breakpoints.down("md")]: {
                    fontSize: 22,
                    backgroundColor: "white",
                    borderRadius: "25px",
                    padding: 1.5,
                  },
                }}
              >
                You can now login
              </Typography>
            </Stack>
          )}
        </Grid>
        {/* End email verification form */}

        <Footer />
      </Grid>
    </>
  );
}
