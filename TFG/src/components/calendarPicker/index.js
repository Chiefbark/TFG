import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import * as i18n from '../../i18n';
import {getDateFromString} from '../../utils';
import {colors} from '../../styles';

import Button from '../button';
import {Calendar} from 'react-native-calendars';
import Dialog from '../dialog';

const selection = {
	selected: true,
	color: colors.primaryLight,
	textColor: colors.black
}

/**
 * This component uses React Native Calendars under the hood. Allows the user to select multiple dates in a modal dialog
 *
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @version 0.0.1
 * @see {@link https://www.npmjs.com/package/react-native-calendars React Native Calendars}
 */
export default class CalendarPicker extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			current: this.props.startDate || new Date().toISOString().slice(0, 10),
			markedDates: {},
			selecting: false,
			startDate: this.props.startDate,
			endDate: this.props.endDate
		}
	}
	
	_onPress(day) {
		if (this.props.multiple && this.state.selecting && this.state.startDate < day.dateString)
			this.endSelection(day.dateString);
		else
			this.startSelection(day.dateString);
	}
	
	startSelection(start) {
		let marked = {};
		if (!this.props.multiple)
			marked[start] = {...selection, startingDay: true, endingDay: true};
		else
			marked[start] = {...selection, startingDay: true};
		this.setState({selecting: true, startDate: start, markedDates: {...marked}});
	}
	
	endSelection(end) {
		this.fillSelection(this.state.startDate, end);
		let marked = this.state.markedDates;
		marked[end] = {...selection, endingDay: true};
		this.setState({selecting: false, endDate: end, markedDates: {...marked}});
	}
	
	fillSelection(start, end) {
		let startDate = getDateFromString(start);
		let endDate = getDateFromString(end);
		let marked = this.state.markedDates;
		startDate.setDate(startDate.getDate() + 1);
		while (startDate.getTime() < endDate.getTime()) {
			startDate.setDate(startDate.getDate() + 1);
			marked[startDate.toISOString().slice(0, 10)] = {...selection};
		}
		this.setState({markedDates: {...marked}});
	}
	
	selectAll(start, end) {
		let startDate = getDateFromString(start);
		let endDate = getDateFromString(end);
		let marked = {};
		startDate.setDate(startDate.getDate() + 1);
		if (!this.props.multiple)
			marked[startDate.toISOString().slice(0, 10)] = {...selection, startingDay: true, endingDay: true}
		else {
			marked[startDate.toISOString().slice(0, 10)] = {...selection, startingDay: true}
			if (endDate) {
				while (startDate.getTime() < endDate.getTime()) {
					startDate.setDate(startDate.getDate() + 1);
					marked[startDate.toISOString().slice(0, 10)] = {...selection};
				}
				endDate.setDate(endDate.getDate() + 1);
				marked[endDate.toISOString().slice(0, 10)] = {...selection, endingDay: true}
			}
		}
		this.setState({markedDates: {...marked}, startDate: start, endDate: end});
	}
	
	componentDidMount() {
		if ((this.props.startDate && this.props.endDate) || (this.props.startDate && !this.props.endDate))
			this.selectAll(this.props.startDate, this.props.endDate);
	}
	
	render() {
		return (
			<Dialog
				title={!this.props.multiple ? i18n.get('commons.calendarPickerDialog.title.0') : i18n.get('commons.calendarPickerDialog.title.1')}
				content={() =>
					<Calendar markedDates={this.state.markedDates}
							  hideExtraDays={false}
							  markingType={'period'}
							  current={this.state.current}
							  onMonthChange={value => this.setState({current: value.dateString})}
							  monthFormat={'yyyy MMMM'}
							  firstDay={1}
							  onPressArrowLeft={substractMonth => substractMonth()}
							  onPressArrowRight={addMonth => addMonth()}
							  onDayPress={(value) => this._onPress(value)}
							  theme={{
								  arrowColor: colors.black,
								  'stylesheet.calendar.main': {
									  week: {
										  marginTop: 1, marginBottom: 1,
										  flexDirection: 'row', justifyContent: 'space-around'
									  }
								  }
							  }}
					/>
				}
				buttons={() =>
					<Fragment>
						<Button label={i18n.get('commons.calendarPickerDialog.actions.0')}
								onClick={() => {
									this.props.onCancel();
								}}
						/>
						<Button label={i18n.get('commons.calendarPickerDialog.actions.1')}
								backgroundColor={colors.primary} textColor={colors.white}
								onClick={() => {
									if (!this.props.multiple && this.state.selecting)
										this.props.onSubmit(this.state.startDate, undefined);
									else
										this.props.onSubmit(this.state.startDate, this.state.endDate);
								}}/>
					</Fragment>
				} visible={true}/>
		);
	}
}

CalendarPicker.propTypes = {
	/**
	 * Callback triggered when the user submits the dialog
	 *
	 * This callback receives two params, both formatted as `yyyy-MM-dd`
	 * - `startDate : String` -- The start date of the selection
	 * - `endDate : String` -- The end date of the selection. If prop `multiple = false`, then this value is `undefined`
	 */
	onSubmit: PropTypes.func.isRequired,
	/**
	 * Callback triggered when the user cancels the dialog
	 */
	onCancel: PropTypes.func.isRequired,
	/**
	 * Specifies if the component allows multiple selection or not
	 *
	 * `Bool` -- `default true`
	 */
	multiple: PropTypes.bool,
	/**
	 * Initial date of the selection
	 *
	 * `String` formatted as `yyyy-MM-dd`
	 */
	startDate: PropTypes.string,
	/**
	 * End date of the selection
	 *
	 * `String` formatted as `yyyy-MM-dd`
	 */
	endDate: PropTypes.string,
}

CalendarPicker.defaultProps = {
	multiple: true
}
