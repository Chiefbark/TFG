import React from 'react';
import * as i18n from '../../i18n';

export default class CommonStack extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			locale: i18n.locale(),
			randKey: 0
		}
	}
	
	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return this.state !== nextState;
	}
	
	_onLocaleChange(locale) {
		this.setState({locale: locale, randKey: (this.state.randKey + 1)});
		this.props.navigation.setOptions({title: i18n.get(`${this.state.key}.title`)});
	}
	
	componentDidMount() {
		i18n.addListener(this._onLocaleChange.bind(this));
	}
	
	componentWillUnmount() {
		i18n.removeListener(this._onLocaleChange);
	}
	
}
