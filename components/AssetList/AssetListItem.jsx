import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import COLORS from '../../styles/Colors'

const AssetListItem = ({ item, hidePrice = false }) => {
	let priceColor = item.prev_value != item.value ? item.prev_value > item.value ? 'red' : '#13ba15' : 'lightgrey';
	return (
		item &&
		<View style={styles.listItem}>
			<View style={styles.asset}>
				<View style={styles.textContainer}>
					<Text style={styles.assetName}>{item.name}</Text>
					{ item.ticker && <Text style={styles.assetTicker}>{item.ticker}</Text> }
				</View>
				{
					!hidePrice && item.value > 0 &&
					<View style={styles.priceContainer}>
						<Text style={{...styles.assetPrice, color: priceColor}}>{`${item.value} ${item.currency}`}</Text>
					</View>	
				}				
			</View>			
		</View>
	);
}

const styles = StyleSheet.create({
	listItem: {
		alignItems: 'center',
		height: 50,
		marginVertical: 1,
		borderColor: COLORS.auxiliary,
		borderBottomWidth: 1,
		justifyContent: 'space-between',
	},
	textContainer: {
		flexDirection: 'row',
		alignItems: 'center',	
	},
	priceContainer: {
		
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
		fontFamily: 'montserrat-regular',
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
});

export default AssetListItem;
