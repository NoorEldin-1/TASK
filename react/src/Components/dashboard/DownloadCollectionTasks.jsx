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

const DownloadCollectionTasks = () => {
  const dispatch = useDispatch();
  const dialogs = useSelector((state) => state.dialogs);
  const collectionInfo = useSelector(
    (state) => state.collections.collectionInfo
  );
  const tasks = useSelector((state) => state.tasks.tasks);

  const handleDownloadCollectionTasks = useCallback(() => {
    const fileName = `${collectionInfo.name.replace(
      /\s/g,
      "_"
    )}_collection.txt`;
    const fileContent = tasks.map((task) => {
      return `${task.title}\n${task.description}\n${
        task.is_completed ? "completed" : "not completed"
      }\n${task.created_at}\n\n`;
    });

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
  }, [collectionInfo.name, dispatch, tasks]);

  const element = useMemo(() => {
    return (
      <Dialog
        open={dialogs === "downloadAllTasks"}
        slots={{
          transition: Transition,
        }}
        keepMounted
      >
        <DialogTitle sx={{ textTransform: "uppercase", textAlign: "center" }}>
          {translate("download collection tasks")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ textTransform: "capitalize", textAlign: "center" }}
          >
            {translate(
              "are you sure you want to download all collection tasks? if yes, click download, if no, click cancel to close the dialog."
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
          <Button onClick={handleDownloadCollectionTasks} color="secondary">
            {translate("download")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }, [dialogs, dispatch, handleDownloadCollectionTasks]);

  return element;
};
export default DownloadCollectionTasks;
