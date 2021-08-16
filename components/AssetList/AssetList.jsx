import React from 'react';
import {FlatList, StyleSheet, TouchableHighlight, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import AssetListItem from './AssetListItem';
import AddItem from '../AddItem';
import COLORS from '../../styles/Colors'

const AssetList = ({ navigation, data, onDelete, onAdd, onRefresh, refreshing}) => {
	const RenderRight = ({ progress, dragX, item, onPress}) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });
		
		const slideButtonStyle = { 
			transform: [ { scale } ],
			backgroundColor: onDelete ? "#A50104" : COLORS.pressed
		}

		let buttonHeight = item.ticker ? 61 : 51;

        return onDelete ? (			
			<TouchableHighlight onPress={() => onPress(item.id)}>
				<Animated.View style={{...styles.rowBack, backgroundColor: "#A50104", height: buttonHeight}}>
					<Animated.View style={slideButtonStyle}>
						<Ionicons name="trash-bin-outline" size={50} color="white" />
					</Animated.View>	
				</Animated.View>
			</TouchableHighlight>
		)
		: (
			<TouchableHighlight onPress={() => onPress(item.id)}>
				<Animated.View style={{...styles.rowBack, height: buttonHeight}}>
					<Animated.View style={slideButtonStyle}>
						<Ionicons name="add" size={50} color='#13ba15' /> 
					</Animated.View>	
				</Animated.View>
			</TouchableHighlight>
		);
    }

	const RenderItem = ({ item, onRightPress }) => (
		<Swipeable
			useNativeAnimations 
			overshootRight={false} 
			renderRightActions={( progress, dragX ) => (
				<RenderRight 
					progress={progress} 
					dragX={dragX} 
					item={item} 
					onPress={onRightPress}
				/>
			)}
		>
			<TouchableHighlight
				style={{width: '100%'}} 
				onPress={() => navigation ? navigation?.navigate('Detail', {item}) : null}
				activeOpacity={0.5}
				underlayColor={COLORS.pressed}
			>
				<AssetListItem item={item}/>
			</TouchableHighlight>
		</Swipeable>
	);

	return (
		<>
			<FlatList
				style={styles.listContainer}
				data={data}
				extraData={data}
				renderItem={({ item }) => (
					<RenderItem item={item} onRightPress={onDelete || onAdd}/>
				)}
				ListFooterComponent={onDelete ? AddItem : null}
				keyExtractor={item => item.id.toString()}
				refreshing={refreshing}
				onRefresh={onRefresh}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	listContainer: {
		width: '100%',
		marginTop: 20,
		backgroundColor: COLORS.background, 
	},
	rowBack: {
		backgroundColor: COLORS.pressed,
		justifyContent: 'center',
		alignItems: 'center',
		height: 51,
		borderBottomColor: COLORS.auxiliary,
		borderBottomWidth: 1, 
		borderTopColor: COLORS.background,
		borderTopWidth: 1,
	},
});

export default AssetList
