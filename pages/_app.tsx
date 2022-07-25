import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import "../styles/globals.css";
import { CssBaseline } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import Navigation from "../components/dashboard/navigation";

export default function App({ Component, pageProps }: AppProps) {
  // <========== Variables ==========>
  const router = useRouter();
  const theme = createTheme({});
  const dashboardRoutes = ["/dashboard", "/settings"];

  // <========== Body ==========>
  if (dashboardRoutes.includes(router.asPath)) {
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          {/* Applies MUI css styling */}
          <CssBaseline />
          <Navigation mainPage={<Component {...pageProps} />} />
        </ThemeProvider>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          {/* Applies MUI css styling */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}
