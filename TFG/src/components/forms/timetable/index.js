import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';

import * as i18n from '../../../i18n';
import * as config from '../../../config';
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
			key: this.props.timetable?.key ?? undefined,
			startDate: this.props.timetable?.obj.startTime ?? undefined,
			endDate: this.props.timetable?.obj.endTime ?? undefined
		}
	}
	
	_showError(props) {
		this.setState({...props});
		Toast.showWithGravity(i18n.get('commons.form.toast'), Toast.LONG, Toast.TOP);
		setTimeout(() => this.setState({errorStartDate: false, errorEndDate: false}), 3500);
	}
	
	render() {
		return (
			<Fragment>
				<Dialog title={i18n.get('commons.timetableForm.title')}
						content={() =>
							<Fragment>
								<Text style={{
									textAlign: 'center',
									color: colors.grey
								}}>{i18n.get('commons.timetableForm.placeholders.0')}</Text>
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
										onClick={() => {
											this.props.onCancel();
										}}
								/>
								<Button label={i18n.get('commons.form.actions.3')}
										backgroundColor={colors.primary} textColor={colors.white}
										onClick={async () => {
											let obj = {};
											if (!this.state.startDate || this.state.startDate === '') obj.errorStartDate = true;
											if (!this.state.endDate || this.state.endDate === '') obj.errorEndDate = true;
											if (Object.entries(obj).length > 0) this._showError(obj);
											else {
												let obj = {startDate: this.state.startDate, endDate: this.state.endDate};
												let newKey = this.state.key;
												if (!this.state.key)
													newKey = await firebase.getDatabase().ref(`users/${firebase.currFirebaseKey}/profiles/${config.currConfig.profile}/schedules`).push(obj).getKey();
												else
													firebase.getDatabase().ref(`users/${firebase.currFirebaseKey}/profiles/${config.currConfig.profile}/schedules/${this.state.key}`).set(obj).then();
								
												this.props.navigation.dispatch(CommonActions.navigate('Timetable', {params: {key: newKey}}));
												this.props.onSubmit(newKey);
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
	 * Initial values of the form
	 *
	 * `Object : {key: String, obj: Object}`
	 *
	 * `key` : id of the timetable
	 *
	 * `obj`
	 * - `startDate : String` : start date of the timetable (required)
	 * - `endDate : String` : end date of the timetable (required)
	 */
	timetable: PropTypes.shape({
		key: PropTypes.string.isRequired,
		obj: PropTypes.shape({
			startDate: PropTypes.string.isRequired,
			endDate: PropTypes.string.isRequired
		}).isRequired
	})
}
