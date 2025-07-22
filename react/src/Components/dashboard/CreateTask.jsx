import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../../features/dialogsSlice";
import { createTask, resetTasksLoading } from "../../features/tasksSlice";
import { changeAlert } from "../../features/alertSlice";
import { translate } from "../../main";
import EditIcon from "@mui/icons-material/Edit";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateTask = () => {
  const dispatch = useDispatch();
  const dialogs = useSelector((state) => state.dialogs);
  const collectionInfo = useSelector(
    (state) => state.collections.collectionInfo
  );
  const loading = useSelector((state) => state.tasks.createLoading);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskNameValidationStatus, setTaskNameValidationStatus] =
    useState("secondary");
  const [taskDescriptionValidationStatus, setTaskDescriptionValidationStatus] =
    useState("secondary");

  const handleChangeTaskName = useCallback((e) => {
    setTaskName(e.target.value);
    if (e.target.value.length >= 3) {
      setTaskNameValidationStatus("success");
    } else {
      setTaskNameValidationStatus("error");
    }
  }, []);

  const handleChangeTaskDescription = useCallback((e) => {
    setTaskDescription(e.target.value);
    if (e.target.value.length >= 3) {
      setTaskDescriptionValidationStatus("success");
    } else {
      setTaskDescriptionValidationStatus("error");
    }
  }, []);

  const handleCreateTask = useCallback(() => {
    if (taskName.length < 3 || taskDescription.length < 3) return;
    dispatch(
      createTask({
        collectionId: collectionInfo.id,
        taskName: taskName,
        taskDescription: taskDescription,
      })
    );
  }, [collectionInfo.id, dispatch, taskDescription, taskName]);

  useEffect(() => {
    if (loading === "fulfilled") {
      dispatch(openDialog("no dialogs"));
      dispatch(resetTasksLoading());
      setTaskName("");
      setTaskDescription("");
      dispatch(changeAlert({ show: true, value: "task created successfully" }));
      setTaskNameValidationStatus("secondary");
      setTaskDescriptionValidationStatus("secondary");
    }
  }, [dispatch, loading]);

  const actionsAndLoading = useMemo(() => {
    if (loading === "pending") {
      return <CircularProgress size={20} color="secondary" />;
    } else {
      return (
        <Button color="inherit" onClick={handleCreateTask}>
          {translate("create")}
        </Button>
      );
    }
  }, [handleCreateTask, loading]);

  const textFields = useMemo(() => {
    return (
      <Box sx={{ p: 0.5 }}>
        <TextField
          helperText={
            <Typography
              variant="caption"
              color={taskNameValidationStatus}
              textTransform={"uppercase"}
              fontWeight={"bold"}
            >
              {translate("at least 3 characters")}
            </Typography>
          }
          value={taskName}
          onChange={handleChangeTaskName}
          required
          color="secondary"
          variant="filled"
          fullWidth
          label={translate("task name")}
          sx={{ my: 2 }}
          slotProps={{
            input: {
              endAdornment: <EditIcon />,
            },
            inputLabel: {
              sx: {
                textTransform: "capitalize",
              },
            },
          }}
        />
        <TextField
          helperText={
            <Typography
              variant="caption"
              color={taskDescriptionValidationStatus}
              textTransform={"uppercase"}
              fontWeight={"bold"}
            >
              {translate("at least 3 characters")}
            </Typography>
          }
          value={taskDescription}
          onChange={handleChangeTaskDescription}
          required
          color="secondary"
          multiline
          rows={10}
          variant="filled"
          fullWidth
          label={translate("task description")}
          slotProps={{
            inputLabel: {
              sx: {
                textTransform: "capitalize",
              },
            },
          }}
        />
      </Box>
    );
  }, [
    handleChangeTaskDescription,
    handleChangeTaskName,
    taskDescription,
    taskDescriptionValidationStatus,
    taskName,
    taskNameValidationStatus,
  ]);

  const element = useMemo(() => {
    return (
      <Dialog
        fullScreen
        open={dialogs === "createTask"}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => dispatch(openDialog("no dialogs"))}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
              textTransform={"uppercase"}
            >
              {translate("create task")}
            </Typography>
            {actionsAndLoading}
          </Toolbar>
        </AppBar>
        {textFields}
      </Dialog>
    );
  }, [actionsAndLoading, dialogs, dispatch, textFields]);

  return element;
};
export default CreateTask;
