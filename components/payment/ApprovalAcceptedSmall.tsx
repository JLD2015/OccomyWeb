import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import lottie from "lottie-web";

export default function ApprovalAcceptedSmall() {
  // <========== Page Loads ==========>

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: document.getElementById("approvalAcceptedSmall"),
      renderer: "svg",
      autoplay: true,
      animationData: require("../../public/animations/success.json"),
      loop: false,
    });

    // Return clean up function here
    return () => instance.destroy();
  }, []);

  // <========== Body ==========>
  return (
    <>
      <Box sx={{ width: "100%", display: { xs: "flex", md: "none" } }}>
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
            Transaction Approved
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Box
              sx={{
                width: 150,
              }}
            >
              <div id="approvalAcceptedSmall" />
            </Box>
          </Stack>
          <Typography>Redirecting to merchant website ...</Typography>
        </Grid>
      </Box>
    </>
  );
}
