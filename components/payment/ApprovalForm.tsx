import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import ForwardIcon from "@mui/icons-material/Forward";
import {
  Avatar,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { Scale } from "@mui/icons-material";

export default function ApprovalForm() {
  // <========== Variables ==========>
  const theme = useTheme();

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
            boxShadow: 2,
          }}
        >
          {/* Row 1.1 -> Top row containing heading */}
          <Grid
            container
            direction="column"
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
            <Typography
              sx={{
                [theme.breakpoints.up("md")]: {
                  fontSize: 26,
                },
                [theme.breakpoints.down("md")]: {
                  fontSize: 20,
                },
              }}
            >
              Hi, Jon-Louis Dalton
            </Typography>
            <Typography
              sx={{
                [theme.breakpoints.up("md")]: {
                  fontSize: 20,
                },
                [theme.breakpoints.down("md")]: {
                  fontSize: 16,
                },
                textAlign: "center",
              }}
            >
              Would you like to approve the following transaction?
            </Typography>
          </Grid>
          {/* End row 1.1 -> Top row containing heading */}
          {/* Column 1.2 -> Bottom column containing content */}
          <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="stretch"
          >
            {/* Row 1.2.1 -> Contains avatars */}
            <Grid
              container
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-around"
              alignItems="center"
              sx={{
                borderRadius: "25px",
                p: 2,
                boxShadow: 3,
                my: 3,
              }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                  textAlign: "center",
                  display: { xs: "block", md: "none" },
                }}
              >
                <Typography sx={{ fontSize: 30, fontWeight: 600 }}>
                  R200.00
                </Typography>

                <Box width={"100%"} sx={{ py: 1 }}>
                  <Divider textAlign="center">
                    <Chip label="TO" />
                  </Divider>
                </Box>

                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  width={"100%"}
                >
                  <Avatar
                    src="https://cdn.shopify.com/s/files/1/2836/2982/products/pic10_large.jpg?v=1529434190"
                    sx={{
                      [theme.breakpoints.up("md")]: {
                        width: 260,
                        height: 260,
                      },
                      [theme.breakpoints.down("md")]: {
                        width: 120,
                        height: 120,
                      },
                    }}
                  />
                  <Typography
                    sx={{ fontSize: 26, fontWeight: 600, textAlign: "center" }}
                  >
                    Zimbi Books
                  </Typography>
                </Stack>
              </Grid>

              <Box sx={{ width: "100%", display: { xs: "none", md: "flex" } }}>
                <Grid
                  item
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  md={5.5}
                >
                  <Typography sx={{ fontSize: 40, fontWeight: 600 }}>
                    Pay
                  </Typography>
                  <Typography sx={{ fontSize: 60, fontWeight: 600 }}>
                    R200.00
                  </Typography>
                </Grid>

                <Grid
                  item
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  md={1}
                >
                  <Divider orientation="vertical" textAlign="center">
                    <Chip label="TO" />
                  </Divider>
                </Grid>

                <Grid
                  item
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  md={5.5}
                >
                  <Avatar
                    src="https://cdn.shopify.com/s/files/1/2836/2982/products/pic10_large.jpg?v=1529434190"
                    sx={{
                      width: 250,
                      height: 250,
                    }}
                  />
                  <Typography sx={{ fontSize: 26, fontWeight: 600, py: 2 }}>
                    Zimbi Books
                  </Typography>
                </Grid>
              </Box>
            </Grid>
            {/* End row 1.2.1 -> Contains avatars */}

            {/* Row 1.2.2 -> Contains buttons  */}
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* Decline button */}
              <Grid
                item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                md={6}
                xs={12}
                sx={{
                  [theme.breakpoints.up("md")]: {
                    px: 10,
                  },
                  [theme.breakpoints.down("md")]: {
                    pb: 2,
                  },
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  startIcon={
                    <ClearIcon
                      sx={{
                        [theme.breakpoints.down("md")]: {
                          transform: "scale(1.2)",
                        },
                        [theme.breakpoints.up("md")]: {
                          transform: "scale(1.6)",
                        },
                      }}
                    />
                  }
                  sx={{
                    py: 2,

                    borderRadius: 100,
                  }}
                >
                  <Typography
                    sx={{
                      [theme.breakpoints.up("md")]: {
                        fontSize: 24,
                      },
                      [theme.breakpoints.down("md")]: {
                        fontSize: 18,
                      },
                      fontWeight: 600,
                    }}
                  >
                    Decline
                  </Typography>
                </Button>
              </Grid>

              {/* Approve button */}
              <Grid
                item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                md={6}
                xs={12}
                sx={{
                  [theme.breakpoints.up("md")]: {
                    px: 10,
                  },
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  startIcon={
                    <CheckIcon
                      sx={{
                        [theme.breakpoints.down("md")]: {
                          transform: "scale(1.2)",
                        },
                        [theme.breakpoints.up("md")]: {
                          transform: "scale(1.6)",
                        },
                      }}
                    />
                  }
                  sx={{
                    py: 2,
                    borderRadius: 100,
                  }}
                >
                  <Typography
                    sx={{
                      [theme.breakpoints.up("md")]: {
                        fontSize: 24,
                      },
                      [theme.breakpoints.down("md")]: {
                        fontSize: 18,
                      },
                      fontWeight: 600,
                    }}
                  >
                    Approve
                  </Typography>
                </Button>
              </Grid>
            </Grid>

            {/* End row 1.2.2 -> Contains buttons  */}
          </Grid>
          {/* End column 1.2 -> Bottom column containing content */}
        </Grid>
        {/* End column 1 -> Forms outside of card */}
      </Container>
    </>
  );
}
