import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../store/AuthContext";

export default function Settings() {
  // <========== Protected route ==========>
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) {
      router.replace("/");
    }
  }, [authUser, loading, router]);

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
          Settings page
        </Typography>
      </Grid>
    </>
  );
}
