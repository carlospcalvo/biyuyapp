import React, {useState} from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Header from '../components/Header'
import AddItem from '../components/AddItem'
import AssetList from '../components/AssetList/AssetList'
import COLORS from '../styles/Colors'
import { useNavigation } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWatchlist } from '../store/actions/watchlist.action'
 
//{ watchlist, currencies, cryptos }
const MainScreen = () => {
	const watchlist = useSelector(state => state.watchlist.items);
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const handleDelete = selected => dispatch(removeFromWatchlist(selected.id));


	return (
		<>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={styles.content}>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Tu watchlist</Text>
					</View>
					<AssetList data={watchlist} onDelete={handleDelete} navigation={navigation}/>
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

export default MainScreen;