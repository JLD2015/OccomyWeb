// <========== Imports ==========>
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
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import { useState } from "react";
import Footer from "../components/Footer";

export default function Contact() {
  // <========== Variables ==========>
  const [failedMessage, setFailedMessage] = useState(false);
  const [progressIndicator, setProgressIndicator] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(true);
  const [successMessage, setSuccessMessage] = useState(false);
  const theme = useTheme();

  // <========== Functions ==========>
  const handleSubmit = async (event) => {
    // Stop form from submitting and refreshing page
    event.preventDefault();

    // Show the progress indicator
    setSubmitMessage(false);
    setProgressIndicator(true);

    // Get a reCAPTCHA token
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY, {
          action: "submit",
        })
        .then(async (token) => {
          // Get data from the form.
          const data = {
            token: token,
            name: event.target.name.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
            message: event.target.message.value,
          };
          const JSONdata = JSON.stringify(data);

          // Send emails
          const endpoint = "/api/email/sendcontactemails";
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSONdata,
          };

          const response = await fetch(endpoint, options);
          const result = await response.json();

          if (result.status === "Success") {
            setProgressIndicator(false);
            setSuccessMessage(true);

            // Clear the form
            var resetForm = document.getElementById(
              "contact-form"
            ) as HTMLFormElement;
            resetForm.reset();
          } else {
            setProgressIndicator(false);
            setFailedMessage(true);

            console.log(result);

            // Clear the form
            var resetForm = document.getElementById(
              "contact-form"
            ) as HTMLFormElement;
            resetForm.reset();
          }
        });
    });
  };

  // <========== Body ==========>
  return (
    <>
      {/* Page header */}
      <Head>
        <title>Contact Us</title>
      </Head>

      {/* Scripts */}
      <Script
        src={
          "https://www.google.com/recaptcha/api.js?render=" +
          process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY
        }
      />

      {/* Body */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        height={"100vh"}
        sx={{
          backgroundImage: `url("/images/contactBackground.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
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
        {/* Heading */}
        <Stack>
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
              Occomy Support
            </Typography>
          </Stack>
          <Typography
            sx={{
              [theme.breakpoints.up("md")]: {
                fontSize: 18,
              },
              [theme.breakpoints.down("md")]: {
                fontSize: 16,
              },
              fontWeight: 600,
              textAlign: "center",
              paddingBottom: 2,
            }}
          >
            Our team is happy to answer any of your questions. Please complete
            the form and we&aposll get back to you as soon as possible.
          </Typography>
        </Stack>

        {/* End heading */}
        {/* Contact form */}
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <form
            id="contact-form"
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
              <TextField
                fullWidth
                required
                label="Full Name"
                name="name"
                type="text"
                sx={{
                  [`& fieldset`]: {
                    borderRadius: "10px",
                  },
                }}
              />

              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ width: "100%" }}
              >
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
                  label="Phone Number"
                  name="phone"
                  type="text"
                  sx={{
                    [`& fieldset`]: {
                      borderRadius: "10px",
                    },
                  }}
                />
              </Stack>

              <TextField
                fullWidth
                required
                label="Message"
                name="message"
                type="text"
                multiline
                rows={5}
                sx={{
                  [`& fieldset`]: {
                    borderRadius: "10px",
                  },
                }}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  fontSize: 18,
                  paddingTop: 1,
                  paddingBottom: 1,
                  width: "100%",
                  backgroundColor: "#262626",
                  borderRadius: 5,
                }}
              >
                {progressIndicator && <CircularProgress size={25} />}
                {submitMessage && <Typography>Submit</Typography>}
                {successMessage && <Typography>Message Sent!</Typography>}
                {failedMessage && (
                  <Typography sx={{ color: "red" }}>
                    Please Try Again!
                  </Typography>
                )}
              </Button>
            </Stack>
          </form>
        </Grid>
        {/* End contact form */}
      </Grid>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </>
  );
}
