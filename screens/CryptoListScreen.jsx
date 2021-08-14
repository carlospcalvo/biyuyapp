import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import AssetList from '../components/AssetList/AssetList'
import COLORS from '../styles/Colors'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux';
import { getCrypto } from '../store/actions';

const CryptoListScreen = ({ prices, loading, error, getCrypto }) => {
	const navigation = useNavigation();

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
	error: state.error
})

const mapDispatchToProps = dispatch => ({
	getCrypto: () => dispatch(getCrypto())
})

export default connect(mapStateToProps, mapDispatchToProps)(CryptoListScreen);