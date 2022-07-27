import {
  Grid,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../store/AuthContext";
import { fetchData } from "../services/firebase";

// Icons
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Head from "next/head";

export default function Settings() {
  // <========== Protected route ==========>
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) {
      router.replace("/");
    }
  }, [authUser, loading, router]);

  // <========== Variables ==========>
  const [apiKey, setApiKey] = useState();

  // <========== Page loads ==========>
  useEffect(() => {
    async function runAsync() {
      const docSnap = await fetchData(localStorage.getItem("uid"));
      const data = docSnap.data();
      setApiKey(data.apiKey);
    }

    runAsync();
  }, [setApiKey]);

  // <========== Body ==========>
  return (
    <>
      {/* Page header */}
      <Head>
        <title>Settings</title>
      </Head>
      {/* End page header */}

      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        height={"100vh"}
        sx={{
          backgroundColor: "#f5f5f5",
          p: 2,
        }}
      >
        {/* Drop content below appbar */}
        <Toolbar />
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          spacing={1}
          width={"100%"}
          sx={{
            backgroundColor: "white",
            borderRadius: "25px",
            p: 2,
          }}
        >
          <Typography sx={{ fontWeight: 600, pl: 0.5 }}>API Key:</Typography>
          <TextField
            fullWidth
            disabled={true}
            multiline
            value={apiKey}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={function () {
                    navigator.clipboard.writeText(apiKey);
                  }}
                  sx={{ color: "blue" }}
                >
                  <ContentCopyIcon />
                </IconButton>
              ),
            }}
            sx={{ "& fieldset": { borderRadius: "10px" } }}
          />
        </Stack>
      </Grid>
    </>
  );
}
