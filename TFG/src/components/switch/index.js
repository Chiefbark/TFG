import React from 'react';
import PropTypes from 'prop-types';
import {Switch} from 'react-native';

import {colors} from "../../styles";

/**
 * This component allows the user to change the state of a button
 *
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @version 0.0.1
 */
export default class CustomSwitch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.initialValue
		}
	}
	
	render() {
		return (
			<Switch
				trackColor={{false: colors.lightGrey, true: colors.primaryLight}}
				ios_backgroundColor={colors.lightGrey}
				thumbColor={this.state.value ? colors.primary : colors.grey}
				onValueChange={(value) => {
					this.setState({value: value});
					if (this.props.onChange)
						this.props.onChange(value);
				}}
				value={this.state.value}
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
