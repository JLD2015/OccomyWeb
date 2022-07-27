import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, MenuItem, useMediaQuery } from "@mui/material";
import { useAuth } from "../../store/AuthContext";
import Image from "next/image";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function Navigation(props) {
  // <========== Variables ==========>
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const drawerWidth = 240;
  const router = useRouter();
  const activeRoute = (routeName, currentRoute) => {
    return routeName === currentRoute ? true : false;
  };
  const isMedium = useMediaQuery(theme.breakpoints.up("md"));

  const routes = [
    {
      id: 1,
      label: "Dashboard",
      path: "/dashboard",
      icon: DashboardIcon,
    },
    {
      id: 2,
      label: "Settings",
      path: "/settings",
      icon: SettingsIcon,
    },
  ];
  const { Logout } = useAuth();

  // <========== Functions ==========>
  const toggleDrawer = () => {
    if (open === true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleSignout = () => {
    Logout();
    router.replace("/");
  };

  // <========== Page Loads ==========>
  // If the user has a md or above screen the side bar should be open by default
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  useEffect(() => {
    if (matches) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [matches]);

  // <========== Components ==========>
  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    mt: 8,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const Main = styled("main", {
    shouldForwardProp: (prop) => prop !== "open",
  })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    // These properties all get applies when the navbar is closed
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));

  // <========== Body ==========>
  return (
    <Box sx={{ display: "flex" }}>
      {/* Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#f5f5f5",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box sx={{ flexGrow: 1 }} />
          <Image src="/images/logo.png" height={45} width={45} alt="Logo" />
          {open === true && (
            <>
              <Typography sx={{ fontSize: "24px", fontWeight: 800 }}>
                Occomy
              </Typography>
              {isMedium ? (
                // We return this at medium or above
                <div></div>
              ) : (
                // We return this at small
                <>
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon sx={{ fontSize: "30px" }} />
                  </IconButton>
                </>
              )}
            </>
          )}
          <Box sx={{ flexGrow: 1 }}></Box>
        </DrawerHeader>
        <Divider />
        <List>
          {routes.map((item, index) => (
            <Link
              href={item.path}
              style={{ textDecoration: "none", color: "black" }}
              key={index}
            >
              <MenuItem
                onClick={toggleDrawer}
                selected={activeRoute(item.path, router.pathname)}
              >
                <ListItem button key={index}>
                  <ListItemIcon>
                    {" "}
                    <item.icon />{" "}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              </MenuItem>
            </Link>
          ))}
        </List>
      </Drawer>
      {/* End drawer */}

      {/* Appbar */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton onClick={toggleDrawer} sx={{ ml: -2 }}>
            {open === true ? (
              <ChevronLeftIcon
                sx={{
                  fontSize: "30px",
                  color: "white",
                  [theme.breakpoints.up("md")]: {
                    display: "flex",
                  },
                  [theme.breakpoints.down("md")]: {
                    display: "none",
                  },
                }}
              />
            ) : (
              <MenuIcon sx={{ fontSize: "30px", color: "white" }} />
            )}
          </IconButton>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button onClick={handleSignout}>
            <Typography sx={{ color: "white" }}>Logout</Typography>
          </Button>
        </Toolbar>
      </AppBar>

      {/* End appbar */}

      {/* Main content */}
      {isMedium ? (
        // We return this at medium or above
        <Main
          onClick={function () {
            setOpen(false);
          }}
          open={open}
        >
          {props.mainPage}
        </Main>
      ) : (
        // We return this at small
        <Box
          onClick={function () {
            setOpen(false);
          }}
          sx={{ flexGrow: "1", marginLeft: `-${drawerWidth}px` }}
        >
          {props.mainPage}
        </Box>
      )}

      {/* End main content */}
    </Box>
  );
}
