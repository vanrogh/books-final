export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

export const addToFavorites = (book) => ({
    type: ADD_TO_FAVORITES,
    payload: book,
});

export const removeFromFavorites = (id) => ({
    type: REMOVE_FROM_FAVORITES,
    payload: id,
});