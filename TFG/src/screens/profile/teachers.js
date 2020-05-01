import React from 'react';
import {View, Text} from 'react-native';
import * as i18n from '../../i18n';

export default class TeachersScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			_locale: i18n.currLocale,
			_lastModified: undefined
		}
	}
	
	_updateComponent() {
		this.setState({_locale: i18n.currLocale, _lastModified: new Date().getTime()});
		// this.props.navigation.dangerouslyGetParent().setOptions({title: i18n.get('absences.title')});
	}
	
	componentDidMount() {
		i18n.addListener(this._updateComponent.bind(this));
		this._updateComponent();
	}
	
	componentWillUnmount() {
		i18n.removeListener(this._updateComponent.bind(this));
	}
	
	render() {
		return <View></View>;
	}
	
}
