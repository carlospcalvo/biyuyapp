import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AssetList from '../components/AssetList/AssetList';
import { useNavigation } from '@react-navigation/native';
import { connect, useDispatch } from 'react-redux';
import { addToWatchlist, getCrypto, loadCrypto } from '../store/actions';
import * as date from 'date-fns';
import NetInfo from '@react-native-community/netinfo';
import COLORS from '../styles/Colors';

const CryptoListScreen = ({ prices, loading, error, watchlist, getCrypto, loadCrypto }) => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const handleAddToWatchlist = id => {
		if(!watchlist.includes(id)){
			dispatch(addToWatchlist(id));
			Alert.alert(
				"Criptomoneda agregada!",
				`Se ha agregado ${prices.find(item => item.id === id).name} a tu watchlist`,
				[
					{ text: "OK" }
				]
			);
		} else {
			Alert.alert(
				"Error",
				`${prices.find(item => item.id === id).name} ya está en tu watchlist!`,
				[
					{ text: "OK" }
				]
			);
		}  
	}

	useLayoutEffect(() => {
		NetInfo.fetch().then(async state => {
			console.log("Is connected?", state.isConnected);
			state.isConnected ? getCrypto() : loadCrypto()
		});
	}, [])

	return (
		<>
			<View style={styles.content}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Criptomonedas</Text>
					{
						!loading && prices && 
						<Text style={styles.lastUpdateText}>Última actualización: {date.format(new Date(date.fromUnixTime(prices[0].timestamp)), 'HH:mm dd/MM/yyyy')}</Text>
					}
				</View>
				{
					loading &&  
					<View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
						<ActivityIndicator color={"#fff"}/>
					</View>
				}
				{
					!loading && prices &&
					<AssetList 
						data={prices} 
						navigation={navigation} 
						refreshing={loading} 
						onRefresh={getCrypto}
						onAdd={handleAddToWatchlist}
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
		textAlign:'center', 
		color: COLORS.mainFont,
		fontFamily: 'montserrat-bold',
		fontSize: 20
	},
	lastUpdateText: {
		color: COLORS.auxiliary,
		fontFamily: 'montserrat-italic',
		fontSize: 10
	},
})

const mapStateToProps = state => ({
	prices: state.cryptos,
	loading: state.loading,
	error: state.error,
	watchlist: state.watchlist
})

const mapDispatchToProps = dispatch => ({
	loadCrypto: () => dispatch(loadCrypto()),
	getCrypto: () => dispatch(getCrypto())
})

export default connect(mapStateToProps, mapDispatchToProps)(CryptoListScreen);