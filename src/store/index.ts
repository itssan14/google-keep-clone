import { configureStore } from '@reduxjs/toolkit';

import { cardDataSlice } from './cardData.store';
import { sidebarSlice } from './sidebar.store';

export const store = configureStore({
  reducer: {
    sidebar: sidebarSlice.reducer,
    cards: cardDataSlice.reducer,
  },
});

export const sidebarActions = sidebarSlice.actions;
export const cardDataActions = cardDataSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
