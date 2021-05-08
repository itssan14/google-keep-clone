import React from 'react';
import styles from './icon.module.css';

type Event = React.MouseEvent<HTMLButtonElement, MouseEvent>;
type MenuProps = {
  onClick: (evt: Event) => void;
  children: React.ReactElement;
  className?: string;
  style?: Object;
};

export default function MenuIcon({
  onClick,
  children,
  className,
  style,
}: MenuProps) {
  return (
    <button
      style={style}
      onClick={onClick}
      className={[styles.button, className].filter(Boolean).join(' ')}
    >
      {children}
    </button>
  );
}
