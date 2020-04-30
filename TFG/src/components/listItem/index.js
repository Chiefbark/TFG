import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from "../../styles";

export default class ListItem extends React.Component {
	
	render() {
		return (
			<TouchableOpacity
				activeOpacity={this.props.feedback ? 0.2 : 1}
				style={[styles.container, this.props.style]}
				onPress={() => this.props.onClick ? this.props.onClick() : undefined}
				onLongPress={() => this.props.onLongClick ? this.props.onLongClick() : undefined}>
				<View style={styles.content}>
					<Text numberOfLines={1} style={[styles.title, this.props.titleStyles]}>{this.props.title}</Text>
					{this.props.subtitle &&
					<Text numberOfLines={1} style={styles.subtitle}>{this.props.subtitle}</Text>}
				</View>
				{this.props.rightItem && this.props.rightItem()}
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
		paddingVertical: 12, backgroundColor: colors.white
	},
	content: {
		flex: 1, paddingHorizontal: 16
	},
	title: {
		color: colors.black, fontWeight: 'bold', fontSize: 16, marginBottom: 5
	},
	subtitle: {
		color: colors.grey
	}
})

ListItem.propTypes = {
	title: PropTypes.string.isRequired,
	titleStyles: PropTypes.object,
	subtitle: PropTypes.string,
	rightItem: PropTypes.func,
	feedback: PropTypes.bool,
	onClick: PropTypes.func,
	onLongClick: PropTypes.func
}

ListItem.defaultProps = {
	feedback: true
}
