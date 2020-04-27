import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from "../../styles";

export default class ListHeader extends React.Component {
	
	render() {
		return (
			<View style={[styles.container, this.props.style]}>
				<Text style={[styles.label, this.props.textColor && {color: this.props.textColor}]}
					  numberOfLines={1} ellipsizeMode={'tail'}>{this.props.label}</Text>
				{this.props.rightItem ? this.props.rightItem() : undefined}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row', alignItems: 'center', backgroundColor: colors.accent,
		paddingHorizontal: 8, paddingVertical: 10
	},
	label: {
		flex: 1, fontWeight: 'bold', color: colors.secondary, marginRight: 8
	}
});

ListHeader.propTypes = {
	/**	ListHeader label    */
	label: PropTypes.string.isRequired,
	/**	Text color of the ListHeader    */
	textColor: PropTypes.string,
	/**	Element to be displayed in the right side	*/
	rightItem: PropTypes.func
}
