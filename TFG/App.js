import React, {Fragment} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";

import * as i18n from './src/i18n';
import * as config from './src/config';
import * as firebase from './src/firebase';
import {colors} from './src/styles';

import Icon from './src/components/icon';

import Calendar from './src/screens/calendar';
import Statistics from './src/screens/statistics';
import Absences from './src/screens/absences';
import Information from './src/screens/profile/information';
import Subjects from './src/screens/profile/subjects';
import Teachers from './src/screens/profile/teachers';
import Settings from './src/screens/settings';
import TimeTable from "./src/screens/timetable";

const BottomTab = createBottomTabNavigator();
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
			<Stack.Screen name={'AbsenceView'} component={Absences}/>
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
			headerStyle: {backgroundColor: colors.primary, elevation: 0, shadowOpacity: 0, shadowOffset: {height: 0,}, shadowRadius: 0},
			headerMode: 'screen'
		}}>
			<Stack.Screen name={'Profile'} component={ProfileTopTabNavigators}/>
			<Stack.Screen name={'Timetable'} component={TimetableNavigator}
						  options={{title: i18n.get('timetable.title')}}
			/>
		</Stack.Navigator>
	);
}

function ProfileTopTabNavigators() {
	return (
		<TopTab.Navigator
			initialRouteName={'Information'}
			lazy={true}
			tabBarOptions={{
				showIcon: true, showLabel: false,
				indicatorStyle: {backgroundColor: 'white'},
				style: {backgroundColor: colors.primary},
			}}
		>
			<TopTab.Screen name={'Information'} component={Information} options={
				{tabBarIcon: () => <Icon source={require('./assets/icons/icon_info.png')} iconColor={colors.white}/>}
			}/>
			<TopTab.Screen name={'Subjects'} component={Subjects} options={
				{tabBarIcon: () => <Icon source={require('./assets/icons/icon_book.png')} iconColor={colors.white}/>}
			}/>
			<TopTab.Screen name={'Teachers'} component={Teachers} options={
				{tabBarIcon: () => <Icon source={require('./assets/icons/icon_person.png')} iconColor={colors.white}/>}
			}/>
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

const TimetableContext = React.createContext({key: undefined, day: undefined});

function TimetableNavigator({route}) {
	const parentRoute = {...route};
	return (
		<TimetableContext.Provider value={{key: parentRoute.params.key}}>
			<TopTab.Navigator
				initialRouteName={'Monday'}
				lazy={true}
				tabBarOptions={{
					showIcon: false, showLabel: true,
					indicatorStyle: {backgroundColor: 'white'},
					labelStyle: {color: colors.white, fontSize: 11, textTransform: 'capitalize'},
					style: {backgroundColor: colors.primary}
				}}
			>
				<TopTab.Screen name={'Monday'} component={TimetableScreen.bind(parentRoute)} initialParams={{day: 0}}
							   options={{tabBarLabel: i18n.get('timetable.titles.0')}}/>
				<TopTab.Screen name={'Tuesday'} component={TimetableScreen.bind(parentRoute)} initialParams={{day: 1}}
							   options={{tabBarLabel: i18n.get('timetable.titles.1')}}/>
				<TopTab.Screen name={'Wednesday'} component={TimetableScreen.bind(parentRoute)} initialParams={{day: 2}}
							   options={{tabBarLabel: i18n.get('timetable.titles.2')}}/>
				<TopTab.Screen name={'Thursday'} component={TimetableScreen.bind(parentRoute)} initialParams={{day: 3}}
							   options={{tabBarLabel: i18n.get('timetable.titles.3')}}/>
				<TopTab.Screen name={'Friday'} component={TimetableScreen.bind(parentRoute)} initialParams={{day: 4}}
							   options={{tabBarLabel: i18n.get('timetable.titles.4')}}/>
				<TopTab.Screen name={'Saturday'} component={TimetableScreen.bind(parentRoute)} initialParams={{day: 5}}
							   options={{tabBarLabel: i18n.get('timetable.titles.5')}}/>
				<TopTab.Screen name={'Sunday'} component={TimetableScreen.bind(parentRoute)} initialParams={{day: 6}}
							   options={{tabBarLabel: i18n.get('timetable.titles.6')}}/>
			</TopTab.Navigator>
		</TimetableContext.Provider>
	)
}

function TimetableScreen({navigation, route}) {
	route.params = {...route.params, ...this.params};
	return <TimeTable navigation={navigation} route={route}/>;
}

export default class App extends React.Component {
	
	
	constructor(props) {
		super(props);
		this.state = {
			_navigation: 'default',
			_locale: undefined,
			_config: undefined,
			_firebaseKey: undefined
		};
		i18n.locale().then(locale => this.setState({_locale: locale}));
		config.config().then(config => this.setState({_config: config}));
		firebase.firebaseKey().then(firebaseKey => this.setState({_firebaseKey: firebaseKey}));
	}
	
	render() {
		return (<Fragment>
				{this.state._locale && this.state._config && this.state._firebaseKey ?
					<NavigationContainer>
						<BottomTab.Navigator
							initialRouteName={'Calendar'}
							backBehavior={'initialRoute'}
							tabBar={({state, navigation}) =>
								<View style={{flexDirection: 'row', backgroundColor: colors.primary, paddingVertical: 5}}>
									<TouchableOpacity onPress={() => state.index !== 0 && navigation.jumpTo('Calendar')}
													  style={{
														  flex: 1, flexDirection: 'column',
														  justifyContent: 'center', alignItems: 'center', padding: 4
													  }}>
										<Icon source={require('./assets/icons/icon_calendar.png')} disabled={true}
											  iconColor={colors.white}/>
										{state.index === 0 &&
										<Text numberOfLines={1}
											  style={{color: colors.white, fontSize: 11}}>{i18n.get('calendar.title')}</Text>}
									</TouchableOpacity>
									<TouchableOpacity onPress={() => state.index !== 1 && navigation.jumpTo('Statistics')}
													  style={{
														  flex: 1, flexDirection: 'column',
														  justifyContent: 'center', alignItems: 'center', padding: 4
													  }}>
										<Icon source={require('./assets/icons/icon_stats.png')} disabled={true}
											  iconColor={colors.white}/>
										{state.index === 1 &&
										<Text numberOfLines={1}
											  style={{color: colors.white, fontSize: 11}}>{i18n.get('statistics.title')}</Text>}
									</TouchableOpacity>
									<TouchableOpacity onPress={() => state.index !== 2 && navigation.jumpTo('Absences')}
													  style={{
														  flex: 1, flexDirection: 'column',
														  justifyContent: 'center', alignItems: 'center', padding: 4
													  }}>
										<Icon source={require('./assets/icons/icon_list.png')} disabled={true}
											  iconColor={colors.white}/>
										{state.index === 2 &&
										<Text numberOfLines={1}
											  style={{color: colors.white, fontSize: 11}}>{i18n.get('absences.title')}</Text>}
									</TouchableOpacity>
									<TouchableOpacity onPress={() => state.index !== 3 && navigation.jumpTo('Profile')}
													  style={{
														  flex: 1, flexDirection: 'column',
														  justifyContent: 'center', alignItems: 'center', padding: 4
													  }}>
										<Icon source={require('./assets/icons/icon_profile.png')} disabled={true}
											  iconColor={colors.white}/>
										{state.index === 3 &&
										<Text numberOfLines={1}
											  style={{color: colors.white, fontSize: 11}}>{i18n.get('profile.title')}</Text>}
									</TouchableOpacity>
									<TouchableOpacity onPress={() => state.index !== 4 && navigation.jumpTo('Settings')}
													  style={{
														  flex: 1, flexDirection: 'column',
														  justifyContent: 'center', alignItems: 'center', padding: 4
													  }}>
										<Icon source={require('./assets/icons/icon_settings.png')} disabled={true}
											  iconColor={colors.white}/>
										{state.index === 4 &&
										<Text numberOfLines={1}
											  style={{color: colors.white, fontSize: 11}}>{i18n.get('settings.title')}</Text>}
									</TouchableOpacity>
								</View>
							}
						>
							<BottomTab.Screen name={'Calendar'} component={CalendarStackNavigator}/>
							<BottomTab.Screen name={'Statistics'} component={StatisticsStackNavigator}/>
							<BottomTab.Screen name={'Absences'} component={AbsencesStackNavigator}/>
							<BottomTab.Screen name={'Profile'} component={ProfileStackNavigator}/>
							<BottomTab.Screen name={'Settings'} component={SettingsStackNavigator}/>
						</BottomTab.Navigator>
					</NavigationContainer>
					: <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
						<ActivityIndicator size={'large'} color={colors.primary}/>
					</View>
				}
			</Fragment>
		);
	}
}
