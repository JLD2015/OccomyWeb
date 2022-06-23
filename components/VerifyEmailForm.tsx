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
import { useState } from "react";

export default function VerifyEmailForm() {
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
                name="confirmPassword"
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
                paddingTop: 1,
                paddingBottom: 1,
                width: "100%",
                backgroundColor: "#262626",
                borderRadius: 5,
              }}
            >
              {progressIndicator && <CircularProgress size={25} />}
              {submitMessage && (
                <Typography sx={{ fontSize: 18 }}>Reset Password</Typography>
              )}
              {successMessage && <Typography>Message Sent!</Typography>}
              {failedMessage && (
                <Typography sx={{ color: "red" }}>Please Try Again!</Typography>
              )}
            </Button>
          </Stack>
        </form>
      </Grid>
      ;
    </>
  );
}
