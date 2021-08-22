import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import COLORS from '../../styles/Colors';

const AssetListItem = ({ item, hidePrice = false }) => {
	let variation;
	let priceColor = item.prev_value != item.value ? item.prev_value > item.value ? 'red' : '#13ba15' : 'lightgrey';
	
	if(item.value > item.prev_value){
		variation = `+ ${((item.value / item.prev_value - 1) * 100).toFixed(2)} %`;
	} else if (item.value < item.prev_value){
		variation = `- ${((1 - item.value / item.prev_value) * 100).toFixed(2)} %`;
	} else {
		variation = '0 %';
	}
	
	return (
		item &&
		<View style={styles.listItem}>
			<View style={styles.asset}>
				<View style={item.ticker ? styles.textContainer : {...styles.textContainerNoTicker, marginTop: hidePrice ? 15 : 0}}>
					<Text style={styles.assetName}>{item.name}</Text>
					{ item.ticker && <Text style={styles.assetTicker}>{item.ticker}</Text> }
				</View>
				{
					!hidePrice && item.value > 0 &&
					<View style={styles.priceContainer}>
						<Text style={{...styles.assetPrice, color: priceColor}}>{`${item.value} ${item.currency}`}</Text>
						<Text style={{...styles.assetPriceVariation, color: priceColor, textAlign: 'right'}} >{variation}</Text>
					</View>	
				}				
			</View>			
		</View>
	);
}

const styles = StyleSheet.create({
	listItem: {
		alignItems: 'center',
		height: 60,
		marginVertical: 1,
		backgroundColor: COLORS.background,
		borderColor: COLORS.auxiliary,
		borderBottomWidth: 1,
		justifyContent: 'space-between',
	},
	asset:{
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingRight: 5,
	},
	textContainer: {
		justifyContent: 'center',	
		marginVertical: 5
	},
	textContainerNoTicker: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	priceContainer: {
		marginRight: 5,
		marginVertical: 5,
	},	
	assetName: {
		fontSize: 22,
		fontFamily: 'montserrat-regular',
		color: COLORS.mainFont,
		paddingHorizontal: 10,
	},
	assetTicker: {
		fontSize: 15,
		fontFamily: 'montserrat-regular',
		color: 'lightgrey',
		paddingHorizontal: 10,
	},
	assetPrice: {
		fontSize: 20,
		fontFamily: 'montserrat-regular',
		textAlign: 'right'
	},
	assetPriceVariation: {
		fontSize: 15,
		fontFamily: 'montserrat-regular',
	}
});

export default AssetListItem;
