import { RATES } from "../../data/rates";
import { GET_VALUE, GET_HISTORICAL_VALUES } from "../actions/rate.action";

const INITIAL_STATE = {
    items: RATES,
    selected: null,

};

const RateReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_VALUE:
            const categoryIndex = state.rates.findIndex(cat => cat.id === action.categoryID);
            return categoryIndex === -1 ? { ...state } : { ...state, selected: state.rates[categoryIndex] };
            break;
        case GET_HISTORICAL_VALUES:

            break;
        default:
            return { ...state };
            break;
    }
};

export default RateReducer;