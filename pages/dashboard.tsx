import { Router } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../store/AuthContext";

export default function Dashboard() {
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
      {/* Page header */}
      <Head>
        <title>Dashboard</title>
      </Head>
      {/* End page header */}

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
