import React, { useState } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import AppLoading from 'expo-app-loading'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './navigation/TabNavigator'
import * as Font from 'expo-font'
import store from './store';
import COLORS from './styles/Colors';
import { getCrypto, getRates } from './store/actions';

const App = () => {
	const [fontsLoaded, setFontsLoaded] = useState(false)

	const loadResourcesAsync = async () => {
		await Font.loadAsync({
			'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
			'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
			'montserrat-italic': require('./assets/fonts/Montserrat-Italic.ttf')
		});
	  
	  	// do API calls here
		await store.dispatch(getCrypto());
		await store.dispatch(getRates());
	}

	return (
		fontsLoaded 
		?
		<Provider store={store}>
			<NavigationContainer>
				<View style={{flex: 1, backgroundColor: COLORS.background}}>
					<TabNavigator/>
				</View>	
			</NavigationContainer> 				
		</Provider>		
		:
		<AppLoading
			startAsync={loadResourcesAsync}
			onFinish={ () => setFontsLoaded(true) }
			onError={ err => console.log(err) }
		/>
	);
}

export default App;

