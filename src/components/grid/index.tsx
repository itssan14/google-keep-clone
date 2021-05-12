import React from 'react';
import { AnimateSharedLayout, motion } from 'framer-motion';
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
        <AnimateSharedLayout>
          {cards.map(data => (
            <motion.div layout>
              <NoteCard key={data.id} {...data} />
            </motion.div>
          ))}
        </AnimateSharedLayout>
      </div>
    </section>
  );
}
