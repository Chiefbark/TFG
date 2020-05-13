import React, {Fragment} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {CommonActions} from '@react-navigation/native';

import * as i18n from '../../i18n';
import * as firebase from '../../firebase';
import * as config from '../../config';
import {colors} from '../../styles';

import ListHeader from '../../components/listHeader';
import ListItem from '../../components/listItem';
import Icon from "../../components/icon";
import Dialog from "../../components/dialog";
import Button from "../../components/button";
import ProfileInfoForm from "../../components/forms/profileInfo";
import TimetableForm from "../../components/forms/timetable";

export default class InformationScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: {},
			profile: undefined,
			dialogTimetable: false,
			dialogEditInfo: false,
			_locale: i18n.currLocale
		}
	}
	
	_updateComponent() {
		this.setState({_locale: i18n.currLocale});
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
		firebase.getDatabase().ref(`users/${firebase.currFirebaseKey}/profiles/${config.currConfig.profile}`).on('value', snapshot => {
			let data = snapshot.val() || {};
			this.setState({profile: data})
		});
	}
	
	componentWillUnmount() {
		i18n.removeListener(this._updateComponent.bind(this));
	}
	
	render() {
		return <Fragment>
			<ScrollView style={{flex: 1}}>
				{/*	CONFIG ABOUT INFORMATION	*/}
				<ListHeader label={i18n.get('profile.screens.0.headers.0')}
							rightItem={() =>
								<Icon source={require('../../../assets/icons/icon_edit.png')} iconColor={colors.white}
									  onClick={() => this.setState({dialogEditInfo: true})}/>
							}
				/>
				<ListItem title={i18n.get('profile.screens.0.contents.0')} subtitle={this.state.profile?.name}/>
				<ListItem title={i18n.get('profile.screens.0.contents.1')}/>
				<ListItem title={i18n.get('profile.screens.0.contents.2')}/>
				{/*	CONFIG ABOUT TIMETABLES	*/}
				<ListHeader label={i18n.get('profile.screens.0.headers.1')}
							rightItem={() =>
								<Icon source={require('../../../assets/icons/icon_help.png')} iconColor={colors.white}/>
							}
				/>
				<Button label={`${i18n.get('commons.form.actions.2')}...`} backgroundColor={colors.white} textColor={colors.lightGrey}
						onClick={() => this.setState({dialogTimetable: true})}
						style={{paddingVertical: 15}}/>
				{/*	CONFIG ABOUT HOLIDAYS & EVENTS	*/}
				<ListHeader label={i18n.get('profile.screens.0.headers.2')}
							rightItem={() =>
								<Icon source={require('../../../assets/icons/icon_help.png')} iconColor={colors.white}/>
							}
				/>
				<Button label={`${i18n.get('commons.form.actions.2')}...`} backgroundColor={colors.white} textColor={colors.lightGrey}
						style={{paddingVertical: 15}}/>
				{/*	CONFIG ABOUT EXAMS	*/}
				<ListHeader label={i18n.get('profile.screens.0.headers.3')}
							rightItem={() =>
								<Icon source={require('../../../assets/icons/icon_help.png')} iconColor={colors.white}/>
							}
				/>
				<Button label={`${i18n.get('commons.form.actions.2')}...`} backgroundColor={colors.white} textColor={colors.lightGrey}
						style={{paddingVertical: 15}}/>
				<View style={{paddingVertical: 25}}/>
			</ScrollView>
			{this.state.dialogEditInfo &&
			<ProfileInfoForm profile={{key: `${config.currConfig.profile}`, obj: {name: this.state.profile.name}}}
							 onSubmit={() => this.setState({dialogEditInfo: false})}
							 onCancel={() => this.setState({dialogEditInfo: false})}/>
			}
			{this.state.dialogTimetable &&
			<TimetableForm navigation={this.props.navigation}
						   onSubmit={() => this.setState({dialogTimetable: false})}
						   onCancel={() => this.setState({dialogTimetable: false})}/>
			}
		</Fragment>;
	}
	
}
