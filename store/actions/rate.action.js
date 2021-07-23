export const GET_VALUE = 'GET_VALUE';
export const GET_HISTORICAL_VALUES = 'GET_HISTORICAL_VALUES';

export const getRate = id => ({
    type: GET_VALUE,
    rateID: id,
});

export const getHistoricalRate = id => ({
    type: GET_HISTORICAL_VALUES,
    rateID: id,
});