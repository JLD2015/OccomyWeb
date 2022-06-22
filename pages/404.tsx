import { useTheme } from "@mui/material";
import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import lottie from "lottie-web";
import { useEffect } from "react";
import Footer from "../components/Footer";

export default function Custom404() {
  // MUI Theme
  const theme = useTheme();

  // Used for loading Lottie animation
  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: document.getElementById("lottie"),
      renderer: "svg",
      autoplay: true,
      animationData: require("../public/animations/404.json"),
    });

    // Return clean up function here
    return () => instance.destroy();
  }, []);

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        height={"100vh"}
        sx={{
          backgroundImage: `url("/images/404Background.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Typography
            sx={{
              [theme.breakpoints.up("md")]: {
                fontSize: 50,
              },
              [theme.breakpoints.down("md")]: {
                fontSize: 30,
              },
              fontWeight: 600,
            }}
          >
            Well This Is Awkward
          </Typography>
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
          <Typography
            sx={{
              [theme.breakpoints.up("md")]: {
                fontSize: 30,
              },
              [theme.breakpoints.down("md")]: {
                fontSize: 20,
              },
            }}
          >
            Nothing To See Here!
          </Typography>
        </Stack>
      </Grid>
      <Footer />
    </>
  );
}
