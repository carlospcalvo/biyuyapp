import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RATES_API_URL, RATES_API_TOKEN } from '@env';
import axios from 'axios';
import Chart from '../components/Chart';
import COLORS from '../styles/Colors';

const ItemDetail = ({route}) => {
	const { item } = route.params;
	const [data, setData] = useState([0]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	let historyAvailable = true && item.sparkline?.length > 0;
	let priceColor = item.prev_value != item.value ? item.prev_value > item.value ? 'red' : '#13ba15' : 'lightgrey';
	let variation;

	if(item.value > item.prev_value){
		variation = `+ ${((item.value / item.prev_value - 1) * 100).toFixed(2)} %`;
	} else if (item.value < item.prev_value){
		variation = `- ${((1 - item.value / item.prev_value) * 100).toFixed(2)} %`;
	} else {
		variation = '0 %';
	}

	const getHistoricalValues = async asset => {
		try {
			let response;
			let prices;
			if (item.currency === 'USD'){
				response = await axios(`https://api.coingecko.com/api/v3/coins/${asset.id}/market_chart?vs_currency=usd&days=30&interval=daily`);
				prices = response.data.prices.map(item => item[1]);
			} else {
				response = await axios({
					url: `${RATES_API_URL}/historico/${item.id}`,
					method: 'GET',
					headers: {
						Authorization: `bearer ${RATES_API_TOKEN}`
					}
				});
				prices = response.data.map(item => item.value);
			}
			return prices;	
		} catch (error) {
			console.log(error.message);
			setError(error.message);
			return;
		}
	}

	useLayoutEffect(() => {
		setLoading(true);
		getHistoricalValues(item).then(values => setData(values));
		setLoading(false);
	}, [item]);

	return (
		<>
			<View style={styles.screen}>
				<View style={styles.content}>	
					<View style={styles.asset}>
						<View style={styles.textContainer} >
							<Text style={styles.assetName}>{item.name}</Text>
							{ item.ticker && <Text style={styles.assetTicker}>{item.ticker}</Text> }
						</View>
						<View>
							<Text style={{...styles.assetPrice, color: priceColor}}>{`${item.value} ${item.currency}`}</Text>
							<Text style={{...styles.variation, color: priceColor}}>{ variation }</Text>
						</View>					
					</View>	
					<View style={styles.chartContainer}>
						{
							loading 
							? <ActivityIndicator size="large" color={COLORS.secondary} />
							: !error
							? <Chart 
									asset={item} 
									historyAvailable={historyAvailable}
									rawData={data}
								/>
							: <Text style={styles.errorText} numberOfLines={2}>Hubo un error al obtener los datos, intenta nuevamente</Text> 
						}
					</View>					
				</View>
			</View>
			<StatusBar style="light"/>
		</>
	);
};

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
		justifyContent: 'space-evenly',
		alignItems: 'center'
	},
	chartContainer: {
		marginTop: '10%',
		paddingHorizontal: 0,
		marginHorizontal: -10
	},
	textContainer: {
		alignItems: 'center',	
	},
	asset:{
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingRight: 5
	},
	assetName: {
		fontSize: 20,
		fontFamily: 'montserrat-bold',
		color: COLORS.mainFont,
	},
	assetTicker: {
		fontSize: 15,
		fontFamily: 'montserrat-regular',
		color: 'lightgrey',
	},
	assetPrice: {
		fontSize: 20,
		fontFamily: 'montserrat-regular',
		textAlign: 'center'
	},
	variation: {
		fontFamily: 'montserrat-regular',
		textAlign: 'center'
	},	
	errorText: {
		color: 'red',
		textAlign: 'center'
	}
});

export default ItemDetail;