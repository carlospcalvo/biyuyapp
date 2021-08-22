import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ModalAddItem from './Modals/ModalAddlItem';
import { useSelector } from 'react-redux';
import COLORS from '../styles/Colors';

const AddItem = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const watchlist = useSelector(state => state.watchlist);
	
	const handleModalClose = () => setModalVisible(false);

	const handleModalOpen = () => setModalVisible(true);

	return (
		<View style={styles.inputContainer}>
			{
				watchlist.length === 0 && 
				<View style={styles.emptyListMessageContainer}>
					<Text style={styles.emptyListMessage}>Aún no agregaste nada a tu watchlist!</Text>
				</View>
			}
			<TouchableOpacity style={{...styles.button, ...styles.addButton}} onPress={() => handleModalOpen()}>
				<Ionicons name="add-circle-outline" size={48} color={COLORS.auxiliary} />
			</TouchableOpacity> 
			<ModalAddItem 
				modalVisible={modalVisible} 
				closeModal={handleModalClose} 
				watchlist={watchlist}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: '2.5%',
	},
	button: {
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},
	addButton: {
		padding: 0
	},
	emptyListMessageContainer: {
		marginBottom: '5%',

	},
	emptyListMessage: {
		color: COLORS.mainFont,
		fontFamily: 'montserrat-regular'
	},	
});

export default AddItem;