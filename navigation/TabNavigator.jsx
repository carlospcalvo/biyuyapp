import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeStackNavigator, CurrenciesStackNavigator, CryptoStackNavigator } from './StackNavigator';
import TabBar from './TabBar'
import COLORS from '../styles/Colors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	const icons = {
		Home: <FontAwesome name="home" size={24} color={COLORS.mainFont} />,
		Monedas: <Fontisto name="money-symbol" size={24} color={COLORS.mainFont} />,
		Cryptos: <MaterialCommunityIcons name="finance" size={24} color={COLORS.mainFont} />
	}		

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
	);
}

export default TabNavigator;