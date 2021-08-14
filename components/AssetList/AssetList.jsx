import {FlatList, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import AssetListItem from './AssetListItem';
import ModalDeleteItem from '../Modals/ModalDeleteItem';
import COLORS from '../../styles/Colors'
import AddItem from '../AddItem';

const AssetList = ({ navigation, data, onDelete, onRefresh, refreshing}) => {
	const [itemSelected, setItemSelected] = useState({});
	const [modalVisible, setModalVisible] = useState(false);

	const handleConfirmDelete = () => {
		onDelete(itemSelected.id);
		setModalVisible(false);
		setItemSelected({});
	};

	const handleModalOpen = id => {
		setItemSelected(data.find(item => item.id === id));
		setModalVisible(true);
	};

	const handleModalClose = () => setModalVisible(false);

	return (
		<>
			<FlatList
				style={styles.listContainer}
				data={data}
				extraData={data}
				renderItem={({ item }) => (
					<TouchableHighlight
						style={{width: '100%'}} 
						onPress={() => navigation ? navigation?.navigate('Detail', {item}) : null}
						onLongPress={() => handleModalOpen(item.id)}
						activeOpacity={0.5}
						underlayColor={COLORS.pressed}
					>
						<AssetListItem item={item} handleModal={handleModalOpen}/>
					</TouchableHighlight>
				)}
				ListFooterComponent={onDelete ? AddItem : null}
				keyExtractor={item => item.id.toString()}
				//refreshControl={refreshControl}
				refreshing={refreshing}
				onRefresh={onRefresh}
			/>
			{ 
				onDelete && 
				<ModalDeleteItem 
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
