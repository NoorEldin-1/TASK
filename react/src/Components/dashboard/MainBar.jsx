import React, { useMemo } from "react";
import { AppBar, IconButton, Toolbar, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { openDialog } from "../../features/dialogsSlice";
import { useDispatch } from "react-redux";
import { translate } from "../../main";

const MainBar = ({ open, handleDrawerOpen }) => {
  const dispatch = useDispatch();
  const element = useMemo(() => {
    return (
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, display: open ? "none" : "flex" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography flexGrow={1} variant="h6" noWrap component="div">
            {window.localStorage.getItem("name")}
          </Typography>
          <Tooltip
            title={translate("logout")}
            followCursor
            slotProps={{
              tooltip: {
                sx: {
                  fontWeight: "bold",
                  textTransform: "uppercase",
                },
              },
            }}
          >
            <IconButton
              color="error"
              onClick={() => dispatch(openDialog("logout"))}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    );
  }, [dispatch, handleDrawerOpen, open]);
  return element;
};
export default MainBar;
