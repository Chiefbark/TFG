import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

/**
 * Simple button component.
 *
 * @version 0.0.1
 * @author [Chiefbark](https://github.com/Chiefbark)
 */
export default class Button extends React.Component {
	static propTypes = {
		/**	Button label    */
		label: PropTypes.string,
		/**	Gets called when the user clicks on the button    */
		onClick: PropTypes.func,
		/**	Background color of the button    */
		backgroundColor: PropTypes.string,
		/**	Text color of the button    */
		textColor: PropTypes.string
	}
	
	constructor(props) {
		super(props);
		this.state = {...this.props};
	}
	
	render() {
		return (
			<TouchableOpacity
				style={[styles.button, {backgroundColor: this.state.backgroundColor}]}
				onPress={() => this.state.onClick ? this.state.onClick() : undefined}
			>
				<Text style={[styles.text, {color: this.state.textColor}]}>{this.state.label || 'button'}</Text>
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


