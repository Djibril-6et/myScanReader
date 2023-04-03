import { ADD_TO_FAV, DELETE_FROM_FAV } from '../actions/favorites';

const initialState = {
  favoritesList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAV:
      return {
        ...state,
        favoritesList: [action.payload, ...state.favoritesList],
      };

    case DELETE_FROM_FAV:
      return {
        ...state,
        favoritesList: state.favoritesList.filter(item => item.manga !== action.payload),
      };
    default:
      return state;
  }
};