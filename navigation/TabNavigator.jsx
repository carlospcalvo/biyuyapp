import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBar from './TabBar'
//import MainScreen from '../screens/MainScreen'
//import PriceListScreen from '../screens/PriceListScreen'
import { FontAwesome, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import COLORS from '../styles/Colors';
//import { useDataContext } from '../context/DataContext'
import { HomeStackNavigator, CurrenciesStackNavigator, CryptoStackNavigator } from './StackNavigator'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
	//const {watchlist, currencies, cryptos} = useDataContext()

	const icons = {
		Home: <FontAwesome name="home" size={24} color={COLORS.mainFont} />,
		Monedas: <Fontisto name="money-symbol" size={24} color={COLORS.mainFont} />,
		Cryptos: <MaterialCommunityIcons name="finance" size={24} color={COLORS.mainFont} />
	}		

	//const handleChangeWatchlist = newList => setWatchList(newList) 

	return (
		<Tab.Navigator 
			sceneContainerStyle={{flex: 1, backgroundColor: COLORS.background}}
			initialRouteName='Home' 
			tabBar={ props => <TabBar {...props} icons={icons}/>}
			screenOptions={{unmountOnBlur: true}}	
		>
			<Tab.Screen 
				name="Home" 
				component={HomeStackNavigator}
			/>
			<Tab.Screen 
				name="Monedas" 
				component={CurrenciesStackNavigator}
			/>
			<Tab.Screen 
				name="Cryptos" 
				component={CryptoStackNavigator}
			/>
			
		</Tab.Navigator>
	)
}

const styles = StyleSheet.create({

})

export default TabNavigator