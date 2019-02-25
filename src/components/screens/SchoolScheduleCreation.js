import React from 'react';
import {ImageBackground, StatusBar, Platform, StyleSheet, Dimensions, Text} from 'react-native';
import { analyzePicture } from '../../services/service';
import { gradientColors, orangeColor, blueColor } from '../../../config';
import LinearGradient from 'react-native-linear-gradient';
import { Surface } from 'react-native-paper';

import * as Progress from 'react-native-progress';

class SchoolScheduleCreation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 0
		};
	}


	static navigationOptions = {
		title: 'Analysing Schedule',
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontFamily: 'Raleway-Regular'
		},
		headerTransparent: true,
		headerStyle: {
			backgroundColor: 'rgba(0, 0, 0, 0.2)',
			marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
		}
	};

	componentDidMount() {
		analyzePicture();
		this.progressValue();
	}
	progressValue() {
		return setInterval(() => {
			if (this.state.width <= 1) {
				let width  = this.state.width + 0.01;
				this.setState({width});
			}
		},10);
	}

	render() {
		return(
			<LinearGradient style={styles.container} colors={gradientColors}>
				<ImageBackground style={styles.container} source={require('../../assets/img/loginScreen/backPattern.png')} resizeMode="repeat">
					<StatusBar translucent={true} backgroundColor={'rgba(0, 0, 0, 0.4)'} />
					<Surface style={styles.surface}>
						<Text style={styles.title}>Analysing your Picture</Text>
						<Text style={styles.subtitle}>Extracting the information from your picture</Text>

						<Progress.Bar style={{alignSelf:'center'}} indeterminate={true} width={200} color={blueColor} useNativeDriver={true} borderWidth={0} unfilledColor={orangeColor}/>
						{/* <ProgressBar style={{height: 10}} progress={this.state.width} color={orangeColor} />
						<ProgressBarAndroid styleAttr="Horizontal" color={orangeColor}></ProgressBarAndroid> */}
					</Surface>
				</ImageBackground>
			</LinearGradient>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '130%' //Fixes pattern bug
	},

	surface: {
		padding: 8,
		height: 100,
		width: Dimensions.get('window').width * 0.8,
		borderRadius: 4,
		justifyContent: 'center',
		elevation: 3,
	},

	title: {
		fontSize: 20,
		fontFamily: 'Raleway-Regular',
		textAlign: 'center'
	},

	subtitle: {
		fontFamily: 'Raleway-Regular',
		textAlign: 'center',
		paddingTop: 5,
		paddingBottom: 10
	}
});

export default SchoolScheduleCreation;