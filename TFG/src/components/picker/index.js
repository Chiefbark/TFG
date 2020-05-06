import React from 'react';
import PropTypes from 'prop-types';
import {Image} from "react-native";

import Picker from "react-native-picker-select";

import {colors} from "../../styles";

/**
 * This component allows the user to choose one between multiple options
 *
 * @author Chiefbark
 * @version 0.0.1
 */
export default class CustomPicker extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			value: this.props.initialValue
		}
	}
	
	render() {
		return (
			<Picker value={this.state.value}
					onValueChange={(itemValue) => {
						this.setState({value: itemValue});
						if (this.props.onValueChange)
							this.props.onValueChange(itemValue);
					}}
					items={[{
						label: this.props.placeholder || 'Select an item...', value: undefined,
						color: this.props.error ? colors.red : colors.lightGrey
					},
						...this.props.data.map(element => {
							return {label: element.label, value: element.value, color: element.color || colors.black};
						})
					]}
					useNativeAndroidPickerStyle={false}
					placeholder={{}}
					disabled={this.props.disabled}
					Icon={() =>
						<Image source={require('../../../assets/icons/icon_drop_down.png')}
							   style={{top: 12, width: 24, height: 24, tintColor: this.props.error ? colors.red : colors.black}}
						/>
					}
					style={{
						inputIOS: {
							borderBottomWidth: 1,
							color: this.props.error ?
								colors.red : (!this.state.value || this.state.value === 0) ?
									colors.lightGrey : colors.black,
							marginVertical: 10,
							borderBottomColor: this.props.error ? colors.red : colors.lightGrey
						},
						inputAndroid: {
							borderBottomWidth: 1,
							color: this.props.error ?
								colors.red : (!this.state.value || this.state.value === 0) ?
									colors.lightGrey : colors.black,
							marginVertical: 10,
							borderBottomColor: this.props.error ? colors.red : colors.lightGrey
						}
					}}
			/>
		);
	}
}

CustomPicker.propTypes = {
	/**
	 * Data to display in the picker
	 *
	 * `Array : {label => String, value => String, color => String}`
	 * - `label` : text displayed of the element (required)
	 * - `value` : value of the element (required)
	 * - `color` : text color of the element in the selection dialog (optional)
	 */
	data: PropTypes.arrayOf(PropTypes.shape(
		{
			label: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
			color: PropTypes.string
		}
	)).isRequired,
	/**
	 * Initial value of the picker
	 *
	 * `String`
	 */
	initialValue: PropTypes.string,
	/**
	 * Placeholder to show in the picker
	 *
	 * `String` -- `default 'Select an item...'`
	 */
	placeholder: PropTypes.string,
	/**
	 * Specifies if the picker has to show an error or not
	 *
	 * `Bool` -- `default false`
	 */
	error: PropTypes.bool,
	/**
	 * Specifies if the picker is enabled or not
	 *
	 * `Bool` -- `default false`
	 */
	disabled: PropTypes.bool,
	/**
	 * Callback triggered when the picked value is changed
	 *
	 * This callback receives a param
	 * - `value : String` -- The new value of the picker
	 */
	onValueChange: PropTypes.func
}

CustomPicker.defaultProps = {
	error: false,
	disabled: false
}
