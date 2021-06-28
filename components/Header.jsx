import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import COLORS from '../styles/Colors';

const Header = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}> Biyuyapp </Text>		
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 40,
		width: '100%',
		marginTop: '1%',
		padding: 30,
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
