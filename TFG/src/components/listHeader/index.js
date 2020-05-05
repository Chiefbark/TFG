import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';

import {colors} from "../../styles";
/**
 * This component adds an intractable element to the screen, ideal for headers of lists
 *
 * @author Chiefbark
 * @version 0.0.1
 */
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
		flexDirection: 'row', alignItems: 'center', backgroundColor: colors.grey,
		paddingHorizontal: 16, paddingVertical: 10
	},
	label: {
		flex: 1, fontWeight: 'bold', fontSize: 16, color: colors.white, marginRight: 8
	}
});

ListHeader.propTypes = {
	/**
	 * Label of the component
	 */
	label: PropTypes.string.isRequired,
	/**
	 * Text color of the label
	 */
	textColor: PropTypes.string,
	/**
	 * Renders a component to the right of the component
	 */
	rightItem: PropTypes.func
}
