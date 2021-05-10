import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { parse } from 'utils/common';

type State = { isOpen: boolean; activeTab: 'notes' | 'archived' };

let initialData: State = { isOpen: false, activeTab: 'notes' };
if (typeof window !== 'undefined') {
  let localValue = parse(window.localStorage.getItem('navigation'));
  initialData = localValue ?? initialData;
}

function writeToStorage(value) {
  window.localStorage.setItem('navigation', JSON.stringify(value));
}

const sidebarSlice = createSlice<State, SliceCaseReducers<State>, string>({
  name: 'Sidebar',
  initialState: initialData,
  reducers: {
    toggle: state => {
      state.isOpen = !state.isOpen;
      writeToStorage(state);
    },
    selectTab: (state, action) => {
      state.activeTab = action.payload;
      writeToStorage(state);
    },
  },
});

export { sidebarSlice };
