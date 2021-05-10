import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import short from 'shortid';
import { parse } from 'utils/common';

export type PostType = 'notes' | 'archived' | 'pinned';
export type PostDataType = {
  id: string;
  type: PostType;
  title?: string;
  content?: string;
};

export type NormalizedPostState = {
  byId: {
    [key: string]: PostDataType;
  };
  allIds: string[];
  notesIds: string[];
  pinnedIds: string[];
  archivedIds: string[];
};

let initialData: NormalizedPostState = {
  byId: {
    sdx101: { id: 'sdx101', type: 'pinned', content: 'hello, world!' },
    sdx102: { id: 'sdx102', type: 'archived', content: 'hello, dev!' },
    sdx103: { id: 'sdx103', type: 'notes', content: 'hello, oops!' },
    sdx104: { id: 'sdx104', type: 'pinned', content: 'hello, cool!' },
  },
  allIds: ['sdx101', 'sdx102', 'sdx103', 'sdx104'],
  notesIds: ['sdx103'],
  archivedIds: ['sdx102'],
  pinnedIds: ['sdx101', 'sdx104'],
};

// Fetch data if
if (typeof window !== 'undefined') {
  initialData = parse(window.localStorage.getItem('keep-post-card')) || {
    byId: {},
    allIds: [],
    notesIds: [],
    pinnedIds: [],
    archivedIds: [],
  };
}

const cardDataSlice = createSlice<
  NormalizedPostState,
  SliceCaseReducers<NormalizedPostState>,
  string
>({
  name: 'Card Data',
  initialState: initialData,
  reducers: {
    addPost: (state, action) => {
      let idx = short.generate();
      state.byId[idx] = {
        id: idx,
        type: 'notes',
        ...action.payload,
      };
      state.allIds.unshift(idx);
      state.notesIds.unshift(idx);
    },
    editPost: (state, action) => {
      let { id: idx, ...dataPayload } = action.payload;
      state.byId[idx] = { ...state.byId[idx], ...dataPayload };
    },
    deletePost: (state, action) => {
      let idx = action.payload;
      let currentType = state.byId[idx].type;

      delete state.byId[idx];

      state.allIds.filter(currId => currId !== idx);
      state[`${currentType}Ids`] = state[`${currentType}Ids`].filter(
        currId => currId !== idx
      );
    },
    archivePost: (state, action) => {
      let idx = action.payload;

      let currentType = state.byId[idx].type;
      state.byId[idx].type = 'archived';

      state.archivedIds.unshift(idx);
      state[`${currentType}Ids`] = state[`${currentType}Ids`].filter(
        currId => currId !== idx
      );
    },
    unarchivePost: (state, action) => {
      let idx = action.payload;
      state.byId[idx].type = 'notes';

      state.notesIds.unshift(idx);
      state.archivedIds = state.archivedIds.filter(currId => currId !== idx);
    },
    pinPost: (state, action) => {
      let idx = action.payload;

      let currentType = state.byId[idx].type;
      state.byId[idx].type = 'pinned';

      state.pinnedIds.unshift(idx);
      state[`${currentType}Ids`] = state[`${currentType}Ids`].filter(
        currId => currId !== idx
      );
    },
    unpinPost: (state, action) => {
      let idx = action.payload;
      state.byId[idx].type = 'notes';

      state.notesIds.unshift(idx);
      state.pinnedIds = state.pinnedIds.filter(currId => currId !== idx);
    },
    undoAction: (state, action) => {
      state = action.payload;
    },
  },
});

export { cardDataSlice };
