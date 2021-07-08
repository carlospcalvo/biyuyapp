import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDataContext } from '../context/DataContext';
import ItemDetail from '../screens/ItemDetail';
import MainScreen from '../screens/MainScreen';
import PriceListScreen from '../screens/PriceListScreen';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
	const {watchlist, currencies, cryptos} = useDataContext();
	return (
		<Stack.Navigator mode='modal' screenOptions={{
			headerShown: false
		  }}>
			<Stack.Screen 
				name="Home"
				children={() => (
					<MainScreen 
						watchlist={watchlist} 
						currencies={currencies} 
						cryptos={cryptos}	
					/>	
				)}
			/>
			<Stack.Screen 
				name="Detail" 
				component={ItemDetail}
			/>
		</Stack.Navigator>
	);
};

const CurrenciesStackNavigator = () => {
	const { currencies } = useDataContext();

	return (
		<Stack.Navigator mode='modal' screenOptions={{
			headerShown: false
		  }}>
			<Stack.Screen 
				name="Monedas"
				children={() => (
					<PriceListScreen 
						prices={currencies}
						title="Tipos de cambio"	
					/>	
				)}
			/>
			<Stack.Screen 
				name="Detail" 
				component={ItemDetail}
			/>
		</Stack.Navigator>
	);
};

const CryptoStackNavigator = () => {
	const { cryptos } = useDataContext();

	return (
		<Stack.Navigator mode='modal' screenOptions={{
			headerShown: false
		  }}>
			<Stack.Screen 
				name="Cryptos"
				children={() => (
					<PriceListScreen 
						prices={cryptos}
						title="Criptomonedas"	
					/>
				)}
			/>
			<Stack.Screen 
				name="Detail" 
				component={ItemDetail}
			/>
		</Stack.Navigator>
	);
};


export {
	HomeStackNavigator,
	CurrenciesStackNavigator,
	CryptoStackNavigator
};


