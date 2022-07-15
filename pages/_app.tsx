import admin from "firebase-admin";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import "../styles/globals.css";
import { CssBaseline } from "@mui/material";
import { AppWrapper } from "../context/AppContext";

const theme = createTheme({});

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppWrapper>
        <ThemeProvider theme={theme}>
          {/* Applies MUI css styling */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </AppWrapper>
    </>
  );
}

export default App;
