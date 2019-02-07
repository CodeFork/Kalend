import React from 'react';
import {StatusBar, StyleSheet, View, Text, Platform, TouchableOpacity, TextInput, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-datepicker';

class FixedEvent extends React.Component {
	static navigationOptions = {
		title: 'Add Fixed Events',
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontFamily: 'Raleway-Regular'
		},
		headerTransparent: true,
		headerStyle: {
			backgroundColor: '#1473E6',
			marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
		}
	};

	constructor(props) {
		super(props);
		this.state = { 
			title: '',
			allDay: false,
			date: new Date().toLocaleDateString()
		};
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar translucent={true} backgroundColor={'#105dba'} />

				<View style={styles.content}>
					<View style={styles.instruction}>
						<Text style={styles.text}>Add your events, office hours, appointments, etc.</Text>
						<Icon name="calendar-today" size={130} color="#1473E6" />
					</View>

					<View style={styles.textInput}>
						<Icon name="format-title" size={30} color="#1473E6" />
						<View style={styles.textInputBorder}>
							<TextInput style={styles.textInputfont} placeholder="Title" onChangeText={(title) => this.setState({title})} value={this.state.title}/>
						</View>
					</View>
					<View style={styles.timeSection}>
						<View style={styles.allDay}>
							<Text style={styles.blueTitle}>All-Day</Text>
							<Switch trackColor={{false: 'lightgray', true: '#FFBF69'}} ios_backgroundColor={'lightgray'} thumbColor={'#FF9F1C'} onValueChange={(allDay) => this.setState({allDay})} value = {this.state.allDay} />
						</View>

						<View style={styles.start}>
							<Text style={styles.blueTitle}>Start</Text>
							<DatePicker showIcon={false} date={this.state.date} mode="date" placeholder={this.state.date} format="MM/DD/YY" minDate={this.state.date} confirmBtnText="Confirm" cancelBtnText="Cancel" onDateChange={(date) => this.setState({date: date})} value={this.state.date}/>
						</View>

						<View style={styles.end}>
							<Text style={styles.blueTitle}>End</Text>
						</View>
					</View>

				</View>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	content: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-evenly'
	},

	instruction: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},

	text: {
		fontFamily: 'Raleway-Regular',
		color: '#565454',
		fontSize: 20,
		width: 220,
		textAlign: 'right',
		paddingRight: 15
	},

	textInput: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-end',
		marginRight: 20
	},

	textInputFont: {
		fontFamily: 'OpenSans-Regular',
		fontSize: 20
	},

	textInputBorder: {
		borderBottomColor: '#979797',
		borderBottomWidth: 1,
		width: 320,
		marginLeft: 20
	},

	blueTitle: {
		color: '#1473E6',
		fontFamily: 'Raleway-SemiBold',
		fontSize: 18
	},
	
	timeSection: {
		marginLeft: 70
	},

	allDay: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	start: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	end: {
		flexDirection: 'row',
		alignItems: 'center'
	},
});

export default FixedEvent;