import { 
	GET_CRYPTO_VALUES_BEGIN, 
	GET_CRYPTO_VALUES_SUCCESS, 
	GET_CRYPTO_VALUES_FAILURE,
	ADD_TO_WATCHLIST,
	REMOVE_FROM_WATCHLIST,
	GET_EXCHANGE_RATES_BEGIN,
	GET_EXCHANGE_RATES_SUCCESS,
	GET_EXCHANGE_RATES_FAILURE,
	LOAD_WATCHLIST,
	LOAD_CRYPTO,
	LOAD_RATES,
} from "./actions";

const INITIAL_STATE = {
    rates: [],
	cryptos: [],
	watchlist: [],
    loading: false,
    error: null,
}

const MainReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOAD_WATCHLIST: 
			return { ...state, watchlist: [...state.watchlist, ...action.payload.watchlist] }
		case LOAD_CRYPTO: 
			return { ...state, cryptos: [...state.cryptos, ...action.payload.cryptos] }
		case LOAD_RATES: 
			return { ...state, rates: [...state.rates, ...action.payload.rates] }
		case ADD_TO_WATCHLIST:
			return { ...state, watchlist: [ ...state.watchlist, action.payload.id ] }
		case REMOVE_FROM_WATCHLIST:
			return { ...state, watchlist: state.watchlist.filter(id => id !== action.payload.id) }
		case GET_CRYPTO_VALUES_BEGIN:
			return { ...state, loading: true };
		case GET_CRYPTO_VALUES_SUCCESS:            
			return { ...state, cryptos: action.payload.coins, loading: false };
		case GET_CRYPTO_VALUES_FAILURE:
			return { ...state, error: action.payload.error, loading: false };
		case GET_EXCHANGE_RATES_BEGIN:
			return { ...state, loading: true };
		case GET_EXCHANGE_RATES_SUCCESS:   
			return { ...state, rates: action.payload.rates, loading: false };
		case GET_EXCHANGE_RATES_FAILURE:
			return { ...state, error: action.payload.error, loading: false };
		default:
			return { ...state }
	}
}

export default MainReducer;