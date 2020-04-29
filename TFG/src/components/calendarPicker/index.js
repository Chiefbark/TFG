import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import * as i18n from '../../i18n';
import Dialog from '../dialog';
import Button from '../button';
import {colors} from '../../styles';
import {Calendar} from 'react-native-calendars';
import CalendarDay from '../calendarDay';

const selection = {
	color: colors.primaryLight,
	textColor: colors.white
}

const getDateFromString = (dateString) => {
	if (dateString) {
		let arr = dateString.split('-');
		let date = new Date();
		date.setFullYear(arr[0], arr[1] - 1, arr[2]);
		date.setHours(0, 0, 0, 0);
		return date;
	}
	return undefined;
}

export default class CalendarPicker extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			markedDates: undefined,
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
			marked[start] = {selection: {...selection, isStart: true, isEnd: true}};
		else
			marked[start] = {selection: {...selection, isStart: true}};
		this.setState({selecting: true, startDate: start, markedDates: {...marked}});
	}
	
	endSelection(end) {
		this.fillSelection(this.state.startDate, end);
		let marked = this.state.markedDates;
		marked[end] = {selection: {...selection, isEnd: true}};
		this.setState({selecting: false, endDate: end, markedDates: {...marked}});
	}
	
	fillSelection(start, end) {
		let startDate = getDateFromString(start);
		let endDate = getDateFromString(end);
		let marked = this.state.markedDates;
		startDate.setDate(startDate.getDate() + 1);
		while (startDate.getTime() < endDate.getTime()) {
			startDate.setDate(startDate.getDate() + 1);
			marked[startDate.toISOString().slice(0, 10)] = {selection: {...selection}};
		}
		this.setState({markedDates: {...marked}});
	}
	
	selectAll(start, end) {
		let startDate = getDateFromString(start);
		let endDate = getDateFromString(end);
		let marked = {};
		startDate.setDate(startDate.getDate() + 1);
		if (!this.props.multiple)
			marked[startDate.toISOString().slice(0, 10)] = {selection: {...selection, isStart: true, isEnd: true}}
		else {
			marked[startDate.toISOString().slice(0, 10)] = {selection: {...selection, isStart: true}}
			if (endDate) {
				while (startDate.getTime() < endDate.getTime()) {
					startDate.setDate(startDate.getDate() + 1);
					marked[startDate.toISOString().slice(0, 10)] = {selection: {...selection}};
				}
				endDate.setDate(endDate.getDate() + 1);
				marked[endDate.toISOString().slice(0, 10)] = {selection: {...selection, isEnd: true}}
			}
		}
		this.setState({markedDates: {...marked}, startDate: start, endDate: end});
	}
	
	componentDidMount() {
		if (this.props.startDate || this.props.endDate)
			this.selectAll(this.props.startDate, this.props.endDate);
	}
	
	render() {
		return (
			<Dialog title={i18n.get('commons.calendarPickerDialog.title')}
					content={() =>
						<Calendar markedDates={this.state.markedDates}
								  current={new Date()}
								  minDate={'2020-01-01'}
								  maxDate={'2021-01-01'}
								  monthFormat={'yyyy MMMM'}
								  firstDay={1}
								  onPressArrowLeft={substractMonth => substractMonth()}
								  onPressArrowRight={addMonth => addMonth()}
								  theme={{
									  arrowColor: colors.black,
									  'stylesheet.calendar.main': {
										  week: {
											  marginTop: 1, marginBottom: 1,
											  flexDirection: 'row', justifyContent: 'space-around'
										  }
									  }
								  }}
								  dayComponent={({date, state, marking}) => {
									  return (
										  <CalendarDay date={date} state={state} marking={marking || []}
													   onClick={(day) => this._onPress(day)}/>
									  );
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
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	multiple: PropTypes.bool,
	startDate: PropTypes.string,
	endDate: PropTypes.string,
}
