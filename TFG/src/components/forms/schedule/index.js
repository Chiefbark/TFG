import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import * as i18n from '../../../i18n';
import * as config from '../../../config';
import * as firebase from '../../../firebase';
import {compareTimes} from '../../../utils';
import {colors} from '../../../styles';

import Toast from 'react-native-simple-toast';

import Button from '../../button';
import Dialog from '../../dialog';
import Icon from '../../icon';
import Picker from '../../picker';
import SubjectForm from '../subject';
import TimePicker from '../../timePicker';

/**
 * This component allows the user to create & update schedules
 *
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @version 0.0.1
 */
export default class ScheduleForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			key: this.props.schedule?.key ?? undefined,
			startTime: this.props.schedule?.obj.startTime ?? undefined,
			endTime: this.props.schedule?.obj.endTime ?? undefined,
			id_subject: this.props.schedule?.obj.id_subject ?? undefined
		}
	}
	
	_showError(props, msg = 0) {
		this.setState({...props});
		Toast.showWithGravity(i18n.get(`commons.form.toasts.${msg}`), Toast.LONG, Toast.TOP);
		setTimeout(() => this.setState({errorSubject: false, errorStartTime: false, errorEndTime: false}), 3500);
	}
	
	componentDidMount() {
		firebase.getDatabase().ref(`users/${firebase.currFirebaseKey}/profiles/${config.currConfig.profile}/subjects`).on('value', snapshot => {
			let data = snapshot.val() || {};
			this.setState({subjects: Object.entries(data)});
		});
	}
	
	render() {
		return (
			<Fragment>
				<Dialog title={i18n.get('commons.scheduleForm.title')}
						content={() =>
							<Fragment>
								<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
									<View style={{flex: 1}}>
										<Picker initialValue={this.state.id_subject}
												data={this.state.subjects?.map(e => {
													return {label: e[1].name, value: e[0]};
												}) ?? []}
												placeholder={i18n.get('commons.scheduleForm.placeholders.0')}
												error={this.state.errorSubject}
												onValueChange={value => this.setState({id_subject: value})}
												style={{flex: 1}}
										/>
									</View>
									<Icon source={require('../../../../assets/icons/icon_add.png')}
										  iconColor={colors.white}
										  onClick={() => this.setState({dialogSubject: true})}
										  style={{
											  backgroundColor: colors.primary,
											  borderTopRightRadius: 4, borderBottomRightRadius: 4,
											  padding: 14.5
										  }}/>
								</View>
								<View style={{flexDirection: 'row', alignItems: 'center'}}>
									<Text
										style={
											[{
												flex: 1, textAlign: 'center', color: this.state.startTime ? colors.black : colors.lightGrey,
												borderBottomWidth: 1, borderBottomColor: colors.transparent, paddingVertical: 10
											},
												this.state.errorStartTime && {color: colors.red, borderBottomColor: colors.red}
											]}
										onPress={() => this.setState({dialogStartTime: true})}>{this.state.startTime || 'HH:mm'}</Text>
									<Text style={{textAlign: 'center'}}>{i18n.get('commons.scheduleForm.placeholders.1')}</Text>
									<Text
										style={
											[{
												flex: 1, textAlign: 'center', color: this.state.endTime ? colors.black : colors.lightGrey,
												borderBottomWidth: 1, borderBottomColor: colors.transparent, paddingVertical: 10
											},
												this.state.errorStartTime && {color: colors.red, borderBottomColor: colors.red}
											]}
										onPress={() => this.setState({dialogEndTime: true})}>{this.state.endTime || 'HH:mm'}</Text>
								</View>
							</Fragment>
						}
						buttons={() =>
							<Fragment>
								<Button label={i18n.get('commons.form.actions.0')}
										onClick={() => {
											this.props.onCancel();
										}}
								/>
								<Button label={i18n.get('commons.form.actions.1')}
										backgroundColor={colors.primary} textColor={colors.white}
										onClick={async () => {
											let obj = {};
											let msg = 0;
											if (!this.state.id_subject || this.state.id_subject === 0) obj.errorSubject = true;
											if (!this.state.startTime || this.state.startTime === '') obj.errorStartTime = true;
											if (!this.state.endTime || this.state.endTime === '') obj.errorEndTime = true;
											if (this.state.startTime && this.state.endTime) {
												if (this.props.takenHours?.find(e => {
														if (e.key !== this.state.key) {
															return compareTimes(this.state.startTime, e.startTime) <= 0 && compareTimes(this.state.startTime, e.endTime) > 0
																|| compareTimes(this.state.endTime, e.startTime) < 0 && compareTimes(this.state.endTime, e.endTime) > 0
																|| compareTimes(this.state.startTime, e.startTime) > 0 && compareTimes(this.state.endTime, e.endTime) <= 0
														}
														return undefined;
													}
												) ?? false) {
													obj.errorStartTime = true;
													obj.errorEndTime = true;
													msg = 3;
												}
												if (compareTimes(this.state.startTime, this.state.endTime) <= 0) {
													obj.errorStartTime = true;
													obj.errorEndTime = true;
													msg = 2;
												}
											}
											if (Object.entries(obj).length > 0) this._showError(obj, msg);
											else {
												let obj = {
													startTime: this.state.startTime,
													endTime: this.state.endTime,
													id_subject: this.state.id_subject
												};
								
												let newKey = this.state.key;
												if (!this.state.key)
													newKey = await firebase.getDatabase()
														.ref(`users/${firebase.currFirebaseKey}/profiles/${config.currConfig.profile}/schedules/${this.props.scheduleKey}/${this.props.day}`)
														.push(obj).getKey();
												else
													await firebase.getDatabase()
														.ref(`users/${firebase.currFirebaseKey}/profiles/${config.currConfig.profile}/schedules/${this.props.scheduleKey}/${this.props.day}/${this.state.key}`)
														.set(obj);
								
												this.props.onSubmit(newKey);
											}
										}}/>
							</Fragment>}
						visible={!this.state.dialogSubject}
				/>
				{this.state.dialogSubject &&
				<SubjectForm subjectColors={this.state.subjects.map(e => e[1].color)}
							 onSubmit={(value) => this.setState({dialogSubject: false, id_subject: value})}
							 onCancel={() => this.setState({dialogSubject: false})}/>
				}
				{this.state.dialogStartTime &&
				<TimePicker initialHours={parseInt(this.state.startTime?.split(':')[0])}
							initialMinutes={parseInt(this.state.startTime?.split(':')[1])}
							onSubmit={(hours, minutes) => {
								if (this.state.endTime && compareTimes(`${hours}:${minutes}`, this.state.endTime) < 0)
									this.setState({
										dialogStartTime: false, startTime: `${hours}:${minutes}`, endTime: `${hours}:${minutes}`
									})
								else if (!this.state.endTime)
									this.setState({
										dialogStartTime: false, startTime: `${hours}:${minutes}`, endTime: `${hours}:${minutes}`
									})
								else
									this.setState({dialogStartTime: false, startTime: `${hours}:${minutes}`})
							}}
							onCancel={() => this.setState({dialogStartTime: false})}/>
				}
				{this.state.dialogEndTime &&
				<TimePicker initialHours={parseInt(this.state.endTime?.split(':')[0])}
							initialMinutes={parseInt(this.state.endTime?.split(':')[1])}
							onSubmit={(hours, minutes) => {
								if (this.state.startTime && compareTimes(this.state.startTime, `${hours}:${minutes}`) < 0)
									this.setState({dialogEndTime: false, startTime: `${hours}:${minutes}`, endTime: `${hours}:${minutes}`})
								else if (!this.state.startTime)
									this.setState({
										dialogStartTime: false, startTime: `${hours}:${minutes}`, endTime: `${hours}:${minutes}`
									})
								else
									this.setState({dialogEndTime: false, endTime: `${hours}:${minutes}`})
							}}
							onCancel={() => this.setState({dialogEndTime: false})}/>
				}
			</Fragment>
		)
	}
}

ScheduleForm.propTypes = {
	/**
	 * Callback triggered when the user submits the dialog
	 *
	 * This callback receives a param
	 * - `key : String` -- The id of the schedule created/updated
	 */
	onSubmit: PropTypes.func.isRequired,
	/**
	 * Callback triggered when the user cancels the dialog
	 */
	onCancel: PropTypes.func.isRequired,
	/**
	 * Initial values of the form
	 *
	 * `Object : {key: String, obj: Object}`
	 *
	 * `key` : id of the subject
	 *
	 * `obj`
	 * - `startTime : String` : start time of the subject (required)
	 * - `endTime : String` : end time of the subject (required)
	 * - `id_subject : String` : id of the subject associated (optional)
	 */
	schedule: PropTypes.shape({
		key: PropTypes.string.isRequired,
		obj: PropTypes.shape({
			startTime: PropTypes.string.isRequired,
			endTime: PropTypes.string.isRequired,
			id_subject: PropTypes.string
		}).isRequired
	})
}
