import React from 'react';
import styles from './logo.module.css';

export default function Logo() {
  return (
    <a href="#" className={styles.logo}>
      <img
        src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
        srcSet="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png 1x, https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png 2x"
        alt=""
        aria-hidden="true"
        style={{ width: 40, height: 40 }}
      />
      <h2 className={styles.header}>Keep</h2>
    </a>
  );
}
