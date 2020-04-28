import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import * as i18n from '../../i18n';
import Dialog from '../dialog';
import Button from '../button';
import {colors} from '../../styles';
import {Calendar} from 'react-native-calendars';
import CalendarDay from '../calendarDay';

const getDateFromString = (dateString) => {
	let arr = dateString.split('-');
	let date = new Date();
	date.setFullYear(arr[0], arr[1] - 1, arr[2]);
	date.setHours(0, 0, 0, 0);
	return date;
}

export default class CalendarPicker extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			markedDates: undefined,
			selecting: false,
			startDate: undefined,
			endDate: undefined,
			prevStartDate: this.props.startDate,
			prevEndDate: this.props.endDate
		}
	}
	
	_onPress(day) {
		if (this.state.selecting && this.state.startDate < day.dateString)
			this.endSelection(day.dateString).then();
		else
			this.startSelection(day.dateString).then();
	}
	
	async startSelection(start) {
		let marked = {};
		marked[start] = {
			selection: {
				color: 'pink',
				isStart: true,
				textColor: 'white'
			}
		};
		await this.setState({selecting: true, startDate: start, markedDates: {...marked}});
	}
	
	async endSelection(end) {
		this.fillSelection(this.state.startDate, end).then();
		let marked = this.state.markedDates;
		marked[end] = {
			selection: {
				color: 'pink',
				isEnd: true,
				textColor: 'white'
			}
		};
		await this.setState({selecting: false, endDate: end, markedDates: {...marked}});
	}
	
	async fillSelection(start, end) {
		let startDate = getDateFromString(start);
		let endDate = getDateFromString(end);
		let marked = this.state.markedDates;
		startDate.setDate(startDate.getDate() + 1);
		while (startDate.getTime() < endDate.getTime()) {
			startDate.setDate(startDate.getDate() + 1);
			marked[startDate.toISOString().slice(0, 10)] = {
				selection: {
					color: 'pink',
					textColor: 'white'
				}
			};
		}
		await this.setState({markedDates: {...marked}});
	}
	
	componentDidMount() {
		if (this.props.startDate && this.props.endDate)
			this.setState({startDate: this.props.startDate, endDate: this.props.endDate}, () => {
				this.startSelection(this.props.startDate).then(() => this.endSelection(this.props.endDate));
			});
	}
	
	render() {
		return (
			<Dialog title={i18n.get('commons.calendarPickerDialog.title')}
					content={() =>
						<Calendar key={this.props.visible}
								  markedDates={this.state.markedDates}
								  current={new Date()}
								  minDate={'2020-01-01'}
								  maxDate={'2021-01-01'}
								  monthFormat={'yyyy MMMM'}
								  firstDay={1}
								  onPressArrowLeft={substractMonth => substractMonth()}
								  onPressArrowRight={addMonth => addMonth()}
								  theme={{
									  arrowColor: 'black',
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
										this.setState({
											markedDates: undefined,
											startDate: this.state.prevStartDate, endDate: this.state.prevEndDate
										}, () => {
											this.startSelection(this.props.startDate).then(() => this.endSelection(this.props.endDate));
										});
									}}
							/>
							<Button label={i18n.get('commons.calendarPickerDialog.actions.1')}
									backgroundColor={colors.primary} textColor={colors.white}
									onClick={() => {
										if (this.state.selecting) {
											this.props.onSubmit(this.state.startDate, undefined);
											this.setState({
												selecting: false,
												prevStartDate: this.state.startDate, prevEndDate: undefined
											});
										} else {
											this.props.onSubmit(this.state.startDate, this.state.endDate);
											this.setState({
												prevStartDate: this.state.startDate, prevEndDate: this.state.endDate
											});
										}
									}}/>
						</Fragment>
					}
					visible={this.props.visible}/>
		);
	}
}

CalendarPicker.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired,
	startDate: PropTypes.string,
	endDate: PropTypes.string,
}
