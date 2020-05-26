import React, {Fragment} from 'react';
import {View, Text, Image, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';

import * as i18n from '../../i18n';
import * as config from '../../config';
import * as firebase from '../../firebase';
import {compareTimes, getDayOfWeek, getDatesBetween, getISODate, isDateBetween} from '../../utils';
import {colors, subjectColors, textColors} from '../../styles';

import Toast from 'react-native-simple-toast';

import Button from '../../components/button';
import {CalendarList} from 'react-native-calendars';
import CalendarDay from '../../components/calendarDay';
import Dialog from '../../components/dialog';
import Icon from '../../components/icon';
import ListItem from '../../components/listItem';

export default class CalendarScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dialogHelp: false,
			_locale: i18n.currLocale,
			_config: config.currConfig,
			_lastModified: undefined
		}
	}
	
	_listenerSchedules(snapshot) {
		let data = snapshot.val() || {};
		this.setState({schedules: Object.entries(data)}, () =>
			this._updateMarking().then(() => this.setState({schedulesLoad: true})));
	}
	
	_listenerAbsences(snapshot) {
		let data = snapshot.val() || {};
		this.setState({absences: Object.entries(data)}, () => setTimeout(() =>
			this._updateMarking().then(() => this.setState({absencesLoad: true})), 0));
	}
	
	_listenerHolidays(snapshot) {
		let data = snapshot.val() || {};
		this.setState({holidays: Object.entries(data)}, () =>
			this._updateMarking().then(() => this.setState({holidaysLoad: true})));
	}
	
	_listenerSubjects(snapshot) {
		this._updateMarking().then(() => this.setState({subjectsLoad: true}));
	}
	
	_listenerExams(snapshot) {
		let data = snapshot.val() || {};
		this.setState({exams: Object.entries(data)}, () => setTimeout(() =>
			this._updateMarking().then(() => this.setState({examsLoad: true})), 0));
	}
	
	_updateComponent() {
		this.setState({_locale: i18n.currLocale, _config: config.currConfig, _lastModified: new Date().getTime()});
		this.props.navigation.setOptions({
			title: i18n.get(`calendar.title`),
			headerRight: () =>
				<Icon source={require('../../../assets/icons/icon_help.png')} iconColor={colors.white}
					  style={{marginRight: 16}}
					  onClick={() => this.setState({dialogHelp: true})}/>
		});
		this.props.navigation.dangerouslyGetParent().setOptions({tabBarLabel: i18n.get('calendar.title')});
		
		firebase.ref('schedules').off('value', this._listenerSchedules.bind(this));
		firebase.ref('absences').off('value', this._listenerAbsences.bind(this));
		firebase.ref('holidays').off('value', this._listenerHolidays.bind(this));
		firebase.ref('subjects').off('value', this._listenerSubjects.bind(this));
		firebase.ref('exams').off('value', this._listenerExams.bind(this));
		
		firebase.ref('schedules').on('value', this._listenerSchedules.bind(this));
		firebase.ref('absences').on('value', this._listenerAbsences.bind(this));
		firebase.ref('holidays').on('value', this._listenerHolidays.bind(this));
		firebase.ref('subjects').on('value', this._listenerSubjects.bind(this));
		firebase.ref('exams').on('value', this._listenerExams.bind(this));
	}
	
	componentDidMount() {
		i18n.addListener(this._updateComponent.bind(this));
		config.addConfigListener(this._updateComponent.bind(this));
		this._updateComponent();
	}
	
	componentWillUnmount() {
		i18n.removeListener(this._updateComponent.bind(this));
		config.removeConfigListener(this._updateComponent.bind(this));
		
		firebase.ref('schedules').off('value', this._listenerSchedules.bind(this));
		firebase.ref('absences').off('value', this._listenerAbsences.bind(this));
		firebase.ref('holidays').off('value', this._listenerHolidays.bind(this));
		firebase.ref('subjects').off('value', this._listenerSubjects.bind(this));
		firebase.ref('exams').off('value', this._listenerExams.bind(this));
	}
	
	async _updateMarking() {
		let marking = {};
		const abs = this.state.absences;
		if (abs)
			for (let ii = 0; ii < abs.length; ii++) {
				if (!marking[abs[ii][0]]) marking[abs[ii][0]] = {};
				marking[abs[ii][0]].multi = [];
				const entries = Object.entries(abs[ii][1]);
				for (let jj = 0; jj < entries.length; jj++) {
					const id_subject = await firebase.ref('schedules').child(entries[jj][1].path).child(entries[jj][0]).once('value').then(result => result.val()?.id_subject ?? undefined);
					if (id_subject) {
						const color = await firebase.ref('subjects').child(id_subject).once('value').then(result => result.val().color);
						marking[abs[ii][0]].multi.push({color: color});
					}
				}
			}
		const hol = this.state.holidays;
		if (hol)
			for (let ii = 0; ii < hol.length; ii++) {
				const dates = getDatesBetween(hol[ii][1].startDate, hol[ii][1].endDate);
				for (let jj = 0; jj < dates.length; jj++) {
					if (!marking[dates[jj]]) marking[dates[jj]] = {};
					if (!marking[dates[jj]].selection) marking[dates[jj]].selection = {};
					let obj = {...marking[dates[jj]].selection};
					obj.color = colors.primaryLight;
					if (!marking[dates[jj]].selection.color) {
						if (dates[jj] == hol[ii][1].startDate)
							obj.isStart = true;
						if (dates[jj] == hol[ii][1].endDate)
							obj.isEnd = true;
					} else if (marking[dates[jj]].selection.isStart && dates[jj] != hol[ii][1].startDate)
						delete obj.isStart;
					else if (marking[dates[jj]].selection.isEnd && dates[jj] != hol[ii][1].endDate)
						delete obj.isEnd;
					
					marking[dates[jj]].selection = {...obj}
				}
			}
		const ex = this.state.exams;
		if (ex)
			for (let ii = 0; ii < ex.length; ii++) {
				if (!marking[ex[ii][1].date]) marking[ex[ii][1].date] = {};
				if (!marking[ex[ii][1].date].single) marking[ex[ii][1].date].single = {};
				const color = await firebase.ref('subjects').child(ex[ii][1].id_subject).once('value').then(result => result.val().color);
				if (color)
					marking[ex[ii][1].date].single = {color: color, textColor: textColors[color]};
			}
		this.setState({marking: marking})
	}
	
	render() {
		const minDate = this.state.schedules ? this.state.schedules[0][1].startDate : undefined;
		const maxDate = this.state.schedules ? this.state.schedules[this.state.schedules.length - 1][1].endDate : undefined;
		return <View style={styles.container}>
			{(!this.state.schedulesLoad || !this.state.absencesLoad || !this.state.holidaysLoad || !this.state.subjectsLoad || !this.state.examsLoad) &&
			<View style={styles.loading}>
				<View style={{backgroundColor: colors.white, borderRadius: 10, padding: 32, marginBottom: 100}}>
					<ActivityIndicator size={40} animating={true} color={colors.primary}/>
					<Text style={{marginTop: 16}}>{i18n.get('calendar.loading')}</Text>
				</View>
			</View>
			}
			<CalendarList key={this.state._lastModified}
						  markedDates={this.state.marking}
						  hideExtraDays={false}
						  calendarHeight={Dimensions.get('window').height}
						  horizontal={true}
						  pagingEnabled={true}
						  futureScrollRange={24}
						  pastScrollRange={24}
						  minDate={minDate}
						  maxDate={maxDate}
						  monthFormat={'yyyy MMMM'}
						  firstDay={1}
						  onPressArrowLeft={substractMonth => substractMonth()}
						  onPressArrowRight={addMonth => addMonth()}
						  theme={{
							  'stylesheet.calendar.main': {
								  week: {
									  marginTop: 1, marginBottom: 1,
									  flexDirection: 'row', justifyContent: 'space-around'
								  }
							  },
							  'stylesheet.calendar-list.main': {
								  calendar: {
									  paddingLeft: 5,
									  paddingRight: 5
								  }
							  }
						  }}
						  dayComponent={({date, state, marking}) => {
							  let newMarking = {...marking};
							  if (!this.state._config.calendar[0]) newMarking.multi = undefined;
							  if (!this.state._config.calendar[1]) newMarking.selection = undefined;
							  if (!this.state._config.calendar[2]) newMarking.single = undefined;
				
							  return (
								  <CalendarDay date={date} state={state} marking={newMarking}
											   onClick={async (value) => {
												   if (date.dateString >= minDate && date.dateString <= maxDate) {
													   let obj = {};
													   let currSchedule = this.state.schedules.find(e => value.dateString >= e[1].startDate && value.dateString <= e[1].endDate);
													   obj.dateString = value.dateString;
							
													   const holidays = this.state.holidays?.filter(e => isDateBetween(value.dateString, e[1].startDate, e[1].endDate))
													   if (holidays.length > 0) {
														   obj.holidays = [];
														   holidays.forEach(e => {
															   obj.holidays.push({id_holiday: e[0], name: e[1].name, endDate: e[1].endDate})
														   })
													   } else {
														   const dayOfWeek = getDayOfWeek(value.dateString);
														   const exams = this.state.exams?.filter(e => e[1].date === date.dateString);
														   if (exams.length > 0) {
															   obj.exams = [];
															   for (let ii = 0; ii < exams.length; ii++) {
																   obj.exams[ii] = {...exams[ii][1]};
																   obj.exams[ii].name = await firebase.ref('subjects')
																	   .child(exams[ii][1].id_subject)
																	   .once('value')
																	   .then(result => result.val()?.name ?? undefined);
																   if (exams[ii][1].schedules) {
																	   obj.exams[ii].startTime = currSchedule[1][dayOfWeek][exams[ii][1].schedules[0].id_schedule].startTime
																	   obj.exams[ii].endTime = currSchedule[1][dayOfWeek][exams[ii][1].schedules[exams[ii][1].schedules.length - 1].id_schedule].endTime
																   }
															   }
														   }
														   if (currSchedule[1][dayOfWeek]) {
															   const subjects = Object.entries(currSchedule[1][dayOfWeek])
																   .sort((arg0, arg1) => compareTimes(arg1[1].startTime, arg0[1].startTime));
															   obj.subjects = [];
															   for (let ii = 0; ii < subjects.length; ii++)
																   if (subjects[ii][1].id_subject) {
																	   obj.subjects[ii] = {...subjects[ii][1]};
																	   obj.subjects[ii].id_schedule = subjects[ii][0];
																	   obj.subjects[ii].path = `${currSchedule[0]}/${dayOfWeek}`;
																	   obj.subjects[ii].name = await firebase.ref('subjects')
																		   .child(subjects[ii][1].id_subject)
																		   .once('value')
																		   .then(result => result.val()?.name ?? undefined);
																   }
														   }
													   }
													   this.setState({selected: obj});
												   }
											   }}/>
							  );
						  }}
			/>
			<View style={styles.helpTextContainer}><Text style={styles.helpText}>{i18n.get('calendar.helpText')}</Text></View>
			{this.state.selected &&
			<Dialog title={getISODate(this.state.selected.dateString)}
					content={() =>
						<Fragment>
							{!this.state.selected.holidays && this.state.selected.subjects &&
							<Text style={{textAlign: 'center', color: colors.grey}}>
								{i18n.get('calendar.absencesDialog.placeholders.0')}
							</Text>
							}
							{!this.state.selected.subjects && this.state.selected.holidays &&
							<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
								<Text style={{textAlign: 'left', color: colors.grey}}>
									{i18n.get('calendar.holidaysDialog.placeholders.0')}
								</Text>
								<Image source={require('../../../assets/icons/icon_party.png')}
									   style={{width: 24, height: 24}}/>
							</View>
							}
							{this.state.selected.holidays?.map(e =>
								<ListItem key={e.id_holiday} title={e.name} feedback={false}
										  subtitle={`${i18n.get('calendar.holidaysDialog.placeholders.1')} ${getISODate(e.endDate)}`}
										  containerStyle={{paddingHorizontal: 0}}/>
							)}
							{!this.state.selected.holidays && this.state.selected.subjects?.map((e, index) => {
								let selected = undefined;
								if (this.state.absences) {
									const arr = this.state.absences.find(x => x[0] === this.state.selected.dateString);
									if (arr) selected = Object.keys(arr[1]).find(x => x === e.id_schedule)
								}
								const exam = this.state.selected.exams?.find(x => x.schedules?.map(y => y.id_schedule)?.includes(e.id_schedule))
								if (exam)
									return <ListItem key={index} title={exam.name}
													 subtitle={i18n.get('commons.examForm.title') + ` ${e.startTime} - ${e.endTime}`}
													 containerStyle={{paddingHorizontal: 0}}
													 rightItem={() => <Image source={require('../../../assets/icons/icon_exam_art.png')}
																			 style={{width: 28, height: 28, marginLeft: 8}}/>}/>
								else
									return e.name &&
										<ListItem key={index} title={e.name}
												  subtitle={`${e.startTime} - ${e.endTime}`}
												  containerStyle={{paddingHorizontal: 0}}
												  rightItem={() =>
													  <Icon source={require('../../../assets/icons/icon_check.png')}
															size={'small'} disabled={true}
															iconColor={selected ? colors.primary : colors.white}
															style={{
																borderWidth: 1, borderColor: colors.primary, borderRadius: 1000,
																padding: 10, marginLeft: 8
															}}/>
												  }
												  onClick={() => {
													  if (selected)
														  firebase.ref('absences').child(this.state.selected.dateString).child(e.id_schedule).remove()
															  .then(() => Toast.showWithGravity(i18n.get('calendar.absenceChanged.1'), Toast.SHORT, Toast.BOTTOM));
													  else
														  firebase.ref('absences').child(this.state.selected.dateString).child(e.id_schedule)
															  .set({path: e.path, id_subject: e.id_subject})
															  .then(() => Toast.showWithGravity(i18n.get('calendar.absenceChanged.0'), Toast.SHORT, Toast.BOTTOM));
												  }}
										/>
							})}
							{!this.state.selected.holidays && this.state.selected.exams?.map((e, index) => {
								if (this.state.selected.subjects && e.schedules) {
									for (let ii = 0; ii < e.schedules.length; ii++) {
										if (this.state.selected.subjects.find(x => x.id_schedule === e.schedules[ii].id_schedule))
											return;
									}
								}
								return <ListItem key={index} title={e.name}
												 subtitle={i18n.get('commons.examForm.title') + (e.startTime ? ` ${e.startTime} - ${e.endTime}` : '')}
												 containerStyle={{paddingHorizontal: 0}}
												 rightItem={() => <Image source={require('../../../assets/icons/icon_exam_art.png')}
																		 style={{width: 28, height: 28, marginLeft: 8}}/>}/>
							})}
							{!this.state.selected.holidays && !this.state.selected.subjects && !this.state.selected.exams &&
							<Text>{i18n.get('calendar.emptySchedule')}</Text>}
						</Fragment>
					}
					buttons={() =>
						<Fragment>
							<Button label={i18n.get('commons.helpDialog.actions.0')}
									backgroundColor={colors.primary} textColor={colors.white}
									onClick={() => this.setState({selected: undefined})}/>
						</Fragment>
					}
					visible={true}/>
			}
			<Dialog title={i18n.get('commons.helpDialog.title')}
					content={() =>
						<Fragment>
							<View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
								<View style={{
									width: 20, height: 20, borderRadius: 1000,
									backgroundColor: subjectColors[6], marginHorizontal: 5, marginRight: 10
								}}/>
								<Text style={{
									flex: 1,
									flexWrap: 'wrap'
								}}>{i18n.get('calendar.helpDialog.placeholders.0')}</Text>
							</View>
							<View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
								<View style={{
									width: 25, height: 25, borderRadius: 1000,
									backgroundColor: colors.primaryLight, marginHorizontal: 2.5, marginRight: 10
								}}/>
								<Text style={{
									flex: 1,
									flexWrap: 'wrap'
								}}>{i18n.get('calendar.helpDialog.placeholders.1')}</Text>
							</View>
							<View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
								<View style={{width: 30, flexDirection: 'row', flexWrap: 'wrap', marginRight: 10}}>
									<View style={{
										width: 10, height: 10, borderRadius: 1000,
										backgroundColor: subjectColors[1], margin: 2.5
									}}/>
									<View style={{
										width: 10, height: 10, borderRadius: 1000,
										backgroundColor: subjectColors[6], margin: 2.5
									}}/>
									<View style={{
										width: 10, height: 10, borderRadius: 1000,
										backgroundColor: subjectColors[12], margin: 2.5
									}}/>
									<View style={{
										width: 10, height: 10, borderRadius: 1000,
										backgroundColor: subjectColors[8], margin: 2.5
									}}/>
								</View>
								<Text style={{
									flex: 1,
									flexWrap: 'wrap'
								}}>{i18n.get('calendar.helpDialog.placeholders.2')}</Text>
							</View>
							<Text style={{textAlign: 'center', color: colors.grey, marginTop: 10}}>
								{i18n.get('calendar.helpDialog.placeholders.3')}
							</Text>
						</Fragment>
					}
					buttons={() =>
						<Button label={i18n.get('commons.helpDialog.actions.0')}
								backgroundColor={colors.primary} textColor={colors.white}
								onClick={() => this.setState({dialogHelp: false})}/>
					}
					visible={this.state.dialogHelp}/>
		</View>;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, flexDirection: 'column'
	},
	loading: {
		position: 'absolute', zIndex: 10, top: 0, left: 0, right: 0, bottom: 0,
		justifyContent: 'center', alignItems: 'center',
		backgroundColor: colors.grey + '66'
	},
	helpTextContainer: {
		position: 'absolute', bottom: 25,
		flex: 1, alignItems: 'center', justifyContent: 'center',
		marginHorizontal: 50
	},
	helpText: {
		textAlign: 'center',
		color: colors.grey
	}
})
