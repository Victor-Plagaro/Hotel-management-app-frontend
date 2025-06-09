import { createSlice } from '@reduxjs/toolkit';

// Interfaces
export type AuthUser = {
  email: string;
  password: string;
};

type UserState = {
  user: AuthUser | null;
};

// Retrieve the initialState checking if exist in sessionStorage and if not exist the initialState is null
const initialState: UserState = {
  user: sessionStorage.getItem('user')
    ? JSON.parse(sessionStorage.getItem('user') as string)
    : null,
};

// Create a slice for user with initial state and reducers
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      if (state.user === user) {
        return;
      } else {
        state.user = user;
      }

      if (user) {
        sessionStorage.setItem('user', JSON.stringify(user));
      } else {
        sessionStorage.removeItem('user');
      }
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
