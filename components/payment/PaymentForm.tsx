import * as FirebaseService from "../../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Avatar,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { Box, Container } from "@mui/system";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DeclinedAnimation from "./DeclinedAnimation";
import ApprovedAnimation from "./ApprovedAnimation";
import Script from "next/script";

// <========== Login Section ==========>
export default function PaymentForm() {
  // <========== Variables ==========>
  const theme = useTheme();
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("pending");
  const [prompt, setPrompt] = useState("");
  const router = useRouter();
  const [progressIndicator, setProgressIndicator] = useState(false);

  // Used for accessing local variables
  const [merchantProfilePhotoURL, setMerchantProfilePhotoURL] = useState("");
  const [merchantName, setMerchantName] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionID, setTransactionID] = useState("");

  // <========== Functions ==========>
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

                // We can now move over to the payment approval page
                router.replace("/approval");
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

  // <========== Page Loads ==========>
  useEffect(() => {
    const unsubscribe = FirebaseService.monitorTransaction(
      localStorage.getItem("documentID"),
      (querySnapshot) => {
        const transactionStatus = querySnapshot.data().status;
        if (transactionStatus == "approved") {
          setTransactionStatus("approved");

          // Redirect back to the merchant's website
          setTimeout(function () {
            const redirectString = `${localStorage.getItem(
              "redirectURL"
            )}?status=approved`;
            router.replace(redirectString);
          }, 3000);
        }
        if (transactionStatus == "declined") {
          setTransactionStatus("declined");

          // Redirect back to the merchant's website
          setTimeout(function () {
            const redirectString = `${localStorage.getItem(
              "redirectURL"
            )}?status=declined`;
            router.replace(redirectString);
          }, 5000);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    return unsubscribe;
  }, [setTransactionStatus, router]);

  // Get values from local storage
  useEffect(() => {
    setAmount(localStorage.getItem("amount"));
    setMerchantName(localStorage.getItem("merchantName"));
    setMerchantProfilePhotoURL(localStorage.getItem("merchantProfilePhotoURL"));
    setTransactionID(localStorage.getItem("transactionID"));
    setQrCodeValue(
      `{\"transactionID\": \"${localStorage.getItem("documentID")}\"}`
    );
  }, []);

  // <========== Body ==========>
  return (
    <>
      {/* Scripts */}
      <Script
        src={
          "https://www.google.com/recaptcha/api.js?render=" +
          process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY
        }
      />

      <Container>
        {/* Column 1 -> Forms outside of card */}
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            backgroundColor: "white",
            borderRadius: "25px",
            p: 2,
            boxShadow: 2,
          }}
        >
          {/* Row 1.1 -> Top row containing heading */}
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Stack>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
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
                    height={70}
                    width={70}
                    alt="Logo"
                  />
                </Box>

                <Typography
                  sx={{
                    [theme.breakpoints.up("md")]: {
                      fontSize: 45,
                    },
                    [theme.breakpoints.down("md")]: {
                      fontSize: 32,
                    },
                    fontWeight: 600,
                  }}
                >
                  Occomy
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          {/* End row 1.1 -> Top row containing heading */}
          {/* Row 1.2 -> Bottom row containing content */}
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="stretch"
          >
            {/* Column 1.2.1 -> Left column in row */}
            <Grid
              item
              container
              direction="column"
              justifyContent="space-around"
              alignItems="center"
              md={5}
            >
              <Avatar
                src={merchantProfilePhotoURL}
                sx={{
                  [theme.breakpoints.up("md")]: {
                    width: 260,
                    height: 260,
                  },
                  [theme.breakpoints.down("md")]: {
                    width: 160,
                    height: 160,
                  },
                }}
              />
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={{ md: 1 }}
                sx={{ py: 1 }}
              >
                <Typography
                  sx={{
                    [theme.breakpoints.up("md")]: {
                      fontSize: 40,
                    },
                    [theme.breakpoints.down("md")]: {
                      fontSize: 30,
                    },
                  }}
                >
                  {merchantName}
                </Typography>
                <Typography
                  sx={{
                    [theme.breakpoints.up("md")]: {
                      fontSize: 20,
                    },
                    [theme.breakpoints.down("md")]: {
                      fontSize: 16,
                    },
                  }}
                >
                  Has requested a payment of
                </Typography>
              </Stack>

              <Typography
                sx={{
                  fontWeight: 600,
                  [theme.breakpoints.up("md")]: {
                    fontSize: 60,
                  },
                  [theme.breakpoints.down("md")]: {
                    fontSize: 30,
                  },
                  pb: 1,
                }}
              >
                R{amount}
              </Typography>
            </Grid>
            {/* End column 1.2.1 -> Left column in row */}

            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ display: { xs: "none", md: "block" } }}
            />

            {/* Column 1.2.2 -> Right column in row */}
            <Grid
              item
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              md={5}
              sx={{ mb: 2 }}
            >
              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                  textAlign: "center",
                }}
              >
                {/* We display the QR code if the transaction is pending */}
                {transactionStatus === "pending" && (
                  <>
                    <Typography
                      sx={{ fontSize: "20px", fontWeight: 600, mb: 2 }}
                    >
                      Scan the QR Code using the Occomy App
                    </Typography>
                    <QRCodeSVG value={qrCodeValue} size={200} />
                    <Typography sx={{ fontSize: 20, fontWeight: 600, pt: 1 }}>
                      {transactionID}
                    </Typography>
                  </>
                )}
                {/* End we display the QR code if the transaction is pending */}

                {/* We display the declined animation if the transaction has been declined */}
                {transactionStatus === "declined" && <DeclinedAnimation />}
                {/* End we display the declined animation if the transaction has been declined */}

                {/* We display the success animation if the transaction has been successful */}
                {transactionStatus === "approved" && <ApprovedAnimation />}
                {/* End we display the success animation if the transaction has been successful */}
              </Box>

              <Box sx={{ width: "100%", display: { xs: "none", md: "block" } }}>
                <Divider
                  textAlign="center"
                  sx={{
                    [theme.breakpoints.up("md")]: {
                      my: 2,
                    },
                  }}
                >
                  <Chip label="OR" />
                </Divider>
              </Box>

              <form
                id="login-form"
                onSubmit={handleSubmit}
                style={{ width: "100%" }}
              >
                <Stack direction="column" alignItems="center" spacing={2}>
                  <TextField
                    fullWidth
                    required
                    label="Email"
                    name="email"
                    type="email"
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
                      borderRadius: "25px",
                      width: "100%",
                      [theme.breakpoints.up("md")]: {
                        fontSize: "20px",
                      },
                      [theme.breakpoints.down("md")]: {
                        fontSize: "14px",
                      },
                    }}
                  >
                    {!progressIndicator && <>Log in</>}

                    {progressIndicator && (
                      <CircularProgress size={35} sx={{ color: "white" }} />
                    )}
                  </Button>

                  {prompt !== "" && (
                    <>
                      <Typography sx={{ color: "red" }}>{prompt}</Typography>
                    </>
                  )}
                </Stack>
              </form>
            </Grid>
            {/* End column 1.2.2 -> Right column in row */}
          </Grid>
          {/* End row 1.2 -> Bottom row containing content */}
        </Grid>
        {/* End column 1 -> Forms outside of card */}
      </Container>
    </>
  );
}
