import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {colors} from "../../styles";

/**
 * This component adds an intractable element to the screen, ideal for elements of lists
 *
 * @author Chiefbark
 * @version 0.0.1
 */
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
	/**
	 * Title of the component
	 *
	 * `String`
	 */
	title: PropTypes.string.isRequired,
	/**
	 * Styles of the title of the component
	 *
	 * `View.style`
	 */
	titleStyles: PropTypes.object,
	/**
	 * Subtitle of the component
	 *
	 * `String`
	 */
	subtitle: PropTypes.string,
	/**
	 * Renders a component to the right of the component
	 */
	rightItem: PropTypes.func,
	/**
	 * Specifies if the component has a feedback when touch or not
	 *
	 * `Bool` -- `default true`
	 */
	feedback: PropTypes.bool,
	/**
	 * Callback triggered when the user press the component
	 */
	onClick: PropTypes.func,
	/**
	 * Callback triggered when the user holds the component
	 */
	onLongClick: PropTypes.func
}

ListItem.defaultProps = {
	feedback: true
}
