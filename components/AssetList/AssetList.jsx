import {FlatList, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React, {useState} from 'react';
import AssetListItem from './AssetListItem';
import ModalItem from '../Modal';
import COLORS from '../../styles/Colors'

const AssetList = ({ navigation, data, onDelete }) => {
	const [itemSelected, setItemSelected] = useState({})
	const [modalVisible, setModalVisible] = useState(false)
	
	const handleConfirmDelete = () => {
		onDelete(itemSelected)
		setModalVisible(false)
		setItemSelected({})
	}

	const handleModalOpen = id => {
		setItemSelected(data.find(item => item.id === id))
		setModalVisible(true)
	}

	const handleModalClose = () => setModalVisible(false)

	return (
		<>
			<FlatList
				style={styles.listContainer}
				data={data}
				renderItem={({ item }) => (
					<TouchableHighlight
						style={{width: '100%'}} 
						onPress={() => navigation.navigate('Detail', {item})}
						onLongPress={() => handleModalOpen(item.id)}
						activeOpacity={0.5}
						underlayColor={COLORS.pressed}
					>
						<AssetListItem item={item} handleModal={handleModalOpen}/>
					</TouchableHighlight>
				)}
				keyExtractor={item => item.id.toString()}
			/>
			{ 
				onDelete && 
				<ModalItem 
					modalVisible={modalVisible} 
					closeModal={handleModalClose} 
					itemSelected={itemSelected} 
					onDelete={handleConfirmDelete} 
				/> 
			}
		</>
	);
}

const styles = StyleSheet.create({
	listContainer: {
		width: '100%',
		marginTop: 20,
		/* padding: 5, */
		backgroundColor: COLORS.background, //'#242526',
		/* borderColor: Colors.auxiliary,
		borderRadius: 20,
		borderWidth: 1, */
	},
});

export default AssetList