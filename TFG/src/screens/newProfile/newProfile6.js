import React, {Fragment} from 'react';
import {FlatList, Text, View, Image} from 'react-native';

import * as i18n from '../../i18n';
import * as firebase from '../../firebase';
import {colors} from '../../styles';

import {StackActions} from '@react-navigation/native';

import Button from '../../components/button';
import Dialog from '../../components/dialog';
import Icon from '../../components/icon';
import ListItem from '../../components/listItem';
import ScheduleForm from '../../components/forms/schedule';

export default class newProfile6 extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			continueVisible: true,
			selected: {},
			schedules: undefined,
			schedulesInfo: undefined,
			dialogSchedule: false,
			dialogExit: false,
			dialogConfirm: false
		}
	}
	
	_listenerSchedules(snapshot) {
		let data = snapshot.val() || {};
		this.setState({schedules: Object.entries(data)});
	}
	
	_listenerSubjects(snapshot) {
		let data = snapshot.val() || {};
		this.setState({subjects: Object.entries(data)});
	}
	
	componentDidMount() {
		this.props.navigation.setOptions({
			title: i18n.get('timetable.title') + ' ' + i18n.get(`commons.calendarLocales.dayNames.${(this.props.route.params.day + 1) % 7}`),
			headerRight: () => <Icon source={require('../../../assets/icons/icon_help.png')} iconColor={colors.white}
									 style={{marginRight: 16}}
									 onClick={() => this.setState({dialogHelp: true})}/>
		});
		this.props.navigation.addListener('blur', () => {
			this.flatList?.scrollToOffset({animated: false, y: 0});
			this.setState({selected: {}});
			this.props.navigation.setOptions({
				headerRight: () => <Icon source={require('../../../assets/icons/icon_help.png')} iconColor={colors.white}
										 style={{marginRight: 16}}
										 onClick={() => this.setState({dialogHelp: true})}/>
			});
		});
		this.props.navigation.setOptions({
			headerRight: () => <Icon source={require('../../../assets/icons/icon_help.png')} iconColor={colors.white}
									 style={{marginRight: 16}}
									 onClick={() => this.setState({dialogHelp: true})}/>
		});
		
		firebase.ref('schedules').child(`${this.props.route.params.key}/${this.props.route.params.day}`).on('value', this._listenerSchedules.bind(this));
		firebase.ref('subjects').on('value', this._listenerSubjects.bind(this));
	}
	
	componentWillUnmount() {
		firebase.ref('schedules').child(`${this.props.route.params.key}/${this.props.route.params.day}`).off('value', this._listenerSchedules.bind(this));
		firebase.ref('subjects').off('value', this._listenerSubjects.bind(this));
	}
	
	_showOptions() {
		if (Object.entries(this.state.selected).length > 0)
			this.props.navigation.setOptions(
				{
					headerRight: () =>
						<Icon source={require('../../../assets/icons/icon_delete.png')} iconColor={colors.white}
							  onClick={() => {
								  this.setState({dialogConfirm: true});
							  }}
							  style={{marginRight: 16}}/>
				});
		else
			this.props.navigation.setOptions({
				headerRight: () => <Icon source={require('../../../assets/icons/icon_help.png')} iconColor={colors.white}
										 style={{marginRight: 16}}
										 onClick={() => this.setState({dialogHelp: true})}/>
			});
	}
	
	render() {
		let defaultTimes = undefined;
		if (this.state.schedules && this.state.schedules instanceof Array && this.state.schedules.length > 0)
			defaultTimes = {
				obj:
					{
						startTime: this.state.schedules[this.state.schedules.length - 1][1]?.endTime,
						endTime: this.state.schedules[this.state.schedules.length - 1][1]?.endTime
					}
			}
		return (
			<Fragment>
				<FlatList style={{flex: 1}}
						  ref={(ref) => this.flatList = ref}
						  data={this.state.schedules}
						  keyExtractor={(item) => item[0]}
						  ListEmptyComponent={() =>
							  <View style={{flex: 1, padding: 32, alignItems: 'center', justifyContent: 'flex-start'}}>
								  <View style={{flexDirection: 'row', paddingHorizontal: 32, alignItems: 'center', paddingVertical: 12}}>
									  <Image source={require('../../../assets/icons/icon_timetable_art.png')}
											 style={{width: 32, height: 32}}/>
									  <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 16}}>
										  {i18n.get('newProfile.screens.5.subtitle') + ' ' + i18n.get(`commons.calendarLocales.dayNames.${(this.props.route.params.day + 1) % 7}`)}
									  </Text>
									  <Image source={require('../../../assets/icons/icon_timetable_art.png')}
											 style={{width: 32, height: 32}}/>
								  </View>
								  <View style={{marginTop: 16}}>
									  <Text style={{
										  textAlign: 'center',
										  marginBottom: 8
									  }}>{i18n.get('newProfile.screens.5.description.0')}</Text>
								  </View>
								  <Text style={{textAlign: 'center', marginTop: 24}}>{i18n.get('newProfile.screens.5.description.1')}</Text>
							  </View>
						  }
						  ItemSeparatorComponent={() => <View style={{flex: 1, backgroundColor: colors.primaryDark, height: 1}}/>}
						  ListFooterComponent={() => <View style={{paddingVertical: 25}}/>}
						  renderItem={({item}) => {
							  const subjects = this.state.subjects?.filter((element) => element[0] === item[1].id_subject);
							  return <ListItem
								  title={subjects && subjects.length > 0 ? subjects[0][1].name : i18n.get('timetable.emptySubject')}
								  subtitle={`${item[1].startTime} - ${item[1].endTime}`}
								  onLongClick={() => {
									  let elements = this.state.selected;
									  elements[item[0]] = item[1];
									  this.setState({selected: elements}, () => this._showOptions());
								  }}
								  onClick={() => {
									  let elements = this.state.selected;
									  if (elements[item[0]]) delete elements[item[0]];
									  else if (Object.entries(this.state.selected).length > 0)
										  elements[item[0]] = item[1];
									  this.setState({selected: elements}, () => this._showOptions());
								  }}
								  rightItem={() =>
									  Object.entries(this.state.selected).length > 0 &&
									  <Icon source={require('../../../assets/icons/icon_check.png')}
											size={'small'} disabled={true}
											iconColor={this.state.selected[item[0]] ? colors.primary : colors.white}
											style={{
												borderWidth: 1, borderColor: colors.primary, borderRadius: 1000,
												padding: 10, marginRight: 16
											}}/>
								  }
							  />
						  }}
				/>
				<Button
					label={i18n.get('newProfile.screens.5.prevButton')}
					textColor={colors.primary} disabled={!this.state.continueVisible}
					onClick={() => {
						this.props.navigation.dispatch(StackActions.push('NewProfile7'))
					}}
					style={{
						position: 'absolute', bottom: 50, left: 16, borderRadius: 1000, opacity: this.state.continueVisible ? 1 : 0
					}}
				/>
				<Button
					label={this.props.route.params.day < 6 ?
						i18n.get('newProfile.nextButton') + ' ' + i18n.get(`commons.calendarLocales.dayNames.${(this.props.route.params.day + 2) % 7}`) + '  ➤'
						: i18n.get('newProfile.screens.5.nextButton') + '  ➤'}
					backgroundColor={colors.primary}
					textColor={colors.white} disabled={!this.state.continueVisible}
					onClick={() => {
						if (this.props.route.params.day === 6)
							this.props.navigation.dispatch(StackActions.push('NewProfile7'))
						else
							this.props.navigation.dispatch(
								StackActions.push('NewProfile6', {key: this.props.route.params.key, day: this.props.route.params.day + 1})
							)
					}}
					style={{
						position: 'absolute', bottom: 50, right: 16, borderRadius: 1000, opacity: this.state.continueVisible ? 1 : 0
					}}
				/>
				{/*	PLUS BUTTON	*/}
				<Icon source={require('../../../assets/icons/icon_add.png')} iconColor={colors.white} floating={true}
					  visible={!this.state.dialogSchedule}
					  onClick={() => {
						  Object.entries(this.state.selected).length > 0 ?
							  this.setState({selected: {}}, () => this._showOptions()) :
							  this.setState({dialogSchedule: true})
					  }}
					  style={[
						  {backgroundColor: colors.primary, bottom: 120, right: 16},
						  Object.entries(this.state.selected).length > 0 ?
							  {transform: [{rotate: '45deg'}]}
							  : undefined
					  ]}
				/>
				{/*	EDIT BUTTON	*/}
				{Object.entries(this.state.selected).length === 1 &&
				<Icon source={require('../../../assets/icons/icon_edit.png')} iconColor={colors.white} floating={true}
					  visible={true} style={{backgroundColor: colors.primary, bottom: 190, right: 16}}
					  onClick={() => {
						  let value = Object.entries(this.state.selected);
						  let obj = {key: value[0][0], obj: value[0][1]};
						  this.setState({schedule: obj, dialogSchedule: true, selected: {}}, () => this._showOptions());
					  }}/>
				}
				{/*	DIALOG SCHEDULE	*/}
				{this.state.dialogSchedule &&
				<ScheduleForm
					schedule={this.state.schedule ? this.state.schedule : defaultTimes}
					day={this.props.route.params.day} scheduleKey={this.props.route.params.key}
					takenHours={this.state.schedules?.map(e => {
						return {key: e[0], startTime: e[1].startTime, endTime: e[1].endTime}
					}) ?? undefined}
					onSubmit={() => this.setState({schedule: undefined, dialogSchedule: false})}
					onCancel={() => this.setState({schedule: undefined, dialogSchedule: false})}/>
				}
				{/*	DIALOG CONFIRM	*/}
				<Dialog title={i18n.get('timetable.confirmDialog.title')} loading={this.state.loadingRemove}
						content={() => <Text>{i18n.get('timetable.confirmDialog.description')}</Text>}
						buttons={() =>
							<Fragment>
								<Button label={i18n.get('timetable.confirmDialog.actions.0')}
										onClick={() => {
											this.setState({selected: {}, dialogConfirm: false}, () => this._showOptions());
										}}
								/>
								<Button label={i18n.get('timetable.confirmDialog.actions.1')}
										backgroundColor={colors.primary} textColor={colors.white}
										onClick={() => {
											this.setState({loadingRemove: true})
											setTimeout(async () => {
												Object.entries(this.state.selected)
													.forEach(element => firebase.removeSchedule(`${this.props.route.params.key}/${this.props.route.params.day}`, element[0]))
												this.setState({
													selected: {}, dialogConfirm: false, loadingRemove: false
												}, () => this._showOptions());
											}, 0)
										}}
								/>
							</Fragment>
						} visible={this.state.dialogConfirm}/>
				<Dialog title={i18n.get('commons.helpDialog.title')}
						content={() =>
							<Fragment>
								<Text style={{textAlign: 'center'}}>{i18n.get('newProfile.screens.5.helpDialog.placeholders.0')}</Text>
							</Fragment>
						}
						buttons={() =>
							<Button label={i18n.get('commons.helpDialog.actions.0')}
									backgroundColor={colors.primary} textColor={colors.white}
									onClick={() => this.setState({dialogHelp: false})}/>
						}
						visible={this.state.dialogHelp}/>
			</Fragment>
		)
	}
}
