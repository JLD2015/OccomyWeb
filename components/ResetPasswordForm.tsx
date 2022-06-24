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
import { useRouter } from "next/router";
import { useState } from "react";

export default function ResetPasswordForm() {
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

    // Reset the user's password
    const data = {
      oobCode: router.query.oobCode,
      password: password,
    };
    const JSONdata = JSON.stringify(data);

    const endpoint = "/api/auth/resetpassword";
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
      var resetForm = document.getElementById(
        "reset-password-form"
      ) as HTMLFormElement;
      resetForm.reset();
      setProgressIndicator(false);
      setPasswordChanged(true);
      setTimeout(function () {
        router.replace("/");
      }, 4000);
    } else {
      var resetForm = document.getElementById(
        "reset-password-form"
      ) as HTMLFormElement;
      resetForm.reset();
      setProgressIndicator(false);
      setFailed(true);
      setTimeout(function () {
        router.replace("/");
      }, 4000);
    }
  };

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
                  outline: "none",
                  boxShadow: "none",
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
              {passwordChanged && (
                <Typography sx={{ color: "green" }}>Success</Typography>
              )}
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
      ;
    </>
  );
}
