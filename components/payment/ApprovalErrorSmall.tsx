import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import lottie from "lottie-web";

export default function ApprovalErrorSmall() {
  // <========== Page Loads ==========>

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: document.getElementById("approvalErrorSmall"),
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
      <Box sx={{ width: "100%", display: { xs: "flex", md: "none" } }}>
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography sx={{ fontSize: 25, fontWeight: 600 }}>Error</Typography>
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
              <div id="approvalErrorSmall" />
            </Box>
          </Stack>
          <Typography>Please retry transaction ...</Typography>
        </Grid>
      </Box>
    </>
  );
}
