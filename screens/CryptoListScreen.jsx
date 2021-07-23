import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Header from '../components/Header'
import AssetList from '../components/AssetList/AssetList'
import { useDataContext } from '../context/DataContext'
import COLORS from '../styles/Colors'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch, connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/core';
import { getCrypto } from '../store/actions/crypto.action';

const CryptoListScreen = ({ getCrypto }) => {
	const prices = useSelector(state => state.cryptos.items)
	const loading = useSelector(state => state.cryptos.loading)
	const navigation = useNavigation();

	useFocusEffect(
		useCallback(() => {
			getCrypto();
		}, [])
	);

	return (
		<>
			<View style={styles.content}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Criptomonedas</Text>
				</View>
				{
					loading &&  
					<View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
						<ActivityIndicator color={"#fff"}/>
					</View>
				}
				{
					!loading && prices &&
					<AssetList data={prices} navigation={navigation}/>	
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
	getCrypto: () => dispatch(getCrypto())
})

export default connect(mapStateToProps, mapDispatchToProps)(CryptoListScreen);