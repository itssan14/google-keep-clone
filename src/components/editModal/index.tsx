import * as React from 'react';
import { useRouter } from 'next/router';
import { useGlobalState } from 'hooks/useGlobalState';
import { PostDataType } from 'store/cardData.store';
import Modal from 'components/modal';
import CreateNote from 'components/create-note';

function usePostData(id: string | null) {
  return useGlobalState<PostDataType>(state => {
    return id ? state.cards.byId[id] : null;
  });
}

export default function EditModal() {
  const router = useRouter();
  const postId = (router.query?.id as string) ?? null;
  const [data] = usePostData(postId);

  const ref = React.useRef<HTMLFormElement>(null);

  if (!Boolean(postId) || !data) {
    return null;
  }

  const closeFn = () => {
    let query = router.query;
    delete query.id;
    router.replace({ query });
  };

  return (
    <Modal
      isOpen={true}
      handleClose={() => {
        // call the submit even on the child
        ref.current.dispatchEvent(
          new Event('submit', { cancelable: true, bubbles: true })
        );

        closeFn();
      }}
    >
      <CreateNote ref={ref} {...data} close={closeFn} />
    </Modal>
  );
}
