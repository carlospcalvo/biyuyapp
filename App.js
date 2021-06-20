import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import AddItem from './components/AddItem';
import AssetList from './components/AssetList/AssetList'
import { StatusBar } from 'expo-status-bar';

export default function App() {
	const [tickerList, setTickerList] = useState([{id: 66, ticker: 'BTC'}, {id: 501, ticker: 'USDT'}, {id: 166, ticker: 'ETH'}])

	//Hanlders
	const handleAdd = (asset) => {
		if(!tickerList.some(element => element.ticker === asset.ticker)){
			setTickerList([...tickerList, asset])
		} 
	}

	const handleDelete = selected => setTickerList(tickerList.filter(item => item.id !== selected.id))

	return (
		<View style={styles.screen}>
			<AddItem onAdd={handleAdd}/>
			<AssetList data={tickerList} onDelete={handleDelete}/>
			<StatusBar style="light" />
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		backgroundColor: '#131722',
		padding: 30,
		paddingTop: 40,
		flex: 1,
	}
});


/*
pleta de colores https://colorhunt.co/palette/eeeeee32e0c40d7377212121
*/