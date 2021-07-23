import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Tab from './Tab'
import COLORS from '../styles/Colors'

const { width } = Dimensions.get('screen')

const TabBar = ({ state, navigation, icons }) => {
	const [selected, setSelected] = useState('Home')
	const { routes } = state

	const renderColor = currentTab => currentTab === selected ? COLORS.pressed : COLORS.header   
	const handlePress = (activeTab, index) => {
		if(state.index !== index){
			setSelected(activeTab)
			navigation.navigate(activeTab)
		}
	}

	return (
		<View style={styles.wrapper}>
			<View style={styles.container}>
				{
					routes.map((route, index) => (
						<Tab 
							tab={route} 
							icon={icons[route.name]}
							onPress={ () => handlePress(route.name, index) }
							color={renderColor(route.name)} 
							selected={selected}
							key={route.key}
						/>
					))
				}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		//position: 'absolute',
		bottom: 0,
		width,
		height: '10%',
		//backgroundColor: Colors.header,
		justifyContent: 'space-evenly',
		
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		elevation: 5,
		height: '100%'
	},
})

export default TabBar