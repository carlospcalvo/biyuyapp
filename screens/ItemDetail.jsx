import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import Header from '../components/Header'
import COLORS from '../styles/Colors';
import { useDataContext } from '../context/DataContext';
import Chart from '../components/Chart';

const ItemDetail = ({route}) => {
	const { item } = route.params
	const { getCurrenciesHistValues, getCryptoHistValues } = useDataContext();
	let historyAvailable = [100, 101, 1, 2, 3, 7].includes(item.id);
	let data;

	if(historyAvailable) data = item.id < 100 ? getCurrenciesHistValues(item.tag) : getCryptoHistValues(item.name.toLowerCase());

	let priceColor = item.prev_value != item.value ? item.prev_value > item.value ? 'red' : '#13ba15' : 'lightgrey';

	return (
		<>
			<View style={styles.screen}>
				<Header/>
				<View style={styles.content}>	
					<View style={styles.asset}>
						<View style={styles.textContainer} >
							<Text style={styles.assetName}>{item.name}</Text>
							{ item.ticker && <Text style={styles.assetTicker}>{item.ticker}</Text> }
						</View>
						<View style={styles.priceContainer}>
							<Text style={{...styles.assetPrice, color: priceColor}}>{`${item.value} ${item.currency}`}</Text>
							<Text style={{...styles.variation, color: priceColor}}>
								{
									`${item.value === item.prev_value ?
									0 : item.value > item.prev_value ?
									((item.value / item.prev_value - 1) * 100).toFixed(2)
									: ((1 - item.value / item.prev_value) * 100).toFixed(2)} %`
								}
							</Text>
						</View>					
					</View>	
					<View style={styles.chartContainer}>
						<Chart 
							asset={item} 
							historyAvailable={historyAvailable}
							rawData={data}
						/>
					</View>					
				</View>
				
			</View>
			<StatusBar style="light"/>
		</>
	);
};

const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: COLORS.background,
		paddingTop: 25,	
	},
	content: {
		width: '100%',
		paddingTop: 25,
		paddingHorizontal: '5%',
		justifyContent: 'center',
		//alignItems: 'center'
	},
	chartContainer: {
		marginVertical: 25,
		
	},
	textContainer: {
		flexDirection: 'row',
		alignItems: 'center',	
	},
	priceContainer: {
		flexDirection: 'column',
	},
	asset:{
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingRight: 5
	},
	assetName: {
		fontSize: 22,
		fontFamily: 'montserrat-bold',
		color: COLORS.mainFont,
		padding: 10,
	},
	assetTicker: {
		fontSize: 15,
		fontFamily: 'montserrat-regular',
		color: 'lightgrey',
		padding: 10,
		marginTop: 4,
	},
	assetPrice: {
		fontSize: 20,
		fontFamily: 'montserrat-regular',
		textAlign: 'right'
	},
	variation: {
		fontFamily: 'montserrat-regular',
		textAlign: 'center'
	},	
});

export default ItemDetail;