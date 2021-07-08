import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Header from '../components/Header'
import AssetList from '../components/AssetList/AssetList'
import { useDataContext } from '../context/DataContext'
import COLORS from '../styles/Colors'
import { useNavigation } from '@react-navigation/native'


const PriceListScreen = ({ prices, title }) => {
	const navigation = useNavigation();

	return (
		<>
			<View style={styles.content}>
				<Header/>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{title}</Text>
				</View>
				<AssetList data={prices} navigation={navigation}/>
			</View>
			<StatusBar style="light"/>		
		</>
	)
}

const styles = StyleSheet.create({
	content: {
		backgroundColor: COLORS.background,
		/* padding: 30, */
		width: '100%',
		paddingTop: 25,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	titleContainer: {
		paddingTop: 20
	},
	title: {
		color: COLORS.mainFont,
		fontFamily: 'montserrat-bold',
		fontSize: 20
	}
})

export default PriceListScreen