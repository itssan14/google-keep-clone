import { useNoteSections } from 'hooks/useNotesSection';
import { Grid } from 'components/grid';

function NoResultsFound() {
  return (
    <p style={{ display: 'flex', justifyContent: 'center' }}>
      No matching results.
    </p>
  );
}

export default function MainPage() {
  let {
    isSearching,
    selectedTab,
    archived,
    pinned,
    active,
  } = useNoteSections();

  if (isSearching) {
    return archived.length || active.length ? (
      <>
        {Boolean(active.length) && <Grid title="Others" cards={active} />}
        {Boolean(archived.length) && <Grid title="Archived" cards={archived} />}
      </>
    ) : (
      <NoResultsFound />
    );
  }

  if (selectedTab === 'archived') {
    return archived.length ? <Grid title="Archived" cards={archived} /> : null;
  }

  if (selectedTab === 'notes') {
    let isVisible = active.length || pinned.length;
    return isVisible ? (
      <>
        {Boolean(pinned.length) && <Grid title="Pinned" cards={pinned} />}
        {Boolean(active.length) && <Grid title="Others" cards={active} />}
      </>
    ) : null;
  }

  return null;
}
