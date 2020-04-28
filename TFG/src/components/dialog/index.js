import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Modal, StyleSheet} from 'react-native';
import {colors} from '../../styles';

/**
 * Displays a Dialog with a title, action buttons and whichever content you want
 *
 * @version 0.0.1
 * @author [Chiefbark](https://github.com/Chiefbark)
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
	/**	Title of the Dialog    */
	title: PropTypes.string.isRequired,
	/**	Elements to be displayed as a button option of the Dialog    */
	buttons: PropTypes.func.isRequired,
	/**	Specifies if the Dialog is shown or not    */
	visible: PropTypes.bool.isRequired,
	/**	Content to be displayed inside the Dialog    */
	content: PropTypes.func
}
