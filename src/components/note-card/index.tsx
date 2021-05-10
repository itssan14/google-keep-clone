import React from 'react';
import Icon from 'components/icon';
import { PostDataType } from 'store/cardData.store';
import cn from './card.module.scss';
import { useAppDispatch } from 'hooks/useGlobalState';
import { cardDataActions } from 'store';

export function NoteCard({ id, type, title, content }: PostDataType) {
  const dispatch = useAppDispatch();
  return (
    <div
      className={cn.noteCard}
      tabIndex={0}
      onDoubleClick={evt => {
        //
      }}
    >
      <div className={cn.pinIcon}>
        <Icon
          onClick={() => {
            let action = `${type === 'pinned' ? 'unpin' : 'pin'}Post`;
            dispatch(cardDataActions[action](id));
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="20"
            height="20"
            {...(type === 'pinned'
              ? { fill: 'currentColor' }
              : { stroke: 'currentColor', fill: 'none' })}
          >
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
        </Icon>
      </div>
      <div className={cn.archiveIcon}>
        <Icon
          onClick={() => {
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
          onClick={() => {
            //
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </Icon>
      </div>
      <div className={cn.title}>{title}</div>
      <div>{content}</div>
    </div>
  );
}
