import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
  name: 'Sidebar',
  initialState: {
    isOpen: false,
    activeTab: 'notes',
  },
  reducers: {
    toggle: state => {
      state.isOpen = !state.isOpen;
    },
    selectTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export { sidebarSlice };
