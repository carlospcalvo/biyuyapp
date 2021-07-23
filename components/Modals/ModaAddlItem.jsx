import React, { useState, useEffect } from 'react';
import { Modal as RNModal, StyleSheet, Text, ScrollView, View, Dimensions, SectionList, TouchableOpacity } from 'react-native';
import COLORS from '../../styles/Colors';
import AssetListItem from '../AssetList/AssetListItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addToWatchlist } from '../../store/actions/watchlist.action';

const ModalAddItem = ({ modalVisible, closeModal, data, watchlist }) => {
	const dispatch = useDispatch();

	let watchlistIDs = watchlist.map(asset => asset.id);
	let [rates, cryptos] = data.map(assetType => assetType.data);
	let assets = rates.concat(cryptos)
	let unselectedAssets = assets.filter(item => !watchlistIDs.includes(item.id))
	//console.log(watchlistIDs)
	let sections = [
		{
			title: 'Tipos de cambio',
			data: unselectedAssets.filter(item => typeof(item.id) == 'number')
		},
		{
			title: 'Criptomonedas',
			data: unselectedAssets.filter(item => typeof(item.id) == 'string')
		}
	].filter(item => item.data.length > 0)

	//console.log(sections)

	return (
		<RNModal 
			animationType='fade' 
			visible={modalVisible} 
			transparent
		>
			<View style={styles.screen}>
				<View style={styles.container}>
					<TouchableOpacity style={styles.closeButton} onPress={() => closeModal()}>
						<MaterialCommunityIcons name="close" size={24} color={COLORS.secondary} />
					</TouchableOpacity>
					<SectionList
						sections={sections}
						keyExtractor={(item, index) => item + index}
						renderItem={({ item }) => (
							<TouchableOpacity onPress={() => dispatch(addToWatchlist(item.id)) && closeModal()}>
								<AssetListItem item={item} hidePrice />
							</TouchableOpacity>
						) }
						renderSectionHeader={({ section: { title } }) => (
							<View style={styles.headerContainer}>
								<Text style={styles.header}>{title}</Text>
							</View>							
						)}
						style={styles.sectionList}
					/>
				</View>
			</View>						
		</RNModal>
	);
};

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.7)',
	},	
	container: {
		height: height * 0.60,
		marginTop: height * 0.13,
		//padding: '10%',
		backgroundColor: COLORS.pressed,
		borderRadius: 40,
		paddingVertical: '5%'
	},
	sectionList: {
		borderRadius: 10,
		height: '80%',
		margin: 20
	},
	headerContainer: {
		backgroundColor: COLORS.header,
		paddingHorizontal: width * 0.05,
	},	
	header: {
		fontSize: 32,
		color: COLORS.mainFont,
		fontFamily: 'montserrat-bold',
		marginVertical: '5%'
		//backgroundColor: "red"
	},
	closeButton: {
		alignSelf: 'flex-end',
		marginRight: width * 0.075,
		width: 24,
		borderRadius: 40
	},
	
});

export default ModalAddItem;