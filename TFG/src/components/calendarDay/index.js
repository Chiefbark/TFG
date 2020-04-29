import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../styles';

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
				<View style={[styles.exam, {backgroundColor: marking.single.color}]}/>}
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
	exam: {
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
	date: PropTypes.object.isRequired,
	state: PropTypes.oneOf(['disabled', '', 'today']).isRequired,
	marking: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
	onClick: PropTypes.func,
	onLongClick: PropTypes.func
}
