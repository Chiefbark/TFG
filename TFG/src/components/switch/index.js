import React from 'react';
import PropTypes from 'prop-types';
import {Switch} from 'react-native';

import {colors} from "../../styles";

/**
 * This component allows the user to change the state of a button
 *
 * @author Chiefbark
 * @version 0.0.1
 */
export default class CustomSwitch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			enabled: this.props.initialValue
		}
	}
	
	render() {
		return (
			<Switch
				trackColor={{false: colors.lightGrey, true: colors.primaryLight}}
				ios_backgroundColor={colors.lightGrey}
				thumbColor={this.state.enabled ? colors.primary : colors.grey}
				onValueChange={(value) => {
					this.setState({enabled: value}, () => this.props.onChange ? this.props.onChange(value) : undefined);
				}}
				value={this.state.enabled}
				style={this.props.style}
			/>
		)
	}
}

CustomSwitch.propTypes = {
	/**
	 * The state selected by default
	 *
	 * `Bool` -- `default false`
	 */
	initialValue: PropTypes.bool,
	/**
	 * Callback triggered when the state is changed
	 *
	 * This callback receives a param
	 * - `value : Bool` -- The new value of the switch
	 */
	onChange: PropTypes.func
}
CustomSwitch.defaultProps = {
	initialValue: false
}
