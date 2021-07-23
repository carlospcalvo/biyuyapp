export const GET_DATA = 'GET_DATA';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export const getWatchlistValues = ids => ({
    type: GET_DATA,
    assetIDs: ids,
});

export const addToWatchlist = id => ({
    type: ADD_ITEM,
    assetID: id
});

export const removeFromWatchlist = id => ({
    type: DELETE_ITEM,
    assetID: id,
});

