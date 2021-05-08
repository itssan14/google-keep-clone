import * as React from 'react';

type Callback<k> = (val: k) => void;
export function useDebouncedAction<I>(value: I, cb: Callback<I>) {
  let savedCallbackRef = React.useRef<Callback<I>>();
  savedCallbackRef.current = cb;

  React.useEffect(() => {
    let id = setTimeout(() => {
      savedCallbackRef.current(value);
    }, 300);
    return () => id && clearTimeout(id);
  }, [value]);
}
