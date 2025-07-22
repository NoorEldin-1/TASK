import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { forwardRef, useEffect, useMemo } from "react";
import { Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../../features/dialogsSlice";
import { translate } from "../../main";
import EditIcon from "@mui/icons-material/Edit";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ShowTask = ({ setAnchorEl }) => {
  const dispatch = useDispatch();
  const dialogs = useSelector((state) => state.dialogs);
  const taskInfo = useSelector((state) => state.tasks.taskInfo);

  useEffect(() => {
    if (dialogs === "showTask") {
      setAnchorEl(null);
    }
  }, [dialogs, setAnchorEl]);

  const element = useMemo(() => {
    return (
      <Dialog
        fullScreen
        open={dialogs === "showTask"}
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
              {translate("show task")}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 0.5 }}>
          <TextField
            value={taskInfo.title}
            color="secondary"
            slotProps={{
              input: { readOnly: true, endAdornment: <EditIcon /> },
              inputLabel: {
                sx: {
                  textTransform: "capitalize",
                },
              },
            }}
            variant="filled"
            fullWidth
            label={translate("task name")}
            sx={{ my: 2 }}
          />
          <TextField
            value={taskInfo.description}
            color="secondary"
            slotProps={{
              input: { readOnly: true },
              inputLabel: {
                sx: {
                  textTransform: "capitalize",
                },
              },
            }}
            multiline
            rows={12}
            variant="filled"
            fullWidth
            label={translate("task description")}
          />
        </Box>
      </Dialog>
    );
  }, [dialogs, dispatch, taskInfo.description, taskInfo.title]);

  return element;
};
export default ShowTask;
