import React from 'react';
import {Dimensions, View, Text, StyleSheet} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import COLORS from '../styles/Colors';

const screenWidth = Dimensions.get("window").width;

const Chart = ({ asset, historyAvailable, rawData = [] })=> {
	let color = asset.prev_value > asset.value ? 'red' : '#13ba15';

	let data = {
		datasets: [
			{
				data: rawData,
				color: (opacity = 1) => color, // optional
				strokeWidth: 2 // optional
			}
		],
		legend: [`Evolución últimos 30 días`] 
	};

	let chartConfig = {
		backgroundGradientFrom: "#1E2923",
		backgroundGradientFromOpacity: 0,
		backgroundGradientTo: "#08130D",
		backgroundGradientToOpacity: 0.5,
		color: () => COLORS.auxiliary,
		strokeWidth: 1, // optional, default 3
		useShadowColorFromDataset: true, // optional
		propsForLabels: ''
	};
	

	return (
		<>
			{
				historyAvailable ?				
				<LineChart
					data={data}
					width={screenWidth * 0.85}
					height={256}
					verticalLabelRotation={0}
					chartConfig={chartConfig}
					bezier				
					yLabelsOffset={5}
					transparent
					withVerticalLines={false}
					withHorizontalLines
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