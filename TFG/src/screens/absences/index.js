import React from 'react';
import {View, Text} from 'react-native';
import * as i18n from '../../i18n';
import CommonStack from "../commons/stack";

export default class AbsencesScreen extends CommonStack {
	constructor(props) {
		super(props);
		this.state = {
			key: 'absences'
		}
	}
	
	render() {
		return <View></View>;
	}
	
}
