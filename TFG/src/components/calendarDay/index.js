import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../styles";

export default class CalendarDay extends React.Component {
	
	getHolidayStyles(holiday) {
		let styles_holiday = undefined;
		if (holiday) {
			styles_holiday = {...styles.holiday};
			styles_holiday = holiday.startingDay ? {...styles_holiday, ...styles.holidayStart} : styles_holiday;
			styles_holiday = holiday.endingDay ? {...styles_holiday, ...styles.holidayEnd} : styles_holiday;
		}
		return styles_holiday;
	}
	
	getTextColor(date, state, marking) {
		let today = new Date(), tomorrow = new Date();
		today.setHours(0, 0, 0, 0);
		tomorrow.setHours(0, 0, 0, 0);
		tomorrow.setDate(tomorrow.getDate() + 1);
		if (state === 'disabled')
			return colors.textMuted;
		if (marking && marking.exams)
			return marking.exams[0].textColor;
		return date.timestamp >= today.getTime() && date.timestamp < tomorrow.getTime() ? colors.primary : colors.text;
	}
	
	render() {
		const {date, state, marking} = this.props;
		return (
			<TouchableOpacity onPress={() => this.props.onClick ? this.props.onClick(date) : undefined}
							  onLongPress={() => this.props.onLongClick ? this.props.onLongClick(date) : undefined}
							  style={[styles.dayContainer, this.getHolidayStyles(marking.holiday)]}>
				<Text
					style={[styles.text, {color: this.getTextColor(date, state, marking)}]}>
					{date.day}
				</Text>
				{marking.exams &&
				<View style={[styles.exam, {backgroundColor: marking.exams[0].color}]}/>}
				<View style={styles.absenceContainer}>
					{marking.absences?.map((element, index) =>
						index < 4 &&
						<View key={index}
							  style={[styles.absence, {backgroundColor: element.color}]}/>)}
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
	holiday: {
		backgroundColor: colors.primaryLight
	},
	holidayStart: {
		borderTopLeftRadius: 1000, borderBottomLeftRadius: 1000
	},
	holidayEnd: {
		borderTopRightRadius: 1000, borderBottomRightRadius: 1000
	},
	exam: {
		position: 'absolute', top: 5, right: 5, bottom: 5, left: 5,
		borderWidth: 6, borderRadius: 1000
	},
	absenceContainer: {
		position: 'absolute', right: 4, bottom: 8, left: 4, flexDirection: 'row', justifyContent: 'center'
	},
	absence: {
		width: 5, height: 5, borderRadius: 2,
		marginTop: 1, marginLeft: 1, marginRight: 1
	}
});
