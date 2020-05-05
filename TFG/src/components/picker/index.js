import React from 'react';
import PropTypes from 'prop-types';
import {Image} from "react-native";

import Picker from "react-native-picker-select";

import {colors} from "../../styles";

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
					items={[
						{
							label: this.props.placeholder, value: 0,
							color: this.props.error ? colors.red : colors.lightGrey
						},
						...this.props.data.map(element => {
							return {label: element.label, value: element.value};
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
	data: PropTypes.arrayOf(PropTypes.shape(
		{
			label: PropTypes.string.isRequired,
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
		}
	)).isRequired,
	initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	placeholder: PropTypes.string.isRequired,
	error: PropTypes.bool,
	disabled: PropTypes.bool,
	onValueChange: PropTypes.func
}

