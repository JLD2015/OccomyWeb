import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Container } from "@mui/system";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Footer from "../components/Footer";

export default function VerifyEmail() {
  // <========== Variables ==========>
  const router = useRouter();
  const theme = useTheme();
  const [emailPopup, setEmailPopup] = useState(false);

  // <========== Functions ==========>
  const handleSendEmail = async (event) => {
    // Prvent default behaviour
    event.preventDefault();

    // Get data from the form.
    const data = {
      email: localStorage.getItem("email"),
      name: localStorage.getItem("name"),
    };
    const JSONdata = JSON.stringify(data);

    // Send emails
    const endpoint = "/api/email/sendverifyemail";
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
      setEmailPopup(true);
    }
  };

  // <========== Body ==========>
  return (
    <>
      {/* Page header */}
      <Head>
        <title>Verify Email</title>
      </Head>

      {/* Column 1 -> Forms page background */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        height={"100vh"}
        sx={{ backgroundColor: "#f5f5f5" }}
      >
        {/* Row 1.1 -> Creates card */}
        <Container>
          <Grid
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              backgroundColor: "white",
              borderRadius: "25px",
              p: 2,
              boxShadow: 2,
            }}
          >
            {/* Column 1.1.1 -> Forms left side of card */}
            <Grid
              item
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              md={5.99}
            >
              <Image
                src="/images/logo.png"
                alt="Occomy logo"
                height={250}
                width={250}
              />
            </Grid>
            {/* End column 1.1.1 -> Forms left side of card */}
            <Divider orientation="vertical" flexItem />
            {/* Column 1.1.2 -> Forms right side of card */}
            <Grid
              item
              container
              direction="column"
              justifyContent="space-between"
              alignItems="center"
              md={5.99}
              sx={{
                [theme.breakpoints.up("md")]: {
                  pl: 2,
                },
              }}
            >
              <Typography
                sx={{
                  [theme.breakpoints.up("md")]: {
                    fontSize: 35,
                    fontWeight: 600,
                  },
                  [theme.breakpoints.down("md")]: {
                    fontSize: 30,
                    fontWeight: 600,
                  },
                }}
              >
                Just one more step
              </Typography>
              <Typography
                sx={{
                  [theme.breakpoints.up("md")]: {
                    fontSize: 20,
                  },
                  [theme.breakpoints.down("md")]: {
                    fontSize: 18,
                  },
                  textAlign: "center",
                  my: 4,
                }}
              >
                Please verify your email address using the email we have sent
                you.
              </Typography>

              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                width={"100%"}
                sx={{
                  [theme.breakpoints.up("md")]: {
                    px: 4,
                  },
                }}
              >
                <a style={{ color: "blue" }} href="" onClick={handleSendEmail}>
                  <Typography sx={{ fontSize: 16 }}>
                    Send email again
                  </Typography>
                </a>
                <Button
                  onClick={function () {
                    router.replace("/");
                  }}
                  variant="contained"
                  sx={{
                    width: "100%",
                    [theme.breakpoints.up("md")]: {
                      fontSize: 20,
                    },
                    [theme.breakpoints.down("md")]: {
                      fontSize: 16,
                    },
                  }}
                >
                  Login
                </Button>
              </Stack>
            </Grid>
            {/* End column 1.1.2 -> Forms right side of card */}
          </Grid>
        </Container>
        {/* End column 1.1.1 -> Creates card */}
      </Grid>
      <Footer />
      {/* End column 1 -> Forms page background */}
      {/* Dialog if email was sent again */}
      <Dialog
        open={emailPopup}
        onClose={function () {
          setEmailPopup(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Verification Email"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            We have sent you another verification email.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={function () {
              setEmailPopup(false);
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {/* End dialog if email was sent again */}
    </>
  );
}
