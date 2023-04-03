export const ADD_TO_FAV = 'ADD_TO_FAV';
export const DELETE_FROM_FAV = 'DELETE_FROM_FAV';

export const deleteFromFavorites = id => ({
  type: DELETE_FROM_FAV,
  payload: id,
});

export const addToFavorites = manga => ({
  type: ADD_TO_FAV,
  payload: {
    manga,
    id: Date.now(),
  },
});