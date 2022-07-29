// <========== Imports ==========>
import Head from "next/head";
import LoginSection from "../components/LoginSection";
import InfoSection from "../components/InfoSection";
import Footer from "../components/Footer";

// <========== Home Page ==========>
export default function Home() {
  // <========== Body ==========>
  return (
    <>
      {/* Header */}
      <Head>
        <title>Send and Receive Payments Free of Charge - Occomy</title>
        <meta
          name="description"
          content="Occomy allows you to securely send and receive payments free of charge. No special hardware is required and there are no contractual commitments."
          key="desc"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.occomy.com/" />

        {/* Open graph tags */}
        <meta
          property="og:title"
          content="Send and Receive Payments Free of Charge - Occomy"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.occomy.com/images/logo.png"
        />
        <meta property="og:url" content="https://www.occomy.com/" />
        <meta
          property="og:description"
          content="Occomy allows you to securely send and receive payments free of charge. No special hardware is required and there are no contractual commitments."
        />
        <meta property="og:site_name" content="Occomy" />
        {/* End open graph tags */}
      </Head>

      {/* Body */}
      <LoginSection />
      <InfoSection />
      <Footer />
    </>
  );
}
