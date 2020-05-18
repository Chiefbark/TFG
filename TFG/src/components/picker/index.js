import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Image, View, Text, TouchableWithoutFeedback} from 'react-native';

import {colors} from '../../styles';

import Button from '../button';
import Dialog from '../dialog';
import Icon from '../icon';
import ListItem from '../listItem';

/**
 * This component adds a controller layer to the component React Native Picker Select
 *
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @version 0.0.1
 * @see {@link https://www.npmjs.com/package/react-native-picker-select React Native Picker Select}
 */
export default class CustomPicker extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			value: this.props.initialValue
		}
	}
	
	render() {
		let selected = undefined;
		if (this.state.value && this.props.multiple)
			selected = this.props.data.filter(e => this.state.value.find(x => x === e.value)).map(e => e.label)?.join(', ');
		if (this.state.value && !this.props.multiple)
			selected = this.props.data.find(e => e.value === this.state.value)?.label ?? undefined;
		return (
			<Fragment>
				<TouchableWithoutFeedback
					onPress={() => !this.props.disabled && this.setState({dialog: true})}>
					<View style={{
						flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center',
						borderBottomWidth: 1, borderBottomColor: this.props.error ? colors.red : colors.lightGrey,
						paddingVertical: 2, marginVertical: 10
					}}>
						<Text numberOfLines={1} style={{
							flex: 1, color: this.props.error ?
								colors.red : (!selected || this.state.value === 0) ?
									colors.lightGrey : colors.black
						}}>
							{selected || (this.props.placeholder || this.props.multiple && 'Select items...' || 'Select an item...')}
						</Text>
						<Image source={require('../../../assets/icons/icon_drop_down.png')}
							   style={{
								   width: 24, height: 24,
								   tintColor: this.props.error ? colors.red : this.props.disabled ? colors.lightGrey : colors.black
							   }}
						/>
					</View>
				</TouchableWithoutFeedback>
				<Dialog title={this.props.placeholder || this.props.multiple && 'Select items...' || 'Select an item...'}
						onClickExit={() => {
							if (!this.props.multiple) this.setState({dialog: false})
						}}
						content={() =>
							<Fragment>
								{this.props.data?.map(e => {
										let selected = undefined;
										if (this.props.multiple)
											selected = this.state.value?.find(x => x === e.value);
										return <ListItem key={e.value} title={e.label} titleStyles={{fontWeight: 'normal', fontSize: 16}}
														 containerStyle={{paddingHorizontal: 0}}
														 onClick={() => {
															 if (!this.props.multiple) {
																 this.setState({value: e.value, dialog: false});
																 this.props.onValueChange && this.props.onValueChange(e.value);
															 } else {
																 let values = this.state.value ? [...this.state.value] : [];
																 if (!selected)
																	 values.push(e.value);
																 else
																	 values.splice(values.indexOf(e.value), 1);
										
																 this.setState({value: values});
															 }
														 }}
														 rightItem={() => this.props.multiple &&
															 <Icon source={require('../../../assets/icons/icon_check.png')}
																   size={'small'} disabled={true}
																   iconColor={selected ? colors.primary : colors.white}
																   style={{
																	   borderWidth: 1, borderColor: colors.primary, borderRadius: 1000,
																	   padding: 10, marginLeft: 8
																   }}/>
														 }/>
									}
								)}
							</Fragment>
						}
						buttons={() => this.props.multiple &&
							<Button label={this.props.textExit || 'Select'}
									backgroundColor={colors.primary} textColor={colors.white}
									onClick={() => {
										this.setState({dialog: false});
										this.props.onValueChange && this.props.onValueChange((this.state.value && this.state.value.length > 0) ? this.state.value : undefined);
									}}
									style={{flex: 1}}
							/>
						}
						visible={this.state.dialog}
				/>
			</Fragment>
		)
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
	initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
	/**
	 * Placeholder to show in the picker
	 *
	 * `String`
	 */
	placeholder: PropTypes.string,
	/**
	 * Specifies if the picker has to show an error or not
	 *
	 * `Bool` -- `default false`
	 */
	error: PropTypes.bool,
	/**
	 * Specifies if the picker allows multi select or not
	 *
	 * `Bool` -- `default false`
	 */
	multiple: PropTypes.bool,
	/**
	 * Sets the text of the exit button
	 *
	 * `String`
	 */
	textExit: PropTypes.string,
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
	multiple: false,
	disabled: false
}
