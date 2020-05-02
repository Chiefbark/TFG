import React, {Fragment} from 'react';
import {View, Text, FlatList} from 'react-native';
import * as i18n from '../../i18n';
import * as firebase from '../../firebase';
import Icon from "../../components/icon";
import {colors} from "../../styles";
import TeacherForm from "../../components/forms/teacher";
import ListItem from "../../components/listItem";
import Dialog from "../../components/dialog";
import Button from "../../components/button";

export default class TeachersScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: {},
			teachers: undefined,
			dialogTeacher: false,
			dialogConfirm: false,
			_active: false,
			_locale: i18n.currLocale,
			_lastModified: undefined
		}
	}
	
	_updateComponent() {
		if (this.state._active)
			this.setState({_locale: i18n.currLocale, _lastModified: new Date().getTime()});
		this.props.navigation.dangerouslyGetParent().setOptions({title: i18n.get('profile.screens.2.title')});
		this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({tabBarLabel: i18n.get('profile.title')});
	}
	
	_onFocusComponent() {
		this.setState({_active: true});
		this.props.navigation.dangerouslyGetParent().setOptions({title: i18n.get('profile.screens.2.title')});
		this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({tabBarLabel: i18n.get('profile.title')});
	}
	
	componentDidMount() {
		i18n.addListener(this._updateComponent.bind(this));
		this.props.navigation.addListener('focus', () => this._onFocusComponent());
		this.props.navigation.addListener('blur', () => {
			this.setState({selected: {}, _active: false});
			this.props.navigation.dangerouslyGetParent().setOptions({
				headerRight: () => undefined
			});
		});
		
		firebase.getDatabase().ref(`users/${firebase.currFirebaseKey}/teachers`).on('value', snapshot => {
			let data = snapshot.val() || {};
			this.setState({teachers: Object.entries(data)});
		});
	}
	
	componentWillUnmount() {
		i18n.removeListener(this._updateComponent.bind(this));
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
						  data={this.state.teachers}
						  keyExtractor={(item) => item[0]}
						  ListEmptyComponent={() =>
							  <View style={{
								  flex: 1, alignItems: 'center', justifyContent: 'center',
								  paddingVertical: 50, paddingHorizontal: 30
							  }}>
								  <Text style={{textAlign: 'center'}}>{i18n.get('profile.screens.2.emptyList')}</Text>
							  </View>
						  }
						  ItemSeparatorComponent={() => <View style={{flex: 1, backgroundColor: colors.primaryDark, height: 1}}/>}
						  renderItem={({item}) =>
							  <ListItem key={item[0]} title={item[1].name} subtitle={`${item[1].nSubjects} ${i18n.get('profile.screens.2.subtitle')}`}
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
										style={this.state.selected[item[0]] && {backgroundColor: colors.primaryLight}}
							  />
						  }
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
						  this.setState({teacher: obj, dialogTeacher: true, selected: {}}, () => this._showOptions());
					  }}
				/>
				}
				{/*	DIALOG TEACHER	*/}
				{this.state.dialogTeacher &&
				<TeacherForm
					teacher={this.state.teacher}
					onSubmit={() => {
						this.setState({dialogTeacher: false});
					}}
					onCancel={() => this.setState({dialogTeacher: false})}/>
				}
				{/*	DIALOG CONFIRM	*/}
				<Dialog title={i18n.get('profile.screens.2.confirmDialog.title')}
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
											Object.entries(this.state.selected)
												.forEach(element =>
													firebase.getDatabase().ref(`users/${firebase.currFirebaseKey}/teachers/${element[0]}`).remove()
												)
											this.setState({selected: {}, dialogConfirm: false}, () => this._showOptions());
										}}/>
							</Fragment>
						} visible={this.state.dialogConfirm}/>
			</Fragment>
		);
	}
	
}
