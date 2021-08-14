import axios from "axios";
import { RATES_API_URL, RATES_API_TOKEN } from '@env';

export const ADD_TO_WATCHLIST = 'ADD_TO_WATCHLIST';
export const REMOVE_FROM_WATCHLIST = 'REMOVE_FROM_WATCHLIST';

export const GET_CRYPTO_VALUES_BEGIN = 'GET_CRYPTO_VALUES_BEGIN';
export const GET_CRYPTO_VALUES_SUCCESS = 'GET_CRYPTO_VALUES_SUCCESS';
export const GET_CRYPTO_VALUES_FAILURE = 'GET_CRYPTO_VALUES_FAILURE';

export const GET_EXCHANGE_RATES_BEGIN = 'GET_EXCHANGE_RATES_BEGIN';
export const GET_EXCHANGE_RATES_SUCCESS = 'GET_EXCHANGE_RATES_SUCCESS';
export const GET_EXCHANGE_RATES_FAILURE = 'GET_EXCHANGE_RATES_FAILURE';

// Common actions

export const addToWatchlist = id => ({
    type: ADD_TO_WATCHLIST,
    payload: { id }
});

export const removeFromWatchlist = id => ({
    type: REMOVE_FROM_WATCHLIST,
    payload: { id }
});

// Cryptos

export const getCryptosBegin = () => ({
    type: GET_CRYPTO_VALUES_BEGIN
});

export const getCryptoSuccess = coins => ({
    type: GET_CRYPTO_VALUES_SUCCESS,
    payload: {coins},
});

export const getCryptoFailure = error => ({
    type: GET_CRYPTO_VALUES_FAILURE,
    payload: {error}
});

export const getCrypto = (currency = 'usd', orderBy = 'market_cap_desc', sparkline = true, priceChangePerc = '30d', perPage = 30, page = 1) => {
    return dispatch => {
        dispatch(getCryptosBegin());
        
        let API_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`;

        return axios(API_URL).then(response => {
            if(response.status == 200){
                let info = response.data.map(crypto => ({
                    id: crypto.id,
                    name: crypto.name,
                    ticker: crypto.symbol.toUpperCase(),
                    value: crypto.current_price,
                    prev_value: crypto.current_price - crypto.price_change_24h,
                    currency: 'USD',
                    sparkline: crypto.sparkline_in_7d.price
                }));
                dispatch(getCryptoSuccess(info));
            } else {
                dispatch(getCryptoFailure(response.data));
            }
        }).catch(error => dispatch(getCryptoFailure(error)));
    }
}

// Rates

export const getRatesBegin = () => ({
    type: GET_EXCHANGE_RATES_BEGIN
})

export const getRatesSuccess = rates => ({
    type: GET_EXCHANGE_RATES_SUCCESS,
    payload: { rates },
});

export const getRatesFailure = error => ({
    type: GET_EXCHANGE_RATES_FAILURE,
    payload: { error }
})

export const getRates = () => {
    return dispatch => {
        dispatch(getRatesBegin());
        
        return axios({ 
            url: RATES_API_URL,
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${RATES_API_TOKEN}`,
                "Access-Control-Allow-Origin": "*"
            },
        }).then(response => {
            if(response.status == 200){
                dispatch(getRatesSuccess(response.data));
            } else {
                dispatch(getRatesFailure(response.data));
            }
        }).catch(error => dispatch(getRatesFailure(error)));
    }
}
