import { useTheme } from "@emotion/react";
import { DrawerHeader, drawerWidth } from "./Dashboard";
import {
  Button,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItemText } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../../features/dialogsSlice";
import {
  changeCollectionInfo,
  fetchCollections,
  searchCollection,
} from "../../features/collectionsSlice";
import { fetchTasks } from "../../features/tasksSlice";
import { translate } from "../../main";

const Side = ({ open, handleDrawerClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const loading = useSelector((state) => state.collections.fetchLoading);
  const collections = useSelector((state) => state.collections.collections);
  const collectionInfo = useSelector(
    (state) => state.collections.collectionInfo
  );
  const [selectedIndex, setSelectedIndex] = useState(null);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const onEditCollection = useCallback(
    (collection) => {
      dispatch(changeCollectionInfo(collection));
      dispatch(openDialog("editCollection"));
    },
    [dispatch]
  );

  const onDeleteCollection = useCallback(
    (collection) => {
      dispatch(changeCollectionInfo(collection));
      dispatch(openDialog("deleteCollection"));
    },
    [dispatch]
  );

  const showTasks = useCallback(
    (collection) => {
      if (collectionInfo.id === collection.id) return;

      dispatch(changeCollectionInfo(collection));
      dispatch(fetchTasks(collection.id));
    },
    [collectionInfo.id, dispatch]
  );

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  const collectionList = useMemo(() => {
    return collections.map((collection) => (
      <ListItem key={collection.id} disablePadding>
        <ListItemButton
          sx={{ p: 0.5 }}
          selected={selectedIndex === collection.id}
          onClick={(event) => {
            handleListItemClick(event, collection.id);
            showTasks(collection);
          }}
        >
          <ListItemText
            primary={
              collection.name.length > 10
                ? `${collection.name.slice(0, 10)}...`
                : `${collection.name}`
            }
          />
          <Tooltip
            title={translate("edit collection")}
            followCursor
            slotProps={{
              tooltip: {
                sx: {
                  fontWeight: "bold",
                  textTransform: "uppercase",
                },
              },
            }}
          >
            <IconButton
              onClick={() => onEditCollection(collection)}
              color="info"
              size="small"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={translate("delete collection")}
            followCursor
            slotProps={{
              tooltip: {
                sx: {
                  fontWeight: "bold",
                  textTransform: "uppercase",
                },
              },
            }}
          >
            <IconButton
              onClick={() => onDeleteCollection(collection)}
              color="error"
              size="small"
            >
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        </ListItemButton>
      </ListItem>
    ));
  }, [
    collections,
    onDeleteCollection,
    onEditCollection,
    selectedIndex,
    showTasks,
  ]);

  const searchTimeout = useRef();
  const handleSearchCollection = useCallback(
    (e) => {
      clearTimeout(searchTimeout.current);
      if (e.target.value.length > 0) {
        clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
          dispatch(searchCollection(e.target.value));
        }, 750);
      } else {
        clearTimeout(searchTimeout.current);
        dispatch(fetchCollections());
      }
    },
    [dispatch]
  );

  const searchField = useMemo(() => {
    return (
      <TextField
        onChange={handleSearchCollection}
        variant="filled"
        fullWidth
        label={translate("search")}
        color="secondary"
        size="small"
        slotProps={{
          input: {
            endAdornment: <YoutubeSearchedForIcon />,
          },
          inputLabel: {
            sx: { textTransform: "capitalize" },
          },
        }}
      />
    );
  }, [handleSearchCollection]);

  const collectionsAndLoading = useMemo(() => {
    if (loading === "pending") {
      return (
        <List sx={{ display: "grid", placeContent: "center" }}>
          <CircularProgress size={20} color="secondary" />
        </List>
      );
    } else if (collectionList.length > 0) {
      return <List>{collectionList}</List>;
    } else {
      return (
        <Typography
          align="center"
          variant="body1"
          fontWeight={"bold"}
          textTransform={"uppercase"}
          my={2}
        >
          {translate("no collections")}
        </Typography>
      );
    }
  }, [collectionList, loading]);

  const element = useMemo(() => {
    return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Button
            variant="contained"
            fullWidth
            sx={{ mr: 1 }}
            onClick={() => dispatch(openDialog("createCollection"))}
          >
            {translate("create collection")}
          </Button>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        {searchField}
        <Divider />
        {collectionsAndLoading}
      </Drawer>
    );
  }, [
    collectionsAndLoading,
    dispatch,
    handleDrawerClose,
    open,
    searchField,
    theme.direction,
  ]);

  return element;
};

export default Side;
