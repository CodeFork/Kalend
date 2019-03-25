import React from 'react';
import { Platform, StatusBar, View, BackHandler, Alert, Text, ScrollView, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { setSelectedSchedule, deleteGeneratedCalendar, clearGeneratedCalendars, clearGeneratedNonFixedEvents } from '../../actions';
import { calendarEventColors, calendarEventColorsInside } from '../../../config';
import { DashboardNavigator, ScheduleSelectionDetailsRoute } from '../../constants/screenNames';
import updateNavigation from '../NavigationHelper';
import converter from 'number-to-words';
import { eventsToScheduleSelectionData } from '../../services/service';
import { scheduleSelectionStyle as styles, black } from '../../styles';

export const containerPadding = 10;
export const lineThickness = 1;
export const lineColor = '#999';
export const lineSpace = 25;
export const lineViewHorizontalPadding = 15;
export const lineViewLeftPadding = 15;

/**
 * The component of an event on a schedule
 * 
 * @prop {String} kind The kind of event (fixed, ai or school)
 * @prop {Integer} chunks The length of the event (1 chunk represents 1 hour)
 * @prop {Integer} day The day the event will take place (0 being Sunday) 
 * @prop {Integer} start The start of the event in terms of the number of chunks
 * @prop {Boolean} showShadow Shows shadow if true, doesn't otherwise
 * @prop {Integer} timeInterval The number of hours there is between two lines (max 4 hours, min 1 hour)
 * @prop {Boolean} startOffset The number of hours offset if the startTime is not equal to 0
 */
class ScheduleEvent extends React.PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			height: 0,
			width: 0,
			left:0,
			top: 0,
			color: '' ,
			colorInside : ''
		};
	}

	componentWillMount() {
		this.setEventBlock(this.props);
	}
	

	componentWillReceiveProps(props) {
		this.setEventBlock(props);
	}

	setEventBlock = (props) => {
		let windowWidth = ((Dimensions.get('window').width - containerPadding * 2 - lineViewHorizontalPadding * 2 - lineViewLeftPadding) / 7);
		let { startOffset, timeInterval, kind, chunks, start, day } = props;
		let height = (chunks * lineSpace + chunks * lineThickness) / timeInterval - lineThickness - 1;
		let width = windowWidth - 2;
		let left = day * windowWidth + 1;
		let top = ((start - startOffset)* lineSpace + chunks * lineThickness) / timeInterval + lineThickness + 1;
		let color;
		let colorInside;

		// Gets the appropriate color for the event
		switch (kind) {
			case 'fixed':
				color = calendarEventColors.red;
				colorInside = calendarEventColorsInside.red;
				break;
			case 'school':
				color = calendarEventColors.green;
				colorInside = calendarEventColorsInside.green;
				break;
			case 'ai':
				color = calendarEventColors.purple;
				colorInside = calendarEventColorsInside.purple;
				break;
		}

		this.setState({height,width,left,top,color, colorInside});
	}

	render() {
		const { height, width, left, top, color, colorInside } = this.state;
		return (
			<View style={{ borderRadius: 3, 
				borderWidth: 2,
				position: 'absolute', 
				borderColor: color,
				backgroundColor: colorInside, 
				height: height, 
				width: width,
				top: top,
				left: left,
				...Platform.select({
					ios: {
						shadowColor: black,
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: this.props.showShadow ? 0.2 : 0,
						shadowRadius: 1,    
					},
					android: {
						elevation: this.props.showShadow ? 3 : 0,
					},
				}) }}>
			</View>
		);
	}
}

/**
 * The component of a schedule which contains ScheduleEvents
 * 
 * @prop {Object} data The whole object containing the data
 * @prop {Function} nextScreen The parent function to go to the next screen
 * @prop {Integer} numOfLines The number of lines to be drawn on the schedule
 * @prop {Integer} id The number of the schedule
 */
class Schedule extends React.PureComponent {

	constructor(props) {
		super(props);

		// Gets the ordinal word thanks to an existing library and the schedule index
		let ordinal = converter.toWordsOrdinal(this.props.id+1);

		this.state = {
			weekLetters: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
			ordinal: ordinal.charAt(0).toUpperCase() + ordinal.slice(1),
			showShadow: true,
			hours: [0, 4, 8, 12, 4, 8, 0],
			startOffset: 0,
			timeInterval: 4,
			ai: [],
			aiEvents: [[]]
		};
	}

