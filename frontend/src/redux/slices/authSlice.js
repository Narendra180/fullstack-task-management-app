import { createSlice } from "@reduxjs/toolkit";
import { getParsedUserInfoObjFromLocalStorage } from "../../utils/utils";


const initialState = {
  userInfo: getParsedUserInfoObjFromLocalStorage()
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    deleteCredentials: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    }
  }
});

export const { setCredentials,deleteCredentials } = authSlice.actions;

export default authSlice.reducer;
