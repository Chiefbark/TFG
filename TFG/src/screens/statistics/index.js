import React from 'react';
import {View, Text} from 'react-native';
import * as i18n from '../../i18n';

export default class StatisticsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			_lastModified: undefined
		}
	}
	
	_shouldComponentUpdate() {
		let currDate = new Date().getTime();
		if (i18n.lastModified < currDate) {
			this.setState({_lastModified: currDate});
			this.props.navigation.setOptions({title: i18n.get(`statistics.title`)});
		}
	}
	
	componentDidMount() {
		this.props.navigation.addListener('focus', this._shouldComponentUpdate.bind(this));
		this._shouldComponentUpdate();
	}
	
	render() {
		return <View></View>;
	}
	
}
