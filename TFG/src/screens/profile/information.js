import React, {Fragment} from 'react';
import {View, Text, ScrollView, Keyboard} from 'react-native';

import * as i18n from '../../i18n';
import * as firebase from '../../firebase';
import * as config from '../../config';
import {getDayOfWeek, getISODate} from '../../utils';
import {colors} from '../../styles';

import Toast from 'react-native-simple-toast';

import Button from '../../components/button';
import ExamForm from '../../components/forms/exam';
import HolidayForm from '../../components/forms/holiday';
import Icon from '../../components/icon';
import ListHeader from '../../components/listHeader';
import ListItem from '../../components/listItem';
import ProfileInfoForm from '../../components/forms/profileInfo';
import TimetableForm from '../../components/forms/timetable';

export default class InformationScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: {},
			profile: undefined,
			dialogTimetable: false,
			dialogHoliday: false,
			dialogEditInfo: false,
			_locale: i18n.currLocale
		}
	}
	
	_listenerCurrProfile(snapshot) {
		let data = snapshot.val() || {};
		this.setState({profile: data});
	}
	
	_listenerSchedules(snapshot) {
		let data = snapshot.val() || {};
		this.setState({timetables: Object.entries(data)});
	}
	
	_listenerHolidays(snapshot) {
		let data = snapshot.val() || {};
		this.setState({holidays: Object.entries(data)});
	}
	
	_listenerSubjects(snapshot) {
		let data = snapshot.val() || {};
		this.setState({subjects: Object.entries(data)});
	}
	
	_listenerExams(snapshot) {
		let data = snapshot.val() || {};
		this.setState({exams: Object.entries(data)});
	}
	
	_updateComponent() {
		this.setState({_locale: i18n.currLocale});
		this.props.navigation.dangerouslyGetParent().setOptions({title: i18n.get('profile.screens.0.title')});
		this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({tabBarLabel: i18n.get('profile.title')});
		
		firebase.ref('currProfile').off('value', this._listenerCurrProfile.bind(this));
		firebase.ref('schedules').off('value', this._listenerSchedules.bind(this));
		firebase.removeListenersToTimetables();
		firebase.ref('holidays').off('value', this._listenerHolidays.bind(this));
		firebase.ref('subjects').off('value', this._listenerSubjects.bind(this));
		firebase.ref('exams').off('value', this._listenerExams.bind(this));
		
		firebase.ref('currProfile').on('value', this._listenerCurrProfile.bind(this));
		firebase.ref('schedules').on('value', this._listenerSchedules.bind(this));
		firebase.addListenersToTimetables();
		firebase.ref('holidays').on('value', this._listenerHolidays.bind(this));
		firebase.ref('subjects').on('value', this._listenerSubjects.bind(this));
		firebase.ref('exams').on('value', this._listenerExams.bind(this));
	}
	
	_onFocusComponent() {
		this.props.navigation.dangerouslyGetParent().setOptions({title: i18n.get('profile.screens.0.title')});
		this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({tabBarLabel: i18n.get('profile.title')});
	}
	
	componentDidMount() {
		i18n.addListener(this._updateComponent.bind(this));
		config.addConfigListener(this._updateComponent.bind(this));
		this.props.navigation.addListener('focus', () => this._onFocusComponent());
		this.props.navigation.addListener('blur', () => {
			this.setState({selected: {}});
			this.props.navigation.dangerouslyGetParent().setOptions({
				headerRight: () => undefined
			});
		});
		this._updateComponent();
		
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this.props.navigation.dangerouslyGetParent()
			.dangerouslyGetParent().setOptions({tabBarVisible: false}));
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.props.navigation.dangerouslyGetParent()
			.dangerouslyGetParent().setOptions({tabBarVisible: true}));
	}
	
	componentWillUnmount() {
		i18n.removeListener(this._updateComponent.bind(this));
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
		
		firebase.ref('currProfile').off('value', this._listenerCurrProfile.bind(this));
		firebase.ref('schedules').off('value', this._listenerSchedules.bind(this));
		firebase.removeListenersToTimetables();
		firebase.ref('holidays').off('value', this._listenerHolidays.bind(this));
		firebase.ref('subjects').off('value', this._listenerSubjects.bind(this));
		firebase.ref('exams').off('value', this._listenerExams.bind(this));
	}
	
	render() {
		return (
			<Fragment>
				<ScrollView style={{flex: 1}}>
					{/*	CONFIG ABOUT INFORMATION	*/}
					<ListHeader label={i18n.get('profile.screens.0.headers.0')}
								rightItem={() =>
									<Icon source={require('../../../assets/icons/icon_edit.png')} iconColor={colors.white}
										  onClick={() => this.setState({dialogEditInfo: true})}/>
								}
					/>
					<ListItem title={i18n.get('profile.screens.0.contents.0')} subtitle={this.state.profile?.name}/>
					<ListItem title={i18n.get('profile.screens.0.contents.1')} rightItem={() => {
						if (this.state.timetables && this.state.timetables.length > 0) {
							const arr = this.state.timetables[0][1].startDate.split('-');
							const month = i18n.get(`commons.calendarLocales.monthNames.${parseInt(arr[1]) - 1}`);
							return <Text style={{color: colors.grey, marginRight: 16}}>{`${arr[2]} ${month} ${arr[0]}`}</Text>
						}
						return undefined;
					}} style={{paddingVertical: 8}}/>
					<ListItem title={i18n.get('profile.screens.0.contents.2')} rightItem={() => {
						if (this.state.timetables && this.state.timetables.length > 0) {
							const arr = this.state.timetables[this.state.timetables.length - 1][1].endDate.split('-');
							const month = i18n.get(`commons.calendarLocales.monthNames.${parseInt(arr[1]) - 1}`);
							return <Text style={{color: colors.grey, marginRight: 16}}>{`${arr[2]} ${month} ${arr[0]}`}</Text>
						}
						return undefined;
					}} style={{paddingTop: 8}}/>
					{/*	CONFIG ABOUT TIMETABLES	*/}
					<ListHeader label={i18n.get('profile.screens.0.headers.1')}
								rightItem={() =>
									<Icon source={require('../../../assets/icons/icon_help.png')} iconColor={colors.white}/>
								}
					/>
					{this.state.timetables?.map((e, index) => {
						const startMonth = i18n.get(`commons.calendarLocales.monthNames.${parseInt(e[1].startDate.split('-')[1]) - 1}`);
						const start = `${startMonth} ${e[1].startDate.split('-')[0]}`;
						const endMonth = i18n.get(`commons.calendarLocales.monthNames.${parseInt(e[1].endDate.split('-')[1]) - 1}`);
						const end = `${endMonth} ${e[1].endDate.split('-')[0]}`;
						return <ListItem key={e[0]} title={`${start} - ${end}`}
										 onClick={() => this.setState({
											 timetable: {key: e[0], index: index, obj: e[1]},
											 dialogTimetable: true
										 })}/>
					})}
					<Button label={`${i18n.get('commons.form.actions.2')}...`} backgroundColor={colors.white} textColor={colors.lightGrey}
							onClick={() => this.setState({dialogTimetable: true})}
							style={{paddingVertical: 15, borderTopWidth: 0.5, borderTopColor: colors.lightGrey}}/>
					{/*	CONFIG ABOUT HOLIDAYS & EVENTS	*/}
					<ListHeader label={i18n.get('profile.screens.0.headers.2')}
								rightItem={() =>
									<Icon source={require('../../../assets/icons/icon_help.png')} iconColor={colors.white}/>
								}
					/>
					{this.state.holidays?.map(e =>
						<ListItem key={e[0]} title={e[1].name} subtitle={`${getISODate(e[1].startDate)} - ${getISODate(e[1].endDate)}`}
								  onClick={() => this.setState({holiday: {key: e[0], obj: e[1]}, dialogHoliday: true})}/>
					)}
					<Button label={`${i18n.get('commons.form.actions.2')}...`} backgroundColor={colors.white} textColor={colors.lightGrey}
							onClick={() => this.setState({dialogHoliday: true})}
							style={{paddingVertical: 15, borderTopWidth: 0.5, borderTopColor: colors.lightGrey}}/>
					{/*	CONFIG ABOUT EXAMS	*/}
					<ListHeader label={i18n.get('profile.screens.0.headers.3')}
								rightItem={() =>
									<Icon source={require('../../../assets/icons/icon_help.png')} iconColor={colors.white}/>
								}
					/>
					{this.state.exams?.sort((a, b) => {
						if (a[1].date > b[1].date) return -1;
						if (a[1].date < b[1].date) return 1;
						return 0;
					}).map(e => {
							const subject = this.state.subjects?.find(x => x[0] === e[1].id_subject);
							let times = [];
							if (e[1].schedules) {
								if (this.state.timetables) {
									const currTimetable = this.state.timetables.find(x => x[0] === e[1].schedules[0].path.split('/')[0]);
									times.push(currTimetable[1][e[1].schedules[0].path.split('/')[1]][e[1].schedules[0].id_schedule].startTime);
									times.push(currTimetable[1][e[1].schedules[e[1].schedules.length - 1].path.split('/')[1]][e[1].schedules[e[1].schedules.length - 1].id_schedule].endTime);
								}
							}
							const day = i18n.get(`commons.calendarLocales.dayNames.${(getDayOfWeek(e[1].date) + 1) % 7}`);
							return <ListItem key={e[0]} title={`${getISODate(e[1].date)} (${day})`}
											 subtitle={subject ? subject[1].name : undefined}
											 rightItem={() => <Text style={{color: colors.grey, marginRight: 16}}>{times.join(' - ')}</Text>}
											 onClick={() => this.setState({exam: {key: e[0], obj: e[1]}, dialogExam: true})}/>
						}
					)}
					<Button label={`${i18n.get('commons.form.actions.2')}...`} backgroundColor={colors.white} textColor={colors.lightGrey}
							onClick={() => this.setState({dialogExam: true})}
							style={{paddingVertical: 15, borderTopWidth: 0.5, borderTopColor: colors.lightGrey}}/>
					<View style={{paddingVertical: 25}}/>
				</ScrollView>
				{this.state.dialogEditInfo &&
				<ProfileInfoForm profile={{key: `${config.currConfig.profile}`, obj: {name: this.state.profile.name}}}
								 onSubmit={() => this.setState({dialogEditInfo: false})}
								 onCancel={() => this.setState({dialogEditInfo: false})}/>
				}
				{this.state.dialogTimetable &&
				<TimetableForm navigation={this.props.navigation} timetable={this.state.timetable}
							   nTimetables={this.state.timetables?.length}
							   onSubmit={() => this.setState({dialogTimetable: false, timetable: undefined})}
							   onCancel={() => this.setState({dialogTimetable: false, timetable: undefined})}
							   onDelete={() => {
								   this.setState({dialogTimetable: false, timetable: undefined})
								   Toast.showWithGravity(i18n.get('commons.timetableForm.toast'), Toast.LONG, Toast.BOTTOM);
							   }}/>
				}
				{this.state.dialogHoliday &&
				<HolidayForm holiday={this.state.holiday}
							 onSubmit={() => this.setState({dialogHoliday: false, holiday: undefined})}
							 onCancel={() => this.setState({dialogHoliday: false, holiday: undefined})}
							 onDelete={() => {
								 this.setState({dialogHoliday: false, holiday: undefined})
								 Toast.showWithGravity(i18n.get('commons.holidayForm.toast'), Toast.LONG, Toast.BOTTOM);
							 }}/>
				}
				{this.state.dialogExam &&
				<ExamForm exam={this.state.exam}
						  onSubmit={() => this.setState({dialogExam: false, exam: undefined})}
						  onCancel={() => this.setState({dialogExam: false, exam: undefined})}
						  onDelete={() => {
							  this.setState({dialogExam: false, holiday: undefined})
							  Toast.showWithGravity(i18n.get('commons.examForm.toast'), Toast.LONG, Toast.BOTTOM);
						  }}/>
				}
			</Fragment>
		);
	}
	
}
