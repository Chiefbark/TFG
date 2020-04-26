import React from 'react';
import PropTypes from 'prop-types';
import {Image, TouchableOpacity} from 'react-native';

/**
 * Displays a TouchableOpacity button with an icon inside.
 *
 * @version 0.0.1
 * @author [Chiefbark](https://github.com/Chiefbark)
 */
export default class Button extends React.Component {
	static propTypes = {
		/**	Path of the icon file    */
		source: PropTypes.number.isRequired,
		/**	Icon color    */
		iconColor: PropTypes.string,
		/**	Size of the icon    */
		size: PropTypes.oneOf(['small', 'normal', 'large', 'extraLarge']),
		/**	Gets called when the user clicks on the icon    */
		onClick: PropTypes.func
	}
	
	constructor(props) {
		super(props);
	}
	
	render() {
		let size = this.props.size === 'small' ? 16 : this.props.size === 'large' ? 32 : this.props.size === 'extraLarge' ? 40 : 24;
		return (
			<TouchableOpacity
				style={[{width: size, height: size, alignItems: 'center', justifyContent: 'center'}, this.props.style]}
				onPress={() => this.props.onClick ? this.props.onClick() : undefined}
			>
				<Image source={this.props.source}
					   style={{width: size, height: size, resizeMode: 'contain', tintColor: this.props.iconColor}}/>
			</TouchableOpacity>
		);
	}
}


