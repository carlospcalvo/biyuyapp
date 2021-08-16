import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AssetList from '../components/AssetList/AssetList';
import { useNavigation } from '@react-navigation/native';
import { connect, useDispatch } from 'react-redux';
import { addToWatchlist, getCrypto } from '../store/actions';
import COLORS from '../styles/Colors';

const CryptoListScreen = ({ prices, loading, error, watchlist, getCrypto }) => {
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
		color: COLORS.mainFont,
		fontFamily: 'montserrat-bold',
		fontSize: 20
	}
})

const mapStateToProps = state => ({
	prices: state.cryptos,
	loading: state.loading,
	error: state.error,
	watchlist: state.watchlist
})

const mapDispatchToProps = dispatch => ({
	getCrypto: () => dispatch(getCrypto())
})

export default connect(mapStateToProps, mapDispatchToProps)(CryptoListScreen);