import * as React from "react";
import { useState,useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Groups3Icon from "@mui/icons-material/Groups3";
import PasswordIcon from "@mui/icons-material/Password";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import PaidIcon from '@mui/icons-material/Paid';
import { useNavigate } from "react-router-dom";
import Dashboards from "../components/Admin/Dashboards";
import Team from "../components/Admin/Team";
import Changepassword from "../components/Admin/Changepassword";
import Blogs from "../components/Admin/Blogs";
import Card from "../components/Admin/Card";
import Post from "../common/routes/post";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Admin() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activeView, setActiveView] = useState("dash");

  useEffect(() => {
    const checkAdmin = async () => {
      const token = Cookies.get("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const resp = await Post("/verif", { token });
        if (resp.status !== 200) {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

    checkAdmin();
  }, [navigate]);



  const Changeview = (v) => {
    setActiveView(v);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Logout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ backgroundColor: "#9C27B0" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Hey Admin 👋!
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => Changeview("dash")}>
              <ListItemIcon>
                <QueryStatsIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary={"Dashboards"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => Changeview("blogs")}>
              <ListItemIcon>
                <PostAddIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary={"Blogs"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => Changeview("team")}>
              <ListItemIcon>
                <Groups3Icon color="secondary" />
              </ListItemIcon>
              <ListItemText primary={"Team"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => Changeview("pass")}>
              <ListItemIcon>
                <PasswordIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary={"Password"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => Changeview("card")}>
              <ListItemIcon>
                <PaidIcon color="secondary"/>
              </ListItemIcon>
              <ListItemText primary={"Card Review"}  />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={Logout}>
              <ListItemIcon>
                <LogoutIcon color="secondary"/>
              </ListItemIcon>
              <ListItemText primary={"Disconnect"}  />
            </ListItemButton>
          </ListItem>
          
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {activeView === "dash" ? <Dashboards /> : <></>}
        {activeView === "blogs" ? <Blogs /> : <></>}
        {activeView === "team" ? <Team /> : <></>}
        {activeView === "pass" ? <Changepassword /> : <></>}
        {activeView === "card" ? <Card /> : <></>}
      </Main>
    </Box>
  );
}
