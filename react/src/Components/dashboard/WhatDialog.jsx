import { useSelector } from "react-redux";
import CreateCollection from "./CreateCollection";
import EditCollection from "./EditCollection";
import DeleteCollection from "./DeleteCollection";
import Logout from "./Logout";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import DownloadTask from "./DownloadTask";
import DownloadCollectionTasks from "./DownloadCollectionTasks";
import ShowTask from "./ShowTask";

const WhatDialog = ({ setAnchorEl }) => {
  const dialogs = useSelector((state) => state.dialogs);

  if (dialogs === "createCollection") {
    return <CreateCollection />;
  } else if (dialogs === "editCollection") {
    return <EditCollection />;
  } else if (dialogs === "deleteCollection") {
    return <DeleteCollection />;
  } else if (dialogs === "logout") {
    return <Logout />;
  } else if (dialogs === "createTask") {
    return <CreateTask />;
  } else if (dialogs === "editTask") {
    return <EditTask setAnchorEl={setAnchorEl} />;
  } else if (dialogs === "deleteTask") {
    return <DeleteTask setAnchorEl={setAnchorEl} />;
  } else if (dialogs === "downloadTask") {
    return <DownloadTask />;
  } else if (dialogs === "showTask") {
    return <ShowTask setAnchorEl={setAnchorEl} />;
  } else if (dialogs === "downloadAllTasks") {
    return <DownloadCollectionTasks />;
  }
};
export default WhatDialog;
