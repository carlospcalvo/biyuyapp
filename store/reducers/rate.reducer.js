import { GET_EXCHANGE_RATES_BEGIN, GET_EXCHANGE_RATES_SUCCESS, GET_EXCHANGE_RATES_FAILURE } from "../actions/rate.action";

const INITIAL_STATE = {
    items: [],
    loading: false,
    error: null,
};

const RateReducer = (state = INITIAL_STATE, action) => { 
    switch (action.type) {
        case GET_EXCHANGE_RATES_BEGIN:
            return { ...state, loading: true };
        case GET_EXCHANGE_RATES_SUCCESS:   
            return { ...state, items: action.payload.rates, loading: false };
        case GET_EXCHANGE_RATES_FAILURE:
            return { ...state, error: action.payload.error, loading: false };
        default:
            return { ...state };
    }
}

export default RateReducer;
