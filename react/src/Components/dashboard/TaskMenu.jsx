import { CircularProgress, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../../features/dialogsSlice";
import { useCallback, useEffect, useMemo } from "react";
import { completeTask, resetTasksLoading } from "../../features/tasksSlice";
import { translate } from "../../main";

const TaskMenu = ({ anchorEl, setAnchorEl }) => {
  const dispatch = useDispatch();
  const collectionInfo = useSelector(
    (state) => state.collections.collectionInfo
  );
  const loading = useSelector((state) => state.tasks.completeLoading);
  const taskInfo = useSelector((state) => state.tasks.taskInfo);

  const handleCompleteTask = useCallback(() => {
    dispatch(
      completeTask({
        collectionId: collectionInfo.id,
        taskId: taskInfo.id,
      })
    );
  }, [collectionInfo.id, dispatch, taskInfo.id]);

  useEffect(() => {
    if (loading === "fulfilled") {
      setAnchorEl(null);
      dispatch(resetTasksLoading());
    }
  }, [dispatch, loading, setAnchorEl]);

  const element = useMemo(() => {
    return (
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
            sx: {
              minWidth: "150px",
            },
          },
        }}
        sx={{ textTransform: "capitalize" }}
      >
        <MenuItem onClick={() => dispatch(openDialog("showTask"))}>
          {translate("show")}
        </MenuItem>
        {loading === "pending" ? (
          <CircularProgress
            size={20}
            color="secondary"
            sx={{ mx: "auto", display: "block" }}
          />
        ) : (
          <MenuItem onClick={handleCompleteTask}>
            {taskInfo.is_completed
              ? translate("un complete")
              : translate("complete")}
          </MenuItem>
        )}

        <MenuItem onClick={() => dispatch(openDialog("editTask"))}>
          {translate("edit")}
        </MenuItem>
        <MenuItem onClick={() => dispatch(openDialog("deleteTask"))}>
          {translate("delete")}
        </MenuItem>
        <MenuItem onClick={() => dispatch(openDialog("downloadTask"))}>
          {translate("download.txt")}
        </MenuItem>
      </Menu>
    );
  }, [
    anchorEl,
    dispatch,
    handleCompleteTask,
    loading,
    setAnchorEl,
    taskInfo.is_completed,
  ]);

  return element;
};
export default TaskMenu;
