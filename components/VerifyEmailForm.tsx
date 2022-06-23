import { Grid, Stack, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import lottie from "lottie-web";
import { useRouter } from "next/router";

export default function VerifyEmailForm() {
  // <========== Variables ==========>
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const theme = useTheme();

  // <========== UI Appears ==========>

  // Used for loading Lottie animation

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: document.getElementById("lottie-loading"),
      renderer: "svg",
      autoplay: true,
      animationData: require("../public/animations/loading.json"),
    });

    // Return clean up function here
    return () => instance.destroy();
  }, []);

  // Used for validating the email address
  useEffect(() => {
    console.log("Proof I run once");

    const data = {
      oobCode: router.query.oobCode,
    };
    const JSONdata = JSON.stringify(data);

    const endpoint = "/api/auth/verifyEmail";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const executeAsync = async () => {
      const response = await fetch(endpoint, options);
      const result = await response.json();

      console.log(result);

      if (result.status === "Success") {
        setLoading(false);
        setSuccess(true);
        lottie.loadAnimation({
          container: document.getElementById("lottie-success"),
          renderer: "svg",
          autoplay: true,
          loop: false,
          animationData: require("../public/animations/success.json"),
        });
        // setTimeout(function () {
        //   router.replace("/");
        // }, 4000);
      } else {
        setLoading(false);
        setFailed(true);
        lottie.loadAnimation({
          container: document.getElementById("lottie-failed"),
          renderer: "svg",
          autoplay: true,
          loop: false,
          animationData: require("../public/animations/failed.json"),
        });
        // setTimeout(function () {
        //   router.replace("/");
        // }, 4000);
      }
    };

    executeAsync();
  }, [router, setLoading, setSuccess, setFailed]);

  // <========== Body ==========>
  return (
    <>
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
              <div id="lottie-failed" />
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
            <div id="lottie-loading" />
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
              <div id="lottie-success" />
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
    </>
  );
}
