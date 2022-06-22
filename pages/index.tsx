// <========== Imports ==========>
import Head from "next/head";
import LoginSection from "../components/LoginSection";
import InfoSection from "../components/InfoSection";
import Footer from "../components/Footer";

// <========== Home Page ==========>
export default function Home() {
  return (
    <>
      {/* Header */}
      <Head>
        <title>Occomy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Body */}
      <LoginSection />
      <InfoSection />
      <Footer />
    </>
  );
}