	componentWillMount() {
		this.setState({ai: this.props.ai, aiEvents: this.props.aiEvents});
	}

	componentWillReceiveProps(props) {
		this.setState({ai: props.ai, aiEvents: props.aiEvents});

		let { school, fixed, ai } = props;

		if (!Array.isArray(ai)) {
			ai = [ai];
		}

		this.createTimes({school, fixed, ai});
	}

	/**
	 * Creates the time intervals between two lines according to the events that are present in the calendar
	 */
	createTimes = (data) => {
		let hours = [];
		// Gets the earliest and latest hours in the events
		let earliestHour = 12;
		let latestHour = 12;
		Object.entries(data).map((i) => {
			i[1].map((i) => {
				let start = i.start;
				let end = i.start + i.chunks;

				if (start < earliestHour) {
					earliestHour = start;
				}

				if (end > latestHour) {
					latestHour = end;
				}
			});
		});
		// If the range of the earliest and latest hours divided by the number of lines 
		// is odd, change it to be event
		let interval = (latestHour - earliestHour);
		if (interval % this.props.numOfLines !== 0) {
			let diff = this.props.numOfLines - interval % this.props.numOfLines;
			interval += diff;

			for (let i = 0; i < diff; i ++) {
				if (i % 2 === 0) {
					if (earliestHour >= 0) {
						earliestHour --;
					} else {
						latestHour ++;
					}
				} else {
					if (latestHour < 24) {
						latestHour ++;
					} else {
						earliestHour --;
					}
				}
			}
		}

		// Creates the hours on the side
		let currentHour = earliestHour;
		let count = 0;
		interval = interval / this.props.numOfLines;
		for (let i = 0; i <= this.props.numOfLines; i++) {
			hours.push(currentHour);
			currentHour += interval;
			if (currentHour > 12 || (currentHour >= 12 && count == 1)) {
				currentHour -= 12;
				count ++;
			}
		}		
		
		// Saves the information in the state
		this.setState({
			hours,
			startOffset: earliestHour,
			timeInterval: interval
		});
	}

	/**
	 * Helper method to create the lines dynamically
	 * 
	 * @param {Integer} num The number of lines to be displayed on the schedule
	 */
	createLines = (num) => {
		let lines = [];
		for (let i = 0; i < num; i++) {
			lines.push(
				<View key={i}
					style={[styles.line, {
						marginBottom: (i === num-1) ? lineSpace / 1.5 : 0
					}]}/>
			);
		}
		return lines;
	}

