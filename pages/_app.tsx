import { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../styles/globals.css";
import { CssBaseline } from "@mui/material";

const theme = createTheme({});

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* Applies MUI css styling */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default App;
