import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {FlatList, StyleSheet, Text, View} from 'react-native';

import {colors} from "../../styles";

export default class StepPicker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: this.props.initialValue
		}
	}
	
	render() {
		return (
			<Fragment>
				<View style={styles.selected}/>
				<FlatList
					onLayout={() => this.flatListRef.scrollToIndex({animated: false, index: this.state.selected})}
					ref={(ref) => {
						this.flatListRef = ref;
					}}
					getItemLayout={(data, index) => (
						{length: 60, offset: 60 * index, index: index}
					)}
					showsVerticalScrollIndicator={false}
					style={{height: 60 * 3}}
					decelerationRate={'fast'}
					onScroll={(event) => {
						const diff = event.nativeEvent.contentOffset.y / 60 - this.state.selected;
						if (diff > 0.5)
							this.setState({selected: this.state.selected + 1});
						else if (diff < -0.5)
							this.setState({selected: this.state.selected - 1});
					}}
					data={[{}, ...this.props.data, {}]}
					renderItem={({item, index}) =>
						<View style={styles.element}>
							<Text style={[
								{opacity: 0.25, fontSize: 16},
								this.state.selected + 1 === index && {opacity: 1, fontWeight: 'bold'}
							]}>{item.label}</Text>
						</View>
					}
					keyExtractor={(item, index) => `${index}`}
					onMomentumScrollEnd={() => {
						this.flatListRef.scrollToIndex({animated: true, index: this.state.selected});
						if (this.props.onValueChange) this.props.onValueChange(this.props.data[this.state.selected]);
					}}
				/>
			</Fragment>
		)
	}
}

const styles = StyleSheet.create({
	element: {
		width: 100,
		height: 60,
		alignItems: 'center',
		justifyContent: 'center'
	},
	selected: {
		position: 'absolute',
		width: 100,
		height: 60,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: colors.primary
	}
});

StepPicker.propTypes = {
	/**
	 * Data to display in the picker
	 *
	 * `Object : {label => String}`
	 * - `label` : text to display in the picker (required)
	 *
	 * You can add as many keys as you want
	 */
	data: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired
	})).isRequired,
	/**
	 * Initial selected value (index of the data prop)
	 *
	 * `Number` -- `default 0`
	 */
	initialValue: PropTypes.number,
	/**
	 * Callback triggered when the value is changed
	 *
	 * This callback receives a param
	 * - `value : Object` -- The selected value (from data prop)
	 */
	onValueChange: PropTypes.func
}

StepPicker.defaultProps = {
	initialValue: 0
}
