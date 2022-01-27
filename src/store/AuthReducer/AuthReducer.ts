import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserDetailItem } from '../../interfaces';

interface FavoriteState {
  item: IUserDetailItem[],
}

const initialState = {
  item: []
} as FavoriteState

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveFavorites(state, action: PayloadAction<IUserDetailItem>) {
      state.item.push(action.payload);
    },

    removeFavorites(state, action: PayloadAction<IUserDetailItem>) {
      state.item.forEach((user, index) => {
        if(JSON.stringify(user) === JSON.stringify(action.payload)) {
          state.item.splice(index, 1);
          return;
        }
      });
    },
  },
})

export const { saveFavorites, removeFavorites } = authSlice.actions
export default authSlice.reducer