import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../main";

export const fetchCollections = createAsyncThunk(
  "collections/fetchCollections",
  async () => {
    const res = await axios.get(`${backendUrl}collection/all`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

export const createCollection = createAsyncThunk(
  "collections/createCollection",
  async (collectionName) => {
    const res = await axios.post(
      `${backendUrl}collection/create`,
      { name: collectionName },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  }
);

export const editCollection = createAsyncThunk(
  "collections/editCollection",
  async ({ collectionId, collectionName }) => {
    const res = await axios.put(
      `${backendUrl}collection/edit/${collectionId}`,
      { name: collectionName },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  }
);

export const deleteCollection = createAsyncThunk(
  "collections/deleteCollection",
  async (collectionId) => {
    await axios.delete(`${backendUrl}collection/delete/${collectionId}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    const res = await axios.get(`${backendUrl}collection/all`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

export const searchCollection = createAsyncThunk(
  "collections/searchCollection",
  async (value) => {
    const res = await axios.get(`${backendUrl}collection/search/${value}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return res.data;
  }
);

const collectionsSlice = createSlice({
  name: "collections",
  initialState: {
    collections: [],
    collectionInfo: {},
    fetchLoading: "idle",
    createLoading: "idle",
    editLoading: "idle",
    deleteLoading: "idle",
  },
  reducers: {
    resetCollectionsLoading: (state) => {
      state.fetchLoading = "idle";
      state.createLoading = "idle";
      state.editLoading = "idle";
      state.deleteLoading = "idle";
    },
    changeCollectionInfo: (state, action) => {
      state.collectionInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.pending, (state) => {
        state.fetchLoading = "pending";
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.fetchLoading = "fulfilled";
        state.collections = action.payload;
      })
      .addCase(createCollection.pending, (state) => {
        state.createLoading = "pending";
      })
      .addCase(createCollection.fulfilled, (state, action) => {
        state.createLoading = "fulfilled";
        state.collections = [action.payload, ...state.collections];
      })
      .addCase(editCollection.pending, (state) => {
        state.editLoading = "pending";
      })
      .addCase(editCollection.fulfilled, (state, action) => {
        state.editLoading = "fulfilled";
        state.collections = state.collections.map((e) =>
          e.id === action.payload.id ? action.payload : e
        );
      })
      .addCase(deleteCollection.pending, (state) => {
        state.deleteLoading = "pending";
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.deleteLoading = "fulfilled";
        state.collections = action.payload;
      })
      .addCase(searchCollection.pending, (state) => {
        state.fetchLoading = "pending";
      })
      .addCase(searchCollection.fulfilled, (state, action) => {
        state.fetchLoading = "fulfilled";
        state.collections = action.payload;
      });
  },
});
export const { resetCollectionsLoading, changeCollectionInfo } =
  collectionsSlice.actions;
export default collectionsSlice.reducer;
