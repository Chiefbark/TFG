import React, {Fragment} from 'react';
import {BackHandler, FlatList, Text, View} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';

import * as i18n from '../../i18n';
import * as config from '../../config';
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
				headerRight: () => undefined
			});
		});
		this.props.navigation.dangerouslyGetParent().setOptions({
			headerLeft: () => <HeaderBackButton tintColor={colors.white} onPress={() => this.setState({dialogExit: true})}/>
		});
		this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions(
			{tabBarVisible: false});
		
		firebase.getDatabase().ref(`users/${firebase.currFirebaseKey}/profiles/${config.currConfig.profile}/schedules/${this.props.route.params.day}`).on('value', snapshot => {
			let data = snapshot.val() || {};
			this.setState({schedules: Object.entries(data)});
		});
		firebase.getDatabase().ref(`users/${firebase.currFirebaseKey}/profiles/${config.currConfig.profile}/subjects`).on('value', snapshot => {
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
				headerRight: () => undefined
			});
	}
	
	render() {
		return (
			<Fragment>
				<FlatList style={{flex: 1}}
						  ref={(ref) => this.flatList = ref}
						  data={this.state.schedules}
						  keyExtractor={(item) => item[0]}
						  ItemSeparatorComponent={() => <View style={{flex: 1, backgroundColor: colors.primaryDark, height: 1}}/>}
						  ListFooterComponent={() => <View style={{paddingVertical: 25}}/>}
						  renderItem={({item}) => {
							  return <ListItem title={this.state.subjects.filter((element) => element[0] === item[1].id_subject)[0][1].name}
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
					  }}
				/>
				}
				{/*	DIALOG SCHEDULE	*/}
				{this.state.dialogSchedule &&
				<ScheduleForm schedule={this.state.schedule} day={this.props.route.params.day}
							  onSubmit={() => this.setState({schedule: undefined, dialogSchedule: false})}
							  onCancel={() => this.setState({schedule: undefined, dialogSchedule: false})}/>
				}
				{/*	DIALOG CONFIRM	*/}
				<Dialog title={i18n.get('timetable.confirmDialog.title')}
						content={() => <Text>{i18n.get('timetable.confirmDialog.description')}</Text>}
						buttons={() =>
							<Fragment>
								<Button label={i18n.get('timetable.confirmDialog.actions.0')}
										onClick={() => {
											this.setState({selected: {}, dialogConfirm: false});
										}}
								/>
								<Button label={i18n.get('timetable.confirmDialog.actions.1')}
										backgroundColor={colors.primary} textColor={colors.white}
										onClick={() => {
											Object.entries(this.state.selected)
												.forEach(element =>
													firebase.getDatabase()
														.ref(`users/${firebase.currFirebaseKey}/profiles/${config.currConfig.profile}/schedules/${this.props.route.params.day}/${element[0]}`)
														.remove()
												)
											this.setState({selected: {}, dialogConfirm: false});
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
