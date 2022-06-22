// <========== Imports ==========>
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import {
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material";

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

// <========== Login Section ==========>
export default function LoginSection() {
  // MUI theme
  const theme = useTheme();

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
              action="api/auth/login"
              method="post"
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
                  Log in
                </Button>
                <Typography
                  sx={{
                    [theme.breakpoints.up("md")]: {
                      fontSize: "20px",
                    },
                    [theme.breakpoints.down("md")]: {
                      fontSize: "14px",
                    },
                  }}
                >
                  <a href="https://google.com" style={{ paddingTop: "5px" }}>
                    Forgot Password?
                  </a>
                </Typography>

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
    </>
  );
}
