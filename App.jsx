import React, { useState } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import * as Font from 'expo-font'
import store from './store';
import { init } from './db';
import NetInfo from '@react-native-community/netinfo';
import { getCrypto, getRates, loadWatchlist, loadCrypto, loadRates } from './store/actions';
import COLORS from './styles/Colors';

init()
.then(() => console.log('Database initialized'))
.catch(err => console.log('Database failed to connect: ', err));

const App = () => {
	const [fontsLoaded, setFontsLoaded] = useState(false)

	const loadResourcesAsync = async () => {
		await Font.loadAsync({
			'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
			'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
			'montserrat-italic': require('./assets/fonts/Montserrat-Italic.ttf')
		});
	  
	  	// do API calls here
		await store.dispatch(loadWatchlist());
		await store.dispatch(loadRates());
		await store.dispatch(loadCrypto());

		NetInfo.fetch().then( async state => {
			if(state.isConnected){
				await store.dispatch(getCrypto());
				await store.dispatch(getRates());
			}
		});
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

