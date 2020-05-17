import React, {Fragment} from 'react';

import {View, Text, FlatList, Keyboard, Image} from 'react-native';

import * as i18n from '../../i18n';
import * as firebase from '../../firebase';
import {colors} from '../../styles';

import {StackActions} from '@react-navigation/native';

import Button from '../../components/button';
import Dialog from '../../components/dialog';
import Icon from '../../components/icon';
import ListItem from '../../components/listItem';
import TeacherForm from '../../components/forms/teacher';

export default class NewProfile3 extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			continueVisible: true,
			selected: {},
			teachers: undefined,
			dialogTeacher: false,
			dialogConfirm: false,
		}
	}
	
	componentDidMount() {
		this.props.navigation.setOptions({
			title: i18n.get('profile.screens.2.title'),
			headerRight: () => <Icon source={require('../../../assets/icons/icon_help.png')} iconColor={colors.white}
									 style={{marginRight: 16}}
									 onClick={() => this.setState({dialogHelp: true})}/>
		});
		
		this.props.navigation.addListener('blur', () => {
			this.flatList?.scrollToOffset({animated: false, y: 0});
			this.setState({selected: {}});
			this.props.navigation.setOptions({
				headerRight: () => <Icon source={require('../../../assets/icons/icon_help.png')} iconColor={colors.white}
										 style={{marginRight: 16}}
										 onClick={() => this.setState({dialogHelp: true})}/>
			});
		});
		
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this.setState({continueVisible: false}));
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.setState({continueVisible: true}));
		
		firebase.ref('teachers').on('value', snapshot => {
			let data = snapshot.val() || {};
			this.setState({teachers: Object.entries(data)});
		});
	}
	
	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}
	
	_showOptions() {
		if (Object.entries(this.state.selected).length > 0)
			this.props.navigation.setOptions(
				{
					headerRight: () =>
						<Icon source={require('../../../assets/icons/icon_delete.png')} iconColor={colors.white}
							  onClick={() => {
								  this.setState({dialogConfirm: true});
							  }}
							  style={{marginRight: 16}}/>
				});
		else
			this.props.navigation.setOptions({
				headerRight: () => <Icon source={require('../../../assets/icons/icon_help.png')} iconColor={colors.white}
										 style={{marginRight: 16}}
										 onClick={() => this.setState({dialogHelp: true})}/>
			});
	}
	
	render() {
		return (
			<Fragment>
				<FlatList style={{flex: 1}}
						  ref={(ref) => this.flatList = ref}
						  data={this.state.teachers}
						  keyExtractor={(item) => item[0]}
						  ListEmptyComponent={() =>
							  <View style={{flex: 1, padding: 32, alignItems: 'center', justifyContent: 'flex-start'}}>
								  <View style={{flexDirection: 'row', paddingHorizontal: 32, alignItems: 'center', paddingVertical: 12}}>
									  <Image source={require('../../../assets/icons/icon_teacher_female_art.png')}
											 style={{width: 32, height: 32}}/>
									  <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 16}}>
										  {i18n.get('newProfile.screens.2.subtitle')}
									  </Text>
									  <Image source={require('../../../assets/icons/icon_teacher_male_art.png')}
											 style={{width: 32, height: 32}}/>
								  </View>
								  <View style={{marginTop: 16}}>
									  <Text style={{
										  textAlign: 'center',
										  marginBottom: 8
									  }}>{i18n.get('newProfile.screens.2.description.0')}</Text>
								  </View>
								  <Text style={{textAlign: 'center', marginTop: 24}}>{i18n.get('newProfile.screens.2.description.1')}</Text>
							  </View>
						  }
						  ItemSeparatorComponent={() => <View style={{flex: 1, backgroundColor: colors.primaryDark, height: 1}}/>}
						  ListFooterComponent={() => <View style={{paddingVertical: 25}}/>}
						  renderItem={({item}) =>
							  <ListItem key={item[0]} title={item[1].name}
										subtitle={`${item[1].nSubjects} ${i18n.get('profile.screens.2.subtitle')}`}
										onLongClick={() => {
											let elements = this.state.selected;
											elements[item[0]] = item[1];
											this.setState({selected: elements}, () => this._showOptions());
										}}
										onClick={() => {
											let elements = this.state.selected;
											if (elements[item[0]]) delete elements[item[0]];
											else if (Object.entries(this.state.selected).length > 0)
												elements[item[0]] = item[1];
						
											this.setState({selected: elements}, () => this._showOptions());
										}}
										rightItem={() =>
											Object.entries(this.state.selected).length > 0 &&
											<Icon source={require('../../../assets/icons/icon_check.png')}
												  size={'small'} disabled={true}
												  iconColor={this.state.selected[item[0]] ? colors.primary : colors.white}
												  style={{
													  borderWidth: 1, borderColor: colors.primary, borderRadius: 1000,
													  padding: 10, marginRight: 16
												  }}/>
										}
							  />
						  }
				/>
				<Button label={i18n.get('newProfile.nextButton') + ' ' + i18n.get('profile.screens.1.title') + '  ➤'}
						backgroundColor={colors.primary}
						textColor={colors.white} disabled={!this.state.continueVisible}
						onClick={() =>
							this.props.navigation.dispatch(
								StackActions.push('NewProfile4', {id_schedule: this.props.route.params.id_schedule})
							)
						}
						style={{
							position: 'absolute', bottom: 50, right: 16, borderRadius: 1000, opacity: this.state.continueVisible ? 1 : 0
						}}
				/>
				{/*	PLUS BUTTON	*/}
				<Icon source={require('../../../assets/icons/icon_add.png')} iconColor={colors.white} floating={true}
					  visible={!this.state.dialogTeacher}
					  onClick={() => {
						  Object.entries(this.state.selected).length > 0 ?
							  this.setState({selected: {}}, () => this._showOptions()) :
							  this.setState({dialogTeacher: true})
					  }}
					  style={[
						  {backgroundColor: colors.primary, bottom: 120, right: 16},
						  Object.entries(this.state.selected).length > 0 ?
							  {transform: [{rotate: '45deg'}]}
							  : undefined
					  ]}
				/>
				{/*	EDIT BUTTON	*/}
				{Object.entries(this.state.selected).length === 1 &&
				<Icon source={require('../../../assets/icons/icon_edit.png')} iconColor={colors.white} floating={true}
					  visible={true} style={{backgroundColor: colors.primary, bottom: 190, right: 16}}
					  onClick={() => {
						  let value = Object.entries(this.state.selected);
						  let obj = {key: value[0][0], obj: value[0][1]};
						  this.setState({teacher: obj, dialogTeacher: true, selected: {}}, () => this._showOptions());
					  }}
				/>
				}
				{/*	DIALOG TEACHER	*/}
				{this.state.dialogTeacher &&
				<TeacherForm
					teacher={this.state.teacher}
					onSubmit={() => this.setState({teacher: undefined, dialogTeacher: false})}
					onCancel={() => this.setState({teacher: undefined, dialogTeacher: false})}
				/>}
				{/*	DIALOG CONFIRM	*/}
				<Dialog title={i18n.get('profile.screens.2.confirmDialog.title')} loading={this.state.loadingRemove}
						content={() => <Text>{i18n.get('profile.screens.2.confirmDialog.description')}</Text>}
						buttons={() =>
							<Fragment>
								<Button label={i18n.get('profile.screens.2.confirmDialog.actions.0')}
										onClick={() => {
											this.setState({selected: {}, dialogConfirm: false}, () => this._showOptions());
										}}
								/>
								<Button label={i18n.get('profile.screens.2.confirmDialog.actions.1')}
										backgroundColor={colors.primary} textColor={colors.white}
										onClick={() => {
											this.setState({loadingRemove: true})
											setTimeout(async () => {
												Object.entries(this.state.selected)
													.forEach(element => firebase.removeTeacher(element[0]))
												this.setState({
													selected: {}, dialogConfirm: false, loadingRemove: false
												}, () => this._showOptions());
											}, 0)
										}}/>
							</Fragment>
						} visible={this.state.dialogConfirm}/>
				<Dialog title={i18n.get('commons.helpDialog.title')}
						content={() =>
							<Fragment>
								<Text style={{textAlign: 'center'}}>{i18n.get('newProfile.screens.2.helpDialog.placeholders.0')}</Text>
								<Text style={{
									textAlign: 'center',
									color: colors.grey,
									marginTop: 14
								}}>{i18n.get('newProfile.screens.2.helpDialog.placeholders.1')}</Text>
							</Fragment>
						}
						buttons={() =>
							<Button label={i18n.get('commons.helpDialog.actions.0')}
									backgroundColor={colors.primary} textColor={colors.white}
									onClick={() => this.setState({dialogHelp: false})}/>
						}
						visible={this.state.dialogHelp}/>
			</Fragment>
		)
	}
}
