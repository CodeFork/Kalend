import { store } from '../store';
import { setNavigationScreen } from '../actions';

let updateNavigation = (screen, route) => {
	console.log(store.getState());

	let nav = store.getState().NavigationReducer;

	if (screen === 'Home') {
		nav.main = 'Home';
	} else if (screen === 'WelcomeScreen') {
		nav.main = 'WelcomeScreen';
	} else if (screen === 'Dashboard') {
		nav.main = 'Dashboard';
	}  else if (screen === 'SchoolSchedule') {
		nav.main = 'SchoolSchedule';
	}

	store.dispatch(setNavigationScreen({
		...nav,
		screen,
		route,
	}));
};

export default updateNavigation;