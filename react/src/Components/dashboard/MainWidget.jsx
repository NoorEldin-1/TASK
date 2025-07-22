import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { DrawerHeader, Main } from "./Dashboard";
import {
  Box,
  Card,
  CircularProgress,
  Fab,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { openDialog } from "../../features/dialogsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTaskInfo,
  filterTask,
  searchTask,
  sortAsc,
  sortDesc,
} from "../../features/tasksSlice";
import { translate } from "../../main";

const MainWidget = ({ open, setAnchorEl }) => {
  const dispatch = useDispatch();
  const collectionInfo = useSelector(
    (state) => state.collections.collectionInfo
  );
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.fetchLoading);
  const searchLoading = useSelector((state) => state.tasks.searchLoading);
  const theme = useTheme();
  const [showArrow, setShowArrow] = useState(false);
  const [list, setList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState("all");
  const [date, setDate] = useState("latest");

  const handleChange = useCallback(
    (event) => {
      setStatus(event.target.value);
      dispatch(
        filterTask({
          collectionId: collectionInfo.id,
          filter: event.target.value,
        })
      );
      if (date === "latest") {
        dispatch(sortDesc());
      } else {
        dispatch(sortAsc());
      }
    },
    [collectionInfo.id, date, dispatch]
  );

  useEffect(() => {
    if (searchLoading === "fulfilled" || searchLoading === "idle") {
      if (date === "latest") {
        dispatch(sortDesc());
      } else {
        dispatch(sortAsc());
      }
    }
  }, [date, dispatch, searchLoading]);

  const handleDateChange = useCallback(
    (event) => {
      setDate(event.target.value);
      if (event.target.value === "latest") {
        dispatch(sortDesc());
      } else {
        dispatch(sortAsc());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    setSearchValue("");
    setStatus("all");
    setDate("latest");
  }, [collectionInfo]);

  const formatRelativeTime = useCallback((dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now - date;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInYears > 0) {
      if (document.dir === "rtl") {
        return `منذ ${diffInYears} سنة`;
      } else {
        return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
      }
    } else if (diffInMonths > 0) {
      if (document.dir === "rtl") {
        return `منذ ${diffInMonths} شهر`;
      } else {
        return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
      }
    } else if (diffInWeeks > 0) {
      if (document.dir === "rtl") {
        return `منذ ${diffInWeeks} أسبوع`;
      } else {
        return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
      }
    } else if (diffInDays > 0) {
      if (document.dir === "rtl") {
        return `منذ ${diffInDays} يوم`;
      } else {
        return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
      }
    } else if (diffInHours > 0) {
      if (document.dir === "rtl") {
        return `منذ ${diffInHours} ساعة`;
      } else {
        return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
      }
    } else if (diffInMinutes > 0) {
      if (document.dir === "rtl") {
        return `منذ ${diffInMinutes} دقيقة`;
      } else {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
      }
    } else {
      if (document.dir === "rtl") {
        return "الآن";
      } else {
        return "Just now";
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (loading === "fulfilled" || loading === "idle") {
      setList(
        tasks.map((task) => {
          return (
            <Card
              key={task.id}
              elevation={task.is_completed ? 0 : 5}
              sx={{
                width: "250px",
                height: "200px",
                p: 1,
                borderRadius: 5,
                borderColor: theme.palette.secondary.main,
                borderWidth: "1px",
                borderStyle: "solid",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography
                  color={task.is_completed && theme.palette.success.light}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    textDecoration: task.is_completed && "line-through",
                  }}
                >
                  {task.title.length > 10
                    ? task.title.slice(0, 10) + "..."
                    : task.title}
                </Typography>
                <IconButton
                  size="medium"
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                    dispatch(changeTaskInfo(task));
                  }}
                >
                  <MoreHorizIcon />
                </IconButton>
              </Stack>
              <Typography
                color={task.is_completed && theme.palette.success.light}
                sx={{
                  flexGrow: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textDecoration: task.is_completed && "line-through",
                }}
              >
                {task.description.length > 100
                  ? `${task.description.slice(0, 100).trim()}...`
                  : task.description}
              </Typography>
              <Typography
                color={task.is_completed && theme.palette.success.light}
                align="right"
                variant="caption"
                fontStyle={"italic"}
                fontWeight={"bold"}
                mt={2}
                sx={{
                  textDecoration: task.is_completed && "line-through",
                }}
              >
                {formatRelativeTime(task.created_at)}
              </Typography>
            </Card>
          );
        })
      );
    }
  }, [
    dispatch,
    formatRelativeTime,
    loading,
    setAnchorEl,
    tasks,
    theme.palette.secondary.main,
    theme.palette.success.light,
  ]);

  const handleScroll = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const searchTimeout = useRef();
  const handleSearchTask = useCallback(
    (e) => {
      setSearchValue(e.target.value);
      clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => {
        dispatch(
          searchTask({ collectionId: collectionInfo.id, value: e.target.value })
        );
      }, 500);
    },
    [collectionInfo.id, dispatch]
  );

  const element = useMemo(() => {
    if (!Object.keys(collectionInfo).length) {
      return (
        <Main
          open={open}
          sx={{ display: "grid", placeContent: "center", height: "100vh" }}
        >
          <DrawerHeader />
          <Typography
            variant="h6"
            fontWeight={"bold"}
            textAlign={"center"}
            textTransform={"uppercase"}
          >
            {translate("select collection")}
          </Typography>
        </Main>
      );
    } else {
      if (loading === "pending") {
        return (
          <Main
            open={open}
            sx={{
              display: "grid",
              placeContent: "center",
              height: "100vh",
              position: "relative",
            }}
          >
            <DrawerHeader />
            <CircularProgress size={20} color="secondary" />
          </Main>
        );
      } else if (loading === "fulfilled" || loading === "idle") {
        return (
          <Main
            open={open}
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <DrawerHeader />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                placeholder={translate("search by title...")}
                value={searchValue}
                onChange={handleSearchTask}
                slotProps={{
                  input: {
                    endAdornment: <YoutubeSearchedForIcon />,
                  },
                  inputLabel: {
                    sx: {
                      textTransform: "capitalize",
                    },
                  },
                }}
                variant="filled"
                label={translate("search")}
                size="small"
                color="secondary"
                sx={{ width: "80%" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "80%",
                mx: "auto",
                mt: 2,
                gap: 2,
              }}
            >
              <FormControl color="secondary" variant="filled" fullWidth>
                <InputLabel
                  id="demo-simple-select-filled-label"
                  sx={{ textTransform: "capitalize" }}
                >
                  {translate("status")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={status}
                  onChange={handleChange}
                  sx={{ textTransform: "capitalize" }}
                >
                  <MenuItem value={"all"}>{translate("all")}</MenuItem>
                  <MenuItem value={"completed"}>
                    {translate("completed")}
                  </MenuItem>
                  <MenuItem value={"incomplete"}>
                    {translate("not completed")}
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl color="secondary" variant="filled" fullWidth>
                <InputLabel
                  id="demo-simple-select-filled-label"
                  sx={{ textTransform: "capitalize" }}
                >
                  {translate("date")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={date}
                  onChange={handleDateChange}
                  sx={{ textTransform: "capitalize" }}
                >
                  <MenuItem value={"latest"}>{translate("latest")}</MenuItem>
                  <MenuItem value={"oldest"}>{translate("oldest")}</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Typography variant="h5" align="center" my={3}>
              {collectionInfo.name}
            </Typography>
            {searchLoading === "pending" ? (
              <CircularProgress
                size={20}
                color="secondary"
                sx={{ display: "block", mx: "auto" }}
              />
            ) : tasks.length === 0 ? (
              <Typography
                variant="h6"
                align="center"
                alignContent={"center"}
                flexGrow={1}
                textTransform={"uppercase"}
                fontWeight={"bold"}
              >
                {translate("no tasks found create new one")}
              </Typography>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                {list}
              </Box>
            )}
            <Fab
              color="success"
              size="medium"
              sx={{ position: "fixed", bottom: 20, right: 5 }}
              onClick={() => dispatch(openDialog("createTask"))}
            >
              <AddIcon />
            </Fab>
            {tasks.length > 1 && (
              <Fab
                color="info"
                size="medium"
                sx={{ position: "fixed", bottom: 80, right: 5 }}
                onClick={() => dispatch(openDialog("downloadAllTasks"))}
              >
                <DownloadIcon />
              </Fab>
            )}
            {showArrow && (
              <Fab
                color="secondary"
                size="medium"
                sx={{ position: "fixed", bottom: 140, right: 5 }}
                onClick={handleScroll}
              >
                <KeyboardArrowUpIcon />
              </Fab>
            )}
          </Main>
        );
      }
    }
  }, [
    collectionInfo,
    date,
    dispatch,
    handleChange,
    handleDateChange,
    handleScroll,
    handleSearchTask,
    list,
    loading,
    open,
    searchLoading,
    searchValue,
    showArrow,
    status,
    tasks.length,
  ]);
  return element;
};
export default MainWidget;
