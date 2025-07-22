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
  createCollection,
  resetCollectionsLoading,
} from "../../features/collectionsSlice";
import { changeAlert } from "../../features/alertSlice";
import { translate } from "../../main";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateCollection = () => {
  const dispatch = useDispatch();
  const dialogs = useSelector((state) => state.dialogs);
  const loading = useSelector((state) => state.collections.createLoading);
  const [collectionName, setCollectionName] = useState("");
  const [validationStatus, setValidationStatus] = useState("secondary");

  const handleChange = useCallback((e) => {
    setCollectionName(e.target.value);
    if (e.target.value.length >= 3) {
      setValidationStatus("success");
    } else {
      setValidationStatus("error");
    }
  }, []);

  const handleCreateCollection = useCallback(() => {
    if (validationStatus !== "success") return;
    dispatch(createCollection(collectionName));
  }, [collectionName, dispatch, validationStatus]);

  useEffect(() => {
    if (loading === "fulfilled") {
      setCollectionName("");
      setValidationStatus("secondary");
      dispatch(openDialog("no dialogs"));
      dispatch(resetCollectionsLoading());
      dispatch(
        changeAlert({ show: true, value: "collection created successfully" })
      );
    }
  }, [dispatch, loading]);

  const textField = useMemo(() => {
    return (
      <TextField
        value={collectionName}
        onChange={handleChange}
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
        required
        margin="dense"
        label={translate("collection name")}
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
            <Button onClick={handleCreateCollection} color="secondary">
              {translate("create")}
            </Button>
          </>
        )}
      </DialogActions>
    );
  }, [loading, handleCreateCollection, dispatch]);

  const element = useMemo(() => {
    return (
      <Dialog
        open={dialogs === "createCollection"}
        slots={{
          transition: Transition,
        }}
        keepMounted
      >
        <DialogTitle sx={{ textTransform: "uppercase", textAlign: "center" }}>
          {translate("create collection")}
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText
            sx={{ textAlign: "center", textTransform: "capitalize" }}
          >
            {translate(
              "here you can create a new collection, write the name of the collection, click create to save changes, cancel to close the dialog."
            )}
          </DialogContentText>
          {textField}
          {actionsAndLoading}
        </DialogContent>
      </Dialog>
    );
  }, [dialogs, textField, actionsAndLoading]);

  return element;
};
export default CreateCollection;
