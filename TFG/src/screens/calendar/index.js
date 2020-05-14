import React, {Fragment} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import * as i18n from '../../i18n';
import * as config from '../../config';
import * as firebase from '../../firebase';
import {compareTimes} from '../../utils';
import {colors} from '../../styles';

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
			month: new Date().getMonth() + 1,
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
			this.setState({schedules: Object.entries(data)});
		})
		firebase.ref('absences').on('value', snapshot => {
			let data = snapshot.val() || {};
			this.setState({absences: Object.entries(data)});
		})
	}
	
	componentWillUnmount() {
		i18n.removeListener(this._updateComponent.bind(this));
		config.removeListener(this._updateComponent.bind(this));
	}
	
	getMarking(absences) {
		let marking = {};
		absences?.map(e => {
			if (!marking[e[0]]) marking[e[0]] = {};
			if (!marking[e[0]].multi) marking[e[0]].multi = [];
			const entries = Object.entries(e[1]);
			entries.forEach(entry => marking[e[0]].multi.push({id_absence: entry[1]}));
		})
		return marking;
	}
	
	render() {
		const currAbsences = this.state.absences?.filter(e => e[0].split('-')[1] == this.state.month);
		const marking = this.getMarking(currAbsences);
		return <View style={styles.container}>
			<Calendar key={this.state._lastModified}
					  markedDates={markedDates}
					  current={new Date()}
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
											   obj.dateString = value.dateString;
											   obj.strDate = value.day + ' ' + i18n.get(`commons.calendarLocales.monthNames.${parseInt(value.month) - 1}`) + ' ' + value.year;
											   let currSchedule = this.state.schedules.find(e => value.dateString >= e[1].startDate && value.dateString <= e[1].endDate);
						
											   let dayOfWeek = new Date(value.timestamp).getDay();
											   dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
											   if (currSchedule[1][dayOfWeek]) {
												   const sorted = Object.entries(currSchedule[1][dayOfWeek])
													   .sort((arg0, arg1) => compareTimes(arg1[1].startTime, arg0[1].startTime));
												   obj.subjects = [];
												   for (let ii = 0; ii < sorted.length; ii++) {
													   obj.subjects[ii] = {};
													   const temp = await firebase.ref('subjects').child(sorted[ii][1].id_subject)
														   .once('value').then(result => result.val() ?? {})
													   obj.subjects[ii].schedule = sorted[ii][0];
													   obj.subjects[ii].name = temp.name;
													   obj.subjects[ii].startTime = sorted[ii][1].startTime;
													   obj.subjects[ii].endTime = sorted[ii][1].endTime;
												   }
											   }
											   this.setState({selected: obj});
										   }}/>
						  );
					  }}
			/>
			<View style={styles.helpTextContainer}><Text style={styles.helpText}>{i18n.get('calendar.helpText')}</Text></View>
			<Dialog title={i18n.get('commons.helpDialog.title')}
					buttons={() =>
						<Button label={i18n.get('commons.helpDialog.actions.0')}
								backgroundColor={colors.primary} textColor={colors.white}
								onClick={() => this.setState({dialogHelp: false})}/>
					}
					visible={this.state.dialogHelp}/>
			{this.state.selected &&
			<Dialog title={this.state.selected.strDate}
					content={() =>
						<Fragment>
							{this.state.selected.subjects &&
							<Text style={{textAlign: 'center', color: colors.grey}}>
								{i18n.get('calendar.absencesDialog.placeholders.0')}
							</Text>
							}
							{this.state.selected.subjects?.map(e => {
									const selected = marking[this.state.selected.dateString]?.multi?.find(x => x.color === e.color) ?? undefined;
									return (
										<ListItem key={e.schedule} title={e.name} subtitle={`${e.startTime} - ${e.endTime}`}
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
												  }}
										/>
									)
								}
							) ?? <Text>{i18n.get('calendar.emptySchedule')}</Text>}
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
