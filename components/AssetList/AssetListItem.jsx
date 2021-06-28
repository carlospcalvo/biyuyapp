import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import COLORS from '../../styles/Colors'

const AssetListItem = ({item, handleModal}) => {
	return (
		item &&
		<View style={styles.listItem}>
			<TouchableHighlight 
				style={{width: '100%'}} 
				onLongPress={() => handleModal(item.id)}
				activeOpacity={0.5}
				underlayColor={COLORS.pressed}
				>
				<View style={styles.asset}>
					<View style={styles.textContainer} >
						<Text style={styles.assetName}>{item.name}</Text>
						{ item.ticker && <Text style={styles.assetTicker}>{item.ticker}</Text> }
					</View>
					<View style={styles.priceContainer}>
						<Text style={styles.assetPrice}>{`${item.value} ${item.currency}`}</Text>
					</View>					
				</View>				
			</TouchableHighlight>			
		</View>
	);
}

const styles = StyleSheet.create({
	listItem: {
		alignItems: 'center',
		height: 50,
		/* width: '100%', */
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
		color: '#13ba15',
		textAlign: 'right'
	},
});

export default AssetListItem;
