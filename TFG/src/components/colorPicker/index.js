import React from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, StyleSheet} from 'react-native';

import {colors} from '../../styles';

import Icon from "../icon";

/**
 * This component allows the user to choose one between multiple colors
 *
 * @author Chiefbark
 * @version 0.0.1
 */
export default class ColorPicker extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			selected: this.props.initialValue
		}
	}
	
	render() {
		return (
			<ScrollView horizontal={true} style={[styles.container, this.props.style]}>
				{this.props.data.map(e => {
						const selected = this.state.selected === e;
						const marked = this.props.marked?.filter(value => value === e)[0];
						return (
							<View style={[{padding: 2}, selected && {borderRadius: 4, backgroundColor: colors.primary + '55'}]}>
								<Icon key={e} source={require('../../../assets/icons/icon_add.png')}
									  iconColor={selected && marked ? colors.white : marked ? colors.white : colors.transparent}
									  style={[styles.element, {backgroundColor: e}]}
									  onClick={() => {
										  this.setState({selected: e});
										  if (this.props.onValueChange) this.props.onValueChange(e);
									  }}/>
							</View>
						);
					}
				)}
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, paddingVertical: 10
	},
	element: {
		width: 30, height: 30, borderRadius: 1000,
		transform: [{rotate: '45deg'}],
		paddingHorizontal: 0, paddingVertical: 0
	}
})

ColorPicker.propTypes = {
	/**
	 * Colors to display in the picker
	 *
	 * `Array : String`
	 */
	data: PropTypes.arrayOf(PropTypes.string).isRequired,
	/**
	 * Colors to display as marked
	 *
	 * `Array : String`
	 */
	marked: PropTypes.array(PropTypes.string),
	/**
	 * The color selected by default
	 *
	 * `String`
	 */
	initialValue: PropTypes.string,
	/**
	 * Callback triggered when the color is changed
	 *
	 * This callback receives a param
	 * - `value : String` -- The new value of the picker
	 */
	onValueChange: PropTypes.func
}
