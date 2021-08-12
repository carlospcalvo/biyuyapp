import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import COLORS from '../styles/Colors';
import Chart from '../components/Chart';
import axios from 'axios';

const ItemDetail = ({route}) => {
	const { item } = route.params
	const [data, setData] = useState([0]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	let historyAvailable = true && item.sparkline?.length > 0;
	let priceColor = item.prev_value != item.value ? item.prev_value > item.value ? 'red' : '#13ba15' : 'lightgrey';

	const getHistoricalValues = async id => {
		try {
			let response = await axios(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`);
			let prices = response.data.prices.map(item => item[1]);
			return prices;	
		} catch (error) {
			setError(error.message);
			return;
		}
	}

	useLayoutEffect(() => {
		setLoading(true);
		if (item.currency === 'USD') { 
			getHistoricalValues(item.id).then(values => setData(values));
		} else {
			setData(item.sparkline);
		}
		setLoading(false);
	}, [item]);

	return (
		<>
			<View style={styles.screen}>
				{/* <Header/> */}
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
									`${item.prev_value && item.value < item.prev_value ? '-' : ''} ${item.value === item.prev_value ?
									0 : item.value > item.prev_value ?
									((item.value / item.prev_value - 1) * 100).toFixed(2)
									: ((1 - item.value / item.prev_value) * 100).toFixed(2)} %`
								}
							</Text>
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

/**
 
 */


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
		justifyContent: 'space-evenly',
		alignItems: 'center'
	},
	chartContainer: {
		marginTop: '10%',
		
	},
	textContainer: {
		//marginTop: '10%',
		flexDirection: 'row',
		alignItems: 'center',	
	},
	priceContainer: {
		//marginTop: '10%',
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
	errorText: {
		color: 'red',

	}
});

export default ItemDetail;