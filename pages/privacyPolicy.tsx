import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Stack } from "@mui/material";
import { blue } from "@mui/material/colors";

const drawerWidth = 300;

export default function privacyPolicy() {
  // Control drawer open/close state
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // References to all of the sections
  const drawerRef = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const ref8 = useRef(null);
  const ref9 = useRef(null);
  const ref10 = useRef(null);
  const ref11 = useRef(null);
  const ref12 = useRef(null);
  const ref13 = useRef(null);

  const sectionRefs = [
    { section: "1", ref: ref1 },
    { section: "2", ref: ref2 },
    { section: "3", ref: ref3 },
    { section: "4", ref: ref4 },
    { section: "5", ref: ref5 },
    { section: "6", ref: ref6 },
    { section: "7", ref: ref7 },
    { section: "8", ref: ref8 },
    { section: "9", ref: ref9 },
    { section: "10", ref: ref10 },
    { section: "11", ref: ref11 },
    { section: "12", ref: ref12 },
    { section: "13", ref: ref13 },
  ];

  const [visibleSection, setVisibleSection] = useState("");

  const getDimensions = (ele) => {
    const { height } = ele.getBoundingClientRect();
    const offsetTop = ele.offsetTop - 54;
    const offsetBottom = offsetTop + height;
    return {
      height,
      offsetTop,
      offsetBottom,
    };
  };

  useEffect(() => {
    const handleScroll = () => {
      const { height: headerHeight } = getDimensions(drawerRef.current);
      const scrollPosition = window.scrollY + headerHeight;
      const selected = sectionRefs.find(({ section, ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition > offsetTop && scrollPosition < offsetBottom;
        }
      });
      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
      } else if (!selected && visibleSection) {
        setVisibleSection(undefined);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleSection]);

  // Defines the content of the drawer -> Declare here as we use it twice
  const drawer = (
    <div>
      <Toolbar>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", height: "100%" }}
        >
          <Image src="/images/logo.png" height={50} width={50} alt="Logo" />
        </Stack>
      </Toolbar>
      <List
        sx={{
          "& .MuiListItemButton-root": {
            fontSize: 18,
            "&.Mui-selected": {
              backgroundColor: blue[800],
              color: "White",
            },
            "&:hover": {
              backgroundColor: blue[800],
              color: "White",
            },
          },
        }}
      >
        {/* 1 */}
        <ListItem disablePadding>
          <ListItemButton
            selected={visibleSection === "1" ? true : false}
            onClick={() => {
              setMobileOpen(false);
              scrollTo(ref1.current);
            }}
          >
            <a href="#1">
              <ListItemText
                primaryTypographyProps={{ fontWeight: 600 }}
                primary="Overview"
              />
            </a>
          </ListItemButton>
        </ListItem>

        {/* 2 */}
        <ListItem disablePadding>
          <ListItemButton
            selected={visibleSection === "2" ? true : false}
            onClick={() => {
              setMobileOpen(false);
              scrollTo(ref2.current);
            }}
          >
            <a href="#2">
              <ListItemText
                primaryTypographyProps={{ fontWeight: 600 }}
                primary="Your Privacy Rights"
              />
            </a>
          </ListItemButton>
        </ListItem>
        {/* 3 */}
        <ListItem disablePadding>
          <ListItemButton
            selected={visibleSection === "3" ? true : false}
            onClick={() => {
              setMobileOpen(false);
              scrollTo(ref3.current);
            }}
          >
            <a href="#3">
              <ListItemText
                primaryTypographyProps={{ fontWeight: 600 }}
                primary="Your Choices"
              />
            </a>
          </ListItemButton>
        </ListItem>
        {/* 4 */}
        <ListItem disablePadding>
          <ListItemButton
            selected={visibleSection === "4" ? true : false}
            onClick={() => {
              setMobileOpen(false);
              scrollTo(ref4.current);
            }}
          >
            <a href="#4">
              <ListItemText
                primaryTypographyProps={{ fontWeight: 600 }}
                primary="Data Used By Third Parties"
              />
            </a>
          </ListItemButton>
        </ListItem>
        {/* 5 */}
        <ListItem disablePadding>
          <ListItemButton
            selected={visibleSection === "5" ? true : false}
            onClick={() => {
              setMobileOpen(false);
              scrollTo(ref5.current);
            }}
          >
            <a href="#5">
              <ListItemText
                primaryTypographyProps={{ fontWeight: 600 }}
                primary="How We Communicate With You"
              />
            </a>
          </ListItemButton>
        </ListItem>
        {/* 6 */}
        <ListItem disablePadding>
          <ListItemButton
            selected={visibleSection === "6" ? true : false}
            onClick={() => {
              setMobileOpen(false);
              scrollTo(ref6.current);
            }}
          >
            <a href="#6">
              <ListItemText
                primaryTypographyProps={{ fontWeight: 600 }}
                primary="Personal Data We Collect"
              />
            </a>
          </ListItemButton>
        </ListItem>
        {/* 7 */}
        <ListItem disablePadding>
          <ListItemButton
            selected={visibleSection === "7" ? true : false}
            onClick={() => {
              setMobileOpen(false);
              scrollTo(ref7.current);
            }}
          >
            <a href="#7">
              <ListItemText
                primaryTypographyProps={{ fontWeight: 600 }}
                primary="How We Acquire Personal Data"
              />
            </a>
          </ListItemButton>
        </ListItem>
        {/* 8 */}
        <ListItem disablePadding>
          <ListItemButton
            selected={visibleSection === "8" ? true : false}
            onClick={() => {
              setMobileOpen(false);
              scrollTo(ref8.current);
            }}
          >
            <a href="#8">
              <ListItemText
                primaryTypographyProps={{ fontWeight: 600 }}
                primary="Tracking Technologies"
              />
            </a>
          </ListItemButton>
        </ListItem>
        {/* 9 */}
        <ListItem disablePadding>
          <ListItemButton
            selected={visibleSection === "9" ? true : false}
            onClick={() => {
              setMobileOpen(false);
              scrollTo(ref9.current);
            }}
          >
            <a href="#9">
              <ListItemText
                primaryTypographyProps={{ fontWeight: 600 }}
                primary="Why Do We Collect Personal Data"
              />
            </a>
          </ListItemButton>
        </ListItem>
        {/* 10 */}
        <ListItem disablePadding>
          <ListItemButton
            selected={visibleSection === "10" ? true : false}
            onClick={() => {
              setMobileOpen(false);
              scrollTo(ref10.current);
            }}
          >
            <a href="#10">
              <ListItemText
                primaryTypographyProps={{ fontWeight: 600 }}
                primary="Sharing Your Personal Data"
              />
            </a>
          </ListItemButton>
        </ListItem>
        {/* 11 */}
        <ListItem disablePadding>
          <ListItemButton
            selected={visibleSection === "11" ? true : false}
            onClick={() => {
              setMobileOpen(false);
              scrollTo(ref11.current);
            }}
          >
            <a href="#11">
              <ListItemText
                primaryTypographyProps={{ fontWeight: 600 }}
                primary="Protecting Your Personal Data"
              />
            </a>
          </ListItemButton>
        </ListItem>
        {/* 12 */}
        <ListItem disablePadding>
          <ListItemButton
            selected={visibleSection === "12" ? true : false}
            onClick={() => {
              setMobileOpen(false);
              scrollTo(ref12.current);
            }}
          >
            <a href="#12">
              <ListItemText
                primaryTypographyProps={{ fontWeight: 600 }}
                primary="Updates To This Statement"
              />
            </a>
          </ListItemButton>
        </ListItem>
        {/* 13 */}
        <ListItem disablePadding>
          <ListItemButton
            selected={visibleSection === "13" ? true : false}
            onClick={() => {
              setMobileOpen(false);
              scrollTo(ref13.current);
            }}
          >
            <a href="#13">
              <ListItemText
                primaryTypographyProps={{ fontWeight: 600 }}
                primary="Contact Us"
              />
            </a>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      {/* Header */}
      <Head>
        <title>Privacy Policy</title>
      </Head>

      {/* Body */}
      {/* Box 1 -> Fills width of content */}
      <Box sx={{ display: "flex" }}>
        {/* Privacy Policy Header */}
        <AppBar
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar
            sx={{
              backgroundImage:
                "linear-gradient(to bottom right, #396fb0, #2e4c6d)",
            }}
          >
            {/* Button to open drawer on mobile */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            {/* End button to open drawer on mobile */}
            {/* Privacy policy heading */}
            <Typography sx={{ fontSize: 26, fontWeight: 600 }}>
              Privacy Policy
            </Typography>
            {/* End privacy policy heading */}
          </Toolbar>
        </AppBar>
        {/* End privacy Policy Header */}
        {/* Box 1.1 -> Contains drawer */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* Mobile drawer */}
          <Drawer
            PaperProps={{
              sx: {
                backgroundColor: "#f2f2f2",
              },
            }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          {/* End mobile drawer */}
          {/* Desktop drawer */}
          <Drawer
            ref={drawerRef}
            PaperProps={{
              sx: {
                backgroundColor: "#f2f2f2 ",
              },
            }}
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
          {/* End desktop drawer */}
        </Box>
        {/* End box 1.1 -> Contains drawer */}
        {/* Box 1.2 -> Contains main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          {/* This is used to offset the page content below the toolbar */}
          <Toolbar />
          {/* Privacy policy text */}

          <p>Effective March 2, 2022</p>
          <section
            id="1"
            ref={ref1}
            style={{ paddingTop: "54px", marginTop: "-54px" }}
          >
            <h2>
              <strong>Overview</strong>
            </h2>
            <p>
              This statement aims to clarify how and why Occomy collects,
              stores, uses and shares your data whenever you use any of our apps
              or services. This statement aims to help you better understand
              your privacy rights and the choices you have surrounding these
              rights.
            </p>
            <p>
              &ldquo;Personal data&rdquo; refers to any information about you.
              This includes your identity, finances and other online behavior.
            </p>
            <p>
              &ldquo;Occomy&rdquo; refers to Occomy (Pty) Ltd. This privacy
              statement applies to all Occomy services including but not limited
              to the following:
            </p>
            <ul>
              <li>Occomy mobile apps</li>
              <li>Occomy web interface</li>
              <li>Occomy plugins</li>
            </ul>
          </section>

          <section
            id="2"
            ref={ref2}
            style={{ paddingTop: "54px", marginTop: "-54px" }}
          >
            <h2>
              <strong>Your Privacy Rights</strong>
            </h2>
            <p>
              When your personal data is collected, stored, used or shared you
              have the right to:
            </p>
            <ul>
              <li>Request whether or not we hold personal data about you.</li>
              <li>
                Request a copy of your personal data as well as a list of third
                parties that would have had access to this data.
              </li>
              <li>
                Request that we delete the personal data we have collected on
                you.
              </li>
            </ul>
            <p>
              Please <strong>contact us</strong> if you would like to enquire
              about, or have your data deleted. You will not be treated
              differently to other clients for exercising your right to data
              privacy.
            </p>
            <p>
              If you would like to see or delete your data we will have to
              verify your identity. If we are not able to verify your identity
              we will not be able to assist you.
            </p>
            <p>If you would like to delete your personal data:</p>
            <ul>
              <li>
                You can delete certain information, such as profile pictures or
                certain contact details, using our mobile apps.
              </li>
              <li>
                You can also call or email us if you would like to delete other
                information or close your account.
              </li>
            </ul>
            <p>
              <strong>Please note,</strong>if you request that we delete certain
              information or that we close your account, we will still need to
              retain some personal data.
            </p>
            <p>We use this data to:</p>
            <ul>
              <li>
                Complete outstanding transactions, provide goods or services you
                requested or to remain compliant with terms set forth in the
                User Agreement or other contractual agreements you have with us.
              </li>
              <li>Detect and prevent illicit activity.</li>
              <li>Protect the legal rights you have.</li>
              <li>
                To manage internal business processes reasonably related to your
                expectations when using our services.
              </li>
              <li>To comply with local and international laws.</li>
            </ul>
            <p>
              Please note that your rights and choices regarding your personal
              information are affected by where you live, where you transact and
              which of our services you use. Certain privacy laws may not apply
              to data collected, stored, used or shared in certain geographies
              while using our services. Please familiarize yourself with your
              local data privacy laws.
            </p>
          </section>

          <section
            id="3"
            ref={ref3}
            style={{ paddingTop: "54px", marginTop: "-54px" }}
          >
            <h2>
              <strong>Your Choices</strong>
            </h2>
            <p>
              You have the right to decide how we collect and use your personal
              data as well as how we communicate with you.
            </p>
            <p>
              You have the ability to choose not to share personal data with us
              when our apps and services request permissions. Please understand
              that your data helps us to provide you with a reliable, secure and
              streamlined experience. Some features may not work in the absence
              of certain personal data.
            </p>
            <p>
              For example, if you choose to not share camera access with us you
              will not be able to transact using QR codes. Another example may
              be if you choose not to share your email address with us. In this
              case we will not be able to open an account for you.
            </p>
          </section>

          <section
            id="4"
            ref={ref4}
            style={{ paddingTop: "54px", marginTop: "-54px" }}
          >
            <h2>
              <strong>Data use by third parties</strong>
            </h2>
            <p>
              If you connect or associate your Occomy account to third party
              services you may still be able to control how your data is
              collected, stored, used and shared by them. Please familiarize
              yourself with the third party&rsquo;s privacy policy to understand
              how your data will be treated. If you do not wish to share your
              data with third parties, please disconnect your Occomy account
              from the relevant services.
            </p>
            <p>Examples of third party services may include:</p>
            <ul>
              <li>Our plugin for WooCommerce.</li>
            </ul>
          </section>

          <section
            id="5"
            ref={ref5}
            style={{ paddingTop: "54px", marginTop: "-54px" }}
          >
            <h2>
              <strong>How we communicate with you</strong>
            </h2>
            <p>
              Your choice of how we communicate with you is dependent on the
              purpose of the message and how it is delivered. Some messages are
              considered to be critical for you to be able to manage your
              account with us. We make use of email, text messages, phone calls
              and push notifications to communicate with you.
            </p>
            <p>
              You may opt out of marketing emails by unsubscribing, opt out of
              SMS communication by replying &ldquo;STOP&rdquo; and opt out of
              push notifications by disabling them on your phone. To stop
              receiving non-essential phone calls, please let us know and we
              will only phone you when critical information is involved.
            </p>
            <p>
              Please note that you cannot opt out of communications deemed
              necessary for the integrity of your account. This may include for
              example emails relating to changes in your account. You may
              however be able to decide how we communicate these messages to
              you.
            </p>
          </section>

          <section
            id="6"
            ref={ref6}
            style={{ paddingTop: "54px", marginTop: "-54px" }}
          >
            <h2>
              <strong>Personal Data We Collect</strong>
            </h2>
            <p>
              We may collect personal data when you use Occomy apps or services.
              Please note, we may still collect personal data even if you do not
              have an Occomy account or if you are not logged in. If you use
              Occomy apps and services without being logged in we will use this
              data to process transactions, prevent fraud and comply with the
              applicable laws. We may connect information we collect in this
              manner to your account if you have one or when you register for
              one.
            </p>
            <p>
              We may collect the following personal data when you register or
              use any Occomy apps or services:
            </p>
            <ul>
              <li>First and last names</li>
              <li>Addresses</li>
              <li>Phone numbers</li>
              <li>Email addresses</li>
              <li>IP addresses</li>
              <li>Device information</li>
              <li>
                Information collected from cookies and other tracking
                technologies
              </li>
              <li>Government issued identification</li>
              <li>Bank account and routing numbers</li>
              <li>General financial information</li>
              <li>Identifying personal information such as age or gender</li>
              <li>Online shopping information</li>
              <li>Purchase history</li>
              <li>Interactions with our services</li>
              <li>GPS information if you give us permission</li>
              <li>Call recording when you talk to our help lines</li>
              <li>Photos and profile pictures you provide</li>
              <li>Business information</li>
              <li>Tax IDs</li>
              <li>Fraud and risk assessment info</li>
              <li>Personal preferences</li>
            </ul>
          </section>

          <section
            id="7"
            ref={ref7}
            style={{ paddingTop: "54px", marginTop: "-54px" }}
          >
            <h2>
              <strong>How We Acquire Personal Data</strong>
            </h2>
            <p>
              We may acquire personal information from a variety of sources
              including but not limited to:
            </p>
            <ul>
              <li>When you use any of our apps or services.</li>
              <li>Merchants you interact with.</li>
              <li>Financial institutions, such as your bank.</li>
              <li>
                Service providers who help us manage business processes or
                market our services.
              </li>
            </ul>
            <p>
              When you have an Occomy account we may associate information from
              various sources in order to provide you with a streamlined
              experience and for compliance and analytical purposes.
            </p>
            <p>
              We will never intentionally keep or collect information from
              individuals who are not legally allowed to make use of our
              services. If you suspect information has been collected in such a
              manner ,please contact us and we will delete it if we are able to.
            </p>
          </section>

          <section
            id="8"
            ref={ref8}
            style={{ paddingTop: "54px", marginTop: "-54px" }}
          >
            <h2>
              <strong>Tracking Technologies</strong>
            </h2>
            <p>
              We may use tracking technologies like cookies or other similar
              tracking technologies to collect personal information when you
              make use of our apps or services. This information may be used to
              provide a secure user experience, to enhance your experience with
              our apps and services, to prevent fraud and to measure the effects
              of our advertising campaigns.
            </p>
            <p>
              You can always decline the use of cookies when prompted by your
              browser. Please note that declining cookies may hinder your
              overall experience when using some of our apps and services.
            </p>
            <p>
              Most browsers now offer DNT (Do Not Track) functionality. This
              enables you to opt out of being tracked by advertisers and certain
              third parties. Some of our services are reliant on tracking data
              and as a result we do not respond to DNT requests.
            </p>
          </section>

          <section
            id="9"
            ref={ref9}
            style={{ paddingTop: "54px", marginTop: "-54px" }}
          >
            <h2>
              <strong>Why Do We Collect Personal Data</strong>
            </h2>
            <p>
              We use your personal data to enhance your experience with our apps
              and services and for the general functioning of our business.
            </p>
            <p>Reasons we collect your personal data may include:</p>
            <ul>
              <li>
                For the general functioning of our apps and services. We need
                some of your personal info to be able to provide services like
                transacting, to allow you to see and edit your account
                information and to keep your account up to date.
              </li>
              <li>
                To enhance the experience we deliver. We perform user research
                to improve the performance of our apps and services in order to
                deliver a better overall experience to you.
              </li>
              <li>
                To protect both you and our business from illicit activities.
              </li>
              <li>
                To send you marketing information pertaining to our products and
                services.
              </li>
              <li>
                To provide a personalized experience when you use any of our
                apps and services. We use personal information to tailor the
                experience you have on our platform.
              </li>
              <li>
                If you choose to allow us to access your location we use your
                personal information to provide you with enhanced security and
                additional features.
              </li>
              <li>
                If you choose to allow us to access your contacts we use your
                personal info to allow you to connect with and transact with
                individuals in your contacts list.
              </li>
              <li>
                We use your personal information when you contact us. This
                allows us to better answer your questions and concerns.
              </li>
              <li>
                We use your personal information to comply with local and
                international laws and to provide you and our other customers
                with a safe and secure experience.
              </li>
              <li>
                We use your personal information when storing your user
                preferences on our apps or services. An example may include
                whether you choose to use secure login functionality.
              </li>
            </ul>
          </section>

          <section
            id="10"
            ref={ref10}
            style={{ paddingTop: "54px", marginTop: "-54px" }}
          >
            <h2>
              <strong>Sharing Your Personal Data</strong>
            </h2>
            <p>
              <strong>WE DO NOT SELL YOUR PERSONAL DATA.</strong>We may share
              your personal data internally between Occomy apps and services. We
              may furthermore share your personal data with third parties in
              order to help us provide services to you, to protect all parties
              involved from illicit activity, to market our products and to
              remain legally compliant with local and international regulations.
              The information we collect is highlighted in the &lsquo;Personal
              Data We Collect&rsquo; section of the statement.
            </p>
            <p>We may share personal data with:</p>
            <ul>
              <li>
                Other apps and services falling under the Occomy platform.
              </li>
              <li>
                Third party service providers such as payment processors,
                marketing agencies, research agencies, compliance agencies,
                auditors, corporate governance departments, communications
                agencies and agencies providing security features.
              </li>
              <li>Card networks and payment processors.</li>
              <li>Financial institutions we partner with.</li>
              <li>Credit reporting and collection agencies.</li>
              <li>
                Governmental and legal institutions who by means of a subpoena
                require Occomy or any of its affiliated services to respond.
              </li>
              <li>Individuals or businesses involved in transactions.</li>
              <li>
                If you connect any of the Occomy apps or services to third
                parties, personal information may be shared with these parties.
                To stop sharing personal information please disconnect from
                these services.
              </li>
              <li>
                Third party technologies aimed at combating spam and abuse. For
                example, we use reCAPTCHA to verify whether we are working with
                people or computers. When using services like these your
                personal data is subject to the privacy policies implemented by
                these service providers.
              </li>
              <li>
                Parties requiring your data to remain legally compliant with
                local and international regulations.
              </li>
              <li>
                Parties investigating or enforcing breaches to our end user
                license agreement.
              </li>
              <li>
                Parties facilitating a partial or complete sale of our business.
              </li>
              <li>
                Parties facilitating merger and acquisition activities
                pertaining to our business.
              </li>
              <li>
                Third parties requiring certain information in order to remain
                compliant with their respective rules.
              </li>
              <li>
                We may share personal information in order to prevent physical
                harm or other illicit activities.
              </li>
            </ul>
          </section>

          <section
            id="11"
            ref={ref11}
            style={{ paddingTop: "54px", marginTop: "-54px" }}
          >
            <h2>
              <strong>Protecting Your Personal Data</strong>
            </h2>
            <p>
              We strive to protect your personal data to the best of our
              ability. This includes protection against loss, misuse,
              unauthorized access, disclosure and alteration.
            </p>
            <p>
              We protect your data in various ways including but not limited to
              the use of:
            </p>
            <ul>
              <li>Firewalls</li>
              <li>Data encryption</li>
            </ul>
            <p>
              Please note that we store data using cloud servers provided by
              Google, we do not make use of our own data centers. While we do
              our utmost to ensure data security and integrity on these servers
              we cannot accept responsibility for occurrences on Google&rsquo;s
              end. To better understand how Google protects your data please
              refer to their respective policies.
            </p>
            <p>
              Please note that you are responsible for the protection of your
              passwords and account information. You are also responsible for
              ensuring that all of your personal data is accurate and up to
              date.
            </p>
            <p>
              Should you request the closure of your account we may retain your
              personal data as required by law and according to our data
              retention policy. We will continue to handle this data as outlined
              in this statement.
            </p>
          </section>

          <section
            id="12"
            ref={ref12}
            style={{ paddingTop: "54px", marginTop: "-54px" }}
          >
            <h2>
              <strong>Updates To This Statement</strong>
            </h2>
            <p>
              Please note that our products and services are constantly evolving
              and as a result we will amend this statement from time to time. If
              this agreement is amended we will collect, store, use and protect
              your personal information as outlined in the amended statement.
            </p>
            <p>
              New versions of this statement will be uploaded to the privacy
              statement section of our website 21 days (1 month) prior to
              becoming effective. We may notify you of this via email or other
              means of communication.
            </p>
          </section>

          <section
            id="13"
            ref={ref13}
            style={{ paddingTop: "54px", marginTop: "-54px" }}
          >
            <h2>
              <strong>Contact Us</strong>
            </h2>

            <p>
              If you have any questions relating to this statement or the
              management of your personal data please do not hesitate to contact
              us.
            </p>

            <p>
              Please visit our website:{" "}
              <a style={{ color: "Blue" }} href="https://occomy.com/">
                https://occomy.com
              </a>
            </p>

            <p>
              Or get in touch via email:{" "}
              <a
                style={{ color: "Blue" }}
                href="mailto:support@occomy.com?subject=Support Request"
              >
                support@occomy.com
              </a>
            </p>
          </section>
          {/* End privacy policy text */}
        </Box>
        {/* End box 1.2 -> Contains main content */}
      </Box>

      {/* End box 1 -> Fills width of content */}
    </>
  );
}
