import { useNoteSections } from 'hooks/useNotesSection';
import { Grid } from 'components/grid';
import CreateNote from 'components/create-note';
import styles from '../styles/main.module.scss';

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

  return (
    <>
      <div className={styles.createFromWrapper}>
        <CreateNote />
      </div>
      {selectedTab === 'archived' ? (
        archived.length ? (
          <Grid title="Archived" cards={archived} />
        ) : null
      ) : active.length || pinned.length ? (
        <>
          {Boolean(pinned.length) && <Grid title="Pinned" cards={pinned} />}
          {Boolean(active.length) && <Grid title="Others" cards={active} />}
        </>
      ) : null}
    </>
  );
}
