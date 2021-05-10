import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGlobalState } from 'hooks/useGlobalState';
import { NormalizedPostState, PostType } from 'store/cardData.store';

const serialize = val => JSON.stringify(val);
type State = {
  selectedTab: PostType;
  data: NormalizedPostState;
};

export function useNoteSections() {
  const router = useRouter();
  const [{ selectedTab, data }] = useGlobalState<State>(state => ({
    selectedTab: state.sidebar.activeTab,
    data: state.cards,
  }));

  // Update state stored in localStorage on update
  let serializedData = serialize(data);
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem('keep-post-card', serializedData);
  }, [serializedData]);

  const searchQuery = router.query?.search as string;
  const searchTerm = searchQuery?.toLowerCase();
  const noteDetails = {
    selectedTab,
    isSearching: Boolean(searchQuery?.length),
    archived: [],
    pinned: [],
    active: [],
  };

  if (noteDetails.isSearching) {
    const filterFn = data => {
      return (
        data.title?.toLowerCase()?.includes(searchTerm) ||
        data.content?.toLowerCase()?.includes(searchTerm)
      );
    };
    noteDetails.active = [...data.pinnedIds, ...data.notesIds]
      .map(id => data.byId[id])
      .filter(filterFn);
    noteDetails.archived = data.archivedIds
      .map(id => data.byId[id])
      .filter(filterFn);
  } else {
    if (selectedTab === 'archived') {
      noteDetails.archived = data.archivedIds.map(id => data.byId[id]);
    } else {
      noteDetails.pinned = data.pinnedIds.map(id => data.byId[id]);
      noteDetails.active = data.notesIds.map(id => data.byId[id]);
    }
  }

  return noteDetails;
}
