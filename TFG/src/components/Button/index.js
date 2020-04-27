import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

/**
 * Displays a button with TouchableOpacity effect.
 *
 * @version 0.0.1
 * @author [Chiefbark](https://github.com/Chiefbark)
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
	/**	Button label    */
	label: PropTypes.string.isRequired,
	/**	Gets called when the user clicks on the button    */
	onClick: PropTypes.func,
	/**	Gets called when the user clicks and hold on the button    */
	onLongClick: PropTypes.func,
	/**	Background color of the button    */
	backgroundColor: PropTypes.string,
	/**	Text color of the button    */
	textColor: PropTypes.string
}

