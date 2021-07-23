import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import AssetList from '../components/AssetList/AssetList'
import COLORS from '../styles/Colors'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch, connect } from 'react-redux';
//import { useFocusEffect } from '@react-navigation/core';

const RatesListScreen = () => {
	const prices = useSelector(state => state.rates.items);
	const navigation = useNavigation();
	
/* 	useFocusEffect(
		useCallback(() => {
			if (assetType === 'Crypto') getCrypto();
		}, [])
	); */

	return (
		<>
			<View style={styles.content}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Tipos de Cambio</Text>
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
		width: '100%',
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
/* >>> TODO <<<
const mapStateToProps = state => ({
	items: state.items,
	loading: state.loading,
	error: state.error
})

const mapDispatchToProps = dispatch => ({
	getCrypto: () => dispatch(getCrypto())
}) */

//export default connect(mapStateToProps, mapDispatchToProps)(PriceListScreen);
export default RatesListScreen;