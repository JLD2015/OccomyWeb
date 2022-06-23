// <========== Imports ==========>
import { motion } from "framer-motion";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import ShieldIcon from "@mui/icons-material/Shield";
import StorefrontIcon from "@mui/icons-material/Storefront";

import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

// <========== Info Section ==========>
export default function InfoSection() {
  return (
    <>
      {/* Grid 1 -> Contains information cards */}
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        sx={{ marginTop: 1 }}
      >
        {/* Grid 1.1 -> Contains first card */}
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          md={4}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card
              sx={{
                borderRadius: 10,
                textAlign: "center",
                margin: 3,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ height: "280px" }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: "#112d4e",
                      height: "120px",
                      width: "120px",
                      opacity: 0.8,
                    }}
                  >
                    <MoneyOffIcon style={{ fontSize: 70 }} />
                  </Avatar>
                  <Typography
                    sx={{
                      fontSize: 30,
                      fontWeight: 600,
                      paddingTop: "10px",
                      color: "#112d4e",
                    }}
                  >
                    No Fees
                  </Typography>
                  <Typography sx={{ fontSize: 18, paddingBottom: "20px" }}>
                    Occomy is free to use for everybody. You should be able to
                    use your money as you choose.
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        {/* End Grid 1.1 -> Contains first card */}
        {/* Grid 1.2 -> Contains second card */}
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          md={4}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card
              sx={{
                borderRadius: 10,
                textAlign: "center",
                margin: 3,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ height: "280px" }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: "#112d4e",
                      height: "120px",
                      width: "120px",
                      opacity: 0.8,
                    }}
                  >
                    <ShieldIcon style={{ fontSize: 70 }} />
                  </Avatar>
                  <Typography
                    sx={{
                      fontSize: 30,
                      fontWeight: 600,
                      paddingTop: "10px",
                      color: "#112d4e",
                    }}
                  >
                    Secure
                  </Typography>
                  <Typography sx={{ fontSize: 18, paddingBottom: "20px" }}>
                    All of your financial details remain hidden during
                    transactions. This keeps you safe and protects your privacy.
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        {/* End Grid 1.2 -> Contains second card */}
        {/* Grid 1.3 -> Contains third card */}
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          md={4}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card
              sx={{
                borderRadius: 10,
                textAlign: "center",
                margin: 3,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ height: "280px" }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: "#112d4e",
                      height: "120px",
                      width: "120px",
                      opacity: 0.8,
                    }}
                  >
                    <StorefrontIcon style={{ fontSize: 70 }} />
                  </Avatar>
                  <Typography
                    sx={{
                      fontSize: 30,
                      fontWeight: 600,
                      paddingTop: "10px",
                      color: "#112d4e",
                    }}
                  >
                    Merchants
                  </Typography>
                  <Typography sx={{ fontSize: 18 }}>
                    Receive payments online or in store free of charge. You also
                    don&apos;t need any special hardware.
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        {/* End Grid 1.3 -> Contains third card */}
      </Grid>
      {/* End Grid 1 -> Contains information cards */}
    </>
  );
}
