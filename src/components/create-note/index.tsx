import * as React from 'react';
import { cardDataActions } from 'store';
import { useAppDispatch } from 'hooks/useGlobalState';
import styles from './create-note.module.scss';
import { PostType } from 'store/cardData.store';
import Icon from 'components/icon';

function useNoteHandler() {
  const dispatch = useAppDispatch();
  const add = post => {
    dispatch(cardDataActions.addPost({ ...post }));
  };

  const edit = post => {
    dispatch(cardDataActions.editPost({ ...post }));
  };

  return { add, edit };
}

const CreateNote = React.forwardRef(
  (
    props: {
      id?: string;
      type?: PostType;
      title?: string;
      content?: string;
      close?: () => void;
    },
    formRef: React.ForwardedRef<HTMLFormElement>
  ) => {
    const [showInput, setShowInput] = React.useState<boolean>(() => {
      return !!props?.content?.length || !!props?.title?.length || false;
    });

    const [type, setType] = React.useState<PostType>(
      () => props?.type || 'notes'
    );
    const [title, setTitle] = React.useState<string>(() => props?.title || '');
    const [content, setContent] = React.useState<string>(
      () => props?.content || ''
    );

    const inputRef = React.useRef<HTMLInputElement>();
    React.useEffect(() => {
      if (props?.id) {
        inputRef.current.focus();
      }
    }, []);

    const { add, edit } = useNoteHandler();

    return (
      <form
        ref={formRef}
        className={styles.createForm}
        onSubmit={evt => {
          evt.preventDefault();
          if (props?.id) {
            if (title != '' || content != '') {
              edit({ id: props.id, title, content, type });
              props?.close();
            }
          } else {
            if (title != '' || content != '') {
              add({ title, content, type });
              setTitle('');
              setContent('');
              setType('notes');
            }
            setShowInput(false);
          }
        }}
      >
        <input
          type="text"
          value={title}
          ref={inputRef}
          className={styles.input}
          onFocus={() => setShowInput(true)}
          placeholder="Title"
          onChange={ev => setTitle(ev.target.value)}
        />
        {showInput && (
          <>
            <textarea
              value={content}
              className={styles.textArea}
              placeholder="Please enter notes"
              onChange={ev => setContent(ev.target.value)}
            />
            <div className={styles.buttonWrapper}>
              <div className={styles.iconWrapper}>
                <Icon
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    type === 'pinned' ? setType('notes') : setType('pinned');
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

              <button className={styles.button}>Close</button>
            </div>
          </>
        )}
      </form>
    );
  }
);

export default CreateNote;
