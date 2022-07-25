import { Grid, Typography } from "@mui/material";

export default function Dashboard() {
  // <========== Body ==========>
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
          Coming Soon!
        </Typography>
      </Grid>
    </>
  );
}
