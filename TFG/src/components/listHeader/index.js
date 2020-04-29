import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from "../../styles";

export default class ListHeader extends React.Component {
	
	render() {
		return (
			<View style={[styles.container, this.props.style]}>
				<Text style={[styles.label, this.props.textColor && {color: this.props.textColor}]}
					  numberOfLines={1} ellipsizeMode={'tail'}>{this.props.label}</Text>
				{this.props.rightItem ? this.props.rightItem() : undefined}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row', alignItems: 'center', backgroundColor: colors.grey,
		paddingHorizontal: 16, paddingVertical: 10
	},
	label: {
		flex: 1, fontWeight: 'bold', fontSize: 16, color: colors.white, marginRight: 8
	}
});

ListHeader.propTypes = {
	label: PropTypes.string.isRequired,
	textColor: PropTypes.string,
	rightItem: PropTypes.func
}
