import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Image, View, Text, TouchableWithoutFeedback} from 'react-native';

import {colors} from '../../styles';

import Button from '../button';
import Dialog from '../dialog';
import Icon from '../icon';
import ListItem from '../listItem';

/**
 * This component allows the user to pick one or more elements
 *
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @version 0.0.1
 */
export default class CustomPicker extends React.Component {
	constructor(props) {
		super(props);
		if (this.props.initialValue && this.props.initialValue instanceof Array)
			this.state = {
				value: this.props.initialValue.map(e => {
					return {value: e}
				})
			}
		else
			this.state = {value: this.props.initialValue}
	}
	
	resetValues() {
		this.setState({value: undefined});
	}
	
	render() {
		let selected = undefined;
		if (this.state.value && this.props.multiple)
			selected = this.props.data.filter(e => this.state.value.find(x => x.value === e.value)).map(e => e.label)?.join(', ');
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
						content={() => {
							let values = undefined;
							if (this.props.multiple) {
								values = this.state.value ? [...this.state.value] : [];
								values = values?.map(e => {
									return {
										value: e.value,
										index: this.props.data?.findIndex(x => e.value === x.value)
									}
								})
							}
							return (
								<Fragment>
									{this.props.data?.map((e, index) => {
											let selected = undefined;
											if (this.props.multiple)
												selected = values?.find(x => x.index === index);
											return <ListItem key={e.value} title={e.label} titleStyles={{fontWeight: 'normal', fontSize: 16, color: e.color}}
															 containerStyle={{paddingHorizontal: 0}} feedback={e.disabled}
															 onClick={() => {
																 if (!e.disabled) {
																	 if (!this.props.multiple) {
																		 this.setState({value: e.value, dialog: false});
																		 this.props.onValueChange && this.props.onValueChange(e.value);
																	 } else {
																		 if (!selected)
																			 values.push({value: e.value, index: index});
																		 else
																			 values.splice(values.indexOf(values.find(x => x.index === index)), 1);
																		 values.sort((a, b) => {
																			 if (a.index < b.index) return -1;
																			 if (a.index > b.index) return 1;
																			 return 0;
																		 });
																		 this.setState({value: values});
																	 }
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
															 }
															 style={{opacity: e.disabled ? 0.25 : 1}}
											/>
										}
									)}
								</Fragment>
							)
						}}
						buttons={() => this.props.multiple &&
							<Button label={this.props.textExit || 'Select'}
									backgroundColor={colors.primary} textColor={colors.white}
									onClick={() => {
										this.setState({dialog: false});
										this.props.onValueChange && this.props.onValueChange((this.state.value && this.state.value.length > 0) ? this.state.value.map(e => e.value) : undefined);
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
	 * `Array : {label => String, value => String, color => String, disabled => Bool}`
	 * - `label` : text displayed of the element (required)
	 * - `value` : value of the element (required)
	 * - `color` : text color of the element in the selection dialog (optional)
	 * - `disabled` : specifies if the element is clickable or not (optional)
	 */
	data: PropTypes.arrayOf(PropTypes.shape(
		{
			label: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
			color: PropTypes.string,
			disabled: PropTypes.bool
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
