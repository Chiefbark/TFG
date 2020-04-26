import React from 'react';
import {View, Text} from 'react-native';
import * as i18n from '../../i18n';
import CommonStack from "../commons/stack";

import Button from '../../components/button';

export default class SettingsScreen extends CommonStack {
	constructor(props) {
		super(props);
		this.state = {
			key: 'settings'
		}
	}
	
	render() {
		return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
			<Button label={'Español'} onClick={() => i18n.setLocale('es')}/>
			<Button label={'Inglés'} onClick={() => i18n.setLocale('en')}/>
		</View>;
	}
	
}
