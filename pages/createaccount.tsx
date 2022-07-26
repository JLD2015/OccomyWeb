import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Head from "next/head";
import Script from "next/script";
import { useRef, useState } from "react";

export default function CreateAccount() {
  // <========== Variables ==========>
  const theme = useTheme();
  const [progressIndicator, setProgressIndicator] = useState(false);
  const [prompt, setPrompt] = useState("");

  // Image selection
  const [imageFile, setImageFile] = useState(null);
  const inputImageReference = useRef(null);

  // Input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // <========== Functions ==========>

  // Used for managing account creation
  const handleSubmit = async (event) => {
    // Prevent defaults
    event.preventDefault();

    // Show the progress indicator
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
            password: event.target.password.value,
            confirmpassword: event.target.confirmpassword.value,
          };
          const JSONdata = JSON.stringify(data);

          // Make sure passwords match
          if (password !== confirmPassword) {
            setProgressIndicator(false);
            setPrompt("Passwords do not match");
            setPassword("");
            setConfirmPassword("");
            return;
          }

          console.log(JSONdata);
        });
    });
  };

  // Used for selecting image
  const handleImageClick = (event) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      setImageFile(URL.createObjectURL(newImage));
    }
  };

  const handleImageChange = (event) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      setImageFile(URL.createObjectURL(newImage));
    }
  };

  // <========== Body ==========>
  return (
    <>
      {/* Page header */}
      <Head>
        <title>Create Account</title>
      </Head>

      {/* Scripts */}
      <Script
        src={
          "https://www.google.com/recaptcha/api.js?render=" +
          process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY
        }
      />

      {/* Column 1 -> Creates page background */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        height={"100vh"}
        sx={{ backgroundColor: "#f5f5f5", overflow: "auto" }}
      >
        {/* Row 1.1 -> Creates row to center form */}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {/* Column 1.1.1 -> Creates card */}

          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            md={4}
            sx={{
              backgroundColor: "white",
              borderRadius: "25px",
              p: 2,
              boxShadow: 2,
              [theme.breakpoints.down("md")]: {
                m: 2,
                ...(prompt !== "" && {
                  mt: 8,
                }),
              },
            }}
          >
            <Typography
              sx={{
                [theme.breakpoints.up("md")]: {
                  fontSize: 40,
                  fontWeight: 600,
                },
                [theme.breakpoints.down("md")]: {
                  fontSize: 24,
                  fontWeight: 600,
                },
              }}
            >
              Create Account
            </Typography>

            <IconButton
              onClick={handleImageClick}
              aria-label="upload picture"
              component="label"
              disableRipple={true}
            >
              <input
                ref={inputImageReference}
                accept="image/*"
                hidden
                id="avatar-image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <Avatar
                src={imageFile || "/images/defaultavatar.png"}
                sx={{
                  [theme.breakpoints.up("md")]: {
                    height: 200,
                    width: 200,
                    mb: 3,
                    mt: 2,
                  },
                  [theme.breakpoints.down("md")]: {
                    height: 150,
                    width: 150,
                    mb: 1,
                  },
                }}
              />
            </IconButton>

            <form
              id="create-account-form"
              onSubmit={handleSubmit}
              style={{ width: "100%" }}
            >
              <Stack direction="column" alignItems="center" spacing={2}>
                <TextField
                  fullWidth
                  required
                  label="Name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={function (event) {
                    setName(event.target.value);
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
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
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
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={function (event) {
                    setPhone(event.target.value);
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
                  value={password}
                  onChange={function (event) {
                    setPassword(event.target.value);
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
                  label="Confirm Password"
                  name="confirmpassword"
                  type="password"
                  value={confirmPassword}
                  onChange={function (event) {
                    setConfirmPassword(event.target.value);
                  }}
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
                  {!progressIndicator && (
                    <>
                      <Typography
                        sx={{
                          [theme.breakpoints.up("md")]: {
                            fontSize: 18,
                            my: 1,
                          },
                          [theme.breakpoints.down("md")]: {
                            fontSize: 16,
                            my: 0.5,
                          },
                        }}
                      >
                        Create Account
                      </Typography>
                    </>
                  )}

                  {progressIndicator && (
                    <CircularProgress size={30} sx={{ color: "white" }} />
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
          {/* End column 1.1.1 -> Creates card */}
        </Grid>
        {/* End row 1.1 -> Creates row to center form */}
      </Grid>
      {/* End column 1 -> Creates page background */}
    </>
  );
}
