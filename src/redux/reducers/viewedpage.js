import { STORE_PAGE } from "../actions/viewedpage";
import { UPDATE_CHAPTER_PAGE } from "../actions/viewedpage";

const initialState = {
  lastViewedPages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_PAGE:
      return {
        ...state,
        lastViewedPages: [action.payload, ...state.lastViewedPages],
      };

    case UPDATE_CHAPTER_PAGE:
      const pageIndex = state.lastViewedPages.findIndex(
        (chapter) => chapter.id === action.payload.id
      );
      if (pageIndex === -1) {
        return state;
      }

      const modifiedPage = {
        ...state.lastViewedPages[pageIndex],
        ...action.payload,
      };
      const modifiedPages = [...state.lastViewedPages];
      modifiedPages[pageIndex] = modifiedPage;

      return {
        ...state,
        lastViewedPages: modifiedPages,
      };

    default:
      return state;
  }
};
