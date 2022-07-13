import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import lottie from "lottie-web";

export default function DeclinedAnimation() {
  // <========== Page Loads ==========>

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: document.getElementById("lottieDeclined"),
      renderer: "svg",
      autoplay: true,
      animationData: require("../../public/animations/failed.json"),
      loop: false,
    });

    // Return clean up function here
    return () => instance.destroy();
  }, []);

  // <========== Body ==========>
  return (
    <>
      <Typography sx={{ fontSize: 32, fontWeight: 600 }}>
        Transaction Declined
      </Typography>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Box
          sx={{
            width: 210,
          }}
        >
          <div id="lottieDeclined" />
        </Box>
      </Stack>

      <Typography>Redirecting to merchant website ...</Typography>
    </>
  );
}
