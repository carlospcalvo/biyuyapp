import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { connect, useDispatch } from 'react-redux';
import AssetList from '../components/AssetList/AssetList';
import { addToWatchlist, getRates } from '../store/actions';
import COLORS from '../styles/Colors';

const RatesListScreen = ( { rates, loading, error, watchlist, getRates } ) => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const handleAddToWatchlist = id => {
		if(!watchlist.includes(id)){
			dispatch(addToWatchlist(id));
			Alert.alert(
				"Tipo de cambio agregado!",
				`Se ha agregado el ${rates.find(item => item.id === id).name} a tu watchlist`,
				[
					{ text: "OK" }
				]
			);    
		} else {
			Alert.alert(
				"Error",
				`El ${rates.find(item => item.id === id).name} ya está en tu watchlist!`,
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
	rates: state.rates,
	loading: state.loading,
	error: state.error,
	watchlist: state.watchlist
})

const mapDispatchToProps = dispatch => ({
	getRates: () => dispatch(getRates())
})

export default connect(mapStateToProps, mapDispatchToProps)(RatesListScreen);