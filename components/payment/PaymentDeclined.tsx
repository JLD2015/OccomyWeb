import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect } from "react";
import lottie from "lottie-web";
import { useRouter } from "next/router";

export default function PaymentDeclined(props) {
  // <========== Variables ==========>
  const theme = useTheme();
  const router = useRouter();

  // <========== Page Loads ==========>
  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: document.getElementById("lottie"),
      renderer: "svg",
      autoplay: true,
      animationData: require("../../public/animations/failed.json"),
      loop: false,
    });

    // Return clean up function here
    return () => instance.destroy();
  }, []);

  useEffect(() => {
    setTimeout(function () {
      const redirectString = `${props.redirectURL}?status=declined`;
      router.replace(redirectString);
    }, 5000);
  }, []);

  // <========== Body ==========>
  return (
    <>
      <Container>
        {/* Row 1 -> Forms outside of card */}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            backgroundColor: "white",
            borderRadius: "25px",
            p: 2,
          }}
        >
          {/* Column 1.1 -> Contains lottie animation */}
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems={{ md: "flex-end", xs: "center" }}
            md={4}
          >
            <Box
              sx={{
                [theme.breakpoints.up("md")]: {
                  width: 300,
                },
                [theme.breakpoints.down("md")]: {
                  width: 200,
                },
                marginTop: 3,
                marginBottom: 3,
              }}
            >
              <div id="lottie" />
            </Box>
          </Grid>
          {/* End Column 1.1 -> Contains lottie animation */}

          {/* Column 1.2 -> Contains declined heading */}
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            md={8}
          >
            <Typography
              sx={{
                [theme.breakpoints.up("md")]: {
                  fontSize: 50,
                  fontWeight: 600,
                },
                [theme.breakpoints.down("md")]: {
                  fontSize: 28,
                  fontWeight: 600,
                },
              }}
            >
              Transaction Declined
            </Typography>
            <Typography
              sx={{
                [theme.breakpoints.up("md")]: {
                  fontSize: 26,
                },
                [theme.breakpoints.down("md")]: {
                  fontSize: 16,
                  pb: 3,
                },
              }}
            >
              Redirecting to merchant website ...
            </Typography>
          </Grid>
          {/* End column 1.2 -> Contains declined heading */}
        </Grid>
        {/* End Row 1 -> Forms outside of card */}
      </Container>
    </>
  );
}
