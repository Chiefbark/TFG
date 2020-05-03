import React from 'react';
import {View, Text} from 'react-native';
import * as i18n from '../../i18n';

export default class InformationScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: {},
			_locale: i18n.currLocale,
			_lastModified: undefined
		}
	}
	
	_updateComponent() {
		this.setState({_locale: i18n.currLocale, _lastModified: new Date().getTime()});
		this.props.navigation.dangerouslyGetParent().setOptions({title: i18n.get('profile.screens.0.title')});
		this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({tabBarLabel: i18n.get('profile.title')});
	}
	
	_onFocusComponent() {
		this.setState({_active: true});
		this.props.navigation.dangerouslyGetParent().setOptions({title: i18n.get('profile.screens.0.title')});
		this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({tabBarLabel: i18n.get('profile.title')});
	}
	
	componentDidMount() {
		i18n.addListener(this._updateComponent.bind(this));
		this.props.navigation.addListener('focus', () => this._onFocusComponent());
		this.props.navigation.addListener('blur', () => {
			this.setState({selected: {}});
			this.props.navigation.dangerouslyGetParent().setOptions({
				headerRight: () => undefined
			});
		});
		this._onFocusComponent();
	}
	
	componentWillUnmount() {
		i18n.removeListener(this._updateComponent.bind(this));
	}
	
	render() {
		return <View></View>;
	}
	
}
