import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBar from './TabBar'
import MainScreen from '../screens/MainScreen'
import PriceListScreen from '../screens/PriceListScreen'
import { FontAwesome, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import COLORS from '../styles/Colors';
import { useDataContext } from '../context/DataContext'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
	const {watchlist, currencies, cryptos} = useDataContext()

	const icons = {
		Home: <FontAwesome name="home" size={24} color={COLORS.mainFont} />,
		Monedas: <Fontisto name="money-symbol" size={24} color={COLORS.mainFont} />,
		Cryptos: <MaterialCommunityIcons name="finance" size={24} color={COLORS.mainFont} />
	}		

	//const handleChangeWatchlist = newList => setWatchList(newList) 

	return (
		<Tab.Navigator initialRouteName='Home' tabBar={ props => <TabBar {...props} icons={icons}/>}>
			<Tab.Screen 
				name="Home" 
				children={ () => <MainScreen 
					watchlist={watchlist} 
					currencies={currencies}
					cryptos={cryptos}	
					/>
				}
			/>
			<Tab.Screen 
				name="Monedas" 
				children={ () => <PriceListScreen 
					prices={currencies}
					title="Tipos de cambio"	
					/>
				}
			/>
			<Tab.Screen 
				name="Cryptos" 
				children={ () => <PriceListScreen 
					prices={cryptos}
					title="Criptomonedas"	
					/>
				}
			/>
			
		</Tab.Navigator>
	)
}

const styles = StyleSheet.create({

})

export default TabNavigator