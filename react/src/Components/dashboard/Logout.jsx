import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import axios from "axios";
import React, { useCallback, useState, forwardRef, useMemo } from "react";
import { backendUrl, translate } from "../../main";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../../features/dialogsSlice";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Logout = () => {
  const dispatch = useDispatch();
  const dialogs = useSelector((state) => state.dialogs);
  const [loading, setLoading] = useState(false);

  const handleLogout = useCallback(async () => {
    setLoading(true);
    try {
      await axios.delete(`${backendUrl}auth/google/logout`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("name");
      // Use full reload for guaranteed state reset, or just navigate for SPA
      window.location = "/";
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const element = useMemo(() => {
    return (
      <Dialog
        open={dialogs === "logout"}
        slots={{
          transition: Transition,
        }}
        keepMounted
      >
        <DialogTitle sx={{ textTransform: "uppercase", textAlign: "center" }}>
          {translate("logout")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ textTransform: "capitalize", textAlign: "center" }}
          >
            {translate(
              "are you sure you want to logout? if yes, click logout, if no, click cancel to close the dialog."
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <CircularProgress size={20} color="secondary" />
          ) : (
            <>
              <Button
                onClick={() => dispatch(openDialog("no dialogs"))}
                color="secondary"
              >
                {translate("cancel")}
              </Button>
              <Button onClick={handleLogout} color="secondary">
                {translate("logout")}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    );
  }, [dialogs, dispatch, handleLogout, loading]);

  return element;
};
export default Logout;
