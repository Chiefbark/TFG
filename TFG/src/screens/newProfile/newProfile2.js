import React, {Fragment} from 'react';

import {View, Text, TextInput, Image, Keyboard, BackHandler} from 'react-native';

import * as i18n from '../../i18n';
import * as config from '../../config';
import * as firebase from '../../firebase';
import {colors} from '../../styles';

import Toast from 'react-native-simple-toast';
import {HeaderBackButton} from '@react-navigation/stack';
import {StackActions} from '@react-navigation/native';

import Button from '../../components/button';
import CalendarPicker from '../../components/calendarPicker';
import Dialog from '../../components/dialog';
import Icon from '../../components/icon';

export default class NewProfile2 extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			continueVisible: true,
			key: undefined,
			startDate: undefined,
			endDate: undefined
		}
	}
	
	_backCallback() {
		if (this.props.navigation.isFocused())
			this.setState({dialogExit: true});
		else
			this.props.navigation.pop();
		return true;
	}
	
	componentDidMount() {
		setTimeout(() => this.setState({dialogHelp: true}), 250);
		BackHandler.addEventListener('hardwareBackPress', this._backCallback.bind(this))
		
		this.props.navigation.setOptions({
			title: i18n.get('newProfile.title'),
			headerLeft: () => <HeaderBackButton tintColor={colors.white} onPress={() => this.setState({dialogExit: true})}/>,
			headerRight: () => <Icon source={require('../../../assets/icons/icon_help.png')} iconColor={colors.white}
									 style={{marginRight: 16}}
									 onClick={() => this.setState({dialogHelp: true})}/>
		});
		
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this.setState({continueVisible: false}));
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.setState({continueVisible: true}));
		
		firebase.ref('profiles')
			.once('value', snapshot => this.setState({nProfiles: snapshot.numChildren()}))
	}
	
	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}
	
	_showError(props, msg = 0) {
		this.setState({...props});
		Toast.showWithGravity(i18n.get(`commons.form.toasts.${msg}`), Toast.LONG, Toast.TOP);
		setTimeout(() => this.setState({errorName: false, errorStartDate: false, errorEndDate: false}), 3500);
	}
	
	render() {
		return (
			<Fragment>
				<View style={{flex: 1, padding: 32, alignItems: 'center', justifyContent: 'flex-start'}}>
					<View style={{flexDirection: 'row', paddingHorizontal: 32, alignItems: 'center', paddingVertical: 12}}>
						<Image source={require('../../../assets/icons/icon_profile_art.png')} style={{width: 32, height: 32}}/>
						<Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 16}}>
							{i18n.get('newProfile.screens.1.subtitle')}
						</Text>
						<Image source={require('../../../assets/icons/icon_profile_art.png')} style={{width: 32, height: 32}}/>
					</View>
					<View style={{marginTop: 16}}>
						<Text style={{textAlign: 'center', marginBottom: 8}}>{i18n.get('newProfile.screens.1.description.0')}</Text>
						<TextInput placeholder={i18n.get('commons.profileInfoForm.placeholders.0')}
								   placeholderTextColor={this.state.errorName ? colors.red : colors.lightGrey}
								   onChangeText={(value) => this.setState({name: value})}
								   value={this.state.name} autoCapitalize={'words'}
								   style={{borderBottomWidth: 1, borderBottomColor: this.state.errorName ? colors.red : colors.lightGrey}}/>
						<Text style={{textAlign: 'center', marginTop: 16}}>
							{i18n.get('commons.timetableForm.placeholders.0')}
						</Text>
						<View style={{flexDirection: 'row', alignItems: 'center'}}>
							<Text
								style={
									[{
										flex: 1, textAlign: 'center', color: this.state.startDate ? colors.black : colors.lightGrey,
										borderBottomWidth: 1, borderBottomColor: colors.transparent, paddingVertical: 10
									},
										this.state.errorStartDate && {color: colors.red, borderBottomColor: colors.red}
									]}
								onPress={() => this.setState({dialogStartDate: true})}>{this.state.startDate || 'yyyy-MM-dd'}</Text>
							<Text style={{textAlign: 'center', color: colors.grey}}>{i18n.get('commons.scheduleForm.placeholders.1')}</Text>
							<Text
								style={
									[{
										flex: 1, textAlign: 'center', color: this.state.endDate ? colors.black : colors.lightGrey,
										borderBottomWidth: 1, borderBottomColor: colors.transparent, paddingVertical: 10
									},
										this.state.errorEndDate && {color: colors.red, borderBottomColor: colors.red}
									]}
								onPress={() => this.setState({dialogEndDate: true})}>{this.state.endDate || 'yyyy-MM-dd'}</Text>
						</View>
						<Text style={{textAlign: 'center'}}>{i18n.get('newProfile.screens.1.description.1')}</Text>
					</View>
					<Text style={{textAlign: 'center', marginTop: 24}}>{i18n.get('newProfile.screens.1.description.2')}</Text>
					
					<Button label={i18n.get('commons.form.actions.3') + '  ➤'} backgroundColor={colors.primary}
							textColor={colors.white} disabled={!this.state.continueVisible}
							onClick={() => {
								let obj = {};
								let msg = 0;
								if (!this.state.name || this.state.name === '') obj.errorName = true;
								if (!this.state.startDate || this.state.startDate === '') obj.errorStartDate = true;
								if (!this.state.endDate || this.state.endDate === '') obj.errorEndDate = true;
								if (this.state.startDate >= this.state.endDate) {
									obj.errorStartDate = true;
									obj.errorEndDate = true;
									msg = 1;
								}
								if (Object.entries(obj).length > 0) this._showError(obj, msg);
								else {
									this.setState({loading: true})
									setTimeout(async () => {
										let newConfig = config.currConfig;
										this.setState({prevProfile: newConfig.profile});
										newConfig.profile = this.state.nProfiles;
										config.setConfig(newConfig);
								
										let obj = {name: this.state.name};
										await firebase.ref('profiles').child(this.state.nProfiles).update(obj)
										obj = {startDate: this.state.startDate, endDate: this.state.endDate};
										let scheduleKey = this.state.scheduleKey;
										if (scheduleKey)
											await firebase.ref('schedules').child(scheduleKey).update(obj)
										else {
											scheduleKey = await firebase.ref('schedules').push(obj).getKey();
											this.setState({scheduleKey: scheduleKey})
										}
										this.props.navigation.dispatch(StackActions.push('NewProfile3', {id_schedule: scheduleKey}));
									}, 0);
								}
							}}
							style={{
								position: 'absolute', bottom: 50, right: 16, borderRadius: 1000, opacity: this.state.continueVisible ? 1 : 0
							}}
					/>
				</View>
				{this.state.dialogStartDate &&
				<CalendarPicker startDate={this.state.startDate} multiple={false}
								onSubmit={startDate => this.setState({dialogStartDate: false, startDate: startDate})}
								onCancel={() => this.setState({dialogStartDate: false})}/>
				}
				{this.state.dialogEndDate &&
				<CalendarPicker startDate={this.state.endDate} multiple={false}
								onSubmit={startDate => this.setState({dialogEndDate: false, endDate: startDate})}
								onCancel={() => this.setState({dialogEndDate: false})}/>
				}
				<Dialog title={i18n.get('commons.helpDialog.title')}
						content={() =>
							<Fragment>
								<Text style={{textAlign: 'center'}}>{i18n.get('newProfile.screens.1.helpDialog.placeholders.0')}</Text>
								<Text style={{
									textAlign: 'center',
									color: colors.grey,
									marginTop: 14
								}}>{i18n.get('newProfile.screens.1.helpDialog.placeholders.1')}</Text>
							</Fragment>
						}
						buttons={() =>
							<Button label={i18n.get('commons.helpDialog.actions.0')}
									backgroundColor={colors.primary} textColor={colors.white}
									onClick={() => this.setState({dialogHelp: false})}/>
						}
						visible={this.state.dialogHelp}/>
				<Dialog title={i18n.get('newProfile.screens.1.exitDialog.title')} loading={this.state.loadingExit}
						content={() => <Text>{i18n.get('newProfile.screens.1.exitDialog.description')}</Text>}
						buttons={() =>
							<Fragment>
								<Button label={i18n.get('newProfile.screens.1.exitDialog.actions.0')}
										onClick={() => this.setState({dialogExit: false})}/>
								<Button label={i18n.get('newProfile.screens.1.exitDialog.actions.1')}
										backgroundColor={colors.primary} textColor={colors.white}
										onClick={() => {
											this.setState({loadingExit: true})
											setTimeout(async () => {
												firebase.ref('currProfile').remove()
												this.setState({dialogExit: false, loadingExit: false},
													() => {
														let newConfig = config.currConfig;
														newConfig.profile = this.state.prevProfile;
														config.setConfig(newConfig);
														this.props.navigation.pop()
													})
											})
										}}
								/>
							</Fragment>
						}
						visible={this.state.dialogExit}/>
			</Fragment>
		)
	}
}
