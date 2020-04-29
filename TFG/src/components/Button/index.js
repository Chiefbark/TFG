import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

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
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	onLongClick: PropTypes.func,
	backgroundColor: PropTypes.string,
	textColor: PropTypes.string
}

