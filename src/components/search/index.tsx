import React, { useRef } from 'react';
import Icon from 'components/icon';
import { useRouter } from 'next/router';
import styles from './search.module.scss';
import { useDebouncedAction } from 'hooks/useDebouncedAction';

export default function SearchBox({}) {
  const router = useRouter();
  let initRef = useRef(true);
  const [searchInput, setSearchInput] = React.useState<string>(() => {
    // TODO: Figure out why query is not available from router hook in this case
    if (typeof window === 'undefined') {
      return '';
    } else {
      return new URL(window.location.href).searchParams.get('search') || '';
    }
  });
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useDebouncedAction<string>(searchInput, search => {
    if (initRef.current) {
      let query = new URLSearchParams({ ...router.query, search }).toString();
      let routerProps = search.length ? { query } : {};
      router.replace(routerProps);
    }
  });

  return (
    <form
      className={[styles.search, focused && styles.activeSearch]
        .filter(Boolean)
        .join(' ')}
      onSubmit={evt => evt.preventDefault()}
    >
      <Icon style={{ paddingRight: 10 }} onClick={() => null}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </Icon>
      <input
        type="text"
        ref={inputRef}
        autoCorrect="off"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        inputMode="search"
        autoComplete="off"
        spellCheck="false"
        value={searchInput}
        onChange={ev => setSearchInput(ev.target.value)}
        className={styles.input}
        placeholder={'Search'}
      />
      {searchInput.length ? (
        <Icon style={{ paddingRight: 10 }} onClick={() => setSearchInput('')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Icon>
      ) : null}
    </form>
  );
}
