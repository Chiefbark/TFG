import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';

import * as i18n from '../../../i18n';
import * as firebase from '../../../firebase';
import {colors} from '../../../styles';

import {CommonActions} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

import Dialog from '../../dialog';
import Button from '../../button';
import CalendarPicker from '../../calendarPicker';

/**
 * This component allows the user to create & update timetables
 *
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @version 0.0.1
 */
export default class TimetableForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			warnings: {nSchedules: 0, nAbsences: []},
			key: this.props.timetable?.key ?? undefined,
			startDate: this.props.timetable?.obj.startDate ?? undefined,
			endDate: this.props.timetable?.obj.endDate ?? undefined
		}
	}
	
	_showError(props, msg = 0) {
		this.setState({...props});
		Toast.showWithGravity(i18n.get(`commons.form.toasts.${msg}`), Toast.LONG, Toast.TOP);
		setTimeout(() => this.setState({errorStartDate: false, errorEndDate: false}), 3500);
	}
	
	componentDidMount() {
		firebase.ref('schedules').once('value', snapshot => {
			let data = snapshot.val() || {};
			this.setState({schedules: Object.entries(data)});
		})
	}
	
	render() {
		return (
			<Fragment>
				<Dialog title={i18n.get('commons.timetableForm.title')} loading={this.state.loading}
						content={() =>
							<Fragment>
								<Text style={{textAlign: 'center', color: colors.grey}}>
									{i18n.get('commons.timetableForm.placeholders.0')}
								</Text>
								<View style={{flexDirection: 'row', alignItems: 'center'}}>
									<Text
										style={
											[{
												flex: 1, textAlign: 'center', color: this.state.startDate ? colors.black : colors.lightGrey,
												borderBottomWidth: 1, borderBottomColor: colors.transparent, paddingVertical: 10
											},
												this.state.errorStartDate && {color: colors.red, borderBottomColor: colors.red}
											]}
										onPress={() => this.setState({dialogStartDate: true})}>{this.state.startDate || 'yyyy-MM-dd'}</Text>
									<Text style={{textAlign: 'center'}}>{i18n.get('commons.scheduleForm.placeholders.1')}</Text>
									<Text
										style={
											[{
												flex: 1, textAlign: 'center', color: this.state.endDate ? colors.black : colors.lightGrey,
												borderBottomWidth: 1, borderBottomColor: colors.transparent, paddingVertical: 10
											},
												this.state.errorEndDate && {color: colors.red, borderBottomColor: colors.red}
											]}
										onPress={() => this.setState({dialogEndDate: true})}>{this.state.endDate || 'yyyy-MM-dd'}</Text>
								</View>
							</Fragment>}
						buttons={() =>
							<Fragment>
								<Button label={i18n.get('commons.form.actions.0')}
										style={
											[(this.state.key && this.props.nTimetables > 1) && {flex: 1, paddingHorizontal: 0},
												(!this.state.key || this.props.nTimetables === 1) && {paddingHorizontal: 18}]
										}
										onClick={() => {
											this.props.onCancel();
										}}
								/>
								{this.state.key && this.props.nTimetables > 1 &&
								<Button label={i18n.get('commons.form.actions.4')} style={{paddingHorizontal: 18}}
										textColor={colors.primary}
										onClick={() => this.setState({dialogConfirm: true})
										}/>
								}
								<Button label={i18n.get('commons.form.actions.3')}
										backgroundColor={colors.primary} textColor={colors.white}
										onClick={() => {
											let obj = {};
											let msg = 0;
											if (!this.state.startDate || this.state.startDate === '') obj.errorStartDate = true;
											if (!this.state.endDate || this.state.endDate === '') obj.errorEndDate = true;
											if (this.state.startDate >= this.state.endDate) {
												obj.errorStartDate = true;
												obj.errorEndDate = true;
												msg = 1;
											}
											if (Object.entries(obj).length > 0) this._showError(obj, msg);
											else {
												let warnings = {nSchedules: 0, nAbsences: []};
												this.state.schedules?.forEach((e, index, arr) => {
														if (arr.length === 1 || this.props.timetable.index === index) {
															if (this.state.startDate > e[1].startDate)
																warnings.nAbsences.push({from: e[1].startDate, to: this.state.startDate});
															if (this.state.endDate < e[1].endDate)
																warnings.nAbsences.push({from: this.state.endDate, to: e[1].endDate});
														}
														if (arr.length !== 1) {
															if (this.state.startDate < e[1].endDate && index < this.props.timetable.index)
																warnings.nAbsences.push({from: this.state.startDate, to: e[1].endDate});
															if (this.state.endDate > e[1].startDate && index > this.props.timetable.index)
																warnings.nAbsences.push({from: e[1].startDate, to: this.state.endDate});
														}
														if (this.state.startDate <= e[1].startDate && index < this.props.timetable.index) warnings.nSchedules++;
														if (this.state.endDate >= e[1].endDate && index > this.props.timetable.index) warnings.nSchedules++;
													}
												)
												if (warnings.nSchedules > 0 || warnings.nAbsences.length > 0)
													this.setState({dialogSave: true, warnings: warnings});
												else {
													this.setState({loading: true});
													setTimeout(async () => {
														let obj = {startDate: this.state.startDate, endDate: this.state.endDate};
														let newKey = this.state.key;
														if (!this.state.key)
															newKey = await firebase.ref('schedules').push(obj).getKey();
														else
															firebase.ref('schedules').child(this.state.key).update(obj).then();
										
														firebase.updateTimetable(newKey, {
															startDate: this.props.timetable?.obj.startDate,
															endDate: this.props.timetable?.obj.endDate
														}, {
															startDate: this.state.startDate, endDate: this.state.endDate
														}, this.props.timetable?.index ?? (this.props.nTimetables - 1))
										
														this.props.navigation.dispatch(CommonActions.navigate('Timetable', {key: newKey}));
														this.props.onSubmit(newKey);
													}, 0);
												}
											}
										}}/>
											</Fragment>}
											visible={true}/>
											{this.state.dialogStartDate &&
											<CalendarPicker startDate={this.state.startDate} multiple={false}
											onSubmit={startDate => this.setState({dialogStartDate: false, startDate: startDate})}
											onCancel={() => this.setState({dialogStartDate: false})}/>
											}
				{this.state.dialogEndDate &&
											<CalendarPicker startDate={this.state.endDate} multiple={false}
											onSubmit={startDate => this.setState({dialogEndDate: false, endDate: startDate})}
											onCancel={() => this.setState({dialogEndDate: false})}/>
											}
				{/*    REMOVE DIALOG    */}
				<Dialog title={i18n.get('profile.screens.0.confirmDialogTimetable.title')} loading={this.state.loadingRemove}
											content={() => <Text>{i18n.get('profile.screens.0.confirmDialogTimetable.description')}</Text>}
											buttons={() =>
											<Fragment>
											<Button label={i18n.get('profile.screens.0.confirmDialogTimetable.actions.0')}
											onClick={() => this.setState({dialogConfirm: false})}/>
											<Button label={i18n.get('profile.screens.0.confirmDialogTimetable.actions.1')}
											backgroundColor={colors.primary} textColor={colors.white}
											onClick={() => {
											this.setState({loadingRemove: true});
											setTimeout(async () => {
											await firebase.removeExamsBetween(this.state.startDate, this.state.endDate);
											firebase.removeTimetable(this.state.key, this.props.timetable.index, this.props.timetable.index !== 0 ? this.state.endDate : this.state.startDate);
											this.props.onDelete();
											}, 0)
										}}
								/>
											</Fragment>
											} visible={this.state.dialogConfirm}/>
											{/*    SAVE DIALOG    */}
				<Dialog title={i18n.get('profile.screens.0.saveDialogTimetable.title')} loading={this.state.loadingSave}
											content={() =>
											<Fragment>
											{this.state.warnings.nSchedules > 0 &&
											<Fragment>
											<Text style={{textAlign: 'center'}}>
											{i18n.get('profile.screens.0.saveDialogTimetable.description.3')}
											</Text>
											<Text style={{textAlign: 'center', color: colors.primary}}>
											{this.state.warnings.nSchedules}{i18n.get('profile.screens.0.saveDialogTimetable.description.4')}
											</Text>
											<Text
											style={{textAlign: 'center'}}>{i18n.get('profile.screens.0.saveDialogTimetable.description.5')}</Text>
											</Fragment>
											}
								{this.state.warnings.nAbsences.length > 0 &&
											<Fragment>
											<Text style={{textAlign: 'center', marginBottom: 4}}>
											{i18n.get('profile.screens.0.saveDialogTimetable.description.0')}
											</Text>
											{this.state.warnings.nAbsences.map((e, index) =>
											<View key={index} style={{
											flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center'
										}}>
											<Text style={{color: colors.primary}}>{e.from}</Text>
											<Text>{i18n.get('profile.screens.0.saveDialogTimetable.description.1')}</Text>
											<Text style={{color: colors.primary}}>{e.to}</Text>
											</View>
											)}
									<Text style={{
											textAlign: 'center', fontWeight: 'bold', marginTop: 4
									}}>{i18n.get('profile.screens.0.saveDialogTimetable.description.2')}
											</Text>
											</Fragment>
											}
								<Text style={{marginVertical: 4}}>{i18n.get('profile.screens.0.saveDialogTimetable.description.6')}</Text>
											</Fragment>
											}
											buttons={() =>
											<Fragment>
											<Button label={i18n.get('profile.screens.0.saveDialogTimetable.actions.0')}
											onClick={() => this.setState({dialogSave: false})}/>
											<Button label={i18n.get('profile.screens.0.saveDialogTimetable.actions.1')}
											backgroundColor={colors.primary} textColor={colors.white}
											onClick={() => {
											this.setState({loadingSave: true});
											setTimeout(async () => {
											let obj = {startDate: this.state.startDate, endDate: this.state.endDate};
											let newKey = this.state.key;
											if (!this.state.key)
											newKey = await firebase.ref('schedules').push(obj).getKey();
											else
											firebase.ref('schedules').child(this.state.key).update(obj).then();
							
											firebase.updateTimetable(newKey, {
											startDate: this.props.timetable?.obj.startDate,
											endDate: this.props.timetable?.obj.endDate
											}, {
											startDate: this.state.startDate, endDate: this.state.endDate
											}, this.props.timetable?.index ?? (this.props.nTimetables - 1))
							
											this.props.navigation.dispatch(CommonActions.navigate('Timetable', {key: newKey}));
											this.props.onSubmit(newKey);
											}, 0);
										}}
								/>
											</Fragment>
											} visible={this.state.dialogSave}/>
											</Fragment>
											)
	}
}
							
											TimetableForm.propTypes = {
	/**
	 * Callback triggered when the user submits the form
											*
	 * This callback receives a param
											* - `key : String` -- The id of the timetable created/updated
											*/
											onSubmit: PropTypes.func.isRequired,
	/**
	 * Callback triggered when the user cancels the form
											*/
											onCancel: PropTypes.func.isRequired,
	/**
	 * Callback triggered when the user deletes the form
											*/
											onDelete: PropTypes.func.isRequired,
	/**
	 * Initial values of the form
											*
	 * `Object : {key: String, obj: Object}`
	 *
	 * `key` : id of the timetable
											*
	 * `index` : index of the timetable
											*
	 * `obj`
	 * - `startDate : String` : start date of the timetable (required)
	 * - `endDate : String` : end date of the timetable (required)
	 */
											timetable: PropTypes.shape({
											key: PropTypes.string.isRequired,
											index: PropTypes.number.isRequired,
											obj: PropTypes.shape({
											startDate: PropTypes.string.isRequired,
											endDate: PropTypes.string.isRequired
											}).isRequired
											}),
	/**
	 * Number of timetables of the app
											*
	 * `Number`
	 */
											nTimetables: PropTypes.number.isRequired
											}
