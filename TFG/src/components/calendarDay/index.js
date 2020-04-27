import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../styles";

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
	
	getTextColor(date, state, marking) {
		if (marking && marking.exams) return marking.exams[0].textColor;
		if (state === 'disabled') return colors.textMuted;
		if (state === 'today') return colors.primary
		else return colors.text;
	}
	
	render() {
		const {date, state, marking} = this.props;
		return (
			<TouchableOpacity onPress={() => this.props.onClick ? this.props.onClick(date) : undefined}
							  onLongPress={() => this.props.onLongClick ? this.props.onLongClick(date) : undefined}
							  style={[styles.dayContainer, this.getSelectionStyles(marking.selection)]}>
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
	selection: {
		backgroundColor: colors.primaryLight
	},
	selectionStart: {
		borderTopLeftRadius: 1000, borderBottomLeftRadius: 1000
	},
	selectionEnd: {
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
