import axios from 'axios';

export const STORE_MANGAS = 'STORE_MANGAS';
export const MANGAS_IS_LOADING = 'MANGAS_IS_LOADING';
export const MANGAS_HAS_ERROR = 'MANGAS_HAS_ERROR';

export const mangasHasError = hasError => ({
  type: MANGAS_HAS_ERROR,
  payload: hasError,
});

export const mangasIsLoading = isLoading => ({
  type: MANGAS_IS_LOADING,
  payload: isLoading,
});

export const storeMangas = mangas => ({
  type: STORE_MANGAS,
  payload: mangas,
});

export const fetchMangas = () => dispatch => {
  dispatch(mangasIsLoading(true));
  dispatch(mangasHasError(false));

    axios
      .get('http://localhost:7001/scans')
      .then(response => {
        dispatch(storeMangas(response.data));
        dispatch(mangasIsLoading(false));
      })
      .catch(err => {
        dispatch(mangasIsLoading(false));
        dispatch(mangasHasError(true));
      });
};