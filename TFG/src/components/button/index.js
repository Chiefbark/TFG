import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

/**
 * This component adds a touchable opacity button to the screen
 *
 * @author Chiefbark
 * @version 0.0.1
 */
export default class Button extends React.Component {
	
	render() {
		return (
			<TouchableOpacity
				style={[styles.button, this.props.style, {backgroundColor: this.props.backgroundColor}]}
				onPress={() => this.props.onClick ? this.props.onClick() : undefined}
				onLongPress={() => this.props.onLongClick ? this.props.onLongClick() : undefined}
			>
				<Text style={[styles.text, {color: this.props.textColor}]}>{this.props.label}</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 4, paddingHorizontal: 20, paddingVertical: 10
	},
	text: {
		fontWeight: 'bold', textAlign: 'center'
	}
})

Button.propTypes = {
	/**
	 * Label fo the button
	 *
	 * `String`
	 */
	label: PropTypes.string.isRequired,
	/**
	 * Background color of the button
	 *
	 * `String`
	 */
	backgroundColor: PropTypes.string,
	/**
	 * Text color of the button
	 *
	 * `String`
	 */
	textColor: PropTypes.string,
	/**
	 * Callback triggered when the user press the button
	 */
	onClick: PropTypes.func,
	/**
	 * Callback triggered when the user holds the button
	 */
	onLongClick: PropTypes.func
}

