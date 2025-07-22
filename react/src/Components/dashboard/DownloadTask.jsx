import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { forwardRef, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../../features/dialogsSlice";
import { translate } from "../../main";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DownloadTask = () => {
  const dispatch = useDispatch();
  const dialogs = useSelector((state) => state.dialogs);
  const taskInfo = useSelector((state) => state.tasks.taskInfo);

  const handleDownloadTask = useCallback(() => {
    const fileName = `${taskInfo.title.replace(/\s/g, "_")}_task.txt`;
    const fileContent = `${taskInfo.title}\n${taskInfo.description}\n${
      taskInfo.is_completed ? "completed" : "not completed"
    }\n${taskInfo.created_at}`;

    const blob = new Blob([fileContent], {
      type: "text/plain;charset=utf-8",
    });
    const href = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
    dispatch(openDialog("no dialogs"));
  }, [
    dispatch,
    taskInfo.created_at,
    taskInfo.description,
    taskInfo.is_completed,
    taskInfo.title,
  ]);

  const element = useMemo(() => {
    return (
      <Dialog
        open={dialogs === "downloadTask"}
        slots={{
          transition: Transition,
        }}
        keepMounted
      >
        <DialogTitle sx={{ textTransform: "uppercase", textAlign: "center" }}>
          {translate("download task")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ textTransform: "capitalize", textAlign: "center" }}
          >
            {translate(
              "are you sure you want to download this task? if yes, click download, if no, click cancel to close the dialog."
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => dispatch(openDialog("no dialogs"))}
            color="secondary"
          >
            {translate("cancel")}
          </Button>
          <Button onClick={handleDownloadTask} color="secondary">
            {translate("download")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }, [dialogs, dispatch, handleDownloadTask]);

  return element;
};
export default DownloadTask;
