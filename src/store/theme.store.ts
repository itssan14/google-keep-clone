import { createSlice } from '@reduxjs/toolkit';

type State = 'light' | 'dark';

let defaultTheme: State = 'light';
if (typeof window !== 'undefined') {
  let themeValue = window.localStorage.getItem('theme') as State;
  if (themeValue) {
    defaultTheme = themeValue;
  } else {
    defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
}

const themeSlice = createSlice({
  name: 'Theme',
  initialState: defaultTheme,
  reducers: {
    toggle: theme => {
      return theme === 'dark' ? 'light' : 'dark';
    },
  },
});

export { themeSlice };
