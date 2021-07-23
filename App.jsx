import React, { useState } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import AppLoading from 'expo-app-loading'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './navigation/TabNavigator'
import * as Font from 'expo-font'
import COLORS from './styles/Colors'
import store from './store';
import { getCrypto } from './store/actions/crypto.action'

/* const getFonts = () => Font.loadAsync({
	'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
	'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
	'montserrat-italic': require('./assets/fonts/Montserrat-Italic.ttf')
})
 */
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
	)
}

export default App

