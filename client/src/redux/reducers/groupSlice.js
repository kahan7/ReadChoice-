import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDataAPI, postDataAPI } from "../../utils/fetchData";
import axios from "axios";
import { URL } from "../../utils/Url";
import { message } from "antd";

const initialState = {
  groups: [],
  group: null,
  posts: [],
  discussions: [],
  status: "idle",
  error: null,
  success: null,
};
export const fetchGroupsAsync = createAsyncThunk(
  "groups/fetchGroups",
  async () => {
    const response = await getDataAPI("groups");
    return response.data;
  }
);
export const joinConversation = createAsyncThunk(
  "conversation/join",
  async ({ discussionId, userId }) => {
    try {
      const response = await axios.post(
        `${URL}/api/conversations/${discussionId}/join`,
        { userId }
      );
      message.success(response.data.message);
      return response.data;
    } catch (error) {
      throw Error("Failed to join conversation");
    }
  }
);

export const fetchDiscussions = createAsyncThunk(
  "group/fetchDiscussions",
  async (groupId, { getState }) => {
    const { auth } = getState();
    const response = await axios.get(
      `${URL}/api/groups/${groupId}/discussions/`,
      {
        headers: {
          Authorization: auth.token,
        },
      }
    );
    return response.data;
  }
);
export const addDiscussion = createAsyncThunk(
  "group/addDiscussion",
  async ({ groupId, title }, { getState }) => {
    try {
      const { auth } = getState();
      const response = await postDataAPI(
        "/group/discussions",
        {
          groupId,
          title,
        },
        auth.token
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const fetchGroup = createAsyncThunk(
  "group/fetchGroup",
  async (groupId) => {
    const response = await axios.get(`${URL}/api/group/${groupId}`);
    return response.data;
  }
);
export const fetchPosts = createAsyncThunk(
  "group/fetchPosts",
  async (groupId, auth) => {
    const response = await getDataAPI(`/api/group/posts/`, auth.token);
    return response.data;
  }
);
export const searchGroups = createAsyncThunk(
  "groups/searchGroups",
  async (query) => {
    const response = await axios.get(`${URL}/api/groups/search?query=${query}`);
    return response.data;
  }
);
export const joinGroup = createAsyncThunk(
  "groups/join",
  async ({ groupId, auth }) => {
    const response = await postDataAPI(
      `groups/join/${groupId}`,
      {},
      auth.token
    );
    return response.data;
  }
);
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postAdded: (state, action) => {
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    },
    discussionAdded: (state, action) => {
      return {
        ...state,
        discussions: [...state.discussions, action.payload],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addDiscussion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDiscussion.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "suceeded";
        state.discussions = [...state.discussions, action.payload];
      })
      .addCase(fetchDiscussions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDiscussions.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "suceeded";
        state.discussions = action.payload;
      })
      .addCase(fetchDiscussions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addDiscussion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchGroupsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchGroups.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGroupsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groups = action.payload;
      })
      .addCase(fetchGroupsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchGroup.pending, (state) => {
        state.status = "loading";
      })
      // Khi API request trả về thành công
      .addCase(fetchGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.group = action.payload.group;
        state.posts = action.payload.posts;
      })
      .addCase(searchGroups.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groups = action.payload;
      })
      .addCase(searchGroups.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Khi API request trả về thất bại
      .addCase(fetchGroup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(joinGroup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(joinGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.group.members.push(action.payload);
      })
      .addCase(joinGroup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(joinConversation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(joinConversation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(joinConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { postAdded } = postSlice.actions;

export const selectAllPosts = (state) => state.posts.posts;

export const selectAllDiscussions = (state) => state.posts.discussions;

export default postSlice.reducer;
