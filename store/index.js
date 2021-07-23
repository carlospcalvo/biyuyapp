import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

//reducers 

import RateReducer from "./reducers/rate.reducer";
import CryptoReducer from "./reducers/crypto.reducer";
import WatchlistReducer from "./reducers/watchlist.reducer";


const RootReducer = combineReducers({
    rates: RateReducer,
    cryptos: CryptoReducer,
    watchlist: WatchlistReducer
})

export default createStore(RootReducer, applyMiddleware(thunk));

