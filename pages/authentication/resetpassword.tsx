import LockIcon from "@mui/icons-material/Lock";
import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Footer from "../../components/Footer";
import { firebaseAuth } from "../../functions/initFirebase";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";

export default function ResetPassword() {
  // <========== Variables ==========>
  const router = useRouter();
  const [failed, setFailed] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
  const [progressIndicator, setProgressIndicator] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(true);
  const theme = useTheme();

  // <========== Functions ==========>
  const handleSubmit = async (event) => {
    // Stop form from submitting and refreshing page
    event.preventDefault();

    // Show the loading animation
    setSubmitMessage(false);
    setProgressIndicator(true);

    // Get data from the form.
    const password = event.target.password.value;
    const confirmpassword = event.target.confirmpassword.value;

    // Make sure the passwords match
    if (password != confirmpassword) {
      var resetForm = document.getElementById(
        "reset-password-form"
      ) as HTMLFormElement;
      resetForm.reset();
      setProgressIndicator(false);
      setPasswordsDontMatch(true);
      setTimeout(function () {
        setSubmitMessage(true);
        setPasswordsDontMatch(false);
      }, 4000);
      return;
    }

    verifyPasswordResetCode(firebaseAuth, router.query.oobCode as string)
      .then(() => {
        // Reset the user's password
        confirmPasswordReset(
          firebaseAuth,
          router.query.oobCode as string,
          password
        )
          .then(() => {
            var resetForm = document.getElementById(
              "reset-password-form"
            ) as HTMLFormElement;
            resetForm.reset();
            setProgressIndicator(false);
            setPasswordChanged(true);
            setTimeout(function () {
              router.replace("/");
            }, 4000);
          })
          .catch(() => {
            // If password reset doesn't work
            var resetForm = document.getElementById(
              "reset-password-form"
            ) as HTMLFormElement;
            resetForm.reset();
            setProgressIndicator(false);
            setFailed(true);
            setTimeout(function () {
              router.replace("/");
            }, 4000);
          });
      })
      .catch(() => {
        // If the oobCode is invalid
        var resetForm = document.getElementById(
          "reset-password-form"
        ) as HTMLFormElement;
        resetForm.reset();
        setProgressIndicator(false);
        setFailed(true);
        setTimeout(function () {
          router.replace("/");
        }, 4000);
      });
  };

  // <========== Body ==========>
  return (
    <>
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
            Reset Password
          </Typography>
        </Stack>
        {/* End Occomy heading */}

        {/* Reset password form */}
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
          <form
            id="reset-password-form"
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: "25px",
            }}
          >
            <Stack
              direction="column"
              alignItems="center"
              spacing={2}
              sx={{
                [theme.breakpoints.up("md")]: {
                  padding: "25px",
                },
                [theme.breakpoints.down("md")]: {
                  padding: "20px",
                },
              }}
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                width={"100%"}
              >
                <LockIcon sx={{ color: "gray" }} />
                <TextField
                  fullWidth
                  required
                  label="New password"
                  name="password"
                  type="password"
                  sx={{
                    [`& fieldset`]: {
                      borderRadius: "10px",
                    },
                  }}
                />
              </Stack>

              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                width={"100%"}
              >
                <LockIcon sx={{ color: "gray" }} />
                <TextField
                  fullWidth
                  required
                  label="Confirm password"
                  name="confirmpassword"
                  type="password"
                  sx={{
                    [`& fieldset`]: {
                      borderRadius: "10px",
                    },
                  }}
                />
              </Stack>

              <Button
                variant="contained"
                type="submit"
                sx={{
                  ":focus": {
                    backgroundColor: "#262626",
                  },
                  ":hover": {
                    backgroundColor: "#262626",
                  },
                  paddingTop: 1,
                  paddingBottom: 1,
                  width: "100%",
                  backgroundColor: "#262626",
                  borderRadius: 5,
                }}
              >
                {submitMessage && (
                  <Typography sx={{ fontSize: 18 }}>Reset Password</Typography>
                )}
                {passwordsDontMatch && (
                  <Typography sx={{ color: "red" }}>
                    Passwords don&apos;t match
                  </Typography>
                )}
                {passwordChanged && <Typography>Success</Typography>}
                {failed && (
                  <Typography sx={{ color: "red" }}>
                    Unsuccessful, please try again
                  </Typography>
                )}
                {progressIndicator && <CircularProgress size={25} />}
              </Button>
            </Stack>
          </form>
        </Grid>
        {/* End reset password form */}

        <Footer />
      </Grid>
    </>
  );
}
