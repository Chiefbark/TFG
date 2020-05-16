import React, {Fragment} from 'react';
import {BackHandler, FlatList, Text, View} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';

import * as i18n from '../../i18n';
import * as firebase from '../../firebase';
import {colors} from '../../styles';

import Button from '../../components/button';
import Dialog from '../../components/dialog';
import Icon from '../../components/icon';
import ListItem from '../../components/listItem';
import ScheduleForm from '../../components/forms/schedule';

export default class TimeTable extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			selected: {},
			schedules: undefined,
			schedulesInfo: undefined,
			dialogSchedule: false,
			dialogExit: false,
			dialogConfirm: false
		}
	}
	
	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', () => {
			this.setState({dialogExit: true});
			return true;
		});
		this.props.navigation.addListener('blur', () => {
			this.flatList?.scrollToOffset({animated: false, y: 0});
			this.setState({selected: {}});
			this.props.navigation.dangerouslyGetParent().setOptions({
				headerRight: () => <Button label={i18n.get('timetable.headerRight')} textColor={colors.white}
										   onClick={() => this.setState({dialogExit: true})}/>
			});
		});
		this.props.navigation.dangerouslyGetParent().setOptions({
			headerLeft: () => <HeaderBackButton tintColor={colors.white} onPress={() => this.setState({dialogExit: true})}/>,
			headerRight: () => <Button label={i18n.get('timetable.headerRight')} textColor={colors.white}
									   onClick={() => this.setState({dialogExit: true})}/>
		});
		this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({tabBarVisible: false});
		
		firebase.ref('schedules').child(`${this.props.route.params.key}/${this.props.route.params.day}`).on('value', snapshot => {
			let data = snapshot.val() || {};
			this.setState({schedules: Object.entries(data)});
		});
		firebase.ref('subjects').on('value', snapshot => {
			let data = snapshot.val() || {};
			this.setState({subjects: Object.entries(data)});
		});
	}
	
	_showOptions() {
		if (Object.entries(this.state.selected).length > 0)
			this.props.navigation.dangerouslyGetParent().setOptions(
				{
					headerRight: () =>
						<Icon source={require('../../../assets/icons/icon_delete.png')} iconColor={colors.white}
							  onClick={() => {
								  this.setState({dialogConfirm: true});
							  }}
							  style={{marginRight: 16}}/>
				});
		else
			this.props.navigation.dangerouslyGetParent().setOptions({
				headerRight: () => <Button label={i18n.get('timetable.headerRight')} textColor={colors.white}
										   onClick={() => this.setState({dialogExit: true})}/>
			});
	}
	
	render() {
		return (
			<Fragment>
				<FlatList style={{flex: 1}}
						  ref={(ref) => this.flatList = ref}
						  data={this.state.schedules}
						  keyExtractor={(item) => item[0]}
						  ListEmptyComponent={() =>
							  <View style={{
								  flex: 1, alignItems: 'center', justifyContent: 'center',
								  paddingVertical: 50, paddingHorizontal: 30
							  }}>
								  <Text style={{textAlign: 'center'}}>{i18n.get('timetable.emptyList')}</Text>
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
				{/*	PLUS BUTTON	*/}
				<Icon source={require('../../../assets/icons/icon_add.png')} iconColor={colors.white} floating={true}
					  visible={!this.state.dialogSchedule}
					  onClick={() => {
						  Object.entries(this.state.selected).length > 0 ?
							  this.setState({selected: {}}, () => this._showOptions()) :
							  this.setState({dialogSchedule: true})
					  }}
					  style={[
						  {backgroundColor: colors.primary},
						  Object.entries(this.state.selected).length > 0 ?
							  {transform: [{rotate: '45deg'}]}
							  : undefined
					  ]}
				/>
				{/*	EDIT BUTTON	*/}
				{Object.entries(this.state.selected).length === 1 &&
				<Icon source={require('../../../assets/icons/icon_edit.png')} iconColor={colors.white} floating={true}
					  visible={true} style={{backgroundColor: colors.primary, bottom: 120}}
					  onClick={() => {
						  let value = Object.entries(this.state.selected);
						  let obj = {key: value[0][0], obj: value[0][1]};
						  this.setState({schedule: obj, dialogSchedule: true, selected: {}}, () => this._showOptions());
					  }}/>
				}
				{/*	DIALOG SCHEDULE	*/}
				{this.state.dialogSchedule &&
				<ScheduleForm schedule={this.state.schedule} day={this.props.route.params.day} scheduleKey={this.props.route.params.key}
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
				{/*	DIALOG EXIT	*/}
				<Dialog title={i18n.get('timetable.exitDialog.title')}
						content={() => <Text>{i18n.get('timetable.exitDialog.description')}</Text>}
						buttons={() =>
							<Fragment>
								<Button label={i18n.get('timetable.exitDialog.actions.0')}
										onClick={() => {
											this.setState({dialogExit: false});
										}}
								/>
								<Button label={i18n.get('timetable.exitDialog.actions.1')}
										backgroundColor={colors.primary} textColor={colors.white}
										onClick={() => {
											this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions(
												{tabBarVisible: true});
											this.setState({dialogExit: false}, () => this.props.navigation.pop());
										}}/>
							</Fragment>
						} visible={this.state.dialogExit}/>
			</Fragment>
		)
	}
}
