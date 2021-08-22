import React from 'react';
import { Modal as RNModal, StyleSheet, Text, Platform, View, Dimensions, SectionList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import COLORS from '../../styles/Colors';
import AssetListItem from '../AssetList/AssetListItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addToWatchlist } from '../../store/actions';

const ModalAddItem = ({ modalVisible, closeModal, watchlist }) => {
	const dispatch = useDispatch();
	const cryptos = useSelector(state => state.cryptos);
	const rates = useSelector(state => state.rates);

	let cryptoIds = cryptos.map(crypto => crypto.id);
	let rateIds = rates.map(rate => rate.id);
	let assets = rates.concat(cryptos)
	let unselectedAssets = assets.filter(item => !watchlist.includes(item.id))
	
	//filtra segun el titulo
	let sections = [
		{
			title: 'Tipos de cambio',
			data: unselectedAssets.filter(item => rateIds.includes(item.id))
		},
		{
			title: 'Criptomonedas',
			data: unselectedAssets.filter(item => cryptoIds.includes(item.id))
		}
	].filter(item => item.data.length > 0)

	return (
		<RNModal 
			animationType='fade' 
			visible={modalVisible} 
			transparent
			
		>
			<TouchableWithoutFeedback onPress={() => closeModal()}>
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
								<View style={{backgroundColor: COLORS.pressed}}>
									<View style={Platform.OS === 'android' ? styles.headerContainerAndroid : styles.headerContainer}>
										<Text style={styles.header}>{title}</Text>
									</View>
								</View>
							)}
							contentContainerStyle={Platform.OS === 'android' ? styles.sectionListAndroid : {}}
							stickySectionHeadersEnabled
							style={styles.sectionList}
						/>
					</View>
				</View>			
			</TouchableWithoutFeedback>
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
		backgroundColor: COLORS.pressed,
		borderRadius: 40,
		paddingVertical: '5%'
	},
	sectionList: {
		borderBottomRightRadius: 20,
		borderBottomLeftRadius: 20,
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20, 
		height: '80%',
		margin: 20,
		overflow: 'hidden',
	},
	sectionListAndroid: {
		borderBottomRightRadius: 20,
		borderBottomLeftRadius: 20,
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20, 
		borderRadius: 20,
		overflow: 'hidden'
	},
	headerContainer: {
		backgroundColor: COLORS.header,
		paddingHorizontal: width * 0.05,
		overflow: 'hidden'
	},	
	headerContainerAndroid: {
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20, 
		backgroundColor: COLORS.header,
		paddingHorizontal: width * 0.05,
		overflow: 'hidden'
	},
	header: {
		fontSize: 32,
		color: COLORS.mainFont,
		fontFamily: 'montserrat-bold',
		marginVertical: '5%'
	},
	closeButton: {
		alignSelf: 'flex-end',
		marginRight: width * 0.075,
		width: 24,
		borderRadius: 40
	},
	
});

export default ModalAddItem;