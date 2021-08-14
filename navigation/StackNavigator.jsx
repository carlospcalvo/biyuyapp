import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ItemDetail from '../screens/ItemDetail';
import MainScreen from '../screens/MainScreen';
import CryptoListScreen from '../screens/CryptoListScreen';
import RatesListScreen from '../screens/RatesListScreen';
import COLORS from '../styles/Colors';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
	return (
		<Stack.Navigator mode='modal' /* screenOptions={{
			headerTitle: () => <Header/>
		  }} */ >
			<Stack.Screen 
				name="Home"
				component={MainScreen}
				options={ () => ({
					title: 'Biyuyapp',
					headerStyle: {
						backgroundColor: COLORS.header,
					},
					headerTintColor: COLORS.mainFont,
					headerTitleStyle: {
						fontSize: 20,
						fontFamily: 'montserrat-bold',
						textAlign: 'center'
					}					
				})}
			/>
			<Stack.Screen 
				name="Detail" 
				component={ItemDetail}
				options={ () => ({
					title: 'Biyuyapp',
					headerStyle: {
						backgroundColor: COLORS.header,
					},
					headerTintColor: COLORS.mainFont,
					headerTitleStyle: {
						fontSize: 20,
						fontFamily: 'montserrat-bold',
						textAlign: 'center'
					},
					headerBackTitle: 'Volver'					
				})}
			/>
		</Stack.Navigator>
	);
};

const CurrenciesStackNavigator = () => {
	return (
		<Stack.Navigator mode='modal' /* screenOptions={{
			headerShown: false
		  }} */
		  >
			<Stack.Screen 
				name="Monedas"
				component={RatesListScreen}
				options={ () => ({
					title: 'Biyuyapp',
					headerStyle: {
						backgroundColor: COLORS.header,
					},
					headerTintColor: COLORS.mainFont,
					headerTitleStyle: {
						fontSize: 20,
						fontFamily: 'montserrat-bold',
						textAlign: 'center'
					}					
				})}
			/>
			<Stack.Screen 
				name="Detail" 
				component={ItemDetail}
				options={ () => ({
					title: 'Biyuyapp',
					headerStyle: {
						backgroundColor: COLORS.header,
					},
					headerTintColor: COLORS.mainFont,
					headerTitleStyle: {
						fontSize: 20,
						fontFamily: 'montserrat-bold',
						textAlign: 'center'
					},
					headerBackTitle: 'Volver'				
				})}
			/>
		</Stack.Navigator>
	);
};

const CryptoStackNavigator = () => {
	return (
		<Stack.Navigator mode='modal'>
			<Stack.Screen 
				name="Cryptos"
				component={CryptoListScreen}
				options={ () => ({
					title: 'Biyuyapp',
					headerStyle: {
						backgroundColor: COLORS.header,
					},
					headerTintColor: COLORS.mainFont,
					headerTitleStyle: {
						fontSize: 20,
						fontFamily: 'montserrat-bold',
						textAlign: 'center'
					}					
				})}
			/>
			<Stack.Screen 
				name="Detail" 
				component={ItemDetail}
				options={ () => ({
					title: 'Biyuyapp',
					headerStyle: {
						backgroundColor: COLORS.header,
					},
					headerTintColor: COLORS.mainFont,
					headerTitleStyle: {
						fontSize: 20,
						fontFamily: 'montserrat-bold',
						textAlign: 'center'
					},
					headerBackTitle: 'Volver'					
				})}
			/>
		</Stack.Navigator>
	);
};


export {
	HomeStackNavigator,
	CurrenciesStackNavigator,
	CryptoStackNavigator
};


