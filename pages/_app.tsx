import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import "../styles/globals.css";
import { CssBaseline } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import Navigation from "../components/dashboard/navigation";
import { AuthContextProvider } from "../store/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  // <========== Variables ==========>
  const router = useRouter();
  const theme = createTheme({});
  const dashboardRoutes = ["/dashboard", "/settings"];

  // <========== Body ==========>
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <AuthContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            {/* If we are inside a dashboard path we want to include navigation */}
            {dashboardRoutes.includes(router.asPath) && (
              <>
                <Navigation mainPage={<Component {...pageProps} />} />
              </>
            )}
            {/* If we are outside a dashboard path we don't want navigation */}
            {!dashboardRoutes.includes(router.asPath) && (
              <>
                <Component {...pageProps} />
              </>
            )}
          </CssBaseline>
        </ThemeProvider>
      </AuthContextProvider>
    </>
  );
}
