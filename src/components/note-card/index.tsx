import React from 'react';
import Icon from 'components/icon';
import { PostDataType } from 'store/cardData.store';
import { useAppDispatch } from 'hooks/useGlobalState';
import { cardDataActions } from 'store';
import { useRouter } from 'next/router';

import cn from './card.module.scss';

export function NoteCard({ id, type, title, content }: PostDataType) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <div
      className={cn.noteCard}
      tabIndex={0}
      onClick={() => {
        let query = { ...router.query, id };
        router.replace({ query });
      }}
    >
      <div className={cn.pinIcon}>
        <Icon
          onClick={ev => {
            ev.preventDefault();
            ev.stopPropagation();
            let action = `${type === 'pinned' ? 'unpin' : 'pin'}Post`;
            dispatch(cardDataActions[action](id));
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            {...(type === 'pinned'
              ? { fill: 'currentColor' }
              : { stroke: 'currentColor', fill: 'none' })}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </Icon>
      </div>
      <div className={cn.archiveIcon}>
        <Icon
          onClick={ev => {
            ev.preventDefault();
            ev.stopPropagation();
            let action = `${type === 'archived' ? 'unarchive' : 'archive'}Post`;
            dispatch(cardDataActions[action](id));
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            {...(type === 'archived'
              ? { fill: 'currentColor' }
              : { stroke: 'currentColor', fill: 'none' })}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
        </Icon>
      </div>
      <div className={cn.editIcon}>
        <Icon
          onClick={ev => {
            ev.preventDefault();
            ev.stopPropagation();
            dispatch(cardDataActions.deletePost(id));
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="20"
            height="20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </Icon>
      </div>

      <h3 className={cn.title} title={title}>
        {title}
      </h3>
      <p className={cn.content}>{content}</p>
    </div>
  );
}
