import { Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import lottie from "lottie-web";

export default function ApprovalAcceptedLarge() {
  // <========== Page Loads ==========>

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: document.getElementById("approvalAcceptedLarge"),
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
            Transaction Approved
          </Typography>
          <Typography>Redirecting to merchant website ...</Typography>
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
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Box
              sx={{
                width: 310,
              }}
            >
              <div id="approvalAcceptedLarge" />
            </Box>
          </Stack>
        </Grid>
      </Box>
    </>
  );
}
