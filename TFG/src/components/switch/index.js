import React from 'react';
import PropTypes from 'prop-types';
import {Switch} from 'react-native';
import {colors} from "../../styles";

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
					this.setState({enabled: value});
					this.props.onChange ? this.props.onChange() : undefined;
				}}
				value={this.state.enabled}
				style={this.props.style}
			/>
		)
	}
}

CustomSwitch.propTypes = {
	initialValue: PropTypes.bool,
	onChange: PropTypes.func
}
