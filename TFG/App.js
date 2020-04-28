import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import * as i18n from './src/i18n';

import {colors} from './src/styles';
import Icon from './src/components/icon';

import Calendar from './src/screens/calendar';
import Statistics from './src/screens/statistics';
import Absences from './src/screens/absences';
import Profile from './src/screens/profile';
import Settings from './src/screens/settings';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function CalendarStackNavigator() {
	return (
		<Stack.Navigator screenOptions={{
			headerTintColor: colors.white,
			headerStyle: {backgroundColor: colors.primary}
		}}>
			<Stack.Screen name={'Calendar'} component={Calendar}/>
		</Stack.Navigator>
	);
}

function StatisticsStackNavigator() {
	return (
		<Stack.Navigator screenOptions={{
			headerTintColor: colors.white,
			headerStyle: {backgroundColor: colors.primary}
		}}>
			<Stack.Screen name={'Statistics'} component={Statistics}/>
		</Stack.Navigator>
	);
}

function AbsencesStackNavigator() {
	return (
		<Stack.Navigator screenOptions={{
			headerTintColor: colors.white,
			headerStyle: {backgroundColor: colors.primary}
		}}>
			<Stack.Screen name={'Absences'} component={Absences}/>
		</Stack.Navigator>
	);
}

function ProfileStackNavigator() {
	return (
		<Stack.Navigator screenOptions={{
			headerTintColor: colors.white,
			headerStyle: {backgroundColor: colors.primary}
		}}>
			<Stack.Screen name={'Profile'} component={Profile}/>
		</Stack.Navigator>
	);
}

function SettingsStackNavigator() {
	return (
		<Stack.Navigator screenOptions={{
			headerTintColor: colors.white,
			headerStyle: {backgroundColor: colors.primary}
		}}>
			<Stack.Screen name={'Settings'} component={Settings}/>
		</Stack.Navigator>
	);
}

export default class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			locale: i18n.locale
		}
	}
	
	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return this.state !== nextState;
	}
	
	componentDidMount() {
		i18n.addListener((locale) => {
			this.setState({locale: locale});
		});
	}
	
	render() {
		return (
			<NavigationContainer>
				<Tab.Navigator
					barStyle={{backgroundColor: colors.primary, paddingVertical: 2.5}}>
					<Tab.Screen name={'Calendar'} component={CalendarStackNavigator} options={
						{
							tabBarLabel: i18n.get('calendar.title'),
							tabBarIcon: () => <Icon source={require('./assets/icons/icon_calendar.png')}
													iconColor={colors.white}/>
						}
					}/>
					<Tab.Screen name={'Statistics'} component={StatisticsStackNavigator} options={
						{
							tabBarLabel: i18n.get('statistics.title'),
							tabBarIcon: () => <Icon source={require('./assets/icons/icon_stats.png')}
													iconColor={colors.white}/>
						}
					}/>
					<Tab.Screen name={'Absences'} component={AbsencesStackNavigator} options={
						{
							tabBarLabel: i18n.get('absences.title'),
							tabBarIcon: () => <Icon source={require('./assets/icons/icon_list.png')}
													iconColor={colors.white}/>
						}
					}/>
					<Tab.Screen name={'Profile'} component={ProfileStackNavigator} options={
						{
							tabBarLabel: i18n.get('profile.title'),
							tabBarIcon: () => <Icon source={require('./assets/icons/icon_profile.png')}
													iconColor={colors.white}/>
						}
					}/>
					<Tab.Screen name={'Settings'} component={SettingsStackNavigator} options={
						{
							tabBarLabel: i18n.get('settings.title'),
							tabBarIcon: () => <Icon source={require('./assets/icons/icon_settings.png')}
													iconColor={colors.white}/>
						}
					}/>
				</Tab.Navigator>
			</NavigationContainer>
		);
	}
}
