import axios from "axios";

export const GET_CRYPTO_VALUES_BEGIN = 'GET_CRYPTO_VALUES_BEGIN';
export const GET_CRYPTO_VALUES_SUCCESS = 'GET_CRYPTO_VALUES_SUCCESS';
export const GET_CRYPTO_VALUES_FAILURE = 'GET_CRYPTO_VALUES_FAILURE';

export const getCryptosBegin = () => ({
    type: GET_CRYPTO_VALUES_BEGIN
})

export const getCryptoSuccess = coins => ({
    type: GET_CRYPTO_VALUES_SUCCESS,
    payload: {coins},
});

export const getCryptoFailure = error => ({
    type: GET_CRYPTO_VALUES_FAILURE,
    payload: {error}
})

export const getCrypto = (currency = 'usd', orderBy = 'market_cap_desc', sparkline = true, priceChangePerc = '30d', perPage = 20, page = 1) => {
    return dispatch => {
        dispatch(getCryptosBegin());

        let API_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`

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
                }))
                dispatch(getCryptoSuccess(info));
            } else {
                dispatch(getCryptoFailure(response.data));
            }
        }).catch(error => dispatch(getCryptoFailure(error)))
    }
}