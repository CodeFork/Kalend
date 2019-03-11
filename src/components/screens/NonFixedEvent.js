import React from 'react';
import { Platform, StatusBar, View, ScrollView, Text, Slider, TouchableOpacity, Switch, Dimensions, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker';
import NumericInput from 'react-native-numeric-input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Header } from 'react-navigation';
import { connect } from 'react-redux';
import { statusBlueColor } from '../../../config';
import { ADD_NFE, CLEAR_NFE } from '../../constants';
import updateNavigation from '../NavigationHelper';
import { nonFixedEventStyles as styles, white, blue, gray, lightOrange, orange } from '../../styles';
import TutorialStatus, { HEIGHT } from '../TutorialStatus';
import { TutorialNonFixedEvent, TutorialReviewEvent } from '../../constants/screenNames';

const viewHeight = 780.5714111328125;

/**
 * Permits the user to add Non-Fixed events i.e. events that can be moved around in the calendar
 */
class NonFixedEvent extends React.Component {

	static navigationOptions = ({navigation}) => ({
		title: navigation.state.params.update ? 'Edit Non-Fixed Event': 'Add Non-Fixed Events',
		headerTintColor: white,
		headerTitleStyle: {fontFamily: 'Raleway-Regular'},
		headerTransparent: true,
		headerStyle: {
			backgroundColor: blue,
			marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
		}
	});

	constructor(props) {
		super(props);

		let containerHeightTemp = Dimensions.get('window').height - Header.HEIGHT;
		let containerHeight = null;
		
		if (viewHeight < containerHeightTemp) {
			containerHeight = containerHeightTemp;
		}

		this.state = { 
			containerHeight,
			eventID: Date.now()
		};
		
		updateNavigation(this.constructor.name, props.navigation.state.routeName);
	}
	
	componentWillMount() {	
		if (this.props.navigation.state.routeName !== TutorialNonFixedEvent) {
			this.setState({...this.props.NFEditState});
		} else  {
			this.resetFields();
		}
	}
	
	/**
	 * Reset the fields of the form
	 */
	resetFields = () => {
		this.setState({
			title: '',

			specificDateRange: false,
			startDate: new Date().toDateString(),
			disabledStartDate: false,
			minStartDate: new Date().toDateString(),
			maxStartDate: new Date(8640000000000000),
			endDate: new Date().toDateString(),
			minEndDate: this.startDate,
			disabledEndDate : true,

			hours: 0,
			minutes: 0,
			isDividable: false,
			// durationType: 0,
			occurrence: 1,

			priority: 0.5,
			location: '',
			description: ''
		});
	}

	/**
	 * To go to the next screen without entering any information
	 */
	skip = () => {
		this.props.navigation.navigate(TutorialReviewEvent);
	}

	/**
	 * Adds the event in the database
	 */
	nextScreen = () => {

		if (this.props.navigation.state.routeName === TutorialNonFixedEvent) {
			this.props.dispatch({
				type: ADD_NFE,
				event: this.state
			});
			this.props.navigation.navigate(TutorialReviewEvent);
		} else {
			let events = this.props.NonFixedEventsReducer;
			let arr = [];

			events.map((event) => {
				if (event.eventID === this.state.eventID) {
					arr.push(this.state);
				} else {
					arr.push(event);
				}
			});

			this.props.dispatch({
				type: CLEAR_NFE,
			});

			arr.map((event) => {
				this.props.dispatch({
					type: ADD_NFE,
					event
				});
			});

			this.props.navigation.navigate(TutorialReviewEvent, {changed:true});
		}
	}

	/**
	 * Adds the event to the database and resets the fields
	 */
	addAnotherEvent = () => {
		this.props.dispatch({
			type: ADD_NFE,
			event: this.state
		});
		this.resetFields();
	}

	render() {
		const {containerHeight} = this.state;

		let tutorialStatus;
		let addEventButton;
		let nextButton;
		let paddingBottomContainer = HEIGHT;

		/**
		 * In order to show components based on current route
		 */
		if (this.props.navigation.state.routeName === TutorialNonFixedEvent) {
			tutorialStatus = <TutorialStatus active={3}
				color={blue}
				backgroundColor={white}
				skip={this.skip} />;

			addEventButton = 
				<TouchableOpacity style={styles.buttonEvent}
					onPress={this.addAnotherEvent}> 
					<Text style={styles.buttonEventText}>ADD ANOTHER{'\n'}EVENT</Text>
				</TouchableOpacity>;

			nextButton = 
				<TouchableOpacity style={styles.buttonNext}
					onPress={this.nextScreen}>
					<Text style={styles.buttonNextText}>NEXT</Text>
				</TouchableOpacity>;
		} else {
			tutorialStatus = null;

			addEventButton = null;

			nextButton = 
				<TouchableOpacity style={styles.buttonNext}
					onPress={this.nextScreen}>
					<Text style={styles.buttonNextText}>DONE</Text>
				</TouchableOpacity>;

			paddingBottomContainer = null;
		}

		return(
			<View style={styles.container}>
				<StatusBar backgroundColor={statusBlueColor} />

				<ScrollView style={styles.scrollView}>
					<View style={[styles.content, {height: containerHeight, paddingBottom: paddingBottomContainer}]}>
						<View style={styles.instruction}>
							<MaterialCommunityIcons name="face"
								size={130}
								color={blue} />

							<Text style={styles.instructionText}>Add the events you would like Kalend to plan for you</Text>
						</View>

						<View style={styles.textInput}>
							<MaterialCommunityIcons name="format-title"
								size={30}
								color={blue} />

							<View style={styles.textInputBorder}>
								<TextInput style={styles.textInputText} 
									placeholder="Title" 
									onChangeText={(title) => this.setState({title})} 
									value={this.state.title}/>
							</View>
						</View>
						
						<View>
							<Text style={styles.sectionTitle}>Availability</Text>

							<View style={styles.timeSection}>
								<View style={styles.dateRange}>
									<Text style={styles.blueTitleLong}>Specific Date Range</Text>

									<Switch trackColor={{false: 'lightgray', true: lightOrange}}
										ios_backgroundColor={'lightgray'}
										thumbColor={this.state.specificDateRange ? orange : 'darkgray'}
										onValueChange={(specificDateRange) => this.setState({specificDateRange: specificDateRange})}
										value = {this.state.specificDateRange} />
								</View>
								
								{this.state.specificDateRange ? /*To hide/show the date*/
									<View style={styles.questionLayout}>
										<Text style={styles.blueTitle}>Start Date</Text>

										<DatePicker showIcon={false} 
											date={this.state.startDate} 
											mode="date" 
											style={{width:140}}
											disabled={this.state.disabledStartDate}
											customStyles={{
												disabled:{backgroundColor: 'transparent'},
												dateInput:{borderWidth: 0},
												dateText:{
													fontFamily: 'OpenSans-Regular',
													color: this.state.disabledStartDate ? '#FF0000' : gray}}} 
											placeholder={this.state.startDate} 
											format="ddd., MMM DD, YYYY" 
											minDate={this.state.minStartDate} 
											maxDate={this.state.maxStartDate}
											confirmBtnText="Confirm" 
											cancelBtnText="Cancel" 
											onDateChange={(startDate) => this.setState({
												startDate: startDate,
												endDate: startDate,
												disabledEndDate: false,
												minEndDate: startDate})} />
									</View> : null}
									
								{this.state.specificDateRange ? /*To hide/show the date*/
									<View style={styles.questionLayout}>
										<Text style={styles.blueTitle}>End Date</Text>

										<DatePicker showIcon={false} 
											date={this.state.endDate} 
											mode="date" 
											style={{width:140}}
											disabled={this.state.disabledEndDate}
											customStyles={{
												disabled:{backgroundColor: 'transparent'},
												dateInput:{borderWidth: 0},
												dateText:{fontFamily: 'OpenSans-Regular',
													color: gray,
													textDecorationLine: this.state.disabledEndDate ? 'line-through' : 'none'}}} 
											placeholder={this.state.endDate} 
											format="ddd., MMM DD, YYYY" 
											minDate={this.state.minEndDate}
											confirmBtnText="Confirm" 
											cancelBtnText="Cancel" 
											onDateChange={(endDate) => this.setState({endDate, maxStartDate: endDate})} />
									</View> : null}

								<View style={styles.duration}>
									<Text style={styles.blueTitle}>Duration</Text>

									<View style={styles.timePicker}>
										<NumericInput initValue = {this.state.hours}
											value={this.state.hours}
											onChange={(hours) => this.setState({hours})}
											minValue={0} 
											leftButtonBackgroundColor={lightOrange}
											rightButtonBackgroundColor={orange}
											rounded={true}
											borderColor={'lightgray'}
											textColor={gray}
											iconStyle={{color: white}} />
										<Text style={styles.optionsText}>hour(s)</Text>
									</View>

									<View style={styles.timePicker}>
										<NumericInput initValue={this.state.minutes}
											value={this.state.minutes}
											onChange={(minutes) => this.setState({minutes})}
											minValue={0} 
											leftButtonBackgroundColor={lightOrange}
											rightButtonBackgroundColor={orange}
											rounded={true}
											borderColor={'lightgray'}
											textColor={gray}
											iconStyle={{color: white}}  />
										<Text style={styles.optionsText}>minute(s)</Text>
									</View>
								</View>

								<View style={styles.switch}>
									<Text style={[styles.blueTitle, {width:150}]}>Is Dividable</Text>

									<Switch trackColor={{false: 'lightgray', true: lightOrange}}
										ios_backgroundColor={'lightgray'}
										thumbColor={this.state.isDividable ? orange : 'darkgray'}
										onValueChange={(isDividable) => this.setState({isDividable: isDividable})}
										value = {this.state.isDividable} />
								</View>

								<View style={styles.questionLayout}>
									<Text style={styles.blueTitleLong}>{this.state.specificDateRange ? 'Number of Occurences in Date Range' : 'Number of Occurences per Week'}</Text>

									<NumericInput initValue={this.state.occurrence}
										value={this.state.occurrence}
										onChange={(occurrence) => this.setState({occurrence})}
										minValue={1} 
										leftButtonBackgroundColor={lightOrange}
										rightButtonBackgroundColor={orange}
										rounded={true}
										borderColor={'lightgray'}
										textColor={gray}
										iconStyle={{color: white}}  />
								</View>
							</View>
						</View>

						<View>
							<Text style={styles.sectionTitle}>Priority Level</Text>

							<Slider value={this.state.priority}
								minimumValue={0}
								maximumValue={1} 
								step={0.5}
								thumbTintColor={orange}
								minimumTrackTintColor={lightOrange}
								onValueChange={(priority) => this.setState({priority: priority})} />

							<View style={styles.questionLayout}>
								<Text style={styles.optionsText}>Low</Text>

								<Text style={styles.optionsText}>Normal</Text>

								<Text style={styles.optionsText}>High</Text>
							</View>
						</View>
						<View>
							<Text style={styles.sectionTitle}>Details</Text>

							<View style={styles.textInput}>
								<MaterialIcons name="location-on"
									size={30}
									color={blue} />

								<View style={styles.textInputBorder}>
									<TextInput style={styles.textInputText} 
										placeholder="Location"
										onChangeText={(location) => this.setState({location})}
										value={this.state.location}/>
								</View>
							</View>
						
							<View style={styles.textInput}>
								<MaterialCommunityIcons name="text-short"
									size={30}
									color={blue} />
								
								<View style={styles.textInputBorder}>
									<TextInput style={styles.textInputText} 
										placeholder="Description"
										onChangeText={(description) => this.setState({description})}
										value={this.state.description}/>
								</View>
							</View>
						</View>

						<View style={styles.buttons}>
							{addEventButton}

							{nextButton}
						</View>
					</View>
				</ScrollView>

				{tutorialStatus}	
			</View>
		);
	}
}

function mapStateToProps(state) {
	const { NonFixedEventsReducer, NavigationReducer } = state;
	let selected = NavigationReducer.reviewEventSelected;

	return {
		NFEditState: NonFixedEventsReducer[selected],
		NonFixedEventsReducer
	};
}

export default connect(mapStateToProps, null)(NonFixedEvent);