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
import { useAuth } from "../../store/AuthContext";
import { fetchData } from "../../services/firebase";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

export interface State extends SnackbarOrigin {
  open: boolean;
}

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

  const [APISnackbarState, setAPISnackbarState] = useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = APISnackbarState;

  // <========== Functions ==========>
  const handleAPISnackbarClick = (newState: SnackbarOrigin) => () => {
    setAPISnackbarState({ open: true, ...newState });
    navigator.clipboard.writeText(apiKey);
  };

  const handleAPISnackbarClose = () => {
    setAPISnackbarState({ ...APISnackbarState, open: false });
  };

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
                  onClick={handleAPISnackbarClick({
                    vertical: "bottom",
                    horizontal: "center",
                  })}
                  sx={{ color: "rgba(57,111,176,1)" }}
                >
                  <ContentCopyIcon />
                </IconButton>
              ),
            }}
            sx={{ "& fieldset": { borderRadius: "10px" } }}
          />
        </Stack>
      </Grid>

      {/* Snackbar for when API key is copied */}
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleAPISnackbarClose}
        message={"Copied to clipboard"}
        ContentProps={{
          sx: {
            display: "block",
            textAlign: "center",
          },
        }}
        key={vertical + horizontal}
      />
      {/* End snackbar for when API key is copied */}
    </>
  );
}
