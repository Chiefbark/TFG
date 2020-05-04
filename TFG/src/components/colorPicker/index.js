import React from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, StyleSheet} from 'react-native';
import Icon from "../icon";
import {colors} from '../../styles';

export default class CustomPicker extends React.Component {
	
	
	render() {
		return (
			<ScrollView horizontal={true} style={[styles.container, this.props.style]}>
				{this.props.data.map(e => {
					let selected = this.props.value === e;
					let disabled = this.props.disabled?.filter(value => value === e)[0];
					return (
						<View style={[{padding: 2}, selected && {borderRadius: 4, backgroundColor: colors.primary + '55'}]}>
							<Icon key={e} source={require('../../../assets/icons/icon_add.png')}
								  iconColor={selected && disabled ? colors.white : disabled ? colors.white : colors.transparent}
								  style={[styles.element, {backgroundColor: e}]}
								  onClick={() => this.props.onValueChange ? this.props.onValueChange(e) : undefined}/>
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
		width: 30,
		height: 30, borderRadius: 1000,
		transform: [{rotate: '45deg'}],
		paddingHorizontal: 0,
		paddingVertical: 0
	}
})

CustomPicker.propTypes = {
	data: PropTypes.arrayOf(PropTypes.string).isRequired,
	disabled: PropTypes.arrayOf(PropTypes.string),
	onValueChange: PropTypes.func.isRequired,
	value: PropTypes.string
}
