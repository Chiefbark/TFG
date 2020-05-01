import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import * as i18n from './src/i18n';
import * as config from './src/config';

import {colors} from './src/styles';
import Icon from './src/components/icon';

import Calendar from './src/screens/calendar';
import Statistics from './src/screens/statistics';
import Absences from './src/screens/absences';
import Profile from './src/screens/profile';
import Information from './src/screens/profile/information';
import Subjects from './src/screens/profile/subjects';
import Teachers from './src/screens/profile/teachers';
import Settings from './src/screens/settings';

const BottomTab = createMaterialBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
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
			<Stack.Screen name={'Profile'} component={ProfileTopTabNavigators}/>
		</Stack.Navigator>
	);
}

// tabBar={() => {
// 	return <Icon source={require('./assets/icons/icon_info.png')} iconColor={colors.white}/>
// }}
function ProfileTopTabNavigators() {
	return (
		<TopTab.Navigator
			initialRouteName={'Information'}
			tabBarOptions={{
				activeTintColor: '#e91e63',
				labelStyle: {fontSize: 12},
				style: {backgroundColor: 'powderblue'},
			}}
		>
			<TopTab.Screen name={'Information'} component={Information}
						   options={{tabBarLabel: 'Home'}}/>
			<TopTab.Screen name={'Subjects'} component={Subjects}
						   options={{tabBarLabel: 'Updates'}}/>
			<TopTab.Screen name={'Teachers'} component={Teachers}
						   options={{tabBarLabel: 'Profile'}}/>
		</TopTab.Navigator>
	)
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
			_locale: undefined,
			_config: undefined
		};
	}

	componentDidMount() {
		i18n.locale().then(locale => this.setState({_locale: locale}));
		config.config().then(config => this.setState({_config: config}));
	}

	render() {
		return (
			<NavigationContainer>
				{this.state._locale && this.state._config &&
				<BottomTab.Navigator
					barStyle={{backgroundColor: colors.primary, paddingVertical: 2.5}}>
					<BottomTab.Screen name={'Calendar'} component={CalendarStackNavigator} options={
						{
							tabBarLabel: i18n.get('calendar.title'),
							tabBarIcon: () => <Icon source={require('./assets/icons/icon_calendar.png')}
													iconColor={colors.white}/>
						}
					}/>
					<BottomTab.Screen name={'Statistics'} component={StatisticsStackNavigator} options={
						{
							tabBarLabel: i18n.get('statistics.title'),
							tabBarIcon: () => <Icon source={require('./assets/icons/icon_stats.png')}
													iconColor={colors.white}/>
						}
					}/>
					<BottomTab.Screen name={'Absences'} component={AbsencesStackNavigator} options={
						{
							tabBarLabel: i18n.get('absences.title'),
							tabBarIcon: () => <Icon source={require('./assets/icons/icon_list.png')}
													iconColor={colors.white}/>
						}
					}/>
					<BottomTab.Screen name={'Profile'} component={ProfileStackNavigator} options={
						{
							tabBarLabel: i18n.get('profile.title'),
							tabBarIcon: () => <Icon source={require('./assets/icons/icon_profile.png')}
													iconColor={colors.white}/>
						}
					}/>
					<BottomTab.Screen name={'Settings'} component={SettingsStackNavigator} options={
						{
							tabBarLabel: i18n.get('settings.title'),
							tabBarIcon: () => <Icon source={require('./assets/icons/icon_settings.png')}
													iconColor={colors.white}/>
						}
					}/>
				</BottomTab.Navigator>
				}
			</NavigationContainer>
		);
	}
}
//
// import * as React from 'react';
// import { Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//
// function FeedScreen() {
// 	return (
// 		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// 			<Text>Feed!</Text>
// 		</View>
// 	);
// }
//
// function NotificationsScreen() {
// 	return (
// 		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// 			<Text>Notifications!</Text>
// 		</View>
// 	);
// }
//
// function ProfileScreen() {
// 	return (
// 		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// 			<Text>Profile!</Text>
// 		</View>
// 	);
// }
//
// const Tab = createMaterialTopTabNavigator();
//
// function MyTabs() {
// 	return (
// 		<Tab.Navigator
// 			initialRouteName="Feed"
// 			tabBarOptions={{
// 				activeTintColor: '#e91e63',
// 				labelStyle: { fontSize: 12 },
// 				style: { backgroundColor: 'powderblue' },
// 			}}
// 		>
// 			<Tab.Screen
// 				name="Feed"
// 				component={FeedScreen}
// 				options={{ tabBarLabel: 'Home' }}
// 			/>
// 			<Tab.Screen
// 				name="Notifications"
// 				component={NotificationsScreen}
// 				options={{ tabBarLabel: 'Updates' }}
// 			/>
// 			<Tab.Screen
// 				name="Profile"
// 				component={ProfileScreen}
// 				options={{ tabBarLabel: 'Profile' }}
// 			/>
// 		</Tab.Navigator>
// 	);
// }
// export default function App() {
// 	return (
// 		<NavigationContainer>
// 			<MyTabs />
// 		</NavigationContainer>
// 	);
// }
//
