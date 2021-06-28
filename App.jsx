import React, { useState } from 'react'
import AppLoading from 'expo-app-loading'
import { NavigationContainer } from '@react-navigation/native'
import { DataContextProvider } from './context/DataContext'
import TabNavigator from './navigation/TabNavigator'
import * as Font from 'expo-font'

const getFonts = () => Font.loadAsync({
	'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
	'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
	'montserrat-italic': require('./assets/fonts/Montserrat-Italic.ttf')
})

const App = () => {
	const [fontsLoaded, setFontsLoaded] = useState(false)

	return (
		fontsLoaded 
		?
		<DataContextProvider>
			<NavigationContainer>
				<TabNavigator/>
			</NavigationContainer> 				
		</DataContextProvider>		
		:
		<AppLoading
			startAsync={getFonts}
			onFinish={ () => setFontsLoaded(true) }
			onError={ err => console.log(err) }
		/>
	)
}

export default App

