import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import COLORS from '../styles/Colors';

const Tab = ({ tab, color, onPress, icon, selected }) => {
	return (
		<TouchableOpacity activeOpacity={0.9} onPress={onPress} style={{...styles.container, backgroundColor: color}}>
			{ icon ? icon : null }
			{ selected === tab.name && <Text style={{color: COLORS.mainFont}}>{tab.name}</Text>}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		borderRightColor: COLORS.pressed,
		borderRightWidth: 1,
		borderLeftColor: COLORS.pressed,
		borderLeftWidth: 1,
	}
})

export default Tab