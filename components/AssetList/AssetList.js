import {FlatList, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React, {useState} from 'react';

import AssetListItem from './AssetListItem';
import ModalItem from '../Modal';

const AssetList = ({data, onDelete}) => {
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
				renderItem={data => <AssetListItem data={data} handleModal={handleModalOpen}/>}
				keyExtractor={item => item.id.toString()}
			/>
			<ModalItem modalVisible={modalVisible} closeModal={handleModalClose} itemSelected={itemSelected} onDelete={handleConfirmDelete} />
		</>
	);
}

const styles = StyleSheet.create({
	listContainer: {
		marginTop: 20,
		padding: 5,
		backgroundColor: '#131722', //'#242526',
	},
});

export default AssetList
