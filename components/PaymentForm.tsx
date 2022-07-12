import {
  Avatar,
  Button,
  Chip,
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

// <========== Login Section ==========>
export default function PaymentForm(props) {
  // <========== Variables ==========>
  const theme = useTheme();
  const qrCodeValue = `{\"transactionID\": \"${props.documentID}\"}`;

  // <========== Body ==========>
  return (
    <>
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
                src={props.merchantProfilePhoto}
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
                  {props.merchantName}
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
                R{props.amount}
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
                <Typography sx={{ fontSize: "20px", fontWeight: 600, mb: 2 }}>
                  Scan the QR Code using the Occomy App
                </Typography>
                <QRCodeSVG value={qrCodeValue} size={200} />
                <Typography sx={{ fontSize: 20, fontWeight: 600, pt: 1 }}>
                  {props.transactionID}
                </Typography>
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
                action="api/auth/login"
                method="post"
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
                    Log in
                  </Button>
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
