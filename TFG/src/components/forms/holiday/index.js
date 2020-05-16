import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Text, TextInput, View} from 'react-native';

import * as i18n from '../../../i18n';
import * as firebase from '../../../firebase';
import {colors} from '../../../styles';

import Toast from 'react-native-simple-toast';

import Button from '../../button';
import CalendarPicker from '../../calendarPicker';
import Dialog from '../../dialog';

/**
 * This component allows the user to create & update holidays
 *
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @version 0.0.1
 */
export default class HolidayForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			key: this.props.holiday?.key ?? undefined,
			name: this.props.holiday?.obj.name ?? undefined,
			startDate: this.props.holiday?.obj.startDate ?? undefined,
			endDate: this.props.holiday?.obj.endDate ?? undefined
		}
	}
	
	_showError(props, msg = 0) {
		this.setState({...props});
		Toast.showWithGravity(i18n.get(`commons.form.toasts.${msg}`), Toast.LONG, Toast.TOP);
		setTimeout(() => this.setState({errorName: false, errorStartDate: false}), 3500);
	}
	
	render() {
		return (
			<Fragment>
				<Dialog title={i18n.get('commons.holidayForm.title')}
						content={() =>
							<Fragment>
								<TextInput placeholder={i18n.get('commons.holidayForm.placeholders.0')}
										   placeholderTextColor={this.state.errorName ? colors.red : colors.lightGrey}
										   onChangeText={(value) => this.setState({name: value})}
										   value={this.state.name} autoCapitalize={'words'}
										   style={{
											   borderBottomWidth: 1,
											   borderBottomColor: this.state.errorName ? colors.red : colors.lightGrey,
											   marginBottom: 10
										   }}/>
								<Text style={{textAlign: 'center', color: colors.grey}}>
									{i18n.get('commons.holidayForm.placeholders.1')}
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
										onPress={() => this.setState({dialogDatePicker: true})}>{this.state.startDate || 'yyyy-MM-dd'}</Text>
									<Text style={{textAlign: 'center'}}>{i18n.get('commons.scheduleForm.placeholders.1')}</Text>
									<Text
										style={
											[{
												flex: 1, textAlign: 'center', color: this.state.endDate ? colors.black : colors.lightGrey,
												borderBottomWidth: 1, borderBottomColor: colors.transparent, paddingVertical: 10
											},
												this.state.errorEndDate && {color: colors.red, borderBottomColor: colors.red}
											]}
										onPress={() => this.setState({dialogDatePicker: true})}>{this.state.endDate || 'yyyy-MM-dd'}</Text>
								</View>
								<Text style={{textAlign: 'center', color: colors.grey}}>
									{i18n.get('commons.holidayForm.placeholders.2')}
								</Text>
							</Fragment>}
						buttons={() =>
							<Fragment>
								<Button label={i18n.get('commons.form.actions.0')}
										style={[{paddingHorizontal: 0}, !this.state.key && {paddingHorizontal: 18}]}
										onClick={() => {
											this.props.onCancel();
										}}
								/>
								{this.state.key &&
								<Button label={i18n.get('commons.form.actions.4')} style={{paddingHorizontal: 18}}
										textColor={colors.primary}
										onClick={() => {
											firebase.ref('holidays').child(this.state.key).remove();
											this.props.onDelete();
										}}/>
								}
								<Button label={i18n.get('commons.form.actions.3')}
										backgroundColor={colors.primary} textColor={colors.white}
										onClick={async () => {
											let obj = {};
											if (!this.state.name || this.state.name === '') obj.errorName = true;
											if (!this.state.startDate || this.state.startDate === '') obj.errorStartDate = true;
											// if (!this.state.endDate || this.state.endDate === '') obj.errorEndDate = true;
											if (Object.entries(obj).length > 0) this._showError(obj);
											else {
												let obj = {
													name: this.state.name, startDate: this.state.startDate, endDate: this.state.endDate
												};
												let newKey = this.state.key;
												if (!this.state.key)
													newKey = await firebase.ref('holidays').push(obj).getKey();
												else
													firebase.ref('holidays').child(this.state.key).update(obj).then();
								
												this.props.onSubmit(newKey);
											}
										}}/>
							</Fragment>}
						visible={true}/>
				{this.state.dialogDatePicker &&
				<CalendarPicker startDate={this.state.startDate} endDate={this.state.endDate}
								onSubmit={(startDate, endDate) => this.setState({
									dialogDatePicker: false, startDate: startDate, endDate: endDate
								})}
								onCancel={() => this.setState({dialogDatePicker: false})}/>
				}
			</Fragment>
		)
	}
}

HolidayForm.propTypes = {
	/**
	 * Callback triggered when the user submits the form
	 *
	 * This callback receives a param
	 * - `key : String` -- The id of the holiday created/updated
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
	 * - `name : String` : name of the holidays
	 * - `startDate : String` : start date of the timetable (required)
	 * - `endDate : String` : end date of the timetable (required)
	 */
	holiday: PropTypes.shape({
		key: PropTypes.string.isRequired,
		obj: PropTypes.shape({
			name: PropTypes.string.isRequired,
			startDate: PropTypes.string.isRequired,
			endDate: PropTypes.string.isRequired
		}).isRequired
	})
}
