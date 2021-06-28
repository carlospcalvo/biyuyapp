import React, {useState} from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Header from '../components/Header'
import AddItem from '../components/AddItem'
import AssetList from '../components/AssetList/AssetList'
import COLORS from '../styles/Colors'
import { useDataContext } from '../context/DataContext'

const MainScreen = ({ watchlist, currencies, cryptos }) => {
	//const {watchlist, currencies, cryptos} = useDataContext()
	const [tickerList, setTickerList] = useState([...watchlist])

	//Hanlders
	const handleAdd = (asset) => {
		if(!tickerList.some(element => element.id === asset.id)){
			setTickerList([...tickerList, asset])
		} 
	}

	const handleDelete = selected => setTickerList(tickerList.filter(item => item.id !== selected.id))

	return (
		<>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={styles.content}>
					<Header/>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Tu watchlist</Text>
					</View>
					{/* <AddItem onAdd={handleAdd}/> */}
					<AssetList data={tickerList} onDelete={handleDelete}/>
				</View>
			</TouchableWithoutFeedback>
			<StatusBar style="light"/>		
		</>
)	
}

/*
pleta de colores https://colorhunt.co/palette/eeeeee32e0c40d7377212121
*/

const styles = StyleSheet.create({
	content: {
		backgroundColor: COLORS.background,
		/* padding: 30, */
		width: '100%',
		paddingTop: 25,
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

export default MainScreen