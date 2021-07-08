import React, { useState, useEffect } from 'react';
import { Modal as RNModal, StyleSheet, Text, TouchableHighlight, View, Dimensions } from 'react-native';
//import { useDataContext } from '../../context/DataContext';
import COLORS from '../../styles/Colors';
//import axios from 'axios';

const ModalItemDetail = ({ modalVisible, closeModal, itemSelected }) => {
	//const { getCryptoHistory } = useDataContext();
	const [loading, setLoading] = useState(false);
	const [values, setValues] = useState([]);

	/* useEffect(() => {
		if(itemSelected){
			setLoading(true);
			//let data = getCryptoHistory(itemSelected.name.toLowerCase(), '30');
			//console.log(data)
			console.log(itemSelected.name)
			axios(`https://api.coingecko.com/api/v3/coins/${itemSelected.name}/market_chart?vs_currency=usd&days=30&interval=daily`)
			.then(response => {
				setValues(response.data);
			})
			.catch(err => console.log(err));
			
			setLoading(false);
		}		
	}, [modalVisible]); */

	return (
		<RNModal animationType='fade' visible={modalVisible}>
			<View style={styles.screen}>
				{
					!loading && 
					<View style={styles.container}>
						<Text style={styles.message}>
							<Text style={styles.selectedName}>
								{` ${itemSelected.name} ${itemSelected.value} ${itemSelected.currency}`}
							</Text>						
						</Text>
						<View style={styles.buttonContainer}>
							<TouchableHighlight style={{...styles.button, ...styles.cancelButton}} onPress={() => closeModal('detail')}>
								<Text style={styles.buttonText}> Cancelar </Text>
							</TouchableHighlight>
							<TouchableHighlight style={{...styles.button, ...styles.confirmButton}} onPress={() => console.log('asdasd')}>
								<Text style={styles.buttonText}> Eliminar </Text>
							</TouchableHighlight>
						</View>
					</View>
				}				
			</View>						
		</RNModal>
	);
};

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
	screen: {
		
		height: 80,
	},	
	container: {
		marginVertical: height * .33,
		/* maxWidth: width *.77,
		padding: width * .025, */
		justifyContent: 'center',
		alignSelf: 'center',
		backgroundColor: COLORS.background,
		borderRadius: 10,
		borderColor: COLORS.auxiliary,
		borderWidth: 1,
	},
	message: {
		color: 'white',
		fontSize: width * .045,
		lineHeight: width * .075,
		marginHorizontal: width * .025,
		fontFamily: 'montserrat-regular',
		textAlign: 'center',
	},
	selectedName: {
		fontFamily: 'montserrat-italic',
	},
	buttonContainer: {
		marginTop: height * .03,
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
	button: {
		borderRadius: 20,
		width: width * 0.26, 
		justifyContent: 'center',
		alignItems: 'center',
		padding: width * .025,
		marginVertical: height * .006,
	}, 
	buttonText: {
		color: COLORS.mainFont,
		fontFamily: 'montserrat-regular',
	},
	cancelButton: {
		backgroundColor: 'darkgrey',
	},
	confirmButton: {
		backgroundColor: COLORS.secondary,
	}
});

export default ModalItemDetail;