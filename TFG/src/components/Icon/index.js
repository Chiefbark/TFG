import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';

/**
 * Displays a TouchableOpacity button with an icon inside.
 *
 * @version 0.0.1
 * @author [Chiefbark](https://github.com/Chiefbark)
 */
export default class Icon extends React.Component {
	
	render() {
		let size = this.props.size === 'small' ? 16 : this.props.size === 'large' ? 32 : this.props.size === 'extraLarge' ? 40 : 24;
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
	/**	Path of the icon file    */
	source: PropTypes.number.isRequired,
	/**	Icon color    */
	iconColor: PropTypes.string,
	/**	Size of the icon    */
	size: PropTypes.oneOf(['small', 'normal', 'large', 'extraLarge']),
	/**	Gets called when the user clicks on the icon    */
	onClick: PropTypes.func,
	/**	Gets called when the user clicks and hold on the icon    */
	onLongClick: PropTypes.func,
	/**	Specifies if the Icon is floating or not    */
	floating: PropTypes.bool,
	/**	Specifies if the Icon is shown or not    */
	visible: PropTypes.bool
}

Icon.defaultProps = {
	size: 'normal',
	floating: false,
	visible: true
}


