import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import Slide from "@mui/material/Slide";
import { CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../../features/dialogsSlice";
import {
  editCollection,
  resetCollectionsLoading,
} from "../../features/collectionsSlice";
import { changeAlert } from "../../features/alertSlice";
import { translate } from "../../main";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditCollection = () => {
  const dispatch = useDispatch();
  const dialogs = useSelector((state) => state.dialogs);
  const loading = useSelector((state) => state.collections.editLoading);
  const collectionInfo = useSelector(
    (state) => state.collections.collectionInfo
  );
  const [collectionName, setCollectionName] = useState(collectionInfo.name);
  const [validationStatus, setValidationStatus] = useState("success");

  const handleChange = useCallback((e) => {
    setCollectionName(e.target.value);
    setValidationStatus(e.target.value.length >= 3 ? "success" : "error");
  }, []);

  const handleEditCollection = useCallback(() => {
    if (validationStatus !== "success") return;
    dispatch(
      editCollection({ collectionId: collectionInfo.id, collectionName })
    );
  }, [collectionInfo.id, collectionName, dispatch, validationStatus]);

  useEffect(() => {
    if (loading === "fulfilled") {
      dispatch(openDialog("no dialogs"));
      setCollectionName("");
      setValidationStatus("success");
      dispatch(resetCollectionsLoading());
      dispatch(
        changeAlert({ show: true, value: "collection edited successfully" })
      );
    }
  }, [dispatch, loading]);

  const textField = useMemo(() => {
    return (
      <TextField
        helperText={
          <Typography
            variant="caption"
            color={validationStatus}
            textTransform={"uppercase"}
            fontWeight={"bold"}
          >
            {translate("at least 3 characters")}
          </Typography>
        }
        label={translate("collection name")}
        value={collectionName}
        onChange={handleChange}
        required
        margin="dense"
        type="text"
        fullWidth
        variant="filled"
        color="secondary"
        slotProps={{
          input: {
            endAdornment: <EditIcon />,
          },
        }}
      />
    );
  }, [collectionName, handleChange, validationStatus]);

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
            <Button onClick={handleEditCollection} color="secondary">
              {translate("edit")}
            </Button>
          </>
        )}
      </DialogActions>
    );
  }, [dispatch, handleEditCollection, loading]);

  const element = useMemo(() => {
    return (
      <Dialog
        open={dialogs === "editCollection"}
        slots={{
          transition: Transition,
        }}
        keepMounted
      >
        <DialogTitle sx={{ textTransform: "uppercase", textAlign: "center" }}>
          {translate("edit collection")}
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText
            sx={{ textAlign: "center", textTransform: "capitalize" }}
          >
            {translate(
              "here you can edit the collection, write the new name of the collection, click edit to save changes, cancel to close the dialog."
            )}
          </DialogContentText>
          {textField}
        </DialogContent>
        {actionsAndLoading}
      </Dialog>
    );
  }, [actionsAndLoading, dialogs, textField]);

  return element;
};
export default EditCollection;
