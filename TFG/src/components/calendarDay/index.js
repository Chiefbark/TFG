import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {colors} from '../../styles';

/**
 * This component is a helper to the React Native Calendars component. Removes the restriction of just one type of mark
 *
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @version 0.0.1
 * @see {@link https://www.npmjs.com/package/react-native-calendars React Native Calendars}
 */
export default class CalendarDay extends React.Component {
	
	getSelectionStyles(selection) {
		let styles_selection = undefined;
		if (selection) {
			styles_selection = {...styles.selection};
			styles_selection = selection.isStart ? {...styles_selection, ...styles.selectionStart} : styles_selection;
			styles_selection = selection.isEnd ? {...styles_selection, ...styles.selectionEnd} : styles_selection;
		}
		return styles_selection;
	}
	
	getTextColor(date, state, single) {
		if (single) return single.textColor;
		if (state === 'disabled') return colors.lightGrey;
		if (state === 'today') return colors.primary
		else return colors.black;
	}
	
	render() {
		const {date, state, marking} = this.props;
		return (
			<TouchableOpacity onPress={() => this.props.onClick ? this.props.onClick(date) : undefined}
							  onLongPress={() => this.props.onLongClick ? this.props.onLongClick(date) : undefined}
							  style={[styles.dayContainer, this.getSelectionStyles(marking.selection)]}>
				<Text
					style={[styles.text, {color: this.getTextColor(date, state, marking.single)}]}>
					{date.day}
				</Text>
				{marking.single &&
				<View style={[styles.single, {backgroundColor: marking.single.color}]}/>}
				<View style={styles.multiContainer}>
					{marking.multi?.map((element, index) =>
						index < 4 &&
						<View key={index}
							  style={[styles.multi, {backgroundColor: element.color}]}/>)}
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	dayContainer: {
		width: '100%', justifyContent: 'center', paddingVertical: 15, margin: 0
	},
	text: {
		zIndex: 10, textAlign: 'center'
	},
	selection: {
		backgroundColor: colors.primaryLight
	},
	selectionStart: {
		borderTopLeftRadius: 1000, borderBottomLeftRadius: 1000
	},
	selectionEnd: {
		borderTopRightRadius: 1000, borderBottomRightRadius: 1000
	},
	single: {
		position: 'absolute', top: 5, right: 5, bottom: 5, left: 5,
		borderWidth: 6, borderRadius: 1000
	},
	multiContainer: {
		position: 'absolute', right: 4, bottom: 8, left: 4, flexDirection: 'row', justifyContent: 'center'
	},
	multi: {
		width: 5, height: 5, borderRadius: 2,
		marginTop: 1, marginLeft: 1, marginRight: 1
	}
});

CalendarDay.propTypes = {
	/**
	 * Date object of the calendar
	 *
	 * `object : {day: Number, month: Number, year: Number, timestamp: Number, dateString: String}`
	 * - `day` : day of the date (required)
	 * - `month` : month of the date (required)
	 * - `year` : year of the date (required)
	 * - `timestamp` : time in millis of the date (required)
	 * - `dateString` : string format (yyyy-MM-dd) of the date (required)
	 */
	date: PropTypes.shape({
		day: PropTypes.number.isRequired,
		month: PropTypes.number.isRequired,
		year: PropTypes.number.isRequired,
		timestamp: PropTypes.number.isRequired,
		dateString: PropTypes.string.isRequired
	}).isRequired,
	/**
	 * Date state of the calendar
	 *
	 * `String : ['disabled', '', 'today']` -- `default ''`
	 */
	state: PropTypes.oneOf(['disabled', '', 'today']),
	/**
	 * Marking of the date
	 *
	 * `Object : {single: Object, multi: Array[Object], selection: Object}` -- `default {}`
	 *
	 * `single`
	 * - `color : String` : background color of the day (required)
	 * - `textColor : String` : text color of the day (required)
	 *
	 * `multi`
	 * - `color : String` : background color of the dot (required)
	 *
	 * `selection`
	 * - `color : String` : background color of the day (required)
	 * - `isStart : Bool` :  if the day is the start of the selection (optional)
	 * - `isEnd : Bool` :  if the day is the end of the selection (optional)
	 */
	marking: PropTypes.shape({
			single: PropTypes.shape({
				color: PropTypes.string.isRequired,
				textColor: PropTypes.string.isRequired
			}),
			multi: PropTypes.arrayOf(PropTypes.shape({
				color: PropTypes.string.isRequired
			})),
			selection: PropTypes.shape({
				color: PropTypes.string.isRequired,
				isStart: PropTypes.bool,
				isEnd: PropTypes.bool
			})
		}),
	/**
	 * Callback triggered when the user press the component
	 *
	 * This callback receives a param
	 * - `value : date` -- The date object of the component
	 */
	onClick: PropTypes.func,
	/**
	 * Callback triggered when the user holds the component
	 *
	 * This callback receives a param
	 * - `value : date` -- The date object of the component
	 */
	onLongClick: PropTypes.func
}

CalendarDay.defaultProps = {
	state: '',
	marking: {}
}
