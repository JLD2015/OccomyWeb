import { Grid, Typography } from "@mui/material";

export default function Settings() {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        height={"100vh"}
      >
        <Typography sx={{ fontSize: 60, fontWeight: 600, color: "gray" }}>
          Settings page
        </Typography>
      </Grid>
    </>
  );
}
