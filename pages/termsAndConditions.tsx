import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Collapse, Divider } from "@mui/material";
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

export default function TermsAndConditions() {
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

  // Used for controlling highlighting of sections

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
    const sectionRefs = [
      { section: "1", ref: ref1 },
      { section: "2", ref: ref2 },
      { section: "3", ref: ref3 },
      { section: "4", ref: ref4 },
      { section: "5", ref: ref5 },
      { section: "6", ref: ref6 },
      { section: "7", ref: ref7 },
      { section: "8", ref: ref8 },
    ];

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
                primary="Your Account"
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
                primary="Sending Money & Buying"
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
                primary="Receiving Money & Selling"
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
                primary="Restricted Activities"
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
                primary="Unauthorized Transactions & Errors"
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
                primary="Additional Legal Terms"
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
                primary="Acceptable Use Policy"
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
                primary="Electronic Communications Policy"
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
        <title>Terms and Conditions</title>
      </Head>

      {/* Body */}
      {/* Box 1 -> Fills width of content */}
      <Box sx={{ display: "flex" }}>
        {/* Terms and Conditions Header */}
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
            {/* Terms and Conditions heading */}
            <Typography sx={{ fontSize: 26, fontWeight: 600 }}>
              Terms and Conditions
            </Typography>
            {/* End terms and conditions heading */}
          </Toolbar>
        </AppBar>
        {/* End terms and conditions Header */}
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
          {/* Terms and conditions text */}

          <p>Effective 21 June 2022</p>
          <section
            id="1"
            ref={ref1}
            style={{ paddingTop: "54px", marginTop: "-54px" }}
          >
            <h2>
              <strong>Your Account</strong>
            </h2>
            <p>Welcome aboard!</p>
            <p>
              This agreement constitutes a contract between you and Occomy (Pty)
              Ltd and governs your use of Occomy products and services. To use
              Occomy products and services you must be the age of majority in
              your respective geography.
            </p>
            <p>
              By opening an Occomy account you agree to comply with all of the
              terms and conditions set forth in this agreement.&nbsp;
            </p>
            <p>
              You furthermore agree to remain compliant with all legal terms
              which apply to you, the acceptable use policy as well as the
              electronic communications delivery policy found in this agreement.
            </p>
            <p>
              We encourage you to carefully read through this agreement and make
              sure that you fully understand all the details contained therein.
              Please do not hesitate to contact us should anything be unclear.
            </p>
            <p>
              It is your responsibility to familiarize yourself with changes and
              amendments of this agreement from time to time. All changes will
              be published on the website{" "}
              <strong>21 days prior to becoming effective</strong>. We will
              notify you of any changes which reduce your rights or increase
              your responsibilities.
            </p>
            <p>
              If you elect to continue using our products and services after a
              change in this or any other agreement entered into between
              yourself and Occomy (Pty) Ltd, you agree to be bound by those
              changes. If you disagree with any changes or amendments you may
              close your account with Occomy.
            </p>
            <h3>Opening An Account</h3>
            <p>
              An Occomy account can be opened using most of our available apps
              and services. This includes mobile devices as well as the Occomy
              website. All Occomy functionality is free with the exception of
              withdrawal fees.
            </p>
            <p>All Occomy accounts allow you to:</p>
            <ul>
              <li>Purchase and withdraw electronic money with Occomy.</li>
              <li>Make and receive payments in person.</li>
              <li>Make and receive payments using instant messaging.</li>
              <li>Make payments online with qualifying websites.</li>
            </ul>
            <p>
              Please note that you are responsible for keeping any information
              which may be used to access your Occomy account secure. You are
              also responsible for keeping any of your personal details up to
              date (for example your email address or bank account number).
            </p>
            <p>
              We reserve the right to query the nature of your business
              operations. This is to ensure compliance with the Acceptable Use
              Policy and to keep all of our users safe.
            </p>
            <h3>Closing Your Account</h3>
            <p>
              You may close your Occomy account at any time free of charge. You
              will however remain liable for any obligations you may have had
              with Occomy prior to closing your account. Please withdraw any
              balance which you may have on your Occomy account before closing
              your account. Any funds left on the account upon closure will be
              forfeit. Please note that we will need to verify your identity
              before closing an account. If we are unable to verify your
              identity then we will not be able to close the account.
            </p>
            <p>
              We reserve the right to not close your account under certain
              conditions, these include:
            </p>
            <ul>
              <li>If your account is under investigation</li>
              <li>You have any pending transactions</li>
              <li>You have a negative balance which must still be settled</li>
              <li>
                If your account is subject to a hold, limitation or reserve
              </li>
            </ul>
            <h3>Receiving, Holding or Transferring Funds</h3>
            <p>
              Please note that any funds held with Occomy represent an unsecured
              claim against Occomy and are not necessarily insured. To receive
              governmental fund insurance please transfer funds to a registered
              bank.
            </p>
            <p>
              <strong>Occomy is not a bank and does not take deposits</strong>.
              Occomy exchanges electronic tokenized funds on a one for one basis
              with traditional hard currency. You will not receive any interest
              on funds held with Occomy. Occomy collectively invests the funds
              of all users in liquid investments which are compliant with local
              regulation. Occomy owns the interest or other earnings generated
              by these investments. These pooled funds are held separately from
              Occomy&rsquo;s business accounts and funds will never be used to
              service business expenses. These funds will also not voluntarily
              be made available to creditors in the event of bankruptcy. Your
              funds may be used to process refunds or chargebacks against your
              account.
            </p>
            <h3>Restrictions On Transfers Or Withdrawals</h3>
            <p>
              To protect our users from loss, we may in some instances delay a
              withdrawal. We may do this to verify that you have authorized the
              withdrawal or to verify that you do not have any outstanding
              claims against your Occomy account. If we place a limitation on
              your account your payments may be subject to a hold or your
              account may be momentarily suspended. Transactions will resume
              once the hold has been lifted.
            </p>
            <p>
              We may set limits on withdrawals to verify your identity. Once
              your identity has been verified withdrawals may resume.
            </p>
            <h3>Statements</h3>
            <p>
              You have the right to request a statement showing your Occomy
              account activity. Please contact us should you wish to receive
              such a statement.
            </p>
          </section>

          <section
            id="2"
            ref={ref2}
            style={{ paddingTop: "54px", marginTop: "-54px" }}
          >
            <h2>Sending Money &amp; Buying</h2>
            <h3>Sending Money</h3>
            <p>
              You can transfer funds to other Occomy users by either transacting
              with them in person or by sending them funds using the instant
              messaging feature in the apps. This is often referred to as a
              peer-to-peer payment system.&nbsp;
            </p>
            <p>
              We may at our discretion limit the amount of funds you are able to
              send. We will inform you if such a limit comes into effect and how
              the limit may be lifted.
            </p>
            <p>
              Sending funds using in person transacting presents the customer
              with the option to accept or decline payments. If the transaction
              is accepted then the amount will be transferred from the clients
              balance to that of the merchant.&nbsp;
            </p>
            <p>
              Sending funds using the instant messaging feature in the iOS and
              Android apps is instantaneous and does not require approval.&nbsp;
            </p>
            <h3>Transferring Funds To An Individual Who Accepts Occomy</h3>
            <h4>How To Buy Something</h4>
            <p>
              You can pay for any goods or services sold by a merchant who
              supports Occomy by using the Occomy mobile apps. You can pay in
              the following ways:
            </p>
            <ul>
              <li>
                The merchant can request a payment which will generate a tag
                with a QR code. You can then scan this tag to complete
                payment.&nbsp;
              </li>
              <li>
                You may also elect to message the funds in question to the
                merchant. This requires having the merchant listed under your
                contacts.&nbsp;
              </li>
            </ul>
            <p>
              In order to manage risk, we may limit payment methods available in
              certain situations.&nbsp;
            </p>
            <h4>Payment Review</h4>
            <p>
              If a transaction is found to have been fraudulent or invalid for
              any other reason we reserve the right to reverse transactions. We
              will notify both parties involved in such a scenario.
            </p>
            <h4>Refunds</h4>
            <p>
              If you buy something from someone using Occomy and the transaction
              is ultimately reversed, the funds will be refunded to the original
              Occomy accounts involved in the transaction. Please note that
              Occomy reserves the right to review refunds on a case by case
              basis and the approval of a refund is not guaranteed.
            </p>
          </section>

          <section
            id="3"
            ref={ref3}
            style={{ paddingTop: "54px", marginTop: "-54px" }}
          >
            <h2>Receiving Money &amp; Selling</h2>
            <h3>Receiving Money</h3>
            <h4>Surcharges</h4>
            <p>
              You agree to not impose any surcharges or fees for accepting
              Occomy as a payment method. You may charge processing fees as
              usual but these fees may not exceed the fees charged for other
              payment methods.
            </p>
            <h4>Presentation of Occomy Products &amp; Services</h4>
            <p>
              Occomy payment methods must be displayed at least on par with any
              other payment methods you accept whether in person or online. This
              includes:
            </p>
            <ul>
              <li>Logo placement</li>
              <li>Placement on point of sale systems</li>
              <li>Treatment regarding payment flows</li>
              <li>Terms &amp; conditions</li>
              <li>Restrictions</li>
              <li>Fees</li>
            </ul>
            <p>
              No payment options may be displayed before displaying Occomy
              payment options (i.e. You may not only offer Occomy at final
              checkout if you display that you accept Visa or Mastercard in a
              website footer). This same treatment applies to point of sale
              systems.
            </p>
            <p>
              You may not mischaracterize Occomy products or services in any
              client interactions or public communications (marketing). At all
              points of sale you furthermore agree to not dissuade or hinder
              clients from using Occomy as a payment method in favor of another
              payment provider. If you accept Occomy as a payment option, you
              accept displaying Occomy payment marks on par or better than other
              payment providers and in a positive light.
            </p>
            <h4>Taxes &amp; Reporting</h4>
            <p>
              Our products do not include governmental taxes, levies, duties or
              any other cost of a juristic nature (e.g. VAT). It is your
              responsibility to determine what taxes are applicable to the
              payments you make or receive. You furthermore acknowledge that it
              is your responsibility to assess, collect, report and remit these
              taxes to the correct authority. Occomy does not assume any
              responsibility for determining whether taxes are applicable to
              transactions or for calculating, collecting, reporting or
              remitting any taxes which may arise due to your transacting
              behavior.
            </p>
            <p>
              You acknowledge that we may report certain information to tax
              authorities regarding some of the transactions we process. We may
              be legally obliged to disclose an individual&rsquo;s transaction
              history to certain governmental organizations.
            </p>
            <h4>Tax Identification</h4>
            <p>
              Occomy may request your taxpayer identification details in some
              circumstances. If you are not willing to disclose this information
              you acknowledge that certain Occomy functionality may become
              unavailable or that your account may be suspended.
            </p>
            <h4>
              T&amp;Cs, Refund Policy, Returns Policy &amp; Privacy Policy You
              Display To Your Customers
            </h4>
            <p>
              You may be required by law to display the following to your
              customers to be allowed to engage in commercial activities.
            </p>
            <ul>
              <li>
                Terms and conditions regarding interactions with your business
              </li>
              <li>A refunds policy</li>
              <li>A returns policy</li>
              <li>A privacy policy</li>
            </ul>
            <h4>Payment Review</h4>
            <p>
              Occomy reserves the rights to review certain high risk
              transactions on a case by case basis. Should a payment be under
              review, we will inform you and place the funds on hold until the
              transaction has been cleared. If the payment is not approved the
              transaction will be reversed.
            </p>
            <h4>In-Person Transactions</h4>
            <p>
              Please note that you are required to provide customers with a
              physical receipt for an in-person transaction should they request
              one. You agree that any transaction you initiate will have an
              accurate and true description of the goods and services being
              transacted.
            </p>
            <h4>Third-Party Marketplaces</h4>
            <p>
              If you are a seller on a platform where Occomy is available (e.g.,
              WooCommerce websites), you must comply with all rules set forth by
              that platform. Complying with these rules may require you to take
              certain actions and may impact how payments are processed.
            </p>
            <h3>Transaction Fees</h3>
            <p>
              Occomy transaction fees depend on the country in which you are
              transacting. Please note that we may adjust the fees you pay to
              use Occomy products and services subject to giving you appropriate
              notice.
            </p>
            <h4>Pay-outs</h4>
            <p>
              The pricing for withdrawing funds from your Occomy account may
              vary contingent on your geographical location and the currencies
              you hold. We will inform you of the applicable withdrawal fee when
              you process your withdrawal.
            </p>
            <h4>Your Responsibility Regarding Fees</h4>
            <p>
              You acknowledge that you have 60 days after an event leading to
              fee collection by Occomy to inform us of an error in such fees. If
              more than 60 days have passed we assume the relevant amounts to be
              correct and are not obligated to make corrections unless required
              by law.
            </p>
            <h4>Refunds &amp; Reversals</h4>
            <p>
              If you receive a payment for goods or services which is
              subsequently reversed or invalidated you are responsible for
              returning all funds and fees involved in the transaction. All
              reversals or refunds will be processed to your Occomy account.
              Occomy reserves the right to review refunds on a case by case
              basis and may at its discretion reserve any funds involved with
              such a transaction.
            </p>
            <h5>Invalidated &amp; Reversed Payments</h5>
            <p>Payments made to you may be invalidated and reversed if:</p>
            <ul>
              <li>
                You fail to respond to payment queries in a timely manner.
              </li>
              <li>
                You do not fulfill a transaction or if you cannot provide proof
                of shipment or delivery when requested.
              </li>
              <li>We find that a transaction may have been fraudulent.</li>
              <li>Occomy sends a payment to you in error.</li>
              <li>A payment was unauthorized.</li>
              <li>
                You received funds for activities which violate the Occomy Terms
                and Conditions.
              </li>
            </ul>
            <p>
              When you receive payments, you are liable for the full amount of
              the payment plus any applicable fees if the payment is later
              invalidated or reversed. If the balance on your Occomy account
              cannot cover the reversal or refund your balance may become
              negative. In this instance you are deemed to own Occomy money. We
              may pursue the following avenues in an attempt to collect:
            </p>
            <ul>
              <li>
                We may engage in collection efforts to collect any amount due
                from you.
              </li>
              <li>
                We may take legal action in an attempt to recover funds from
                you.
              </li>
              <li>
                We may suspend your Occomy account until payment has been made.
              </li>
            </ul>
            <h5>Dispute Fees</h5>
            <p>
              If a buyer and seller are unable to resolve a disputed payment in
              their own capacity and Occomy is required to mediate, a dispute
              fee may be applicable. This fee will be communicated with both the
              buyer and the seller prior to mediation. You acknowledge that this
              fee will be deducted from your Occomy balance and that you are
              responsible for ensuring that you have a sufficient balance on
              your account.&nbsp;
            </p>
            <p>You will not be charged dispute fees for:</p>
            <ul>
              <li>Disputes which are not escalated to a claim.</li>
              <li>
                Disputes resolved between you and the buyer in private capacity.
              </li>
              <li>Disputes filed by the buyer.</li>
              <li>
                Disputes which are deemed by Occomy in its sole discretion to
                not be subject to dispute fees.
              </li>
              <li>Deemed in your favor..</li>
            </ul>
          </section>

          <section
            id="4"
            ref={ref4}
            style={{ paddingTop: "54px", marginTop: "-54px" }}
          >
            <h2>Restricted Activities</h2>
            <p>
              During all activities related to the use of the Occomy website,
              your Occomy account, Occomy apps and services, interactions with
              other Occomy customers, third parties or any interactions with
              Occomy, you are require you <strong>not</strong> to:
            </p>
            <ul>
              <li>
                Breach the Terms and Conditions, the Acceptable Use Policy or
                any other legal agreement with Occomy
              </li>
              <li>
                Violate any laws, statutes, ordinances or regulations (e.g.
                Consumer protection act)
              </li>
              <li>
                Infringe on any copyright, patents, trademarks, trade secrets,
                intellectual property or any other rights of publicity or
                privacy
              </li>
              <li>Sell counterfeit goods</li>
              <li>
                Act in an inappropriate manner (e.g. defamatory or threatening
                behavior)
              </li>
              <li>Provide incorrect or falsified information</li>
              <li>Transact fraudulent funds</li>
              <li>
                Refuse cooperation to an investigation or refuse to provide
                confirmation of identity or any other information
              </li>
              <li>
                Attempt to extract double payment during a dispute by extracting
                funds from both Occomy and the seller or buyer
              </li>
              <li>
                Control an account which may be linked to another account which
                violates any of the points mentioned here
              </li>
              <li>Conduct business in a manner which may result in:</li>
              <ul>
                <li>Complaints</li>
                <li>Buyers invalidating payments made to you</li>
                <li>
                  Fees, fines, penalties or other liabilities which may accrue
                  to Occomy, Occomy customers or any other third party
                </li>
              </ul>
              <li>
                Use your Occomy in such a way which may lead others to believe
                that you are abusing the financial system
              </li>
              <li>Use your Occomy account to hold a negative balance</li>
              <li>Access Occomy services from an unsupported country</li>
              <li>
                Impose any disproportionately large load on any of our websites,
                products or services
              </li>
              <li>
                Attempt to use malicious software to target Occomy in any way
              </li>
              <li>
                Use any automated software to access or monitor our products or
                services without prior permission
              </li>
              <li>
                Attempt to interfere with the operation of our website, products
                and services or with our business undertakings in general
              </li>
              <li>
                Take any actions which may cause us to lose any of our services
                from our service providers
              </li>
              <li>
                Use the Occomy platform to test the financial behavior of others
              </li>
              <li>
                Attempt to circumvent any Occomy policy or determinations (e.g.
                Attempting to open another Occomy account while your account has
                been suspended)
              </li>
              <li>
                Harass or threaten any Occomy related party you may have contact
                with
              </li>
              <li>Misuse our dispute resolution process</li>
            </ul>
            <h3>Violating Restricted Activities</h3>
            <p>
              If we believe that you have been involved in any of these
              restricted activities we will take action to protect Occomy, its
              clients and others. We may take the following action:
            </p>
            <ul>
              <li>
                Terminating or suspending your Occomy account, along with this
                agreement without any penalty to us
              </li>
              <li>
                Preventing you from using any Occomy products or services in
                future
              </li>
              <li>
                Limiting the Occomy features you have access to (e.g. We may
                prevent you from being able to transact)
              </li>
              <li>
                Holding your balance for a period of up to 180 days to cover any
                liability we may face
              </li>
              <li>
                Charging you dispute fees at our discretion for any and all
                consequences of violating the restricted activities or the
                Acceptable Use Policy
              </li>
              <li>
                Contacting any parties you may have interacted with along with
                law enforcement to report your actions
              </li>
              <li>
                Updating your personal information which we believe to be
                incorrect
              </li>
              <li>Taking legal action against you</li>
              <li>
                We will also hold you legally and financially responsible for
                any breaches to the Acceptable Use Policy
              </li>
              <li>
                You acknowledge that as a seller the R50000 penalty applicable
                by the Acceptable Use Policy acts as a minimum and that we may
                levy additional fees to cover any legal action we may face as a
                result of your behavior. You also acknowledge that some damage
                you may cause, such as reputational damage, is difficult to
                assign a value to and that damages of such a nature may result
                in extraordinary legal fees and fines. We reserve the right to
                claim all such damages from you in such an instance.
              </li>
            </ul>
            <p>
              If we suspend your account for any of the above reasons, we will
              notify you of this. We will distribute any funds not subject to a
              hold to the bank account you have on file with us. If you do not
              have a bank account on file with us we will communicate with you
              to ascertain where the funds should be distributed to.
            </p>
            <p>
              You are deemed responsible for any reversals, chargeback, claims,
              fees, fines, penalties, and other liabilities incurred by Occomy,
              any Occomy customer or any third party which arise as a breach of
              this agreement.
            </p>
            <h4>Account Suspension Or Restriction of Functionality</h4>
            <p>
              Our decisions to suspend accounts or place restrictions on
              functionality are based on confidential internal criteria which we
              use to manage the risk exposure of Occomy, its clients and any
              third parties involved. We use proprietary technologies to monitor
              your account. Please note that we may be legally required to not
              disclose all of the details related to such risk monitoring to
              you. You agree that we are under no obligation to disclose the
              details of our risk management processes or our security
              procedures to you.
            </p>
            <p>
              In order to facilitate the above mentioned risk management
              processes we may require certain cooperation on your end from time
              to time. This may include providing financial statements or other
              documentation. You agree to provide Occomy with such documentation
              in a timely manner.
            </p>
            <p>
              When we suspend your account no Occomy functionality will be
              available to you until the suspension is lifted. We will lift the
              suspension at our discretion and communicate all of the necessary
              details to you.
            </p>
            <p>
              We may also elect to only restrict certain Occomy functionality
              (e.g. We may prevent you from being able to request or process
              payments). We will follow a similar process to that stipulated
              above to lift these restrictions.
            </p>
            <p>
              Suspension of your account or restriction of features may also be
              put in place for your own protection (e.g. if we suspect that
              someone may have gained access to your Occomy account).
            </p>
            <h4>Legal Processes</h4>
            <p>
              If we receive legal notice involving you or if we believe that we
              have to do so in order to remain legally compliant, we may be
              required to take certain actions. This may include suspending or
              limiting the functionality of your Occomy account among other
              actions. We reserve the right to decide at our sole discretion
              what action is required of us. Unless we are legally required to
              act otherwise, we will notify you of these actions. We do not have
              an obligation to contest or appeal any court or legal process
              involving you or your Occomy account. You acknowledge that if we
              suspend your account or limit functionality on legal grounds that
              this may last in excess of 180 days.
            </p>
          </section>

          <section
            id="5"
            ref={ref5}
            style={{ paddingTop: "54px", marginTop: "-54px" }}
          >
            <h2>Unauthorized Transactions &amp; Errors</h2>
            <h3>Unauthorized Transactions</h3>
            <p>
              To protect yourself from any unauthorized activity we suggest
              regularly logging into your Occomy account and reviewing your
              transaction history. We notify you of transactions using
              notifications on your mobile device. You are responsible for
              monitoring transactions and reporting any unusual behavior.
            </p>
            <p>
              We strive to protect you from illicit activity and will refund you
              any amount involved in an unauthorized transaction. Please note
              that this is contingent on your compliance while we investigate
              the irregularity.
            </p>
            <p>
              An unauthorized transaction is any transaction where money enters
              or exits your account without your authorization. For example,
              when funds leave your account without you explicitly approving a
              QR based payment or messaging these funds to another Occomy user.
            </p>
            <p>
              The following are <strong>NOT </strong>unauthorized transactions:
            </p>
            <ul>
              <li>
                When you give someone your Occomy login details and they exceed
                the authority you have given them. The security of your login
                details are your responsibility.
              </li>
              <li>
                Reversals of payments as a result of actions described in the
                restricted activities section.
              </li>
            </ul>
            <h4>Reporting Unauthorized Transactions</h4>
            <p>
              If you believe that your Occomy login details have been leaked or
              that any transactions have been processed without your
              authorisation please contact Occomy immediately.
            </p>
            <p>
              <strong>Email: </strong>support@occomy.com
            </p>
            <p>
              If you contact us within 60 days of unauthorized transactions and
              these transactions reflect in your transaction history then you
              are eligible for a 100% refund. If you inform us later than 60
              days after the commencement of unauthorized transactions then you
              may not get any of your money back. We will make exceptions for
              extraordinary conditions such as extended trips or hospitalization
              (please note that you will be required to prove this).
            </p>
            <h3>Errors</h3>
            <p>What qualifies as an &ldquo;error&rdquo;:</p>
            <ul>
              <li>When funds incorrectly enter or exit your Occomy account</li>
              <li>
                When you send a payment and an incorrect amount is deducted from
                your account
              </li>
              <li>
                When you receive a payment and an incorrect amount is added to
                your Occomy account
              </li>
              <li>When a transaction is missing from your Occomy account</li>
              <li>
                When a computational or mathematical error is made regarding
                your Occomy account
              </li>
            </ul>
            <p>What does not qualify as an &ldquo;error&rdquo;:</p>
            <ul>
              <li>
                When you have given someone the login details for your Occomy
                account. The security of your login details are your
                responsibility.
              </li>
              <li>
                When a payment is canceled or reversed for reasons mentioned in
                this agreement
              </li>
            </ul>
            <p>In case any errors occur please contact us.</p>
            <p>
              <strong>Email: </strong>support@occomy.com
            </p>
            <p>
              You acknowledge that we must hear from you within 60 days from the
              error. Please provide us with the following information:
            </p>
            <ul>
              <li>
                Your name and the deposit ID associated with your Occomy account
              </li>
              <li>
                Describe as clearly as possible what you believe the error to be
              </li>
              <li>Tell us the amount of the suspected error</li>
            </ul>
            <p>
              Please note that we require all error enquiries to be in writing.
              Once you have reported an error we will investigate and make any
              corrections if we deem them to be necessary. The timeframe for the
              investigation will vary by complexity but we will respond to your
              error enquiry as quickly as possible.
            </p>
          </section>

          <section
            id="6"
            ref={ref6}
            style={{ paddingTop: "54px", marginTop: "-54px" }}
          >
            <h2>Additional Legal Terms</h2>
            <h3>Communication</h3>
            <p>
              If you have provided us with your phone number you agree that
              Occomy may contact you using that number. We will never contact
              you using your number for marketing purposes. We may share your
              number with third parties in order to enforce the terms contained
              in this agreement but will not share your number otherwise. You
              may decide to not receive communication using your mobile number
              by simply not providing it in our products and services.
            </p>
            <p>
              Occomy may communicate with you regarding your use of Occomy
              products and services electronically as set forth in the
              Electronic Communications Policy. You will be considered to have
              received electronic communication 1 day after we have posted it on
              our website or we have emailed it to you.
            </p>
            <h3>Occomy&rsquo;s Rights</h3>
            <h4>Suspension and Termination Rights</h4>
            <p>
              Occomy reserves the right at its sole discretion to terminate this
              user agreement, access to any of our products or services for any
              reason at any time contingent on notifying you of such and
              distributing any remaining funds not contingent to restrictions to
              you.
            </p>
            <h4>Security</h4>
            <p>
              As security for your performance under the conditions set forth in
              this agreement you provide Occomy with a lien on and security
              interests in and to all funds held in your Occomy account.
            </p>
            <h4>Money Owed To Us</h4>
            <p>
              If your balance becomes negative for any reason that balance
              represents money which you owe to Occomy. Occomy reserves the
              right to collect these funds from deposits you make to your Occomy
              account or any payments you may receive. If you hold multiple
              Occomy accounts we may offset negative balances using the balance
              in your other Occomy accounts. If you continue using Occomy after
              you have a negative balance you implicitly allow us to recover
              that negative balance from your deposits and transactions.
            </p>
            <h4>Insolvency</h4>
            <p>
              If you become insolvent for any reason we will be entitled to
              recover all reasonable costs or expenses related to this
              agreement. This includes legal fees and expenses.
            </p>
            <h4>Assumption of Rights</h4>
            <p>
              If Occomy cancels or reverses a payment to a recipient, you agree
              that we assume your rights against the recipient, and any other
              parties related to the payment, and may pursue those rights on
              your behalf.
            </p>
            <h4>No Waiver</h4>
            <p>
              If we fail to act with respect to any terms or conditions
              contained within this agreement, this does not waive our right to
              act on subsequent or similar breaches.
            </p>
            <h3>Indemnification &amp; Limitation of Liability</h3>
            <p>
              In this section &ldquo;Occomy&rdquo; refers to Occomy (Pty) Ltd
              and our affiliates and each of their respective directors,
              officers, employees, agents, joint ventures, service providers and
              suppliers. Our affiliates include all entities we control, we are
              controlled by or we are under common control with.
            </p>
            <h4>Indemnification</h4>
            <p>
              You agree to indemnify Occomy for actions related to your Occomy
              account and your use of any and all Occomy products and services.
              You agree to defend, indemnify and hold Occomy harmless for any
              claim or demand (legal fees included) made or incurred by any
              third party due to or arising as a result of your breach of this
              agreement, your improper use of Occomy products or services, your
              violation of any law or right of the third party and the actions
              or inactions of any third party to whom you grant permission to
              use your Occomy account to use any of our products or services.
            </p>
            <h4>Limitation Of Liability</h4>
            <p>
              <strong>
                Occomy&rsquo;s liability is limited with respect to your Occomy
                account and your use of Occomy products and services.
              </strong>{" "}
              Occomy shall not be held responsible for any lost profit or
              special, incidental or consequential damages (including in
              totality damages for loss of data or loss of business) arising out
              of connection with our products and services or this agreement
              (including negligence), unless to the extent that it is prohibited
              by law.
            </p>
            <p>
              Our liability to you or any third parties is limited to the actual
              amount of direct damages. Additionally, to the extent permitted by
              law, Occomy is not liable and you agree to not hold Occomy
              responsible for any damages or losses (including the loss of
              money, goodwill, reputation, profits, any intangible losses or any
              special, indirect or consequential damages) resulting directly or
              indirectly from:
            </p>
            <ol>
              <li>
                Your use or inability to use any of our products and services
              </li>
              <li>Delays or disruptions in our products or services</li>
              <li>
                Viruses or malicious software obtained by using our products and
                services
              </li>
              <li>
                Glitches, bugs, errors or inaccuracies in any of our products
                and services
              </li>
              <li>The contents, actions or inactions of third parties</li>
              <li>
                Suspensions or limitations of functionality imposed on your
                Occomy account
              </li>
              <li>
                Your need to modify your practices, content, behavior or your
                loss or inability to do business as a result of changes to this
                agreement or Occomy&rsquo;s policies
              </li>
            </ol>
            <h3>Disclaimer of Warranty &amp; Release</h3>
            <h4>No Warranty</h4>
            <p>
              Occomy products and services are provided &lsquo;as-is&rsquo; and
              without any representation of warranty, whether express, implied
              or statutory. Occomy specifically disclaims any implied warranties
              of title, merchantability, fitness for a particular purpose and
              non-infringement.
            </p>
            <p>
              Occomy has no control over products and services offered by
              merchants who make use of Occomy products and services. As a
              result of this we cannot ensure that a party you are dealing with
              completes a transaction or has the authority to do so. Occomy does
              not guarantee continuous, uninterrupted or secure access to any
              part of its products or services. Our products and services may be
              interfered with by factors outside of our control. Reasonable
              efforts are taken to ensure timely processing of transactions but
              we make no representations or warranties regarding the amount of
              time needed to complete such processing.
            </p>
            <h4>Release of Occomy</h4>
            <p>
              Should a dispute with another Occomy account holder occur, you
              release Occomy from any and all claims, demands and damages
              (whether actual or consequential) of every kind of nature, known
              and unknown, arising in any shape or form from such disputes. By
              agreeing to enter into this release you expressly waive any
              protections (whether statutory or otherwise) that would limit the
              coverage of this release to include only those claims which you
              may know or suspect to exist in your favor at the time of agreeing
              to this release.
            </p>
            <h3>Arbitration Agreement</h3>
            <p>
              You and Occomy agree that any claim or dispute at law or equity
              which arises between us will be resolved in accordance with the
              Agreement to Arbitrate as follows. Please make sure you understand
              the following as it:
            </p>
            <ul>
              <li>
                Affects your rights and impacts how claims between us will be
                resolved
              </li>
              <li>
                Requires you to follow an opt-out procedure to opt-out of the
                agreement to arbitrate. This request must be emailed to us no
                later than 30 days after agreeing to the Terms and Conditions.
                If you opt out of the agreement to arbitrate we will terminate
                your account.
              </li>
            </ul>
            <p>
              In the unlikely event that a dispute does arise between us we
              strive to understand the situation as best as possible and provide
              an optimum solution. If we are unable to help you then we want to
              provide you with the quickest, lowest cost method of setting the
              dispute. To report a dispute please contact us via email.
            </p>
            <p>
              <strong>Email: </strong>support@occomy.com
            </p>
            <h4>Agreement To Arbitrate</h4>
            <h5>The Agreement</h5>
            <p>
              You and Occomy agree that all disputes or claims, including
              statutory claims, common law claims, and those based on contract,
              tort, fraud, misrepresentation or any other legal theory, shall be
              resolved exclusively through final and binding arbitration, rather
              than in court. This agreement is intended to be broadly
              interpreted.
            </p>
            <h5>
              Prohibition of Class and Representative Actions and
              Non-Individualized Relief
            </h5>
            <p>
              You and Occomy agree that each of us may bring claims against the
              other only on an individual basis. Claims may not be brought
              forward as a plaintiff or class member in any purported class or
              representative action or proceeding. Unless agreed otherwise by
              all parties involved, the arbitrator(s) may not consolidate or
              join more than one person&rsquo;s or party&rsquo;s claims.
              Furthermore, they may not otherwise preside over any form of a
              consolidated, representative or class proceeding.
            </p>
            <p>
              The arbitrator(s) may award relief only in favor of the individual
              party seeking relief and only to the extent necessary to provide
              relief necessitated by that party&rsquo;s individual claim(s). Any
              relief awarded cannot affect other Occomy customers.
            </p>
            <h5>Arbitration Procedures</h5>
            <p>
              The designated arbitrator(s) also must follow the terms of this
              user agreement as a court would. All areas of dispute are for the
              arbitrator(s) to decide on, except on issues relating to
              arbitrability, the scope or enforceability of this Agreement to
              Arbitrate, or the interpretation of the Prohibition of Class and
              Representative Actions and Non-Individualized Relief section
              above. Decisions relating to the above mentioned shall be for a
              court of competent jurisdiction to decide.
            </p>
            <p>
              The arbitration is to be conducted by an arbitration body agreed
              on by both Occomy and yourself. If agreement on an arbitration
              body cannot be reached the dispute will be elevated to a South
              African court.
            </p>
            <p>
              The party intending to arbitrate is required to send the other
              party a notice of dispute. Please send any notices of dispute to
              support@occomy.com. Occomy will contact you using the email
              address we have on file for you in the event a dispute arises. It
              is your responsibility to ensure your details are up to date. To
              be valid, the notice of dispute must contain the email address and
              phone number associated with your Occomy account, a description of
              the nature and basis of the claims you are asserting, and the
              specific relief sought.
            </p>
            <p>
              If you and Occomy are unable to resolve the claims described in
              the notice within 45 days after the notice is received by Occomy,
              you or Occomy may initiate arbitration proceedings.
            </p>
            <p>
              The arbitration shall be held in South Africa or at another
              mutually agreed location. You or Occomy may elect to have the
              arbitration conducted by telephone, video call or based solely on
              written submissions. In cases where an in-person hearing is held,
              you and/or Occomy may attend by telephone or video conference,
              unless the arbitrator(s) require otherwise. Any settlement offer
              made by you or Occomy shall not be disclosed to the arbitrator(s).
            </p>
            <p>
              The arbitrator(s) will decide the substance of all claims in
              accordance with applicable law, including recognized principles of
              equity, and will honor all claims of privilege recognized by law.
              The arbitrator(s) shall not be bound by rulings in prior
              arbitrations involving different Occomy customers, but are bound
              by rulings in prior arbitrations involving the same Occomy
              customer to the extent required by applicable law. The award of
              the arbitrator(s) shall be final and binding, and judgment on the
              award rendered by the arbitrator(s) may be entered in any court
              having jurisdiction thereof.
            </p>
            <h5>Cost of Administration</h5>
            <p>
              Payment of all filing, administration, and arbitrator fees will be
              governed by the arbitrator&rsquo;s rules, unless otherwise stated
              in this Agreement to Arbitrate.
            </p>
            <h5>Severability</h5>
            <p>
              With the exception of any of the provisions in the Prohibition of
              Class and Representative Actions and Non-Individualized Relief
              section above, if a court decides that any part of this Agreement
              to Arbitrate is invalid or unenforceable, the other parts of this
              Agreement to Arbitrate shall still apply. If a court decides that
              any of the provisions in the Prohibition of Class and
              Representative Actions and Non-Individualized Relief section above
              is invalid or unenforceable because it would prevent the exercise
              of a non-waivable right to pursue public injunctive relief, then
              any dispute regarding the entitlement to such relief (and only
              that relief) must be severed from arbitration and may be litigated
              in court. All other disputes subject to arbitration under the
              terms of the Agreement to Arbitrate shall be arbitrated under its
              terms.
            </p>
            <h5>Opt-Out Procedure</h5>
            <p>
              You may elect to opt out of this arbitration agreement at any
              time. Doing so will result in the deletion of your Occomy account.
              Any balance which you may have with Occomy will be distributed to
              the bank of your choice minus any applicable fees.
            </p>
            <h5>Future Amendments to this Agreement to Arbitrate</h5>
            <p>
              Any amendments to this agreement made in future shall not apply to
              any rulings made between you and Occomy on the grounds of this
              agreement prior to these changes. The changes shall apply to all
              rulings going forward. We will notify you of any changes to the
              agreement by uploading the updated Terms &amp; Conditions on the
              website 21 days prior to the changes becoming effective. We will
              also notify you by email of any changes which may materially
              affect your rights or our commitments to you. If you do not agree
              with the amendments you may close your Occomy account.
            </p>
            <h3>Intellectual Property</h3>
            <h4>Occomy Trademarks</h4>
            <p>
              &ldquo;Occomy and all logos related to Occomy products and
              services are trademarks or registered trademarks of Occomy (Pty)
              Ltd. You may not copy, imitate, modify or use them without
              Occomy&rsquo;s prior written consent. All page headers, custom
              graphics, button icons and scripts are service marks, trademarks
              and trade dress of Occomy. You may not copy, imitate, modify or
              use them without our prior written consent. You may use logos we
              provide with the intent to direct clients to Occomy products and
              services. You may not alter, modify or change these logos, use
              them in a manner which mischaracterizes Occomy or display them in
              a manner which suggests Occomy&rsquo;s sponsorship or endorsement.
              All right, title and interest in and to the Occomy website, any
              content thereon, Occomy products and services, the technology
              related to these products and services and any and all technology
              and content created or derived from any of the foregoing is
              exclusive property of Occomy.
            </p>
            <h4>License Grants</h4>
            <p>
              If you are using any Occomy software, then Occomy grants you a
              revocable, non-exclusive, non-sublicensable, non-transferrable,
              royalty-free limited license to use such software. This license
              grant applies to all software and updates, upgrades, new versions
              and replacement software. You may not rent. Lease or otherwise
              transfer your rights in the software to a third party. You must
              remain compliant with all documentation provided by such software.
              If you do not comply you will be liable for all damage suffered by
              you, Occomy or any other third party. Occomy may update or
              discontinue any software without prior notice. You agree not to
              modify, alter, tamper with, repair, copy, reproduce, adapt,
              distribute, display, publish, reverse engineer, translate,
              disassemble, decompile or otherwise attempt to create any source
              code that is derived from the software or any third-party
              materials or technology, or otherwise create any derivative works
              from any of the software or third-party materials or technology
              provided by Occomy. You acknowledge that all rights, title and
              interest to Occomy&rsquo;s software are owned by Occomy. You
              acknowledge that Occomy does not have any liability for any third
              party technology you elect to use on any of our products and
              services (e.g. the browser you elect to use).
            </p>
            <p>
              Occomy does not claim ownership of any content which you provide,
              upload, submit or provide to Occomy. When you provide content you
              provide a non-exclusive, irrevocable, royalty-free, transferable,
              and worldwide license to use your content and associated
              intellectual property and publicity rights to help us improve,
              operate and promote our current services and develop new ones.
              Occomy will not compensate you for the content you provide. You
              acknowledge that Occomy&rsquo;s use of your content will not
              infringe any intellectual property or publicity rights. You also
              acknowledge and warrant that you own or otherwise control the
              rights of the content you provide and that you agree to waive your
              moral rights and promise not to assert such rights against Occomy.
            </p>
            <p>
              If you are a seller using Occomy products and services you grant
              Occomy a worldwide, non-exclusive, transferable, sublicensable
              (through multiple tiers), and royalty-free, fully paid-up, right
              to use and display publicly, during the term of this user
              agreement, your trademark(s) (including but not limited to
              registered and unregistered trademarks, trade names, service
              marks, logos, domain names and other designations owned, licensed
              to or used by you) for the purpose of:
            </p>
            <ol>
              <li>Identifying you as a merchant who accepts Occomy payments</li>
              <li>Any other use to which you specify consent</li>
            </ol>
            <h3>Miscellaneous</h3>
            <h4>Assignment</h4>
            <p>
              You may not transfer or assign any rights or obligations contained
              in this agreement without Occomy&rsquo;s prior written consent.
              Occomy may transfer or assign any rights or obligations of this
              agreement at any time.
            </p>
            <h4>Dormant Accounts</h4>
            <p>
              If your Occomy account is dormant for more than two years, Occomy
              will close your account and pay out any balance you may have had
              on the account to the bank account we have on record for you. If
              we do not have a bank account on record for you then we will
              attempt to contact you to obtain banking details. If we are unable
              to reach you for a period of 45 days your balance will be forfeit.
            </p>
            <h4>Governing Law</h4>
            <p>
              You agree that, except to the extent that local laws or this user
              agreement stipulate otherwise, the laws of South Africa will
              govern this user agreement and any claim or dispute which may
              arise between you and Occomy.
            </p>
            <h4>Identity Authentication</h4>
            <p>
              You authorize Occomy to take steps necessary to verify your
              identity. This may include but is not limited to:
            </p>
            <ul>
              <li>
                Asking you for personal information which we may use to identify
                you (such as your date of birth or a tax number)
              </li>
              <li>
                Requiring you to prove ownership of an email address or
                financial documentation
              </li>
              <li>
                Obtaining financial reports about you from third party providers
              </li>
              <li>Requiring you to provide identifying documentation</li>
            </ul>
            <p>
              Occomy reserves the right to close, suspend, or limit access to
              Occomy products and services in the event we are unable to verify
              your identity.
            </p>
            <h4>OCCOMY IS A DIGITAL TRANSACTING PLATFORM</h4>
            <p>
              We are a digital transacting platform, NOT A BANK, and we do not:
            </p>
            <ul>
              <li>
                Act as a escrow agent with respect to funds in your account
              </li>
              <li>Act as an agent or trustee</li>
              <li>
                Enter into a partnership, joint venture, agency or employment
                contract with you
              </li>
              <li>Guarantee the actual identity of a buyer or seller</li>
              <li>
                Determine your legal compliance status (i.e. Your tax status)
              </li>
              <li>
                We do not collect or pay taxes which may arise from your use of
                this service unless we are explicitly required to do so by local
                jurisdiction.
              </li>
            </ul>
            <h4>Privacy</h4>
            <p>
              Please refer to our Privacy Policy available on the website to
              better understand our commitment to your privacy and protection.
            </p>
            <h4>Sellers &amp; Personal Data Protection Laws</h4>
            <p>
              Any data which you as a seller may collect from a customer using
              Occomy products and services is to be kept confidential. This data
              may only be used in connection with Occomy products and services.
              You are not permitted to use this data in any way and may be held
              liable for any unauthorized use of such data.
            </p>
            <p>
              You and Occomy act as separate data collectors and do not have
              liability over data in the same capacity. If you should use data
              in any way not explicitly permitted by this agreement, the legal
              responsibility and consequences of such usage falls to you.
            </p>
          </section>

          <section
            id="7"
            ref={ref7}
            style={{ paddingTop: "54px", marginTop: "-54px" }}
          >
            <h2>Acceptable Use Policy</h2>
            <p>
              You are independently responsible for the legality of your actions
              while using Occomy products and services. By extent, you are also
              responsible for remaining legally compliant in your local
              jurisdiction. You are also responsible for adhering to the
              guidelines set forth in this acceptable use policy. Violation of
              this policy constitutes violation of the Occomy user agreement and
              may subject you to damages. This includes liquidation damages of
              R50000 per violation which may be deducted directly from your
              Occomy account.
            </p>
            <h3>Restricted Activities</h3>
            <p>
              You may not use Occomy products or services for any activities
              which:
            </p>
            <ol>
              <li>Violate any law, statute, ordinance or regulation.</li>
              <li>Relate to transactions involving:</li>
              <ol>
                <li>
                  Narcotics (Includes and product posing a risk to consumer
                  safety)
                </li>
                <li>Drug paraphernalia</li>
                <li>Cigarettes</li>
                <li>
                  Products encouraging others to get involved in illegal
                  activities
                </li>
                <li>Stolen goods (physical or digital)</li>
                <li>
                  Items which promote hate, violence or any forms of intolerance
                  which is discriminatory
                </li>
                <li>The financial exploitation of a crime</li>
                <li>Obscene items</li>
                <li>
                  Items which infringe on copyrights, trademarks, rights of
                  publicity or privacy and any other property rights and laws
                </li>
                <li>Certain sexually orientated products and services</li>
                <li>
                  Unlawful ammunitions, firearms and firearm components and
                  accessories
                </li>
                <li>Weapons or knives regulated by local laws</li>
              </ol>
              <li>Relate to transactions which:</li>
              <ol>
                <li>
                  Show the personal information of third parties (subject to
                  local laws)
                </li>
                <li>
                  Support pyramid or Ponzi schemes, matrix programmes or any
                  other &lsquo;get rich quick&rsquo; schemes.
                </li>
                <li>
                  Are associated with annuity or lottery contracts, lay-away
                  systems, off-shore banking or transactions to finance or
                  refinance debts initiated by a credit card
                </li>
                <li>
                  Are for the sale of an item before the seller has taken
                  possession of the item
                </li>
                <li>
                  Are by payment processors to collect payments on behalf of
                  merchants
                </li>
                <li>
                  Are associated with the sale of traveler&rsquo;s checks or
                  money orders
                </li>
                <li>Involve currency exchanges or check cashing business</li>
                <li>
                  Involve certain credit repair, debt settlement, credit
                  transaction or insurance activities.
                </li>
                <li>
                  Involve offering or receiving payments for the purpose of
                  bribery and corruption
                </li>
              </ol>
              <li>
                Involve the sale of products or services which have been
                identified as fraudulent by government entities.
              </li>
              <li>
                Relate to transactions requiring pre-approval without having
                obtained such approval.
              </li>
            </ol>
            <h3>Activities With Require Approval</h3>
            <p>
              Please contact us if you are involved in any of the following
              activities so we may provide guidance:
            </p>
            <ul>
              <li>Charities/NPOs (Non-Profit Organizations)</li>
              <ul>
                <li>If you collect donations</li>
              </ul>
              <li>High value items</li>
              <ul>
                <li>If you trade in jewels, precious metals or stones</li>
              </ul>
            </ul>
            <h3>Violation Of The Acceptable Use Policy</h3>
            <p>
              Please report any violations of this policy to Occomy immediately.
              We strive to keep our products and services safe for all of our
              users and would appreciate your help.
            </p>
            <p>
              <strong>Get in touch: </strong>support@occomy.com
            </p>
          </section>

          <section
            id="8"
            ref={ref8}
            style={{ paddingTop: "54px", marginTop: "-54px" }}
          >
            <h2>Electronic Communications Policy</h2>
            <p>
              This policy aims to clarify how Occomy communicates with you
              electronically.
            </p>
            <h3>Delivery Of Communications</h3>
            <p>
              You agree and give your consent to receive communications,
              agreements, documents, notices and disclosures (collectively
              referred to as communications from here on) relating to Occomy
              products and services electronically. Communications may include:
            </p>
            <ul>
              <li>
                Agreements and policies as well as notices of updates to these
                policies
              </li>
              <li>
                Annual disclosures including but not limited to prospectuses and
                reports
              </li>
              <li>Receipts and confirmations relating to transactions</li>
              <li>Statements and history for your account</li>
              <li>
                Any legal documentation, such as tax filing, which we may have
                to make available to you
              </li>
              <li>Any other account, funds or transaction information</li>
            </ul>
            <p>
              We will communicate the above to you by posting them on the Occomy
              website or by emailing them to you. You may also receive certain
              communication by using our apps (in app notifications).
            </p>
            <h3>Hardware &amp; Software Requirements</h3>
            <p>In order to access the above communications you will need:</p>
            <ul>
              <li>A computing device with an internet connection</li>
              <li>A web browser</li>
              <li>A program capable of opening documents in pdf format</li>
              <li>A valid email address</li>
              <li>
                Sufficient storage space to access and store these
                communications
              </li>
            </ul>
            <p>
              We will notify you of any changes to these requirements. By
              accepting this agreement you acknowledge that you have access to
              the necessary hardware and software to receive, open, print or
              download copies of any communications. We suggest keeping copies
              of all communications as they may not be accessible online at a
              later date.
            </p>
            <h3>Withdrawing Consent</h3>
            <p>
              You have the right to withdraw your consent to receive electronic
              communications from us at any point. If you would like to do this
              please contact us by either using the &lsquo;contact us&rsquo;
              section on the website or by emailing us at support@occomy.com. If
              you do not provide your consent to receive electronic
              communications, or withdraw this consent at any point in time, we
              reserve the right to deny your application for an account,
              restrict your account, deactivate your account or close your
              account. We also reserve the right to charge fees if you need to
              communicate with you using paper copies.
            </p>
            <h3>Requesting Paper Copies Of Communications</h3>
            <p>
              We no longer support paper based communications as it poses a
              security risk. We will only communicate with you in this manner if
              absolutely necessary and reserve the right to deduct fees for such
              correspondence.
            </p>
            <h3>Updating Contact Information</h3>
            <p>
              It is your responsibility to keep all of your contact information
              up to date so Occomy may communicate with you electronically. You
              acknowledge and accept that if Occomy communicates with you
              electronically and you do not receive it due to contact
              information which is out of date, incorrect or inaccessible,
              Occomy will be deemed to have communicated with you.
            </p>
            <p>
              Please make sure that you add Occomy to your contacts in order to
              prevent spam filters from preventing you from receiving
              communications.
            </p>
            <p>
              You can update contact details at any time by using the profile
              section of either the iOS or Android apps. To update your email
              address please contact us directly. If we are unable to
              communicate with you using your primary email account we will deem
              your account to be inactive. This will result in suspension until
              such a time as we receive a valid email address.
            </p>
          </section>

          {/* End terms and conditions text */}
        </Box>
        {/* End box 1.2 -> Contains main content */}
      </Box>

      {/* End box 1 -> Fills width of content */}
    </>
  );
}
