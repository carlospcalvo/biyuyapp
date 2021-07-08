import React, { useContext, useState } from 'react';
import axios from 'axios';
import * as date_fns from 'date-fns';
import {currencies_historical_values, crypto_historical_values} from './historical_values';

const DataContext = React.createContext([]);

export const DataContextProvider = ({ children }) => {
	
	const currencies = [
		{id: 1, name: 'Dólar Oficial', tag: 'dolar_oficial', value: 101, prev_value: 101, currency: 'ARS'},
		{id: 2, name: 'Dólar Solidario', tag: 'dolar_solidario', value: 167.19, prev_value: 167.11, currency: 'ARS'},
		{id: 3, name: 'Dólar Blue', tag: 'dolar_blue', value: 170, prev_value: 171, currency: 'ARS'},
		{id: 4, name: 'Dólar MEP', value: 163.53, prev_value: 163.53, currency: 'ARS'},
		{id: 5, name: 'Dólar CCL', value: 164.9, prev_value: 162, currency: 'ARS'},
		{id: 6, name: 'Dólar CCB', value: 169.45, prev_value: 164.50, currency: 'ARS'},
		{id: 7, name: 'Dólar Divisa', tag: 'dolar_divisa', value: 95.91, prev_value: 95.88, currency: 'ARS'},
		{id: 8, name: 'Euro Oficial', value: 108.59, prev_value: 108, currency: 'ARS'},
		{id: 9, name: 'Euro Blue', value: 187.1, prev_value: 188, currency: 'ARS'},
	]

	const cryptos = [
		{id: 100, ticker: 'BTC', name: 'Bitcoin', value: 31757.82, prev_value: 34233.20, currency: 'USD'},
		{id: 101, ticker: 'ETH', name: 'Ethereum', value: 2380.51, prev_value: 2320.51, currency: 'USD'},
		{id: 102, ticker: 'USDT', name: 'Tether', value: 1.01, prev_value: 1.01, currency: 'USD'},
		{id: 103, ticker: 'DOGE', name: 'Dogecoin', value: 0.24, prev_value: 0.3, currency: 'USD'},
		{id: 104, ticker: 'ADA', name: 'Cardano', value: 1.24, prev_value: 1.15, currency: 'USD'},
		{id: 105, ticker: 'XRP', name: 'Ripple', value: 0.6, prev_value: 0.7, currency: 'USD'},
		{id: 106, ticker: 'BAN', name: 'Banano', value: 0.01, prev_value: 0.007, currency: 'USD'},
		{id: 107, ticker: 'LTC', name: 'Litecoin', value: 122.98, prev_value: 118.88, currency: 'USD'},
	]

	/* const [watchlist, setWatchList] = useState(
		currencies[0],
		currencies[1],
		currencies[2],
		cryptos[0],
		cryptos[1],
		cryptos[2],
	) */

	const watchlist = [
		currencies[0],
		currencies[1],
		currencies[2],
		cryptos[0],
		cryptos[1],
		cryptos[2],
	]

	const getCurrenciesHistValues = currency => currencies_historical_values.map(values => ({date: values.date, value: parseFloat(values[currency])}));

	const getCryptoHistValues = ticker => crypto_historical_values[ticker].prices.map(values => {
		return {
			date: date_fns.format(date_fns.fromUnixTime(values[0]/1000), "dd/MM/yyyy"),
			value: parseFloat(values[1].toFixed(2))
		}
	})

    const value = { watchlist, currencies, cryptos, getCurrenciesHistValues, getCryptoHistValues }

	return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => {
    const context = useContext(DataContext)
    
    if(!context) 
        throw new Error('useDataContext must be used within DataContextProvider')
    return context
}

//for future API calls here
//https://stackoverflow.com/questions/57907129/update-react-context-using-a-rest-api-call-in-a-functional-component


