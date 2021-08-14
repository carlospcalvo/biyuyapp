import { 
	GET_CRYPTO_VALUES_BEGIN, 
	GET_CRYPTO_VALUES_SUCCESS, 
	GET_CRYPTO_VALUES_FAILURE,
	ADD_TO_WATCHLIST,
	REMOVE_FROM_WATCHLIST,
	GET_EXCHANGE_RATES_BEGIN,
	GET_EXCHANGE_RATES_SUCCESS,
	GET_EXCHANGE_RATES_FAILURE,
} from "./actions";

const INITIAL_STATE = {
    rates: [],
	cryptos: [],
	watchlist: ["dolar_blue", "bitcoin", "ethereum"],
    loading: false,
    error: null,
}

const MainReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_TO_WATCHLIST:
			return { ...state, watchlist: state.watchlist.concat(action.payload.id) }
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