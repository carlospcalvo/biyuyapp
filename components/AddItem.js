import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';

const AddItem = ({onAdd}) => {
	const [inputText, setInputText] = useState('')

	const handleTextChange = text => setInputText(text)

	const handleAdd = (onAdd) => {
		if(inputText && inputText.length <= 10){
			onAdd({
				id: Math.random().toString(),
				ticker: inputText.toUpperCase()
			})
			setInputText('')
		}
	}

	return (
		<View style={styles.inputContainer}>
			<TextInput 
				placeholder='Agregar activo...' 
				placeholderTextColor='white'
				style={styles.input}
				onChangeText={handleTextChange}
				value={inputText}	
			/>
			<TouchableHighlight style={{...styles.button, ...styles.addButton}} onPress={() => handleAdd(onAdd)}>
				<Text>Agregar</Text>
			</TouchableHighlight>
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	input: {
		width: 175,
		borderBottomColor: '#32E0C4',
		borderBottomWidth: 1,
		margin: 10,
		color: 'white'
	},
	button: {
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		marginVertical: 5
	},
	addButton: {
		backgroundColor: '#32E0C4',
		width: 90,
	},
});


export default AddItem;


