import { useRef, useEffect } from 'react';

type Callback = (ev: Event) => void;
type Event = MouseEvent | TouchEvent;

export function useClickOutside<I>(cb: Callback) {
  const ref = useRef<I>();
  const cbRef = useRef<Callback>(() => null);

  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  useEffect(() => {
    function listener(ev: Event) {
      const el = ref?.current;
      // Do nothing if clicking ref's element or descendent elements
      // @ts-ignore
      if (!el || el?.contains((ev?.target as Node) || null)) return;
      ev.preventDefault();
      cbRef.current(ev);
    }
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, []);

  return ref;
}
