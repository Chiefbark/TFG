import React from 'react';
import PropTypes from 'prop-types';
import {colors} from "../../styles";
import {Image} from "react-native";
import Picker from "react-native-picker-select";

export default class CustomPicker extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<Picker value={this.props.value}
					onValueChange={(itemValue) => this.props.onValueChange ? this.props.onValueChange(itemValue) : undefined}
					items={[
						{
							label: this.props.placeholder,
							value: 0,
							color: this.props.error ? colors.red : colors.lightGrey
						},
						...this.props.data?.map(element => {
							return {label: element[1].name, value: element[0]};
						}) ?? [{label: '', value: 0}]
					]}
					useNativeAndroidPickerStyle={false}
					placeholder={{}}
					Icon={() =>
						<Image source={require('../../../assets/icons/icon_drop_down.png')}
							   style={{top: 12, width: 24, height: 24, tintColor: this.props.error ? colors.red : colors.black}}
						/>
					}
					style={{
						inputIOS: {
							borderBottomWidth: 1,
							color: this.props.error ?
								colors.red : (!this.props.value || this.props.value === 0) ?
									colors.lightGrey : colors.black,
							marginVertical: 10,
							borderBottomColor: this.props.error ? colors.red : colors.lightGrey
						},
						inputAndroid: {
							borderBottomWidth: 1,
							color: this.props.error ?
								colors.red : (!this.props.value || this.props.value === 0) ?
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
	data: PropTypes.arrayOf(PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.string.isRequired,
			PropTypes.object.isRequired
		]))
	).isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	onValueChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
	error: PropTypes.bool
}
