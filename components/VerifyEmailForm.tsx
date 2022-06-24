import { Grid, Stack, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SuccessAnimation from "./animations/SuccessAnimation";
import FailedAnimation from "./animations/FailedAnimation";
import LoadingAnimation from "./animations/LoadingAnimation";

export default function VerifyEmailForm() {
  // <========== Variables ==========>
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const theme = useTheme();

  // <========== UI Appears ==========>

  // Used for validating the email address
  useEffect(() => {
    const data = {
      oobCode: router.query.oobCode,
    };
    const JSONdata = JSON.stringify(data);

    console.log(router.query);

    const endpoint = "/api/auth/verifyemail";
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
        setTimeout(function () {
          router.replace("/");
        }, 4000);
      } else {
        setLoading(false);
        setFailed(true);
        setTimeout(function () {
          router.replace("/");
        }, 4000);
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
    </>
  );
}
