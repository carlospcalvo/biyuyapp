import { Modal as RNModal, StyleSheet, Text, TouchableHighlight, View } from 'react-native'

import React from 'react'

const ModalItem = ({modalVisible, closeModal, itemSelected, onDelete}) => {

	
	return (
		<RNModal animationType='slide' visible={modalVisible} transparent={true}>
			<View style={styles.screen}>
				<View style={styles.container}>
					<Text style={styles.message}>Estás seguro que deseas quitar {itemSelected.ticker} de tu lista?</Text>
					<View style={styles.buttonContainer}>
						<TouchableHighlight style={{...styles.button, ...styles.cancelButton}} onPress={closeModal}>
							<Text> Cancelar </Text>
						</TouchableHighlight>
						<TouchableHighlight style={{...styles.button, ...styles.confirmButton}} onPress={onDelete}>
							<Text> Eliminar </Text>
						</TouchableHighlight>
					</View>
				</View>
			</View>						
		</RNModal>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.7)',
	},	
	container: {
		marginVertical: 250,
		maxWidth: 300,
		padding: 10,
		justifyContent: 'center',
		alignSelf: 'center',
		backgroundColor: '#242526',
		borderRadius: 10,
		borderColor: '#32E0C4',
		borderWidth: 1,
	},
	message: {
		backgroundColor: '#242526',
		color: 'white',
		fontSize: 18,
		marginHorizontal: 10
	},
	buttonContainer: {
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
	button: {
		borderRadius: 20,
		width: 100, 
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		marginVertical: 5
	}, 
	cancelButton: {
		backgroundColor: 'darkgrey',
	},
	confirmButton: {
		backgroundColor: '#32E0C4',
	}
});



export default ModalItem
