import axios from "axios";

export const GET_EXCHANGE_RATES_BEGIN = 'GET_EXCHANGE_RATES_BEGIN';
export const GET_EXCHANGE_RATES_SUCCESS = 'GET_EXCHANGE_RATES_SUCCESS';
export const GET_EXCHANGE_RATES_FAILURE = 'GET_EXCHANGE_RATES_FAILURE';

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

        let API_URL = 'https://biyuyapp-dolar-api.herokuapp.com/cotizaciones';
        let API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.Yml5dXlhcHA.jS1km6R__FkTEoyUxWczOsKuLpXsKdQWZ93_M-scztQ'
        
        return axios({ 
            url: API_URL,
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${API_TOKEN}`,
                "Access-Control-Allow-Origin": "*"
            },
        }).then(response => {
            if(response.status == 200){
                dispatch(getRatesSuccess(response.data));
            } else {
                dispatch(getRatesFailure(response.data));
            }
        }).catch(error => dispatch(getRatesFailure(error)))
    }
}