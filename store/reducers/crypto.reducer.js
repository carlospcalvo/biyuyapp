import { GET_CRYPTO_VALUES_BEGIN, GET_CRYPTO_VALUES_SUCCESS, GET_CRYPTO_VALUES_FAILURE } from "../actions/crypto.action";

const INITIAL_STATE = {
    items: [],
    loading: false,
    error: null,
};

const CryptoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CRYPTO_VALUES_BEGIN:
            return { ...state, loading: true };
        case GET_CRYPTO_VALUES_SUCCESS:            
            return { ...state, items: action.payload.coins, loading: false };
        case GET_CRYPTO_VALUES_FAILURE:
            return { ...state, error: action.payload.error, loading: false };
        default:
            return { ...state };
    }
};

export default CryptoReducer;

//Combinar los 3 reducers en uno solo, facilita la actualizacion de los items de la watchlist