import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';

import React from 'react';

const AssetListItem = ({data, handleModal}) => {
	return (
		<View style={styles.listItem}>
			<Text style={styles.listItemText}>{data.item.ticker}</Text>
			<TouchableHighlight style={{...styles.button, ...styles.removeButton}} onPress={() => handleModal(data.item.id)}>
				<Text style={styles.buttonText}>X</Text>
			</TouchableHighlight>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		marginVertical: 5
	},
	removeButton: {
		backgroundColor: 'red',
		width: 40,
	},
	buttonText: {
		color: 'white', 
		fontWeight: '800'
	},
	listItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 50,
		marginVertical: 5,
		marginRight: 5,
	},
	listItemText:{
		width: 225,
		color: 'white',
		borderColor: '#32E0C4',
		borderRadius: 20,
		borderWidth: 1,
		padding: 10,
		paddingLeft: 15,
		margin: 10
	}
});

export default AssetListItem;
