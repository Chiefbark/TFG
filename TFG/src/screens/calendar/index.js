import React, {Fragment} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import * as i18n from '../../i18n';
import * as config from '../../config';
import * as firebase from '../../firebase';
import {compareTimes, getDayOfWeek, getDatesBetween, getISODate, isDateBetween} from '../../utils';
import {colors, subjectColors} from '../../styles';

import Toast from 'react-native-simple-toast';

import Button from '../../components/button';
import {Calendar} from 'react-native-calendars';
import CalendarDay from '../../components/calendarDay';
import Dialog from '../../components/dialog';
import Icon from '../../components/icon';
import ListItem from "../../components/listItem";

const markedDates = {
	'2020-05-15': {
		single: {color: 'black', textColor: 'white'},
	},
	'2020-05-22': {
		selection: {
			color: 'pink',
			isStart: true,
			textColor: 'white'
		},
		multi: [
			{color: 'green'},
			{color: 'blue'},
			{color: 'yellow'},
			{color: 'red'},
			{color: 'purple'},
		]
	}, '2020-05-23': {
		selection: {
			color: 'pink',
			textColor: 'white'
		},
	}, '2020-05-24': {
		selection: {
			color: 'pink',
			isEnd: true,
			textColor: 'white'
		},
	}
};

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
	}
	
	componentDidMount() {
		i18n.addListener(this._updateComponent.bind(this));
		config.addListener(this._updateComponent.bind(this));
		this._updateComponent();
		
		firebase.ref('schedules').on('value', snapshot => {
			let data = snapshot.val() || {};
			this.setState({schedules: Object.entries(data)}, () => this._updateMarking());
		});
		firebase.ref('absences').on('value', snapshot => {
			let data = snapshot.val() || {};
			this.setState({absences: Object.entries(data)}, () => this._updateMarking());
		});
		firebase.ref('holidays').on('value', snapshot => {
			let data = snapshot.val() || {};
			this.setState({holidays: Object.entries(data)}, () => this._updateMarking());
		});
		firebase.ref('subjects').on('value', () => this._updateMarking());
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
		// TODO: EXAMS
		this.setState({marking: marking})
	}
	
	componentWillUnmount() {
		i18n.removeListener(this._updateComponent.bind(this));
		config.removeListener(this._updateComponent.bind(this));
	}
	
	render() {
		return <View style={styles.container}>
			<Calendar key={this.state._lastModified}
					  markedDates={this.state.marking}
					  minDate={'2020-01-01'}
					  maxDate={'2021-01-01'}
					  monthFormat={'yyyy MMMM'}
					  firstDay={1}
					  onPressArrowLeft={substractMonth => substractMonth()}
					  onPressArrowRight={addMonth => addMonth()}
					  theme={{
						  arrowColor: colors.black,
						  'stylesheet.calendar.main': {
							  week: {
								  marginTop: 1, marginBottom: 1,
								  flexDirection: 'row', justifyContent: 'space-around'
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
											   let obj = {};
											   let currSchedule = this.state.schedules.find(e => value.dateString >= e[1].startDate && value.dateString <= e[1].endDate);
											   obj.dateString = value.dateString;
						
											   let holidays = this.state.holidays?.filter(e => isDateBetween(value.dateString, e[1].startDate, e[1].endDate))
											   if (holidays.length > 0) {
												   obj.holidays = [];
												   holidays.forEach(e => {
													   obj.holidays.push({id_holiday: e[0], name: e[1].name, endDate: e[1].endDate})
												   })
											   } else {
												   const dayOfWeek = getDayOfWeek(value.dateString);
												   if (currSchedule[1][dayOfWeek]) {
													   const sorted = Object.entries(currSchedule[1][dayOfWeek])
														   .sort((arg0, arg1) => compareTimes(arg1[1].startTime, arg0[1].startTime));
													   obj.subjects = [];
													   for (let ii = 0; ii < sorted.length; ii++)
														   if (sorted[ii][1].id_subject) {
															   obj.subjects[ii] = {...sorted[ii][1]};
															   obj.subjects[ii].id_schedule = sorted[ii][0];
															   obj.subjects[ii].path = `${currSchedule[0]}/${dayOfWeek}`;
															   obj.subjects[ii].id_subject = sorted[ii][1].id_subject;
															   obj.subjects[ii].name = await firebase.ref('subjects')
																   .child(sorted[ii][1].id_subject)
																   .once('value')
																   .then(result => result.val()?.name ?? undefined);
														   }
												   }
											   }
											   this.setState({selected: obj});
										   }}/>
						  );
					  }}
			/>
			<View style={styles.helpTextContainer}><Text style={styles.helpText}>{i18n.get('calendar.helpText')}</Text></View>
			<Dialog title={i18n.get('commons.helpDialog.title')}
					content={() =>
						<Fragment>
							<View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
								<View style={{
									width: 20, height: 20, borderRadius: 1000,
									backgroundColor: subjectColors[6], marginHorizontal: 5, marginRight: 10
								}}/>
								<Text style={{flex: 1, flexWrap: 'wrap'}}>{i18n.get('calendar.helpDialog.placeholders.0')}</Text>
							</View>
							<View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
								<View style={{
									width: 25, height: 25, borderRadius: 1000,
									backgroundColor: colors.primaryLight, marginHorizontal: 2.5, marginRight: 10
								}}/>
								<Text style={{flex: 1, flexWrap: 'wrap'}}>{i18n.get('calendar.helpDialog.placeholders.1')}</Text>
							</View>
							<View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
								<View style={{width: 30, flexDirection: 'row', flexWrap: 'wrap', marginRight: 10}}>
									<View style={{
										width: 10, height: 10, borderRadius: 1000, backgroundColor: subjectColors[1], margin: 2.5
									}}/>
									<View style={{
										width: 10, height: 10, borderRadius: 1000, backgroundColor: subjectColors[6], margin: 2.5
									}}/>
									<View style={{
										width: 10, height: 10, borderRadius: 1000, backgroundColor: subjectColors[12], margin: 2.5
									}}/>
									<View style={{
										width: 10, height: 10, borderRadius: 1000, backgroundColor: subjectColors[8], margin: 2.5
									}}/>
								</View>
								<Text style={{flex: 1, flexWrap: 'wrap'}}>{i18n.get('calendar.helpDialog.placeholders.2')}</Text>
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
								<Image source={require('../../../assets/icons/icon_party.png')} style={{width: 24, height: 24}}/>
							</View>
							}
							{this.state.selected.holidays?.map(e =>
								<ListItem key={e.id_holiday} title={e.name} feedback={false}
										  subtitle={`${i18n.get('calendar.holidaysDialog.placeholders.1')} ${getISODate(e.endDate)}`}
										  containerStyle={{paddingHorizontal: 0}}/>
							)}
							{!this.state.selected.holidays && this.state.selected.subjects?.map(e => {
								let selected = undefined;
								if (this.state.absences) {
									const arr = this.state.absences.find(x => x[0] === this.state.selected.dateString);
									if (arr) selected = Object.keys(arr[1]).find(x => x === e.id_schedule)
								}
								return e.name &&
									<ListItem key={e.id_schedule} title={e.name}
											  subtitle={`${e.startTime} - ${e.endTime}`}
											  containerStyle={{paddingHorizontal: 0}}
											  rightItem={() =>
												  <Icon source={require('../../../assets/icons/icon_check.png')}
														size={'small'} disabled={true} iconColor={selected ? colors.primary : colors.white}
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
							{!this.state.selected.holidays && !this.state.selected.subjects &&
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
		</View>;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, flexDirection: 'column'
	},
	helpTextContainer: {
		flex: 1, alignItems: 'center', justifyContent: 'center',
		marginHorizontal: 50
	},
	helpText: {
		textAlign: 'center',
		color: colors.grey
	}
})
