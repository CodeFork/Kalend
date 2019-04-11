import React from 'react';
import { StatusBar, TouchableOpacity, Text, View, Platform } from 'react-native';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { store } from '../../store';
import updateNavigation from '../NavigationHelper';
import { dashboardStyles as styles, white, dark_blue, black, statusBarDark } from '../../styles';
import { setDashboardData, setNavigationScreen } from '../../actions';
import { calendarColors } from '../../../config/config';
import { ReviewEventRoute } from '../../constants/screenNames';
import { getStrings } from '../../services/helper';
import { getDataforDashboard, sortEventsInDictonary } from '../../services/service';

const moment = require('moment');

LocaleConfig.locales.en = LocaleConfig.locales[''];
LocaleConfig.locales['fr'] = {
	monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
	monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
	dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
	dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.']
};

/**
 * Dashboard of the application which shows the user's calendar and
 * the differents options they can access.
 */
class Dashboard extends React.PureComponent {

	defaultLocale = store.getState().SettingsReducer.language;

	strings = getStrings().Dashboard;

	static navigationOptions = ({navigation}) => ({
		headerRight: (
			<TouchableOpacity onPress={() => navigation.navigate(ReviewEventRoute, {title: getStrings().ReviewEvent.title})}
				style={{flexDirection: 'row', alignItems: 'center', marginRight: 10, paddingHorizontal: 10, paddingVertical: 3, backgroundColor: dark_blue, borderRadius: 5, 
					...Platform.select({
						ios: {
							shadowColor: black,
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.3,
							shadowRadius: 3,    
						},
						android: {
							elevation: 4,
						},
					})
				}}>
				<Text style={{color: white, fontFamily: 'Raleway-Bold', marginRight: 5}}>{getStrings().Dashboard.create}</Text>
				<MaterialCommunityIcons size={25}
					name="calendar-multiple-check"
					color={white}/>
			</TouchableOpacity>
		),
		header: null
	});

	constructor(props) {
		super(props);
		this.state = { 
			containerHeight: null,
			items: {},
			isVisible: false,
			calendarOpened: false,
			snackbarVisible: false,
			snackbarTime: 3000,
			snackbarText: '',
			showMonth: false,
			month: '',
			modalVisible: false,
			deleteDialogVisible: false,
			shouldShowModal: false
		};
		updateNavigation('Dashboard', props.navigation.state.routeName);

		LocaleConfig.defaultLocale = this.defaultLocale;
	}
	
	renderItem(item) {
		let category;

		if (item.category === 'Course') {
			category = this.props.courseColor;
		} else if (item.category === 'FixedEvent') {
			category = this.props.fixedEventsColor;
		} else if (item.category === 'NonFixedEvent') {
			category = this.props.nonFixedEventsColor;
		} else {
			category = white;
		}
		
		return (
			<View style={[styles.item, {backgroundColor:{category}}]}>
				<Text style={styles.itemText}>{item.name}</Text>
				<Text style={styles.itemText}>{item.time}</Text>
			</View>
		);
	}

	renderEmptyData = () => {
		return <View>
			<Text style={styles.eventsDayTitle}>{this.strings.eventsDayTitle}</Text>
			
			<View style={styles.noEvents}>
				<Text style={styles.noEventsText}>{this.strings.noEventsText}</Text>
			</View>
		</View>;
	}
	
	rowHasChanged = (r1, r2) => {
		return r1.name !== r2.name;
	}

	shouldChangeDay = (r1, r2) => {
		return r1 !== r2;
	}

	getMonth(date) {
		const month = date - 1;
		const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December'];
			
		this.setState({ month: monthNames[month], showMonth: true });
	}
	
	timeToString = (time) => {
		const date = new Date(time);
		return date.toISOString().split('T')[0];
	}
	
	componentDidMount() {
		this.setState({isVisible: true});     
		this.willFocusSubscription = this.props.navigation.addListener(
			'willFocus',
			() => {
				if (store.getState().NavigationReducer.successfullyInsertedEvents) {
					this.setState({
						snackbarText: 'Event(s) successfully added',
						snackbarVisible: true
					});

					this.props.dispatch(setNavigationScreen({successfullyInsertedEvents: null}));
				}
			}
		);
	}

	componentWillMount() {
		this.setDashboardDataService();

		const currentDate = moment();
		const month = currentDate.format('M');
		
		this.getMonth(month);
	}

	componentWillUnmount() {
		this.willFocusSubscription.remove();
	}

