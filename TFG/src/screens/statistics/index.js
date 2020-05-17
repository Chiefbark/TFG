import React from 'react';
import {View, Text} from 'react-native';
import * as i18n from '../../i18n';
import * as config from '../../config';

export default class StatisticsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			_locale: i18n.currLocale,
			_lastModified: undefined
		}
	}
	
	_updateComponent() {
		this.setState({_locale: i18n.currLocale, _lastModified: new Date().getTime()});
		this.props.navigation.setOptions({title: i18n.get(`statistics.title`)});
		this.props.navigation.dangerouslyGetParent().setOptions({tabBarLabel: i18n.get('statistics.title')});
	}
	
	componentDidMount() {
		i18n.addListener(this._updateComponent.bind(this));
		config.addConfigListener(this._updateComponent.bind(this));
		this._updateComponent();
	}
	
	componentWillUnmount() {
		i18n.removeListener(this._updateComponent.bind(this));
		config.removeConfigListener(this._updateComponent.bind(this));
	}
	
	render() {
		return <View></View>;
	}
	
}
