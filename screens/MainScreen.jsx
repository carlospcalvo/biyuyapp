import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Text, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, connect } from 'react-redux';
import AssetList from '../components/AssetList/AssetList';
import { getCrypto, getRates, loadWatchlist, removeFromWatchlist } from '../store/actions';
import COLORS from '../styles/Colors';
 
const MainScreen = ({ watchlist, loading, getCrypto, getRates, loadWatchlist }) => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	//handlers
	const handleDelete = id => dispatch(removeFromWatchlist(id));

	const handleRefresh = () => {
		getCrypto();
		getRates();
	} 

	return (
		<>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={styles.content}>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Tu watchlist</Text>
					</View>
					<AssetList 
						data={watchlist} 
						onDelete={handleDelete} 
						navigation={navigation} 
						refreshing={loading}
						onRefresh={handleRefresh}
					/>
				</View>
			</TouchableWithoutFeedback>
			<StatusBar style="light"/>		
		</>
	)	
}

const styles = StyleSheet.create({
	content: {
		backgroundColor: COLORS.background,
		width: '100%',
		flex: 1,
	},
	titleContainer: {
		paddingTop: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		color: COLORS.mainFont,
		fontFamily: 'montserrat-bold',
		fontSize: 20
	}

})

const mapStateToProps = state => {
	let crypto = state.cryptos.filter(item => state.watchlist.includes(item.id));
	let rates = state.rates.filter(item => state.watchlist.includes(item.id));

	let assets = [...crypto, ...rates];
	let watchlist = state.watchlist.map(id => assets.find(asset => asset.id === id));

	return {
		watchlist,
		loading: state.loading
	}
}

const mapDispatchToProps = dispatch => ({
	getRates: () => dispatch(getRates()),
	getCrypto: () => dispatch(getCrypto()),
	loadWatchlist: () => dispatch(loadWatchlist()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);