	setDashboardDataService = () => {
		getDataforDashboard()
			.then(items => {
				setTimeout(() => {
					let dict = sortEventsInDictonary(items);
					this.props.dispatch(setDashboardData(dict));
					this.setState({items: dict});
				},2000);
			})
			.catch(err => {
				console.log('err', err);
			});
	}


	showPopover = () => {
		this.setState({isVisible: true});
	}
	
	closePopover = () => {
		this.setState({isVisible: false});
	}

	render() {
		const {calendarOpened, snackbarVisible, snackbarTime, snackbarText, month} = this.state;
		let showCloseFab;
		let showMonthView;

		if (calendarOpened) {
			showCloseFab = 
			<View style={styles.closeCalendarView}>
				<FAB
					style={styles.closeCalendarFab}
					small
					theme={{colors:{accent:dark_blue}}}
					icon="close"
					onPress={() => this.refs.agenda.chooseDay(this.refs.agenda.state.selectedDay)} />
			</View>;
	
			showMonthView = null;

		} else {
			showCloseFab = null;

			showMonthView = 
			<View style={styles.calendarBack}>
				<Text style={styles.calendarBackText}>{month}</Text>
			</View>;
		}

		return(
			<View style={{flex:1}}>
				<View style={styles.content}>
					<StatusBar translucent={true}
						barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
						backgroundColor={statusBarDark} />	

					{showMonthView}
					
					<View style={styles.content}>
						<Agenda ref='agenda'
							items={this.state.items}
							renderItem={this.renderItem}
							listTitle={'Events of the Day'}
							renderEmptyData={this.renderEmptyData}
							onDayChange={(date) => {
								this.getMonth(date.month);
							}}
							onDayPress={(date) => {
								this.getMonth(date.month);
							}}
							rowHasChanged={this.rowHasChanged}
							showOnlyDaySelected={true}
							shouldChangeDay={this.shouldChangeDay}
							theme={{agendaKnobColor: dark_blue}}
							onCalendarToggled={(calendarOpened) => {
								this.setState({calendarOpened}, () => {
									this.forceUpdate();
								});
							}}
						/>
					</View>

					<TouchableOpacity onPress={() => this.props.navigation.navigate(ReviewEventRoute, {title: getStrings().ReviewEvent.title})}
						style={{position:'absolute', bottom: 13 , right:10}}>
						<View style={{flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							height: 45,
							width: 110,
							backgroundColor: dark_blue,
							borderRadius: 22.5, 
							...Platform.select({
								ios: {
									shadowColor: black,
									shadowOffset: { width: 0, height: 2 },
									shadowOpacity: 0.3,
									shadowRadius: 3,    
								},
								android: {
									elevation: 4,
								},
							})
						}}>

							<Text style={{color: white, fontFamily: 'Raleway-Bold', marginRight: 5}}>{getStrings().Dashboard.create}</Text>

							<MaterialCommunityIcons size={20}
								name="calendar-multiple-check"
								color={white}/>
						</View>
					</TouchableOpacity>
				</View>

				{showCloseFab}

				<Snackbar
					visible={snackbarVisible}
					onDismiss={() => this.setState({snackbarVisible: false})} 
					style={styles.snackbar}
					duration={snackbarTime}>
					{snackbarText}
				</Snackbar>

				<ModalEvent visible={this.state.modalVisible}
					dismiss={this.dismissModal}
					navigateEditScreen={this.props.navigateEditScreen}
					categoryColor={categoryColor}
					eventTitle={this.props.eventTitle}
					date={this.props.date}
					time={this.props.time}
					categoryIcon={categoryIcon}
					detailHeight={detailHeight}
					details={details}
					editScreen={editScreen}
					showDeleteModal={this.showDeleteModal} />

				<DeleteModal visible={this.state.deleteDialogVisible}
					dismiss={this.dismissDelete}
					shouldShowModal={this.state.shouldShowModal}
					deleteEvent={this.deleteEvent}
					showModal={this.showModal} />
			</View>
		);
	}
}

let mapStateToProps = (state) => {
	let { fixedEventsColor, nonFixedEventsColor, courseColor } = state.CalendarReducer;
	
	for (let i = 0; i < calendarColors.length; i++) {
		let key = Object.keys(calendarColors[i])[0];
		let value = Object.values(calendarColors[i])[0];

		switch(key) {
			case fixedEventsColor:
				fixedEventsColor = value;
				break;
			
			case nonFixedEventsColor:
				nonFixedEventsColor = value;
				break;
				
			case courseColor:
				courseColor = value;
				break;
		}
	}

	return {
		fixedEventsColor,
		nonFixedEventsColor,
		courseColor
	};
};

export default connect(mapStateToProps)(Dashboard);
