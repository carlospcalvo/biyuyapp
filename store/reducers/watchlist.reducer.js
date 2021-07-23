import { RATES } from "../../data/rates";
import { CRYPTOS } from "../../data/cryptos";
import { GET_DATA, ADD_ITEM, DELETE_ITEM } from "../actions/watchlist.action";

const ASSETS = RATES.concat(CRYPTOS);

console.log('[watchlist.reducer] assets',ASSETS);

const WATCHLIST = [
    {id: 1000, name: 'Dólar Oficial', tag: 'dolar_oficial', value: 101, prev_value: 101, currency: 'ARS'},
    {id: 1001, name: 'Dólar Solidario', tag: 'dolar_solidario', value: 167.19, prev_value: 167.11, currency: 'ARS'},
    {id: 1002, name: 'Dólar Blue', tag: 'dolar_blue', value: 170, prev_value: 171, currency: 'ARS'},
    CRYPTOS[0],
    CRYPTOS[1],
    CRYPTOS[2]
]

const INITIAL_STATE = {
    items: WATCHLIST,
    selected: null,

};

const WatchlistReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_DATA:
            return { ...state }
            break;
        case ADD_ITEM:
            //TODO 
            
            return { ...state, items: [...state.items, ASSETS.find(item => item.id === action.assetID) ]};
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