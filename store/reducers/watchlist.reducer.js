import { GET_DATA, ADD_ITEM, DELETE_ITEM } from "../actions/watchlist.action";

//const ASSETS = RATES.concat(CRYPTOS);

const INITIAL_STATE = {
    items: [],
};

const WatchlistReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_DATA:
            return { ...state }
            break;
        case ADD_ITEM:            
            return { ...state, items: [...state.items, action.payload.asset ]};
            //return {...state}
            break;
        case DELETE_ITEM: 
            return { ...state, items: state.items.filter(item => item.id !== action.assetID) };
            break;
        default:
            return { ...state };
            break;
    }
};

export default WatchlistReducer;