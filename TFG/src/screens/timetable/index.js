import React, {Fragment} from 'react';
import {BackHandler, Text} from "react-native";
import {HeaderBackButton} from '@react-navigation/stack';

import * as i18n from "../../i18n";
import * as config from "../../config";
import * as firebase from "../../firebase";
import * as navigation from '../../config/navigation';
import {colors} from "../../styles";

import Button from "../../components/button";
import Dialog from "../../components/dialog";
import Icon from "../../components/icon";

export default class TimeTable extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			dialogConfirm: false
		}
	}
	
	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', () => {
			this.setState({dialogConfirm: true});
			return true;
		});
		this.props.navigation.dangerouslyGetParent().setOptions(
			{
				headerLeft: () => <HeaderBackButton tintColor={colors.white} onPress={() => this.setState({dialogConfirm: true})}/>
			});
	}
	
	render() {
		return <Fragment>
			{/*	DIALOG CONFIRM	*/}
			<Dialog title={i18n.get('timetable.confirmDialog.title')}
					content={() => <Text>{i18n.get('timetable.confirmDialog.description')}</Text>}
					buttons={() =>
						<Fragment>
							<Button label={i18n.get('timetable.confirmDialog.actions.0')}
									onClick={() => {
										this.setState({dialogConfirm: false});
									}}
							/>
							<Button label={i18n.get('profile.screens.1.confirmDialog.actions.1')}
									backgroundColor={colors.primary} textColor={colors.white}
									onClick={() => {
										navigation.setNavigation('default');
									}}/>
						</Fragment>
					} visible={this.state.dialogConfirm}/>
		</Fragment>
	}
}
