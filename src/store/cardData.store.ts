import { createSlice } from '@reduxjs/toolkit';
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
  byId: {},
  allIds: [],
  notesIds: [],
  pinnedIds: [],
  archivedIds: [],
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

const cardDataSlice = createSlice({
  name: 'Card Data',
  initialState: initialData,
  reducers: {
    addPost: (state, action) => {
      let idx = short.generate();
      let type = action?.payload?.type ?? 'notes';
      state.byId[idx] = {
        id: idx,
        type,
        ...action.payload,
      };
      state.allIds.unshift(idx);
      state[`${type}Ids`].unshift(idx);
    },
    editPost: (state, action) => {
      let { id: idx, ...dataPayload } = action.payload;
      let newType = dataPayload.type;
      let existingType = state.byId[idx].type;

      state.byId[idx] = { ...state.byId[idx], ...dataPayload };
      if (newType !== existingType) {
        state[`${existingType}Ids`] = state[`${existingType}Ids`].filter(
          id => id !== idx
        );
        state[`${newType}Ids`].unshift(idx);
      }
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
