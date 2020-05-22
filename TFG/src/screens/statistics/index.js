import React, {Fragment} from 'react';
import {View, Text, FlatList} from 'react-native';

import * as i18n from '../../i18n';
import * as config from '../../config';
import * as firebase from '../../firebase';
import {colors} from '../../styles';
import {addDaysToDate, getDayOfWeek, getHoursFromMinutes, getMinutesFromTime, isDateBetween, getWeeksDiff} from '../../utils';

import {StackActions} from '@react-navigation/native';

import Button from '../../components/button';
import ListItem from '../../components/listItem';

export default class StatisticsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stats: [],
			_locale: i18n.currLocale
		}
	}
	
	_listenerSchedules(snapshot) {
		let data = snapshot.val() || {};
		this.setState({schedules: Object.entries(data)}, () => this._calculateStats());
	}
	
	_listenerSubjects(snapshot) {
		let data = snapshot.val() || {};
		this.setState({subjects: Object.entries(data)}, () => this._calculateStats());
	}
	
	_listenerAbsences(snapshot) {
		let data = snapshot.val() || {};
		this.setState({absences: Object.entries(data)}, () => this._calculateStats());
	}
	
	_listenerHolidays(snapshot) {
		let data = snapshot.val() || {};
		this.setState({holidays: Object.entries(data)}, () => this._calculateStats());
	}
	
	_calculateStats() {
		let stats = {};
		this.state.subjects?.forEach(e => {
			stats[e[0]] = {name: e[1].name, percentage: e[1].percentage, total: 0, missed: 0};
		})
		this.state.schedules?.forEach(e => {
			let weeks = getWeeksDiff(e[1].startDate, e[1].endDate);
			const remains = {};
			let tempDateStart = e[1].startDate;
			while (getDayOfWeek(tempDateStart) !== 0) {
				if (!remains[getDayOfWeek(tempDateStart)]) remains[getDayOfWeek(tempDateStart)] = 1;
				else
					remains[getDayOfWeek(tempDateStart)] += 1;
				tempDateStart = addDaysToDate(tempDateStart, 1);
			}
			let tempDateEnd = e[1].endDate;
			while (getDayOfWeek(tempDateEnd) !== 6) {
				if (!remains[getDayOfWeek(tempDateEnd)]) remains[getDayOfWeek(tempDateEnd)] = 1;
				else
					remains[getDayOfWeek(tempDateEnd)] += 1;
				tempDateEnd = addDaysToDate(tempDateEnd, -1);
			}
			
			let checked = [];
			this.state.holidays?.sort((a, b) => {
				if (a[1].startDate < b[1].startDate)
					return -1;
				if (a[1].startDate > b[1].startDate)
					return 1;
				return 0;
			}).forEach(x => {
				tempDateStart = undefined;
				tempDateEnd = undefined;
				if (isDateBetween(x[1].startDate, e[1].startDate, e[1].endDate) && isDateBetween(x[1].endDate, e[1].startDate, e[1].endDate)) {
					tempDateStart = x[1].startDate;
					tempDateEnd = x[1].endDate;
				}
				if (isDateBetween(x[1].startDate, e[1].startDate, e[1].endDate) && !isDateBetween(x[1].endDate, e[1].startDate, e[1].endDate)) {
					tempDateStart = x[1].startDate;
					tempDateEnd = e[1].endDate;
				}
				if (!isDateBetween(x[1].startDate, e[1].startDate, e[1].endDate) && isDateBetween(x[1].endDate, e[1].startDate, e[1].endDate)) {
					tempDateStart = e[1].startDate;
					tempDateEnd = x[1].endDate;
				}
				if (tempDateStart && tempDateEnd) {
					if (checked.find(y => y.startDate <= tempDateStart && y.endDate >= tempDateEnd))
						return;
					let index, found;
					found = checked.find(y => !isDateBetween(tempDateStart, y.startDate, y.endDate) && isDateBetween(tempDateEnd, y.startDate, y.endDate));
					if (found) {
						tempDateEnd = found.endDate;
						index = checked.indexOf(found);
					}
					found = checked.find(y => isDateBetween(tempDateStart, y.startDate, y.endDate) && !isDateBetween(tempDateEnd, y.startDate, y.endDate));
					if (found) {
						tempDateStart = found.startDate;
						index = checked.indexOf(found);
					}
					if (index !== undefined)
						checked[index] = {startDate: tempDateStart, endDate: tempDateEnd};
					else
						checked.push({startDate: tempDateStart, endDate: tempDateEnd});
				}
			})
			checked.forEach(x => {
				weeks -= getWeeksDiff(x.startDate, x.endDate);
				let tempDateStart = x.startDate;
				while (getDayOfWeek(tempDateStart) !== 0) {
					if (!remains[getDayOfWeek(tempDateStart)]) remains[getDayOfWeek(tempDateStart)] = -1;
					else
						remains[getDayOfWeek(tempDateStart)] -= 1;
					tempDateStart = addDaysToDate(tempDateStart, 1);
				}
				let tempDateEnd = x.endDate;
				while (getDayOfWeek(tempDateEnd) !== 6) {
					if (!remains[getDayOfWeek(tempDateEnd)]) remains[getDayOfWeek(tempDateEnd)] = -1;
					else
						remains[getDayOfWeek(tempDateEnd)] -= 1;
					tempDateEnd = addDaysToDate(tempDateEnd, -1);
				}
			})
			
			Object.entries(e[1]).forEach(x =>
				Object.entries(x[1]).forEach(y => {
					if (y[1].id_subject) {
						const mult = weeks + (remains[x[0]] || 0);
						remains[x[0]] = 0;
						stats[y[1].id_subject].total += (getMinutesFromTime(y[1].endTime) - getMinutesFromTime(y[1].startTime)) * mult;
					}
				}))
		})
		this.state.absences?.forEach(e =>
			Object.entries(e[1]).forEach(x => {
				const arr = x[1].path.split('/');
				if (this.state.schedules) {
					const find = this.state.schedules.find(y => y[0] === arr[0])
					if (find) {
						const schedule = find[1][arr[1]][x[0]];
						stats[schedule.id_subject].missed += (getMinutesFromTime(schedule.endTime) - getMinutesFromTime(schedule.startTime));
					}
				}
			}))
		this.setState({stats: Object.entries(stats)})
	}
	
	_updateComponent() {
		this.setState({_locale: i18n.currLocale});
		this.props.navigation.setOptions({title: i18n.get(`statistics.title`)});
		this.props.navigation.dangerouslyGetParent().setOptions({tabBarLabel: i18n.get('statistics.title')});
		
		firebase.ref('schedules').off('value', this._listenerSchedules.bind(this));
		firebase.ref('subjects').off('value', this._listenerSubjects.bind(this));
		firebase.ref('absences').off('value', this._listenerAbsences.bind(this));
		firebase.ref('holidays').off('value', this._listenerHolidays.bind(this));
		
		firebase.ref('schedules').on('value', this._listenerSchedules.bind(this));
		firebase.ref('subjects').on('value', this._listenerSubjects.bind(this));
		firebase.ref('absences').on('value', this._listenerAbsences.bind(this));
		firebase.ref('holidays').on('value', this._listenerHolidays.bind(this));
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
		firebase.ref('subjects').off('value', this._listenerSubjects.bind(this));
	}
	
	render() {
		return (
			<Fragment>
				<FlatList style={{flex: 1}}
						  ref={(ref) => this.flatList = ref}
						  data={this.state.stats.filter(e => e[1].total)}
						  keyExtractor={(item) => item[0]}
						  ListEmptyComponent={() =>
							  <View style={{
								  flex: 1, alignItems: 'center', justifyContent: 'center',
								  paddingVertical: 50, paddingHorizontal: 30
							  }}>
								  <Text style={{textAlign: 'center'}}>{i18n.get('statistics.emptyList')}</Text>
							  </View>
						  }
						  ItemSeparatorComponent={() => <View style={{flex: 1, backgroundColor: colors.primaryDark, height: 1}}/>}
						  ListFooterComponent={() => <View style={{paddingVertical: 25}}/>}
						  renderItem={({item}) => {
							  const percentage = item[1].missed * 100 / item[1].total;
							  return (
								  <View style={{backgroundColor: colors.white}}>
									  <ListItem title={item[1].name} style={{paddingBottom: 0}}/>
									  <View style={{flexDirection: 'row', alignItems: 'center'}}>
										  <Text style={{
											  flex: 1, marginHorizontal: 16,
											  color: percentage >= item[1].percentage ? colors.red :
												  percentage >= (item[1].percentage - 5) ? colors.orange : colors.black
										  }}>
											  {`${percentage >= (item[1].percentage - 5) ? '⚠ ' : ''}${Math.round(percentage * 10) / 10}% ${i18n.get('statistics.missed')} (${getHoursFromMinutes(item[1].missed)} ${i18n.get('statistics.hours')})`}
										  </Text>
										  <Button label={i18n.get('statistics.action')} backgroundColor={colors.white}
												  textColor={colors.lightGrey}
												  onClick={() => {
													  this.props.navigation.dispatch(StackActions.push('AbsenceView', {
														  month: 0, id_subject: item[0]
													  }))
												  }}
										  />
									  </View>
									  <View style={{
										  flex: 1, backgroundColor: colors.lightGrey, borderRadius: 4,
										  marginHorizontal: 16, marginBottom: 16, marginTop: 4
									  }}>
										  <View style={{
											  width: `${percentage}%`, height: 5, backgroundColor: colors.primary, borderRadius: 4
										  }}/>
									  </View>
								  </View>
							  )
						  }}
				/>
			</Fragment>
		);
	}
}
