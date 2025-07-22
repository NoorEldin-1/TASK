import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../main";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (collectionId) => {
    const res = await axios.get(`${backendUrl}tasks/all/${collectionId}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ collectionId, taskName, taskDescription }) => {
    const res = await axios.post(
      `${backendUrl}tasks/create/${collectionId}`,
      {
        title: taskName,
        description: taskDescription,
        collection_id: collectionId,
      },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  }
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ collectionId, taskId, taskName, taskDescription }) => {
    const res = await axios.put(
      `${backendUrl}tasks/edit/${collectionId}/${taskId}`,
      {
        title: taskName,
        description: taskDescription,
      },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async ({ collectionId, taskId }) => {
    await axios.delete(`${backendUrl}tasks/delete/${collectionId}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });

    const res = await axios.get(`${backendUrl}tasks/all/${collectionId}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

export const completeTask = createAsyncThunk(
  "tasks/completeTask",
  async ({ collectionId, taskId }) => {
    const res = await axios.put(
      `${backendUrl}tasks/toggleComplete/${collectionId}/${taskId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  }
);

export const searchTask = createAsyncThunk(
  "tasks/searchTask",
  async ({ collectionId, value }) => {
    if (value.length > 0) {
      const res = await axios.get(
        `${backendUrl}tasks/search/${collectionId}/${value}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    } else {
      const res = await axios.get(`${backendUrl}tasks/all/${collectionId}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      return res.data;
    }
  }
);

export const filterTask = createAsyncThunk(
  "tasks/filterTask",
  async ({ collectionId, filter }) => {
    const res = await axios.get(
      `${backendUrl}tasks/filter/${collectionId}/${filter}`,
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    taskInfo: {},
    fetchLoading: "idle",
    createLoading: "idle",
    editLoading: "idle",
    deleteLoading: "idle",
    completeLoading: "idle",
    searchLoading: "idle",
  },
  reducers: {
    resetTasksLoading: (state) => {
      state.fetchLoading = "idle";
      state.createLoading = "idle";
      state.editLoading = "idle";
      state.deleteLoading = "idle";
      state.completeLoading = "idle";
      state.searchLoading = "idle";
    },
    changeTaskInfo: (state, action) => {
      state.taskInfo = action.payload;
    },
    sortAsc: (state) => {
      state.tasks = state.tasks.sort((a, b) => a.id - b.id);
    },
    sortDesc: (state) => {
      state.tasks = state.tasks.sort((a, b) => b.id - a.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.fetchLoading = "pending";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.fetchLoading = "fulfilled";
        state.tasks = action.payload;
      })
      .addCase(createTask.pending, (state) => {
        state.createLoading = "pending";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.createLoading = "fulfilled";
        state.tasks = [action.payload, ...state.tasks];
      })
      .addCase(editTask.pending, (state) => {
        state.editLoading = "pending";
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.editLoading = "fulfilled";
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(deleteTask.pending, (state) => {
        state.deleteLoading = "pending";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.deleteLoading = "fulfilled";
        state.tasks = action.payload;
      })
      .addCase(completeTask.pending, (state) => {
        state.completeLoading = "pending";
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        state.completeLoading = "fulfilled";
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(searchTask.pending, (state) => {
        state.searchLoading = "pending";
      })
      .addCase(searchTask.fulfilled, (state, action) => {
        state.searchLoading = "fulfilled";
        state.tasks = action.payload;
      })
      .addCase(filterTask.pending, (state) => {
        state.searchLoading = "pending";
      })
      .addCase(filterTask.fulfilled, (state, action) => {
        state.searchLoading = "fulfilled";
        state.tasks = action.payload;
      });
  },
});
export const { resetTasksLoading, changeTaskInfo, sortAsc, sortDesc } =
  tasksSlice.actions;
export default tasksSlice.reducer;
