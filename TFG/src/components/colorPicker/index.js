import React from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, StyleSheet} from 'react-native';
import Button from "../button";
import {colors} from '../../styles';

export default class CustomPicker extends React.Component {
	
	
	render() {
		return (
			<ScrollView horizontal={true} style={[styles.container, this.props.style]}>
				{this.props.data.map(e =>
					<View style={[{padding: 2}, this.props.value === e && {borderRadius: 4, backgroundColor: colors.primary + '55'}]}>
						<Button key={e} label={''} backgroundColor={e} style={styles.element}
								onClick={() => this.props.onValueChange ? this.props.onValueChange(e) : undefined}/>
					</View>
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
