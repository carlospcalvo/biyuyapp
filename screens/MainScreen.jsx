import React, { useState, useCallback } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Text, RefreshControl } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import AssetList from '../components/AssetList/AssetList'
import COLORS from '../styles/Colors'
import { useNavigation } from '@react-navigation/core';
import { useSelector, useDispatch, connect } from 'react-redux';
import { removeFromWatchlist } from '../store/actions/watchlist.action'
import { getCrypto } from '../store/actions/crypto.action'
import { getRates } from '../store/actions/rate.action'
 
const MainScreen = () => {
	const [refreshing, setRefreshing] = useState(false);
	const watchlist = useSelector(state => state.watchlist.items);
	//const cryptos = useSelector(state => state.cryptos.items);
	//const rates = useSelector(state => state.rates.items);
	const dispatch = useDispatch();
	const navigation = useNavigation();

	//handlers

	const handleDelete = selected => dispatch(removeFromWatchlist(selected.id));

	const handleRefresh = () => {
		setRefreshing(true);
		dispatch(getCrypto());
		dispatch(getRates());
		setRefreshing(false);
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
						refreshing={refreshing}
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

const mapStateToProps = state => ({
	items: state.items,
	//loading: state.loading,
	//error: state.error
})

const mapDispatchToProps = dispatch => ({
	//getRates: () => dispatch(getRates())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);