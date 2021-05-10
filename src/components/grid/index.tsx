import React from 'react';
import { NoteCard } from 'components/note-card';
import { PostDataType } from 'store/cardData.store';
import styles from './grid.module.scss';

export function Grid({
  title,
  cards,
}: {
  title?: string;
  cards: PostDataType[];
}) {
  return (
    <section className={styles.wrapper}>
      {title && <label className={styles.label}>{title}</label>}
      <div className={styles.gridWrapper}>
        {cards.map(data => (
          <NoteCard key={data.id} {...data} />
        ))}
      </div>
    </section>
  );
}
