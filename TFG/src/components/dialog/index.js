import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Modal, StyleSheet, ActivityIndicator} from 'react-native';

import {colors} from '../../styles';

/**
 * This component adds a customizable modal dialog
 *
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @version 0.0.1
 */
export default class Dialog extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			height: undefined
		}
	}
	
	render() {
		return (
			<Modal
				animationType={'fade'}
				transparent={true}
				visible={this.props.visible}
			>
				<View style={styles.container}>
					<View style={{position: 'absolute', top: 20, width: '100%', alignItems: 'center'}}>
						<ActivityIndicator size={25} animating={this.props.loading} color={colors.primary}
										   style={{
											   backgroundColor: colors.white, borderRadius: 1000,
											   opacity: this.props.loading ? 1 : 0, padding: 5
										   }}/>
					</View>
					<View style={styles.dialog}>
						<Text style={styles.title}>{this.props.title}</Text>
						<ScrollView style={[{width: '100%'}, this.state.height && {height: this.state.height}]}
									keyboardDismissMode={'on-drag'}>
							<View onLayout={(event) => {
								this.setState({height: event.nativeEvent.layout.height});
							}}>
								{this.props.content && this.props.content()}
							</View>
						</ScrollView>
						<View style={styles.actions}>
							{this.props.buttons && this.props.buttons()}
						</View>
					</View>
				</View>
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, justifyContent: 'center', alignItems: 'center',
		backgroundColor: '#00000055'
	},
	title: {
		alignSelf: 'flex-start',
		fontWeight: 'bold', fontSize: 18, paddingBottom: 15
	},
	dialog: {
		alignItems: 'center', width: '85%',
		backgroundColor: colors.white,
		borderRadius: 4,
		shadowColor: colors.black, shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.25, shadowRadius: 3.84,
		elevation: 10,
		paddingVertical: 15, paddingHorizontal: 30, marginHorizontal: 20, marginVertical: 100
	},
	actions: {
		alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center',
		paddingTop: 15
	}
});

Dialog.propTypes = {
	/**
	 * Title of the dialog
	 *
	 * `String`
	 */
	title: PropTypes.string.isRequired,
	/**
	 * Renders a component at the bottom of the component
	 */
	buttons: PropTypes.func.isRequired,
	/**
	 * Renders a component in the middle of the component
	 */
	content: PropTypes.func,
	/**
	 * Specifies if the component is visible or not
	 *
	 * `Bool` -- `default false`
	 */
	visible: PropTypes.bool,
	/**
	 * Indicates if the component is loading or not
	 *
	 * `Bool` -- `default false`
	 */
	loading: PropTypes.bool
}

Dialog.defaultProps = {
	visible: false,
	loading: false
}
