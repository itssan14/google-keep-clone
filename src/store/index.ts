import { configureStore } from '@reduxjs/toolkit';
import { sidebarSlice } from './sidebar.store';

const store = configureStore({
  reducer: {
    sidebar: sidebarSlice.reducer,
  },
});

export const sidebarActions = sidebarSlice.actions;
export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
