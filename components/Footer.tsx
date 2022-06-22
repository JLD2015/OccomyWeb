import { Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { Box } from "@mui/system";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* Grid 1 Column -> Outside container for the footer */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: "#f8f8f8" }}
      >
        {/* Logo */}
        <Box sx={{ marginTop: 2 }}>
          <Image src="/images/logo.png" height={60} width={60} alt="Logo" />
        </Box>

        {/* End logo */}
        {/* Links to other pages */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "100vw",
            paddingTop: 1,
            paddingBottom: 1,
            paddingLeft: 3,
            paddingRight: 3,
          }}
          spacing={{ md: 4 }}
        >
          <Link href="/PrivacyPolicy">
            <a>
              <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 500,
                  marginBottom: 1,
                  color: "#3576cb",
                }}
              >
                Privacy Policy
              </Typography>
            </a>
          </Link>
          <Link href="/TermsAndConditions">
            <a>
              <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 500,
                  marginBottom: 1,
                  color: "#3576cb",
                }}
              >
                Terms and Conditions
              </Typography>
            </a>
          </Link>
          <Link href="/contact">
            <a>
              <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 500,
                  marginBottom: 1,
                  color: "#3576cb",
                }}
              >
                Contact
              </Typography>
            </a>
          </Link>
        </Stack>
        {/* End links to other pages */}
        {/* Copyright */}
        <Typography sx={{ textAlign: "center", paddingBottom: 4 }}>
          Copyright © {new Date().getFullYear()}{" "}
          <strong>Occomy (Pty) Ltd.</strong> All Rights Reserved
        </Typography>
        {/* End copyright */}
      </Grid>
      {/* Grid 1 Row -> Outside container for the footer */}
    </>
  );
}
