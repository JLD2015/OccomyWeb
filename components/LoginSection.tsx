// <========== Imports ==========>
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import * as FirebaseService from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginSection() {
  // <========== Variables ==========>
  const theme = useTheme();
  const [prompt, setPrompt] = useState("");
  const [progressIndicator, setProgressIndicator] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [forgotSpinner, setForgotSpinner] = useState(false);
  const [emailDialog, setEmailDialog] = useState(false);
  const isMedium = useMediaQuery(theme.breakpoints.up("md"));

  // <========== Functions ==========>
  function getOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
    }

    return "unknown";
  }

  const handleSubmit = async (event) => {
    // Stop form from submitting and refreshing page
    event.preventDefault();

    // Start the progress spinner
    setProgressIndicator(true);

    // Get a reCAPTCHA token
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY, {
          action: "submit",
        })
        .then(async (token) => {
          const data = {
            token: token,
            email: event.target.email.value,
            password: event.target.password.value,
          };
          const JSONdata = JSON.stringify(data);

          const endpoint = "/api/services/verifyrecaptcha";
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSONdata,
          };

          const response = await fetch(endpoint, options);
          const result = await response.json();

          if (result.status === "success") {
            // Log the user in here
            signInWithEmailAndPassword(
              FirebaseService.auth,
              data.email,
              data.password
            )
              .then((userCredential: any) => {
                // Signed in
                const user = userCredential.user;
                // Store the necesary details in session storage
                localStorage.setItem("accessToken", user.accessToken);
                localStorage.setItem("userName", user.displayName);
                localStorage.setItem("uid", user.uid);

                if (userCredential.user.emailVerified) {
                  // We can now move over to the dashboard
                  router.replace("/dashboard/settings");
                } else {
                  // Send user to email verification screen
                  localStorage.setItem("email", userCredential.user.email);
                  localStorage.setItem("name", userCredential.user.displayName);
                  router.replace("/verifyemail");
                }
              })
              .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                // If the user does not exist
                if (errorMessage === "Firebase: Error (auth/user-not-found).") {
                  setProgressIndicator(false);
                  setPrompt("User does not exist");
                  var resetForm = document.getElementById(
                    "login-form"
                  ) as HTMLFormElement;
                  resetForm.reset();
                }
                // If the password is incorrect
                if (errorMessage === "Firebase: Error (auth/wrong-password).") {
                  setProgressIndicator(false);
                  setPrompt("Incorrect password");
                  var resetForm = document.getElementById(
                    "login-form"
                  ) as HTMLFormElement;
                  resetForm.reset();
                }
              });
          } else {
            setProgressIndicator(false);
            setPrompt("We think you're a robot, please try again");

            // Clear the form
            var resetForm = document.getElementById(
              "login-form"
            ) as HTMLFormElement;
            resetForm.reset();
          }
        });
    });
  };

  const handleForgot = async (event) => {
    // Prevent the default submit behaviour
    event.preventDefault();

    // Start the spinner
    setForgotSpinner(true);

    // Make sure the user has enetered an email address
    if (email === "") {
      setForgotSpinner(false);
      setPrompt("Please enter an email address");
      return;
    }

    // Attempt to send reset email
    const data = {
      email: email,
    };
    const JSONdata = JSON.stringify(data);

    // Send emails
    const endpoint = "/api/email/resetpassword";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    setForgotSpinner(false);

    // Clear the form
    var resetForm = document.getElementById("login-form") as HTMLFormElement;
    resetForm.reset();

    // Show alert
    setEmailDialog(true);
  };

  // <========== Body ==========>
  return (
    <>
      {/* Grid 1 Column -> Fills entire screen and contains background image */}
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        height={"100vh"}
        sx={{
          backgroundImage: `url("/images/homeBackground.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* Grid 1.1 Row -> Fills the top third of the page */}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {/* The heading at mobile screen size */}
          <Grid
            item
            sx={{
              display: {
                xs: "block",
                md: "none",
              },
            }}
          >
            <Stack>
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  [theme.breakpoints.up("md")]: {
                    fontSize: "40px",
                  },
                  [theme.breakpoints.down("md")]: {
                    fontSize: "20px",
                  },
                }}
              >
                <Box sx={{ display: { xs: "block", md: "none" } }}>
                  <Image
                    src="/images/logo.png"
                    height={60}
                    width={60}
                    alt="Logo"
                  />
                </Box>

                <h1>Occomy</h1>
              </Stack>
            </Stack>
          </Grid>
          {/* End the heading at mobile screen size */}
        </Grid>
        {/* End Grid 1.1 Row -> Fills the top third of the page */}
        {/* Grid 1.2 Row -> Fills the middle third of the page */}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            [theme.breakpoints.down("md")]: {
              mt: -2,
            },
          }}
        >
          {/* 1.2.1 -> Contains the logo and slogan */}
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            md={6}
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                  [theme.breakpoints.up("md")]: {
                    fontSize: "40px",
                  },
                  [theme.breakpoints.down("md")]: {
                    fontSize: "20px",
                  },
                }}
              >
                <Box sx={{ display: { xs: "block", md: "none" } }}>
                  <Image
                    src="/images/logo.png"
                    height={60}
                    width={60}
                    alt="Logo"
                  />
                </Box>
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <Image
                    src="/images/logo.png"
                    height={200}
                    width={200}
                    alt="Logo"
                  />
                </Box>

                <h1>Occomy</h1>
              </Stack>
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <h1 style={{ fontSize: "30px", fontWeight: 500 }}>
                  Send and receive money easily and securely.
                </h1>
              </Box>
            </Stack>
          </Grid>
          {/* End 1.2.1 -> Contains the logo and slogan */}
          {/* 1.2.2 -> Login form */}
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            md={6}
            sx={{
              paddingRight: { xs: "20px", md: "40px" },
              paddingLeft: { xs: "20px", md: "40px" },
            }}
          >
            <form
              id="login-form"
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
                    padding: "40px",
                  },
                  [theme.breakpoints.down("md")]: {
                    padding: "20px",
                  },
                }}
              >
                <TextField
                  fullWidth
                  required
                  label="Email"
                  name="email"
                  type="email"
                  onChange={function (event) {
                    setEmail(event.target.value);
                  }}
                  sx={{
                    [`& fieldset`]: {
                      borderRadius: "10px",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  required
                  label="Password"
                  name="password"
                  type="password"
                  sx={{
                    [`& fieldset`]: {
                      borderRadius: "10px",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    width: "100%",
                    [theme.breakpoints.up("md")]: {
                      fontSize: "20px",
                    },
                    [theme.breakpoints.down("md")]: {
                      fontSize: "14px",
                    },
                  }}
                >
                  {!progressIndicator && (
                    <>
                      <Typography
                        sx={{
                          [theme.breakpoints.up("md")]: {
                            fontSize: 22,
                          },
                          [theme.breakpoints.down("md")]: {
                            fontSize: 16,
                          },
                        }}
                      >
                        Log In
                      </Typography>
                    </>
                  )}
                  {progressIndicator && (
                    <CircularProgress
                      size={isMedium ? 32 : 24}
                      sx={{
                        color: "white",
                      }}
                    />
                  )}
                </Button>
                {prompt !== "" && (
                  <>
                    <Typography sx={{ color: "red" }}>{prompt}</Typography>
                  </>
                )}

                {forgotSpinner && (
                  <>
                    <CircularProgress size={38} sx={{ color: "black" }} />
                  </>
                )}

                {!forgotSpinner && (
                  <>
                    <Typography
                      sx={{
                        [theme.breakpoints.up("md")]: {
                          fontSize: "20px",
                        },
                        [theme.breakpoints.down("md")]: {
                          fontSize: "16px",
                        },
                        pt: 1,
                      }}
                    >
                      <a
                        onClick={handleForgot}
                        href=""
                        style={{ paddingTop: "5px" }}
                      >
                        Forgot Password?
                      </a>
                    </Typography>
                  </>
                )}

                <Divider
                  sx={{
                    width: "100%",
                    [theme.breakpoints.up("md")]: {
                      paddingTop: "20px",
                      paddingBottom: "20px",
                    },
                  }}
                >
                  or
                </Divider>
                <Button
                  onClick={function () {
                    router.push("/createaccount");
                  }}
                  variant="contained"
                  color="success"
                  type="submit"
                  sx={{
                    width: "80%",
                    [theme.breakpoints.up("md")]: {
                      fontSize: "20px",
                    },
                    [theme.breakpoints.down("md")]: {
                      fontSize: "14px",
                    },
                  }}
                >
                  Create Account
                </Button>
                <Typography
                  sx={{
                    textAlign: "center",
                    [theme.breakpoints.up("md")]: {
                      pt: 2,
                      fontSize: 12,
                    },
                    [theme.breakpoints.down("md")]: {
                      fontSize: 10,
                    },
                  }}
                >
                  This site is protected by reCAPTCHA and the Google&nbsp;
                  <a
                    style={{ color: "blue" }}
                    href="https://policies.google.com/privacy"
                  >
                    Privacy Policy
                  </a>{" "}
                  and&nbsp;
                  <a
                    style={{ color: "blue" }}
                    href="https://policies.google.com/terms"
                  >
                    Terms of Service
                  </a>{" "}
                  apply.
                </Typography>
              </Stack>
            </form>

            <Box
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                  width: "100%",
                  textAlign: "center",
                  paddingTop: 20,
                },
              }}
            >
              <Button
                onClick={() => {
                  if (getOperatingSystem() == "iOS") {
                    window.location.href =
                      "https://apps.apple.com/us/app/occomy/id1605738645";
                  } else {
                    window.location.href =
                      "https://play.google.com/store/apps/details?id=com.occomy.Occomy";
                  }
                }}
                variant="contained"
                style={{ backgroundColor: "black" }}
                sx={{ borderRadius: 100, backgroundColor: "black" }}
              >
                <Typography sx={{ fontSize: 20, padding: 1.5 }}>
                  Download Occomy
                </Typography>
              </Button>
            </Box>
          </Grid>
          {/* End 1.2.2 -> Login form */}
        </Grid>
        {/* End Grid 1.2 Row -> Fills the middle third of the page */}
        {/* Grid 1.3 Row -> Fills the bottom third of the page */}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <ArrowCircleDownIcon
            sx={{ fontSize: 40, color: "white", marginBottom: "20px" }}
          />
        </Grid>
        {/* End Grid 1.3 Row -> Fills bottom top third of the page */}
      </Grid>
      {/* End Grid 1 Column -> Fills entire screen and contains background image */}
      {/* Dialog for forgot password */}
      <Dialog
        open={emailDialog}
        onClose={function () {
          setEmailDialog(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Password Reset"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If an account is associated with this email address, you will
            receive an email containing a link to reset your password.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={function () {
              setEmailDialog(false);
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {/* End dialog for forgot password */}
    </>
  );
}
