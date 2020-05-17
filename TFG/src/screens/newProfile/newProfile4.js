import React, {Fragment} from 'react';

import {View, Text, Image, Keyboard, FlatList} from 'react-native';

import * as i18n from '../../i18n';
import * as firebase from '../../firebase';
import {colors} from '../../styles';

import {StackActions} from '@react-navigation/native';

import Button from '../../components/button';
import Dialog from '../../components/dialog';
import Icon from '../../components/icon';
import ListItem from '../../components/listItem';
import SubjectForm from '../../components/forms/subject';

export default class NewProfile4 extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			continueVisible: true,
			selected: {},
			subjects: undefined,
			teachers: undefined,
			dialogSubject: false,
			dialogConfirm: false,
			_locale: i18n.currLocale
		}
	}
	
	componentDidMount() {
		setTimeout(() => this.setState({dialogHelp: true}), 250);
		this.props.navigation.setOptions({
			title: i18n.get('newProfile.title'),
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
		
		firebase.ref('subjects').on('value', snapshot => {
			let data = snapshot.val() || {};
			this.setState({subjects: Object.entries(data)});
		});
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
						  data={this.state.subjects}
						  keyExtractor={(item) => item[0]}
						  ListEmptyComponent={() =>
							  <View style={{flex: 1, padding: 32, alignItems: 'center', justifyContent: 'flex-start'}}>
								  <View style={{flexDirection: 'row', paddingHorizontal: 32, alignItems: 'center', paddingVertical: 12}}>
									  <Image source={require('../../../assets/icons/icon_subject_history_ark.png')}
											 style={{width: 32, height: 32}}/>
									  <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 16}}>
										  {i18n.get('newProfile.screens.3.subtitle')}
									  </Text>
									  <Image source={require('../../../assets/icons/icon_subject_math_art.png')}
											 style={{width: 32, height: 32}}/>
								  </View>
								  <View style={{marginTop: 16}}>
									  <Text style={{
										  textAlign: 'center',
										  marginBottom: 8
									  }}>{i18n.get('newProfile.screens.3.description.0')}</Text>
								  </View>
								  <Text style={{textAlign: 'center', marginTop: 24}}>{i18n.get('newProfile.screens.3.description.1')}</Text>
							  </View>
						  }
						  ItemSeparatorComponent={() => <View style={{flex: 1, backgroundColor: colors.primaryDark, height: 1}}/>}
						  ListFooterComponent={() => <View style={{paddingVertical: 25}}/>}
						  renderItem={({item}) => {
							  let filtered = this.state.teachers?.filter(e => e[0] === item[1].id_teacher) ?? undefined;
							  let subtitle = filtered && filtered.length > 0 ? filtered[0][1].name : i18n.get('profile.screens.1.emptyTeacher');
							  return (
								  <ListItem key={item[0]} title={item[1].name}
											subtitle={subtitle}
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
											style={{borderLeftWidth: 10, borderLeftColor: item[1].color}}
								  />
							  );
						  }}
				/>
				<Button label={i18n.get('commons.form.actions.3') + '  ➤'} backgroundColor={colors.primary}
						textColor={colors.white} disabled={!this.state.continueVisible}
						style={{
							position: 'absolute', bottom: 50, right: 16, borderRadius: 1000, opacity: this.state.continueVisible ? 1 : 0
						}}
				/>
				{/*	PLUS BUTTON	*/}
				<Icon source={require('../../../assets/icons/icon_add.png')} iconColor={colors.white} floating={true}
					  visible={!this.state.dialogSubject}
					  onClick={() => {
						  Object.entries(this.state.selected).length > 0 ?
							  this.setState({selected: {}}, () => this._showOptions()) :
							  this.setState({dialogSubject: true})
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
						  this.setState({subject: obj, dialogSubject: true, selected: {}}, () => this._showOptions());
					  }}
				/>
				}
				{/*	DIALOG SUBJECT	*/}
				{this.state.dialogSubject &&
				<SubjectForm
					subject={this.state.subject} subjectColors={this.state.subjects.map(e => e[1].color)}
					onSubmit={() => this.setState({subject: undefined, dialogSubject: false})}
					onCancel={() => this.setState({subject: undefined, dialogSubject: false})}
				/>}
				{/*	DIALOG CONFIRM	*/}
				<Dialog title={i18n.get('profile.screens.1.confirmDialog.title')} loading={this.state.loadingRemove}
						content={() => <Text>{i18n.get('profile.screens.1.confirmDialog.description')}</Text>}
						buttons={() =>
							<Fragment>
								<Button label={i18n.get('profile.screens.1.confirmDialog.actions.0')}
										onClick={() => {
											this.setState({selected: {}, dialogConfirm: false}, () => this._showOptions());
										}}
								/>
								<Button label={i18n.get('profile.screens.1.confirmDialog.actions.1')}
										backgroundColor={colors.primary} textColor={colors.white}
										onClick={() => {
											this.setState({loadingRemove: true})
											setTimeout(async () => {
												Object.entries(this.state.selected)
													.forEach(element => firebase.removeSubject(element[0], element[1].id_teacher))
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
								<Text style={{textAlign: 'center'}}>{i18n.get('newProfile.screens.3.helpDialog.placeholders.0')}</Text>
								<Text style={{
									textAlign: 'center',
									color: colors.grey,
									marginTop: 14
								}}>{i18n.get('newProfile.screens.3.helpDialog.placeholders.1')}</Text>
							</Fragment>
						}
						buttons={() =>
							<Button label={i18n.get('commons.helpDialog.actions.0')}
									backgroundColor={colors.primary} textColor={colors.white}
									onClick={() => this.setState({dialogHelp: false})}/>
						}
						visible={this.state.dialogHelp}/>
			</Fragment>
		);
	}
}
