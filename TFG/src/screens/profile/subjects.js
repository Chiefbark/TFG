import React, {Fragment} from 'react';
import {View, Text, FlatList, Keyboard} from 'react-native';

import * as i18n from '../../i18n';
import * as firebase from '../../firebase';
import {colors} from '../../styles';

import Button from '../../components/button';
import Dialog from '../../components/dialog';
import Icon from '../../components/icon';
import ListItem from '../../components/listItem';
import SubjectForm from '../../components/forms/subject';
import * as config from "../../config";

export default class SubjectsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: {},
			subjects: undefined,
			teachers: undefined,
			dialogSubject: false,
			dialogConfirm: false,
			_locale: i18n.currLocale
		}
	}
	
	_listenerSubjects(snapshot){
		let data = snapshot.val() || {};
		this.setState({subjects: Object.entries(data)});
	}
	_listenerTeachers(snapshot){
		let data = snapshot.val() || {};
		this.setState({teachers: Object.entries(data)});
	}
	
	_updateComponent() {
		this.setState({_locale: i18n.currLocale});
		this.props.navigation.dangerouslyGetParent().setOptions({title: i18n.get('profile.screens.1.title')});
		this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({tabBarLabel: i18n.get('profile.title')});
		
		firebase.ref('subjects').off('value', this._listenerSubjects.bind(this));
		firebase.ref('teachers').off('value', this._listenerTeachers.bind(this));
		
		firebase.ref('subjects').on('value', this._listenerSubjects.bind(this));
		firebase.ref('teachers').on('value', this._listenerTeachers.bind(this));
	}
	
	_onFocusComponent() {
		this.props.navigation.dangerouslyGetParent().setOptions({title: i18n.get('profile.screens.1.title')});
		this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({tabBarLabel: i18n.get('profile.title')});
	}
	
	componentDidMount() {
		i18n.addListener(this._updateComponent.bind(this));
		config.addConfigListener(this._updateComponent.bind(this));
		this.props.navigation.addListener('focus', () => this._onFocusComponent());
		this.props.navigation.addListener('blur', () => {
			this.flatList?.scrollToOffset({animated: false, y: 0});
			this.setState({selected: {}});
			this.props.navigation.dangerouslyGetParent().setOptions({
				headerRight: () => undefined
			});
		});
		this._updateComponent();
		
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this.props.navigation.dangerouslyGetParent()
			.dangerouslyGetParent().setOptions({tabBarVisible: false}));
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.props.navigation.dangerouslyGetParent()
			.dangerouslyGetParent().setOptions({tabBarVisible: true}));
	}
	
	componentWillUnmount() {
		i18n.removeListener(this._updateComponent.bind(this));
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}
	
	_showOptions() {
		if (Object.entries(this.state.selected).length > 0)
			this.props.navigation.dangerouslyGetParent().setOptions(
				{
					headerRight: () =>
						<Icon source={require('../../../assets/icons/icon_delete.png')} iconColor={colors.white}
							  onClick={() => {
								  this.setState({dialogConfirm: true});
							  }}
							  style={{marginRight: 16}}/>
				});
		else
			this.props.navigation.dangerouslyGetParent().setOptions({
				headerRight: () => undefined
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
							  <View style={{
								  flex: 1, alignItems: 'center', justifyContent: 'center',
								  paddingVertical: 50, paddingHorizontal: 30
							  }}>
								  <Text style={{textAlign: 'center'}}>{i18n.get('profile.screens.1.emptyList')}</Text>
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
				{/*	PLUS BUTTON	*/}
				<Icon source={require('../../../assets/icons/icon_add.png')} iconColor={colors.white} floating={true}
					  visible={!this.state.dialogSubject}
					  onClick={() => {
						  Object.entries(this.state.selected).length > 0 ?
							  this.setState({selected: {}}, () => this._showOptions()) :
							  this.setState({dialogSubject: true})
					  }}
					  style={[
						  {backgroundColor: colors.primary},
						  Object.entries(this.state.selected).length > 0 ?
							  {transform: [{rotate: '45deg'}]}
							  : undefined
					  ]}
				/>
				{/*	EDIT BUTTON	*/}
				{Object.entries(this.state.selected).length === 1 &&
				<Icon source={require('../../../assets/icons/icon_edit.png')} iconColor={colors.white} floating={true}
					  visible={true} style={{backgroundColor: colors.primary, bottom: 120}}
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
			</Fragment>
		);
	}
	
}
