import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import COLORS from '../styles/Colors';

const Header = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}> Biyuyapp </Text>		
		</View>
	);
}

const { width } = Dimensions.get('screen')

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width,
		marginTop: '1%',
		padding: 30,
		flexDirection: 'row',
		backgroundColor: COLORS.header,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontSize: 20,
		fontFamily: 'montserrat-bold',
		color: COLORS.mainFont,
		textAlign: 'center'
	},
})

export default Header;
