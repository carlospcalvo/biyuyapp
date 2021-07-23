import React from 'react';
import {Dimensions, View, Text, StyleSheet} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useDataContext } from '../context/DataContext';
import COLORS from '../styles/Colors';

const screenWidth = Dimensions.get("window").width;

const Chart = ({ asset, historyAvailable, rawData = [] })=> {

	let labels = [0, 6, 13, 20, 27];
	let data = {
		//labels: rawData.map((item, i) => labels.includes(i) ? item.date.slice(0, -5) : ''),
		datasets: [
			{
				data: asset.hasOwnProperty('tag') ? rawData.map(item => item.value) : rawData,
				//color: (opacity = 1) => rawData[rawData.length-1].value > asset.value ? 'red' : '#13ba15', // optional
				strokeWidth: 2 // optional
			}
		],
		legend: [`Evolución último mes`] 
	};

	let chartConfig = {
		backgroundGradientFrom: "#1E2923",
		backgroundGradientFromOpacity: 0,
		backgroundGradientTo: "#08130D",
		backgroundGradientToOpacity: 0.5,
		color: () => COLORS.auxiliary,
		strokeWidth: 1, // optional, default 3
		useShadowColorFromDataset: false, // optional
	};
	

	return (
		<>
			{
				historyAvailable ?				
				<LineChart
					data={data}
					width={Dimensions.get('window').width * 0.9}
					height={256}
					verticalLabelRotation={0}
					chartConfig={chartConfig}
					bezier				
					transparent
					withVerticalLines={false}
					withHorizontalLines
					//withInnerLines={false}
					withDots={false}
					style={{borderRadius: 10, color: 'lightgreen'}}
					onDataPointClick={(value, dataset, getColor) => console.log(value)}
				/>
				:
				<View style={styles.chartContainer}>
					<Text style={styles.unavailable}>Los valores históricos del {asset.name} aún no están disponibles!</Text>
				</View>
			}
		</>		
	)
};


const styles = StyleSheet.create({
	chartContainer: {
		marginVertical: 25,
		
	},
	unavailable: {
		color: COLORS.mainFont,
		fontFamily: 'montserrat-bold',
		fontSize: 15,
		textAlign: 'center'
	}
})

export default Chart;