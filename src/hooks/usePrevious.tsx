import { useRef } from 'react';

export function usePrevious<I>(value: I) {
  const prevRef = useRef<I>();
  const curRef = useRef<I>(value);

  if (curRef.current !== value) {
    prevRef.current = curRef.current;
    curRef.current = value;
  }

  return prevRef.current;
}
