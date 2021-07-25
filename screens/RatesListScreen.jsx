import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import AssetList from '../components/AssetList/AssetList'
import COLORS from '../styles/Colors'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch, connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/core';
import { getRates } from '../store/actions/rate.action';

const RatesListScreen = ( { getRates } ) => {
	const { items: rates, loading, error} = useSelector(state => state.rates);
	//const loading = useSelector(state => state.rates.loading);
	const navigation = useNavigation();

	/* useFocusEffect(
		useCallback(() => {
			getRates();
		}, [])
	); */

	return (
		<>
			<View style={styles.content}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Tipos de Cambio</Text>
				</View>
				{
					loading &&  
					<View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
						<ActivityIndicator color={"#fff"}/>
					</View>
				}
				{
					!loading && rates &&
					<AssetList 
						data={rates} 
						navigation={navigation} 
						refreshing={loading} 
						onRefresh={getRates}
					/>	
				}
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

const mapStateToProps = state => ({
	items: state.items,
	loading: state.loading,
	error: state.error
})

const mapDispatchToProps = dispatch => ({
	getRates: () => dispatch(getRates())
})

export default connect(mapStateToProps, mapDispatchToProps)(RatesListScreen);
//export default RatesListScreen;