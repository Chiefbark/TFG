import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';

import * as i18n from '../../../i18n';
import * as firebase from '../../../firebase';
import {colors} from '../../../styles';
import {getDayOfWeek, isDateBetween} from '../../../utils';

import Toast from 'react-native-simple-toast';

import Button from '../../button';
import CalendarPicker from '../../calendarPicker';
import Picker from '../../picker';
import Dialog from '../../dialog';

/**
 * This component allows the user to create & update exams
 *
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @version 0.0.1
 */
export default class ExamForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			disabled: true,
			key: this.props.exam?.key ?? undefined,
			date: this.props.exam?.obj.date ?? undefined,
			id_subject: this.props.exam?.obj.id_subject ?? undefined,
			id_schedule: this.props.exam?.obj.schedules ?? undefined
		}
	}
	
	_showError(props, msg = 0) {
		this.setState({...props});
		Toast.showWithGravity(i18n.get(`commons.form.toasts.${msg}`), Toast.LONG, Toast.TOP);
		setTimeout(() => this.setState({errorSubject: false, errorDate: false, errorSchedule: false}), 3500);
	}
	
	_listenerSubjects(snapshot) {
		let data = snapshot.val() || {};
		this.setState({subjects: Object.entries(data)});
	}
	
	_listenerExams(snapshot) {
		let data = snapshot.val() || {};
		this.setState({exams: Object.entries(data)});
	}
	
	componentDidMount() {
		firebase.ref('subjects').on('value', this._listenerSubjects.bind(this));
		firebase.ref('exams').on('value', this._listenerExams.bind(this));
		
		if (this.state.key)
			this.setState({disabled: false}, () => {
				firebase.ref('schedules').once('value', snapshot => {
					let data = snapshot.val() || {};
					const schedule = Object.entries(data).find(e => isDateBetween(this.state.date, e[1].startDate, e[1].endDate));
					
					if (!schedule[1][getDayOfWeek(this.state.date)])
						this.setState({id_schedule: undefined, disabled: true, schedules: undefined});
					else
						this.setState({
							id_schedule: this.state.id_schedule, disabled: false,
							path: `${schedule[0]}/${getDayOfWeek(this.state.date)}`,
							schedules: Object.entries(schedule[1][getDayOfWeek(this.state.date)])
						});
				})
			})
	}
	
	componentWillUnmount() {
		firebase.ref('subjects').off('value', this._listenerSubjects.bind(this));
		firebase.ref('exams').off('value', this._listenerExams.bind(this));
	}
	
	render() {
		let available = this.state.schedules?.filter(e => !this.state.exams?.find(x =>
			x[0] !== this.state.key && x[1].date === this.state.date && x[1].schedules?.find(y => y.id_schedule === e[0])
		)) ?? undefined;
		if (available instanceof Array && available.length === 0) available = undefined;
		else available = true;
		
		return (
			<Fragment>
				<Dialog title={i18n.get('commons.examForm.title')} loading={this.state.loading}
						content={() =>
							<Fragment>
								<Picker initialValue={this.state.id_subject}
										data={this.state.subjects?.map(e => {
												return {label: e[1].name, value: e[0]}
											}
										) ?? []}
										placeholder={i18n.get('commons.examForm.placeholders.0')}
										error={this.state.errorSubject}
										onValueChange={value => this.setState({id_subject: value})}
								/>
								<View style={{flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center'}}>
									<Text>{i18n.get('commons.examForm.placeholders.1')}</Text>
									<Text
										style={
											[{
												flex: 1, textAlign: 'center', color: this.state.date ? colors.black : colors.lightGrey,
												borderBottomWidth: 1, borderBottomColor: colors.transparent, paddingVertical: 10
											},
												this.state.errorDate && {color: colors.red, borderBottomColor: colors.red}
											]}
										onPress={() => this.setState({dialogDatePicker: true})}>{this.state.date || 'yyyy-MM-dd'}</Text>
									{this.state.date &&
									<Text style={{color: colors.grey, fontSize: 12}}>
										({i18n.get(`commons.calendarLocales.dayNames.${(getDayOfWeek(this.state.date) + 1) % 7}`)})
									</Text>
									}
								</View>
								{available && !this.state.holidays &&
								<Text style={{textAlign: 'center', color: colors.grey}}>{i18n.get('commons.examForm.placeholders.2')}</Text>
								}
								{!available && !this.state.holidays &&
								<Text style={{textAlign: 'center', color: colors.primary}}>
									{i18n.get('commons.examForm.placeholders.3')}
								</Text>
								}
								{this.state.holidays &&
								<Text style={{textAlign: 'center', color: colors.primary}}>
									{i18n.get('commons.examForm.placeholders.4')}
								</Text>
								}
								<Picker
									initialValue={this.state.id_schedule instanceof Array ? this.state.id_schedule.map(e => `${e.path}/${e.id_schedule}`) : this.state.id_schedule}
									multiple={true}
									data={
										this.state.schedules?.map(e => {
											if (!this.state.exams?.find(x => x[0] !== this.state.key && x[1].date === this.state.date && x[1].schedules?.find(y => y.id_schedule === e[0])))
												return {label: `${e[1].startTime} - ${e[1].endTime}`, value: `${this.state.path}/${e[0]}`}
											else
												return {
													label: `${e[1].startTime} - ${e[1].endTime}`,
													value: `${this.state.path}/${e[0]}`,
													disabled: true
												}
										}) ?? []
									}
									placeholder={i18n.get('commons.examForm.placeholders.5')}
									error={this.state.errorSchedule} disabled={this.state.disabled}
									onValueChange={value =>
										this.setState({
											id_schedule: value?.map(e => {
												return {
													path: `${e.split('/')[0]}/${e.split('/')[1]}`,
													id_schedule: e.split('/')[2]
												}
											})
										})}
								/>
								<Text style={{textAlign: 'center', color: colors.grey}}>{i18n.get('commons.examForm.placeholders.6')}</Text>
							</Fragment>
						}
						buttons={() =>
							<Fragment>
								<Button label={i18n.get('commons.form.actions.0')}
										style={[this.state.key && {
											flex: 1,
											paddingHorizontal: 0
										}, !this.state.key && {paddingHorizontal: 18}]}
										onClick={() => {
											this.props.onCancel();
										}}
								/>
								{this.state.key &&
								<Button label={i18n.get('commons.form.actions.4')} style={{paddingHorizontal: 18}}
										textColor={colors.primary}
										onClick={() => {
											this.setState({dialogConfirm: true});
										}}/>
								}
								<Button label={i18n.get('commons.form.actions.1')}
										backgroundColor={colors.primary} textColor={colors.white}
										onClick={() => {
											let obj = {};
											let msg = 0;
											if (!this.state.id_subject || this.state.id_subject === '') obj.errorSubject = true;
											if (!this.state.date || this.state.date === '') obj.errorDate = true;
											if (!this.state.disabled && !this.state.id_schedule) obj.errorSchedule = true;
											if (this.state.id_subject && this.state.date && this.state.id_schedule && this.state.id_schedule.length > 1) {
												let ii = 0;
												while (ii < this.state.id_schedule.length - 1 && msg === 0) {
													const endTime = this.state.schedules?.find(e => e[0] === this.state.id_schedule[ii].id_schedule)[1].endTime;
													const startTime = this.state.schedules?.find(e => e[0] === this.state.id_schedule[ii + 1].id_schedule)[1].startTime;
													if (endTime !== startTime) {
														msg = 4;
														obj.errorSchedule = true;
													}
													ii++;
												}
											}
											if (Object.entries(obj).length > 0) this._showError(obj, msg);
											else {
												this.setState({loading: true})
												setTimeout(async () => {
													let obj = {
														date: this.state.date,
														id_subject: this.state.id_subject,
														schedules: this.state.id_schedule || null
													};
													let newKey = this.state.key;
													if (!this.state.key)
														newKey = await firebase.ref('exams').push(obj).getKey();
													else
														firebase.ref('exams').child(this.state.key).update(obj).then();
									
													firebase.removeAbsenceOfSchedules(this.state.id_schedule, this.state.date)
									
													this.props.onSubmit(newKey);
												}, 0)
											}
										}}/>
							</Fragment>}
						visible={true}/>
				{this.state.dialogDatePicker &&
				<CalendarPicker startDate={this.state.date} multiple={false}
								onSubmit={startDate => {
									this.setState({dialogDatePicker: false, date: startDate});
									firebase.ref('schedules').once('value', snapshot => {
										let data = snapshot.val() || {};
										const schedule = Object.entries(data).find(e => isDateBetween(startDate, e[1].startDate, e[1].endDate));
						
										if (!schedule[1][getDayOfWeek(startDate)])
											this.setState({id_schedule: undefined, disabled: true, schedules: undefined});
										else
											this.setState({
												id_schedule: this.state.id_schedule, disabled: false,
												path: `${schedule[0]}/${getDayOfWeek(startDate)}`,
												schedules: Object.entries(schedule[1][getDayOfWeek(startDate)])
											});
									})
									firebase.ref('holidays').once('value', snapshot => {
										let data = snapshot.val() || {};
										const holidays = Object.entries(data).find(e => isDateBetween(startDate, e[1].startDate, e[1].endDate));
										if (holidays)
											this.setState({holidays: true, disabled: true});
										else
											this.setState({holidays: false});
									})
								}}
								onCancel={() => this.setState({dialogDatePicker: false})}/>
				}
				{/*	REMOVE DIALOG	*/}
				<Dialog title={i18n.get('profile.screens.0.confirmDialogExam.title')} loading={this.state.loadingRemove}
						content={() => <Text>{i18n.get('profile.screens.0.confirmDialogExam.description')}</Text>}
						buttons={() =>
							<Fragment>
								<Button label={i18n.get('profile.screens.0.confirmDialogExam.actions.0')}
										onClick={() => this.setState({dialogConfirm: false})}/>
								<Button label={i18n.get('profile.screens.0.confirmDialogExam.actions.1')}
										backgroundColor={colors.primary} textColor={colors.white}
										onClick={() => {
											this.setState({loadingRemove: true});
											setTimeout(() => {
												firebase.ref('exams').child(this.state.key).remove();
												this.props.onDelete();
											}, 0)
										}}
								/>
							</Fragment>
						} visible={this.state.dialogConfirm}/>
			</Fragment>
		)
	}
}

ExamForm.propTypes = {
	/**
	 * Callback triggered when the user submits the form
	 *
	 * This callback receives a param
	 * - `key : String` -- The id of the exam created/updated
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
	 * `key` : id of the holiday
	 *
	 * `obj`
	 * - `date : String` : date of the exam yyyy-MM-dd (required)
	 * - `id_subject : String` : id of the subject associated to the exam (required)
	 * - `schedules : {path: String, id_schedule: String}` : array of schedules associated to the exam (required)
	 */
	exam: PropTypes.shape({
		key: PropTypes.string.isRequired,
		obj: PropTypes.shape({
			date: PropTypes.string.isRequired,
			id_subject: PropTypes.string.isRequired,
			schedules: PropTypes.arrayOf(PropTypes.shape(
				{path: PropTypes.string.isRequired, id_schedule: PropTypes.string.isRequired}
			))
		}).isRequired
	})
}
