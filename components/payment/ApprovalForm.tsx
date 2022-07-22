import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import {
  Avatar,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { useEffect, useState } from "react";
import ApprovalDeclinedLarge from "./ApprovalDeclinedLarge";
import { useRouter } from "next/router";
import ApprovalAcceptedLarge from "./ApprovalAcceptedLarge";
import ApprovalDeclinedSmall from "./ApprovalDeclinedSmall";
import ApprovalAcceptedSmall from "./ApprovalAcceptedSmall";
import ApprovalErrorSmall from "./ApprovalErrorSmall";
import ApprovalErrorLocationSmall from "./ApprovalErrorLocationSmall";
import ApprovalErrorLocationLarge from "./ApprovalErrorLocationLarge";
import ApprovalErrorLarge from "./ApprovalErrorLarge";

export default function ApprovalForm() {
  // <========== Variables ==========>
  const theme = useTheme();

  // Used for changing screen based on transaction status
  const [transactionDeclined, setTransactionDeclined] = useState(false);
  const [transactionApproved, setTransactionApproved] = useState(false);
  const [transactionError, setTransactionError] = useState(false);
  const [progressIndicatorApprove, setProgressIndicatorApprove] =
    useState(false);
  const [progressIndicatorDecline, setProgressIndicatorDecline] =
    useState(false);
  const [approvalErrorLocation, setApprovalErrorLocation] = useState(false);
  const router = useRouter();

  // Used for accessing local variables
  const [merchantProfilePhotoURL, setMerchantProfilePhotoURL] = useState("");
  const [merchantName, setMerchantName] = useState("");
  const [amount, setAmount] = useState("");
  const [userName, setUserName] = useState("");
  const [orderid, setOrderid] = useState("");
  const [callback, setCallback] = useState("");
  const [documentID, setDocumentID] = useState("");

  // <========== Functions ==========>
  const declineClicked = async () => {
    // First we start the progress spinner
    setProgressIndicatorDecline(true);

    // First we call the API to decline the transaction

    const data = {
      transactionid: localStorage.getItem("documentID"),
    };
    const JSONdata = JSON.stringify(data);

    // Make API call
    const endpoint = "/api/transact/declinetransaction";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    if (result.status === "Success") {
      setTransactionDeclined(true);

      // Stop the progeress indicator
      setProgressIndicatorDecline(false);

      //Redirect back to the merchant's website
      setTimeout(function () {
        const redirectString = `${callback}?orderid=${orderid}&status=declined&reference=${documentID}`;
        router.replace(redirectString);

        // Clear the local storage
        localStorage.clear();
      }, 5000);
    } else {
      console.log(result);
      setTransactionError(true);

      // Stop the progeress indicator
      setProgressIndicatorDecline(false);

      // Redirect back to the merchant's website
      setTimeout(function () {
        const redirectString = `${callback}?orderid=${orderid}&status=declined&reference=${documentID}`;
        router.replace(redirectString);
        // Clear the local storage
        localStorage.clear();
      }, 5000);
    }
  };

  const approveClicked = async () => {
    // First we start the progress indicator
    setProgressIndicatorApprove(true);

    // First we need to get the user's location
    if (window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          const { latitude, longitude } = position.coords;

          // First we call the API to approve the transaction
          const data = {
            transactionid: localStorage.getItem("documentID"),
            latitude: latitude,
            longitude: longitude,
          };
          const JSONdata = JSON.stringify(data);

          // Make API call
          const endpoint = "/api/transact/approvetransaction";
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("accessToken"),
            },
            body: JSONdata,
          };

          const response = await fetch(endpoint, options);
          const result = await response.json();

          if (result.status === "Success") {
            setTransactionApproved(true);

            // Stop the progeress indicator
            setProgressIndicatorApprove(false);

            //Redirect back to the merchant's website
            setTimeout(function () {
              const redirectString = `${callback}?orderid=${orderid}&status=approved&reference=${documentID}`;
              router.replace(redirectString);
              // Clear the local storage
              localStorage.clear();
            }, 5000);
          } else {
            console.log(result);
            setTransactionError(true);

            // Stop the progeress indicator
            setProgressIndicatorApprove(false);

            // Redirect back to the merchant's website
            setTimeout(function () {
              const redirectString = `${callback}?orderid=${orderid}&status=declined&reference=${documentID}`;
              router.replace(redirectString);
              // Clear the local storage
              localStorage.clear();
            }, 5000);
          }
        },
        async function () {
          console.log("Location permission blocked");

          setApprovalErrorLocation(true);

          // Stop the progeress indicator
          setProgressIndicatorApprove(false);

          // Redirect back to the merchant's website
          setTimeout(function () {
            const redirectString = `${callback}?orderid=${orderid}&status=declined&reference=${documentID}`;
            router.replace(redirectString);
            // Clear the local storage
            localStorage.clear();
          }, 5000);
        }
      );
    } else {
      console.log("Could not get user's location");

      setTransactionError(true);

      // Stop the progeress indicator
      setProgressIndicatorApprove(false);

      // Redirect back to the merchant's website
      setTimeout(function () {
        const redirectString = `${callback}?orderid=${orderid}&status=declined&reference=${documentID}`;
        router.replace(redirectString);
        // Clear the local storage
        localStorage.clear();
      }, 5000);
    }
  };

  // <========== Page Loads ==========>

  // Get values from local storage
  useEffect(() => {
    setAmount(Number(localStorage.getItem("amount")).toFixed(2));
    setMerchantName(localStorage.getItem("merchantName"));
    setMerchantProfilePhotoURL(localStorage.getItem("merchantProfilePhotoURL"));
    setUserName(localStorage.getItem("userName"));
    setOrderid(localStorage.getItem("orderid"));
    setCallback(localStorage.getItem("callback"));
    setDocumentID(localStorage.getItem("documentID"));
  }, []);

  // <========== Body ==========>
  return (
    <>
      <Container>
        {/* Column 1 -> Forms outside of card */}
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            backgroundColor: "white",
            borderRadius: "25px",
            p: 2,
            boxShadow: 2,
          }}
        >
          {/* Row 1.1 -> Top row containing heading */}
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Stack>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Box sx={{ display: { xs: "block", md: "none" } }}>
                  <Image
                    src="/images/logo.png"
                    height={60}
                    width={60}
                    alt="Logo"
                  />
                </Box>
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <Image
                    src="/images/logo.png"
                    height={70}
                    width={70}
                    alt="Logo"
                  />
                </Box>

                <Typography
                  sx={{
                    [theme.breakpoints.up("md")]: {
                      fontSize: 45,
                    },
                    [theme.breakpoints.down("md")]: {
                      fontSize: 32,
                    },
                    fontWeight: 600,
                  }}
                >
                  Occomy
                </Typography>
              </Stack>
            </Stack>
            <Typography
              sx={{
                [theme.breakpoints.up("md")]: {
                  fontSize: 26,
                },
                [theme.breakpoints.down("md")]: {
                  fontSize: 20,
                },
              }}
            >
              {`Hi, ${userName}`}
            </Typography>
            <Typography
              sx={{
                [theme.breakpoints.up("md")]: {
                  fontSize: 20,
                },
                [theme.breakpoints.down("md")]: {
                  fontSize: 16,
                },
                textAlign: "center",
              }}
            >
              Would you like to approve the following transaction?
            </Typography>
          </Grid>
          {/* End row 1.1 -> Top row containing heading */}
          {/* Column 1.2 -> Bottom column containing content */}
          <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="stretch"
          >
            {/* Row 1.2.1 -> Contains avatars */}
            <Grid
              container
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-around"
              alignItems="center"
              sx={{
                borderRadius: "25px",
                p: 2,
                boxShadow: 3,
                my: 3,
              }}
            >
              {/* The small section of the screen starts here */}
              {transactionDeclined === false &&
                transactionApproved === false &&
                transactionError === false &&
                approvalErrorLocation === false && (
                  <>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        textAlign: "center",
                        display: { xs: "block", md: "none" },
                      }}
                    >
                      <Typography sx={{ fontSize: 30, fontWeight: 600 }}>
                        {`R${amount}`}
                      </Typography>

                      <Box width={"100%"} sx={{ py: 1 }}>
                        <Divider textAlign="center">
                          <Chip label="TO" />
                        </Divider>
                      </Box>

                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        width={"100%"}
                      >
                        <Avatar
                          src={merchantProfilePhotoURL}
                          sx={{
                            [theme.breakpoints.up("md")]: {
                              width: 260,
                              height: 260,
                            },
                            [theme.breakpoints.down("md")]: {
                              width: 120,
                              height: 120,
                            },
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: 26,
                            fontWeight: 600,
                            textAlign: "center",
                          }}
                        >
                          {merchantName}
                        </Typography>
                      </Stack>
                    </Grid>
                  </>
                )}

              {transactionDeclined === true && transactionApproved === false && (
                <>
                  <ApprovalDeclinedSmall />
                </>
              )}

              {transactionDeclined === false && transactionApproved === true && (
                <>
                  <ApprovalAcceptedSmall />
                </>
              )}

              {transactionError === true && (
                <>
                  <ApprovalErrorSmall />
                </>
              )}

              {approvalErrorLocation && (
                <>
                  <ApprovalErrorLocationSmall />
                </>
              )}
              {/* The small section of the screen ends here */}

              {/* The large section of the screen starts here */}
              {transactionDeclined === false &&
                transactionApproved === false &&
                approvalErrorLocation === false &&
                transactionError === false && (
                  <>
                    <Box
                      sx={{
                        width: "100%",
                        display: { xs: "none", md: "flex" },
                      }}
                    >
                      <Grid
                        item
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        md={5.5}
                      >
                        <Typography sx={{ fontSize: 40, fontWeight: 600 }}>
                          Pay
                        </Typography>
                        <Typography sx={{ fontSize: 60, fontWeight: 600 }}>
                          {`R${amount}`}
                        </Typography>
                      </Grid>

                      <Grid
                        item
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        md={1}
                      >
                        <Divider orientation="vertical" textAlign="center">
                          <Chip label="TO" />
                        </Divider>
                      </Grid>

                      <Grid
                        item
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        md={5.5}
                      >
                        <Avatar
                          src={merchantProfilePhotoURL}
                          sx={{
                            width: 250,
                            height: 250,
                          }}
                        />
                        <Typography
                          sx={{ fontSize: 26, fontWeight: 600, py: 2 }}
                        >
                          {merchantName}
                        </Typography>
                      </Grid>
                    </Box>
                  </>
                )}

              {transactionDeclined === true && transactionApproved === false && (
                <>
                  <ApprovalDeclinedLarge />
                </>
              )}

              {transactionDeclined === false && transactionApproved === true && (
                <>
                  <ApprovalAcceptedLarge />
                </>
              )}

              {approvalErrorLocation && (
                <>
                  <ApprovalErrorLocationLarge />
                </>
              )}

              {transactionError && (
                <>
                  <ApprovalErrorLarge />
                </>
              )}
              {/* The large section of the screen ends here */}
            </Grid>

            {/* End row 1.2.1 -> Contains avatars */}

            {/* Row 1.2.2 -> Contains buttons  */}
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* Decline button */}
              <Grid
                item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                md={6}
                xs={12}
                sx={{
                  [theme.breakpoints.up("md")]: {
                    px: 10,
                  },
                  [theme.breakpoints.down("md")]: {
                    pb: 2,
                  },
                }}
              >
                <Button
                  onClick={declineClicked}
                  fullWidth
                  variant="contained"
                  color="error"
                  startIcon={
                    !progressIndicatorDecline && (
                      <>
                        <ClearIcon
                          sx={{
                            [theme.breakpoints.down("md")]: {
                              transform: "scale(1.2)",
                            },
                            [theme.breakpoints.up("md")]: {
                              transform: "scale(1.6)",
                            },
                          }}
                        />
                      </>
                    )
                  }
                  sx={{
                    py: 2,

                    borderRadius: 100,
                  }}
                >
                  {!progressIndicatorDecline && (
                    <>
                      <Typography
                        sx={{
                          [theme.breakpoints.up("md")]: {
                            fontSize: 24,
                          },
                          [theme.breakpoints.down("md")]: {
                            fontSize: 18,
                          },
                          fontWeight: 600,
                        }}
                      >
                        Decline
                      </Typography>
                    </>
                  )}

                  {progressIndicatorDecline && (
                    <CircularProgress size={30} sx={{ color: "white" }} />
                  )}
                </Button>
              </Grid>

              {/* Approve button */}
              <Grid
                item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                md={6}
                xs={12}
                sx={{
                  [theme.breakpoints.up("md")]: {
                    px: 10,
                  },
                }}
              >
                <Button
                  onClick={approveClicked}
                  fullWidth
                  variant="contained"
                  color="success"
                  startIcon={
                    !progressIndicatorApprove && (
                      <>
                        <CheckIcon
                          sx={{
                            [theme.breakpoints.down("md")]: {
                              transform: "scale(1.2)",
                            },
                            [theme.breakpoints.up("md")]: {
                              transform: "scale(1.6)",
                            },
                          }}
                        />
                      </>
                    )
                  }
                  sx={{
                    py: 2,
                    borderRadius: 100,
                  }}
                >
                  {!progressIndicatorApprove && (
                    <>
                      <Typography
                        sx={{
                          [theme.breakpoints.up("md")]: {
                            fontSize: 24,
                          },
                          [theme.breakpoints.down("md")]: {
                            fontSize: 18,
                          },
                          fontWeight: 600,
                        }}
                      >
                        Approve
                      </Typography>
                    </>
                  )}

                  {progressIndicatorApprove && (
                    <CircularProgress size={30} sx={{ color: "white" }} />
                  )}
                </Button>
              </Grid>
            </Grid>

            {/* End row 1.2.2 -> Contains buttons  */}
          </Grid>
          {/* End column 1.2 -> Bottom column containing content */}
        </Grid>
        {/* End column 1 -> Forms outside of card */}
      </Container>
    </>
  );
}
