import React, {Fragment} from 'react';

import {View, Text, StyleSheet} from 'react-native';

import * as i18n from '../../i18n';
import {colors} from '../../styles';

import Button from "../button";
import Dialog from "../dialog";
import StepPicker from "../stepPicker";
import PropTypes from "prop-types";

const hours = [
	{label: '0'}, {label: '1'}, {label: '2'}, {label: '3'}, {label: '4'},
	{label: '5'}, {label: '6'}, {label: '7'}, {label: '8'}, {label: '9'},
	{label: '10'}, {label: '11'}, {label: '12'}, {label: '13'}, {label: '14'},
	{label: '15'}, {label: '16'}, {label: '17'}, {label: '18'}, {label: '19'},
	{label: '20'}, {label: '21'}, {label: '22'}, {label: '23'}
]
const minutes = [
	{label: '0'}, {label: '15'}, {label: '30'}, {label: '45'}
]

export default class TimePicker extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			hours: this.props.initialHours || 0,
			minutes: this.props.initialMinutes || 0
		}
	}
	
	render() {
		let hourIndex = this.props.initialHours;
		if (!hourIndex || hourIndex < 0 || hourIndex > 23) hourIndex = 0;
		let minuteIndex = [0, 15, 30, 45].indexOf(this.props.initialMinutes);
		if (minuteIndex < 0) minuteIndex = 0;
		return (
			<Dialog title={i18n.get('commons.timePickerDialog.title')}
					content={() =>
						<Fragment>
							<View style={styles.container}>
								<Text style={styles.header}>{i18n.get('commons.timePickerDialog.placeholders.0')}</Text>
								<Text style={styles.header}>{i18n.get('commons.timePickerDialog.placeholders.1')}</Text>
							</View>
							<View style={styles.container}>
								<StepPicker initialValue={hourIndex}
											data={hours}
											onValueChange={value => this.setState({hours: value?.label ?? 0})}
								/>
								<StepPicker initialValue={minuteIndex}
											data={minutes}
											onValueChange={value => this.setState({minutes: value?.label ?? 0})}
								/>
							</View>
						</Fragment>
					}
					buttons={() =>
						<Fragment>
							<Button label={i18n.get('commons.timePickerDialog.actions.0')}
									onClick={() => {
										this.props.onCancel();
									}}
							/>
							<Button label={i18n.get('commons.timePickerDialog.actions.1')}
									backgroundColor={colors.primary} textColor={colors.white}
									onClick={() => {
										this.props.onSubmit(this.state.hours, this.state.minutes < 10 ? `0${this.state.minutes}` : this.state.minutes);
									}}/>
						</Fragment>
					} visible={true}/>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginTop: 5
	},
	header: {
		width: 100,
		textAlign: 'center',
		fontWeight: 'bold'
	}
})

TimePicker.propTypes = {
	/**
	 * Callback triggered when the user submits the dialog
	 *
	 * This callback receives two params
	 * - `hours : Number` -- The hours selected
	 * - `minutes : Number` -- The minutes selected
	 */
	onSubmit: PropTypes.func.isRequired,
	/**
	 * Callback triggered when the user cancels the dialog
	 */
	onCancel: PropTypes.func.isRequired,
	/**
	 * Initial hours of the dialog
	 *
	 * `Number [0-23]`
	 * - If the value is out of range, will be 0 as default
	 */
	initialHours: PropTypes.number,
	/**
	 * Initial minutes of the dialog
	 *
	 * `Number [0, 15, 30, 45]`
	 * - If the value is out of range, will be 0 as default
	 */
	initialMinutes: PropTypes.number
}
