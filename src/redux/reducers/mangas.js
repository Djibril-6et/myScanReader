import {
  STORE_MANGAS,
  MANGAS_HAS_ERROR,
  MANGAS_IS_LOADING,
} from "../actions/mangas";

const initialState = {
  mangasList: [],
  isLoading: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STORE_MANGAS:
      return {
        ...state,
        mangasList: action.payload,
      };
    case MANGAS_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case MANGAS_HAS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
