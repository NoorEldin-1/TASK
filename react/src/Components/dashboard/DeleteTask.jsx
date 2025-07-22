import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { forwardRef, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../../features/dialogsSlice";
import { deleteTask, resetTasksLoading } from "../../features/tasksSlice";
import { changeAlert } from "../../features/alertSlice";
import { translate } from "../../main";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteTask = ({ setAnchorEl }) => {
  const dispatch = useDispatch();
  const dialogs = useSelector((state) => state.dialogs);
  const collectionInfo = useSelector(
    (state) => state.collections.collectionInfo
  );
  const taskInfo = useSelector((state) => state.tasks.taskInfo);
  const loading = useSelector((state) => state.tasks.deleteLoading);

  const handleDeleteTask = useCallback(() => {
    dispatch(
      deleteTask({
        collectionId: collectionInfo.id,
        taskId: taskInfo.id,
      })
    );
  }, [collectionInfo.id, dispatch, taskInfo.id]);

  useEffect(() => {
    if (loading === "fulfilled") {
      dispatch(openDialog("no dialogs"));
      dispatch(resetTasksLoading());
      setAnchorEl(null);
      dispatch(changeAlert({ show: true, value: "task deleted successfully" }));
    }
  }, [dispatch, loading, setAnchorEl]);

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
            <Button onClick={handleDeleteTask} color="secondary">
              {translate("delete")}
            </Button>
          </>
        )}
      </DialogActions>
    );
  }, [dispatch, handleDeleteTask, loading]);

  const element = useMemo(() => {
    return (
      <Dialog
        open={dialogs === "deleteTask"}
        slots={{
          transition: Transition,
        }}
        keepMounted
      >
        <DialogTitle sx={{ textTransform: "uppercase", textAlign: "center" }}>
          {translate("delete task")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ textTransform: "capitalize", textAlign: "center" }}
          >
            {translate(
              "are you sure you want to delete this task? if yes, click delete, if no, click cancel to close the dialog."
            )}
          </DialogContentText>
        </DialogContent>
        {actionsAndLoading}
      </Dialog>
    );
  }, [actionsAndLoading, dialogs]);

  return element;
};
export default DeleteTask;
