import React, { useContext, useState } from 'react'
import axios from 'axios'

const DataContext = React.createContext([])

export const DataContextProvider = ({ children }) => {
	
	const currencies = [
		{id: 1, name: 'Dólar Oficial', value: 100.5, currency: 'ARS'},
		{id: 2, name: 'Dólar Solidario', value: 165.83, currency: 'ARS'},
		{id: 3, name: 'Dólar Blue', value: 174, currency: 'ARS'},
		{id: 4, name: 'Dólar MEP', value: 163.53, currency: 'ARS'},
		{id: 5, name: 'Dólar CCL', value: 164.9, currency: 'ARS'},
		{id: 6, name: 'Dólar CCB', value: 169.45, currency: 'ARS'},
		{id: 7, name: 'Dólar Divisa', value: 95.59, currency: 'ARS'},
		{id: 8, name: 'Euro Oficial', value: 108.59, currency: 'ARS'},
		{id: 9, name: 'Euro Blue', value: 187.1, currency: 'ARS'},
	]

	const cryptos = [
		{id: 100, ticker: 'BTC', name: 'Bitcoin', value: 31757.82, currency: 'USD'},
		{id: 101, ticker: 'ETH', name: 'Ethereum', value: 1790.38, currency: 'USD'},
		{id: 102, ticker: 'USDT', name: 'Tether', value: 1.01, currency: 'USD'},
		{id: 103, ticker: 'DOGE', name: 'Dogecoin', value: 0.24, currency: 'USD'},
		{id: 104, ticker: 'ADA', name: 'Cardano', value: 1.24, currency: 'USD'},
		{id: 105, ticker: 'XRP', name: 'Ripple', value: 0.6, currency: 'USD'},
		{id: 106, ticker: 'BAN', name: 'Banano', value: 0.01, currency: 'USD'},
		{id: 107, ticker: 'LTC', name: 'Litecoin', value: 122.98, currency: 'USD'},
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

    const value = { watchlist, currencies, cryptos }

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


