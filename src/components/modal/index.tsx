import * as React from 'react';
import { useClickOutside } from 'hooks/useClickOutside';
import styles from './modal.module.scss';

export default function Modal({
  handleClose,
  children,
  isOpen,
}: {
  handleClose: () => void;
  children: React.ReactElement;
  isOpen: boolean;
}) {
  const showHideClassName = isOpen
    ? [styles.modal, styles['display-block']].join(' ')
    : [styles.modal, styles['display-none']].join(' ');
  let modalRef = useClickOutside<HTMLBaseElement>(() => {
    handleClose();
  });

  return isOpen ? (
    <aside role="dialog" className={showHideClassName}>
      <section ref={modalRef} className={styles['modal-main']}>
        {children}
      </section>
    </aside>
  ) : null;
}

// const [cardData] = useGlobalState<PostDataType>(
//   state => state.cards.byId[id]
// );
