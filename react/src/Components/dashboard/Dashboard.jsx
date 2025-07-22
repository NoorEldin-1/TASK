import { useState, useCallback, useMemo, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Side from "./Side";
import MainBar from "./MainBar";
import MainWidget from "./MainWidget";
import TaskMenu from "./TaskMenu";
import WhatDialog from "./WhatDialog";
import { Alert, Fade } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeAlert } from "../../features/alertSlice";
import { translate } from "../../main";

export const drawerWidth = 240;
export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
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
}));
export const AppBar = styled(MuiAppBar, {
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
export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Dashboard() {
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleDrawerOpen = useCallback(() => setOpenDrawer(true), []);
  const handleDrawerClose = useCallback(() => setOpenDrawer(false), []);
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    if (alert.show) {
      setTimeout(() => {
        dispatch(changeAlert({ show: false, value: "" }));
      }, 3000);
    }
  }, [alert.show, dispatch]);

  const alertElement = useMemo(() => {
    if (alert.show) {
      return (
        <Fade in={alert.show} timeout={300}>
          <Alert
            variant="filled"
            severity="success"
            sx={{
              position: "fixed",
              bottom: "10px",
              left: "10px",
              zIndex: 10000,
              textTransform: "capitalize",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {translate(alert.value)}
          </Alert>
        </Fade>
      );
    }
  }, [alert.show, alert.value]);

  const element = useMemo(() => {
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <MainBar open={openDrawer} handleDrawerOpen={handleDrawerOpen} />
        <Side open={openDrawer} handleDrawerClose={handleDrawerClose} />
        <MainWidget open={openDrawer} setAnchorEl={setAnchorEl} />
        <TaskMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        <WhatDialog setAnchorEl={setAnchorEl} />
        {alertElement}
      </Box>
    );
  }, [alertElement, anchorEl, handleDrawerClose, handleDrawerOpen, openDrawer]);

  return element;
}
