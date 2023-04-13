export const STORE_PAGE = 'STORE_PAGE';

export const storePage = (chapter, page) => ({
  type: STORE_PAGE,
  payload: {
    id: chapter,
    page: page,
  },
});

export const UPDATE_CHAPTER_PAGE = 'UPDATE_CHAPTER_PAGE';

export const updateChapterPage = (chapter, page) => ({
  type: UPDATE_CHAPTER_PAGE,
  payload: {
    id: chapter,
    page: page,
  },
});