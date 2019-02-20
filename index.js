import {AppRegistry, StatusBar} from 'react-native';
import Home from './src/components/screens/Home';
import React from 'react';
import store from './src/store';
import { Provider } from 'react-redux';
import SchoolSchedule from './src/components/screens/SchoolSchedule';
import SchoolScheduleSelectPicture from './src/components/screens/SchoolScheduleSelectPicture';
import SchoolScheduleTakePicture from './src/components/screens/SchoolScheduleTakePicture';
import LoadingScreen from './src/components/screens/LoadingScreen';
import WelcomeScreen from './src/components/screens/WelcomeScreen';
import FixedEvent from './src/components/screens/FixedEvent';
import NonFixedEvent from './src/components/screens/NonFixedEvent';
import SchoolScheduleCreation from './src/components/screens/SchoolScheduleCreation';
import ScheduleSelection from './src/components/screens/ScheduleSelection';
import ReviewEvent from './src/components/screens/ReviewEvent';
import {name as appName} from './app.json';
import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#1473E6',
		accent: '#FF9F1C',
	}
};

export default function Main() {
	return (
		<Provider store={store}>
			<PaperProvider theme={theme}>
				<AppContainer/>
			</PaperProvider>
		</Provider>
	);
}


StatusBar.setBarStyle('light-content', true);
AppRegistry.registerComponent(appName, () => Main);

const LoginNavigator = createStackNavigator(
	{
		Home
	},
	{
		headerMode: 'none',
		initialRouteName: 'Home'
	}
);

const TutorialNavigator = createStackNavigator(
	{
		SchoolSchedule,
		SchoolScheduleSelectPicture,
		SchoolScheduleTakePicture,
		SchoolScheduleCreation,
		FixedEvent,
		NonFixedEvent,
		ReviewEvent,
		ScheduleSelection,
		//ScheduleSelectionDetails: {screen: ScheduleSelectionDetails}
	}, 
	{
		initialRouteName: 'SchoolSchedule'
	}
);

// const CreateScheduleNavigator = createStackNavigator(
// 	{
// 		CreateSchedule: {screen: CreateSchedule}
// 	}, 
// 	{
// 		headerMode: 'none',
// 		initialRouteName: 'CreateSchedule'
// 	}
// );

// const DashboardNavigator = createStackNavigator(
// 	{
// 		Dashboard: {screen: Dashboard},
// 		DashboardOptions: {screen: DashboardOptionsNavigator},
// 		Chatbot: {screen: Chatbot},
// 		Settings: {screen: Settings}
// 	}, 
// 	{
// 		initialRouteName: 'Dashboard'
// 	}
// );

// const DashboardOptionsNavigator = createStackNavigator(
// 	{
// 		SchoolSchedule: {screen: SchoolScheduleNavigator},
// 		FixedEvent: {screen: FixedEvent},
// 		NonFixedEvent: {screen: NonFixedEvent},
// 		ScheduleSelection: {screen: ScheduleSelectionNavigator},
// 		CompareSchedule: {screen: CompareScheduleNavigator}
// 	}
// );

// const CompareScheduleNavigator = createStackNavigator(
// 	{
// 		CompareSchedule: {screen: CompareSchedule},
// 		CompareScheduleDetails: {screen: CompareScheduleDetails}
// 	}, 
// 	{
// 		initialRouteName: 'CompareSchedule'
// 	}
// );

const MainNavigator = createSwitchNavigator(
	{
		WelcomeScreen,
		LoadingScreen,
		//Dashboard,
		LoginNavigator,
		TutorialNavigator,
		ScheduleSelection
	},
	{
		// headerMode: 'none',
		initialRouteName: 'ScheduleSelection'
	}
);

const AppContainer = createAppContainer(MainNavigator);