import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ModalAddItem from './Modals/ModaAddlItem';
import { useSelector } from 'react-redux';
import COLORS from '../styles/Colors';

const AddItem = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const watchlist = useSelector(state => state.watchlist.items);
	const cryptos = useSelector(state => state.cryptos.items);
	const rates = useSelector(state => state.rates.items);
	
	const handleModalClose = () => setModalVisible(false);

	const handleModalOpen = () => setModalVisible(true);

	let data = [
		{ title: "Tipos de cambio", data: rates },
		{ title: "Criptomonedas", data: cryptos }
	]

	return (
		<View style={styles.inputContainer}>
			<TouchableOpacity style={{...styles.button, ...styles.addButton}} onPress={() => handleModalOpen()}>
				<Ionicons name="add-circle-outline" size={48} color={COLORS.auxiliary} />
			</TouchableOpacity> 
			<ModalAddItem 
				modalVisible={modalVisible} 
				closeModal={handleModalClose} 
				data={data}
				watchlist={watchlist}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		//flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: '2.5%',
	},
	button: {
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		//padding: 10,
		//marginVertical: 5
	},
	addButton: {
		//backgroundColor: COLORS.primary,
		padding: 0
		//width: 90,
	},
});


export default AddItem;


