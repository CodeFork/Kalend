import React from 'react';
import { Alert, StatusBar, Text, View, BackHandler, Platform } from 'react-native';
import ImgToBase64 from 'react-native-image-base64';
import { Surface } from 'react-native-paper';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import { DashboardNavigator } from '../../constants/screenNames';
import updateNavigation from '../NavigationHelper';
import { analyzePicture } from '../../services/service';
import { schoolScheduleCreationStyles as styles, dark_blue } from '../../styles';

/**
 * The loading screen after the User uploads a picture
 * Displays 'Analyzing picture' with a progress bar.
 */
class SchoolScheduleCreation extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			width: 0
		};
		
		updateNavigation(this.constructor.name, props.navigation.state.routeName);
	}

	static navigationOptions = {
		header: null,
		headerLeft: null,
		gesturesEnabled: false,
	};
	
	componentWillMount() {	
		if (this.props.hasImage) {
			ImgToBase64.getBase64String(this.props.imgURI)
				.then(base64String => {
					base64String = base64String.toString();
					let fakeEscape = base64String.replace(/[+]/g,'PLUS');
					fakeEscape = fakeEscape.replace(/[=]/g,'EQUALS');
					analyzePicture({data: fakeEscape}).then(success => {
						if (success) this.props.navigation.navigate(DashboardNavigator);
						else this.props.navigation.pop();
					});
				})
				.catch(err => console.log('error', err));
		}

		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
	}


	handleBackButton = () => {
		Alert.alert(
			'',
			'Are you sure you want to stop the schedule analyzing process?',
			[
				{
					text: 'No',
					style: 'cancel',
				},
				{text: 'Yes', 
					onPress: () => {
						this.props.navigation.navigate(DashboardNavigator);
					},
				},
			],
			{cancelable: true},
		);
		return true;
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
	}

	render() {
		return(
			<View style={styles.container}>
				<StatusBar translucent={true} 
					barStyle={Platform.OS === 'ios' ? 'light-content' : 'default'}
					backgroundColor={'rgba(0, 0, 0, 0.4)'} />
				<Surface style={styles.surface}>
					<Text style={styles.title}>Analysing your Picture</Text>
					<Text style={styles.subtitle}>Extracting the information from your picture</Text>
					<Progress.Bar style={{alignSelf:'center'}} 
						indeterminate={true} 
						width={200} 
						color={dark_blue} 
						useNativeDriver={true} 
						unfilledColor={'#79A7D2'} />
				</Surface>
			</View>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		imgURI: state.ImageReducer.data,
		hasImage: state.ImageReducer.hasImage
	};
};

export default connect(mapStateToProps, null)(SchoolScheduleCreation);