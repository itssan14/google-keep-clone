import * as React from 'react';
import { useGlobalState } from 'hooks/useGlobalState';
import { themeActions } from 'store';

type Theme = 'light' | 'dark';
export function useDarkMode() {
  const [theme, dispatch] = useGlobalState<Theme>(state => state.theme);
  const toggle = () => {
    dispatch(themeActions.toggle());
  };

  React.useEffect(() => {
    document.body.classList.add(theme);
    window.localStorage.setItem('theme', theme);

    return () => {
      document.body.classList.remove(theme);
    };
  }, [theme]);

  return [theme, toggle] as [Theme, typeof toggle];
}