	render() {
		const { numOfLines, id} = this.props;
		// console.log('data in render', id, data.ai[id]);
		const { weekLetters, ordinal, hours, showShadow, startOffset, timeInterval } = this.state;

		return (
			<View style={styles.scheduleContainer}>
				<Text style={styles.title}>
					{ordinal} schedule
				</Text>
				
				{/* The onPressIn and onPressOut helps eliminating the weird
					effect when shadows are on and you touch a schedule */}
				<TouchableOpacity onPress={() => {
					this.props.nextScreen(ordinal + ' Schedule', id, {
						fixed: this.props.fixed,
						school: this.props.school,
						ai: this.state.ai,
						aiEvents: this.state.aiEvents,
						fixedEvents: this.props.fixedEvents,
						schoolEvents: this.props.schoolEvents
					});
				}} 
				onPressIn={() =>{
					this.setState({
						showShadow: false
					});
				}}
				onPressOut={() => {
					setTimeout(()=>{
						this.setState({
							showShadow: true
						});
					}, 900);
				}}>

					<View style={[styles.card, {
						...Platform.select({
							ios: {
								shadowColor: black,
								shadowOffset: { width: 0, height: 2 },
								shadowOpacity: showShadow ? 0.4 : 0,
								shadowRadius: 5,    
							},
							android: {
								elevation: showShadow ? 5 : 0,
							},
						}),}]}>

						<View style={styles.weekLetterContainer}>
							{ 
								weekLetters.map((str, id) => {
									return (
										<Text key={id} 
											style={styles.weekLetters}>
											{str}
										</Text>
									);
								}) 
							}
						</View>

						<View> 
							<View style={styles.thickLine} />
							
							{ this.createLines(numOfLines) }

							{ 
								this.props.school.map((info, key) => {
									return  <ScheduleEvent key={key} 
										showShadow={showShadow} 
										chunks={info.chunks} 
										day={info.day} 
										start={info.start} 
										kind='school' 
										timeInterval={timeInterval} 
										startOffset={startOffset} />;
								})
							}

							{ 
								this.props.fixed.map((info, key) => {
									return  <ScheduleEvent key={key} 
										showShadow={showShadow} 
										chunks={info.chunks} 
										day={info.day} 
										start={info.start} 
										kind='fixed' 
										timeInterval={timeInterval} 
										startOffset={startOffset} />;
								})
							}

							{ 
							
								this.state.ai.map((info, key) => {
									return  <ScheduleEvent key={key} 
										showShadow={showShadow} 
										chunks={info.chunks} 
										day={info.day} 
										start={info.start} 
										kind='ai' 
										timeInterval={timeInterval} 
										startOffset={startOffset} />;
								})
									
							}

							<View style={styles.hoursTextContainer}>
								{ 
									hours.map((hour, key) => {
										return (
											<Text key={key} 
												style={styles.hoursText}>
												{hour}
											</Text>
										);
									}) 
								}
							</View>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}



/**
 * The component which encloses all of the schedules which has been generated
 */
class ScheduleSelection extends React.PureComponent {
	static navigationOptions = {
		title: 'Schedule Selection',
		headerStyle: {
			backgroundColor: 'rgba(0, 0, 0, 0.2)',
		},
		headerLeft: null,
		gesturesEnabled: false,
	};

	constructor(props) {
		super(props);
		this.state = {
			data: {
				school: [],
				fixed: [],
				ai: [],
				aiCalendars: [[]]
			}
		};

		// Updates the navigation location in redux
		updateNavigation(this.constructor.name, props.navigation.state.routeName);
	}

	componentWillMount() {
		this.eventsToScheduleSelectionService();
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
	}

	
	deleteCalendar = (index) => {
		let data = this.state.data;
		data.ai.splice(index,1);
		this.props.dispatch(deleteGeneratedCalendar(index));
		this.setState({data});
		this.forceUpdate();
	}

	eventsToScheduleSelectionService = () => {
		eventsToScheduleSelectionData().then((data) => {
			this.setState({data});
		});
	}


	handleBackButton = () => {
		Alert.alert(
			'',
			'Are you sure you want to delete the created schedule?',
			[
				{
					text: 'No',
					style: 'cancel',
				},
				{text: 'Yes', 
					onPress: () => {
						this.props.navigation.navigate(DashboardNavigator);
						this.props.dispatch(clearGeneratedCalendars());
						this.props.dispatch(clearGeneratedNonFixedEvents());
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

	/**
	 * Goes to the next screen
	 * 
	 * @param {String} title The header title for the next screen
	 * @param {Integer} index The index of the selected school schedule
	 * @param {Object} data The data  of all events to be displaced on TutorialScheduleSelectionDetails screen
	 */
	nextScreen = (title, index, data) => {
		this.setIndex(index);
		this.props.navigation.navigate(ScheduleSelectionDetailsRoute, {title, data, delete: this.deleteCalendar});
	}
	
	/**
	 * Saves the information about the selected school schedule in redux
	 * 
	 * @param {Integer} index The index of the selected school schedule
	 */
	setIndex = (index) => {
		this.props.dispatch(setSelectedSchedule(index));
	}

	
	_renderItem = ({item, index}) => {
		return <Schedule nextScreen={this.nextScreen} 
			fixed={this.state.data.fixed}
			school={this.state.data.school}
			ai={item}
			aiEvents={this.state.data.aiCalendars[index]}
			fixedEvents={this.state.data.fixedEvents}
			schoolEvents={this.state.data.schoolEvents}
			id={index}
			numOfLines={6} />;
	};

	render() {
		return(

			<View style={styles.container}>
				<StatusBar translucent={true} 
					barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
					backgroundColor={'rgba(0, 0, 0, 0.4)'} />

				<ScrollView >
					<View style={styles.content}>
						<Text style={styles.description}>Below you will find the best weekly schedules created by the application. In order for the AI to work well, please remove the calendars which you don't like</Text>
						{  (this.state.data.ai.length > 0) 
							?
							<FlatList data={this.state.data.ai}
								keyExtractor={(item, index) => index.toString()}
								renderItem={this._renderItem} /> 
							: 
							<FlatList data={[[]]}
								keyExtractor={(item, index) => index.toString()}
								renderItem={this._renderItem} />
						}
					</View>
				</ScrollView>
			</View>
		);
	}
}

export default connect()(ScheduleSelection);