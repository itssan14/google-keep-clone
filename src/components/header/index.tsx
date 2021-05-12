import * as React from 'react';
import Icon from 'components/icon';
import Logo from 'components/logo';
import SearchBox from 'components/search';
import ThemeToggle from 'components/theme-toggle';

import { useAppDispatch } from 'hooks/useGlobalState';
import { sidebarActions } from 'store';

import styles from './header.module.scss';

export default function Header({}) {
  const dispatch = useAppDispatch();
  return (
    <nav className={styles.header}>
      <Icon onClick={() => dispatch(sidebarActions.toggle())}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          height="20"
          width="20"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </Icon>
      <Logo />
      <div className={styles.searchWrapper}>
        <SearchBox />
        <ThemeToggle />
      </div>
    </nav>
  );
}
