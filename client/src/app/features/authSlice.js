import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

const initialState = {
  token: token || null,
  user: null,
  loading: true, // 🔥 start as true
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("Login payload:", action.payload);
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = false;
      localStorage.setItem("token", action.payload.token);
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.loading = false;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout, setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
