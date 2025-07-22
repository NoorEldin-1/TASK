import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { forwardRef, useCallback, useEffect, useMemo } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../../features/dialogsSlice";
import {
  changeCollectionInfo,
  deleteCollection,
  resetCollectionsLoading,
} from "../../features/collectionsSlice";
import { changeAlert } from "../../features/alertSlice";
import { translate } from "../../main";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteCollection = () => {
  const dispatch = useDispatch();
  const dialogs = useSelector((state) => state.dialogs);
  const loading = useSelector((state) => state.collections.deleteLoading);
  const collectionInfo = useSelector(
    (state) => state.collections.collectionInfo
  );

  const handleDeleteCollection = useCallback(() => {
    dispatch(deleteCollection(collectionInfo.id));
  }, [collectionInfo.id, dispatch]);

  useEffect(() => {
    if (loading === "fulfilled") {
      dispatch(openDialog("no dialogs"));
      dispatch(resetCollectionsLoading());
      dispatch(changeCollectionInfo({}));
      dispatch(
        changeAlert({ show: true, value: "collection deleted successfully" })
      );
    }
  }, [dispatch, loading]);

  const actionsAndLoading = useMemo(() => {
    return (
      <DialogActions>
        {loading === "pending" ? (
          <CircularProgress size={20} color="secondary" />
        ) : (
          <>
            <Button
              onClick={() => dispatch(openDialog("no dialogs"))}
              color="secondary"
            >
              {translate("cancel")}
            </Button>
            <Button onClick={handleDeleteCollection} color="secondary">
              {translate("delete")}
            </Button>
          </>
        )}
      </DialogActions>
    );
  }, [dispatch, handleDeleteCollection, loading]);

  const element = useMemo(() => {
    return (
      <Dialog
        open={dialogs === "deleteCollection"}
        slots={{
          transition: Transition,
        }}
        keepMounted
      >
        <DialogTitle sx={{ textTransform: "uppercase", textAlign: "center" }}>
          {translate("delete collection")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ textTransform: "capitalize", textAlign: "center" }}
          >
            {translate(
              "are you sure you want to delete this collection? if yes, click delete, if no, click cancel to close the dialog."
            )}
          </DialogContentText>
        </DialogContent>
        {actionsAndLoading}
      </Dialog>
    );
  }, [actionsAndLoading, dialogs]);

  return element;
};
export default DeleteCollection;
