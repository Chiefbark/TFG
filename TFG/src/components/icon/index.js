import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';

/**
 * This component adds a touchable opacity icon with an image to the screen
 *
 * @author Chiefbark
 * @version 0.0.1
 */
export default class Icon extends React.Component {
	
	render() {
		const size = this.props.size === 'small' ? 16 : this.props.size === 'large' ? 32 : 24;
		return (<Fragment>
				{this.props.visible &&
				<TouchableOpacity
					style={[{width: size, height: size, alignItems: 'center', justifyContent: 'center'},
						this.props.floating && styles.fab, this.props.style]}
					onPress={() => this.props.onClick ? this.props.onClick() : undefined}
					onLongPress={() => this.props.onLongClick ? this.props.onLongClick() : undefined}
				>
					<Image source={this.props.source}
						   style={{width: size, height: size, resizeMode: 'contain', tintColor: this.props.iconColor}}/>
				</TouchableOpacity>}
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	fab: {
		position: 'absolute', bottom: 50, right: 25,
		borderRadius: 1000, padding: 28, elevation: 10
	}
})

Icon.propTypes = {
	/**
	 * Source image of the icon, either a remote URL or a local file resource
	 *
	 * `ImageSourcePropType`
	 */
	source: PropTypes.oneOfType([
		PropTypes.shape({
			uri: PropTypes.string,
			headers: PropTypes.objectOf(PropTypes.string)
		}),
		PropTypes.number,
		PropTypes.arrayOf(
			PropTypes.shape({
				uri: PropTypes.string,
				width: PropTypes.number,
				height: PropTypes.number,
				headers: PropTypes.objectOf(PropTypes.string)
			})
		)
	]).isRequired,
	/**
	 * Color of the image
	 *
	 * `String`
	 */
	iconColor: PropTypes.string,
	/**
	 * Size of the icon
	 *
	 * `small, normal, large`
	 */
	size: PropTypes.oneOf(['small', 'normal', 'large']),
	/**
	 * Specifies if the icon is floating or not
	 *
	 * `Bool`
	 */
	floating: PropTypes.bool,
	/**
	 * Specifies if the icon is visible or not
	 *
	 * `Bool` -- `default true`
	 */
	visible: PropTypes.bool,
	/**
	 * Callback triggered when the user press the icon
	 */
	onClick: PropTypes.func,
	/**
	 * Callback triggered when the user holds the icon
	 */
	onLongClick: PropTypes.func
}
Icon.defaultProps = {
	visible: true
}

