import React, {Fragment} from 'react';
import {View, Text, ScrollView} from 'react-native';
import * as i18n from '../../i18n';
import Icon from "../../components/icon";
import {colors} from "../../styles";
import TeacherForm from "../../components/forms/teacher";

export default class TeachersScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dialogTeacher: false,
			_active: false,
			_locale: i18n.currLocale,
			_lastModified: undefined
		}
	}
	
	_updateComponent() {
		if (this.state._active)
			this.setState({_locale: i18n.currLocale, _lastModified: new Date().getTime()});
	}
	
	_onFocusComponent() {
		this.setState({_active: true});
		this.props.navigation.dangerouslyGetParent().setOptions({title: i18n.get('profile.screens.2.title')});
		this.props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({tabBarLabel: i18n.get('profile.title')});
	}
	
	componentDidMount() {
		i18n.addListener(this._updateComponent.bind(this));
		this.props.navigation.addListener('focus', () => this._onFocusComponent());
		this.props.navigation.addListener('blur', () => this.setState({_active: false}));
	}
	
	componentWillUnmount() {
		i18n.removeListener(this._updateComponent.bind(this));
	}
	
	render() {
		return (
			<Fragment>
				<ScrollView style={{flex: 1}}>
				
				</ScrollView>
				<Icon source={require('../../../assets/icons/icon_add.png')} iconColor={colors.white} floating={true}
					  style={{backgroundColor: colors.primary}} visible={!this.state.dialogTeacher}
					  onClick={() => this.setState({dialogTeacher: true})}/>
				{this.state.dialogTeacher &&
				<TeacherForm
					onSubmit={(teacher) => {
						console.log(teacher);
						this.setState({dialogTeacher: false});
					}}
					onCancel={() => this.setState({dialogTeacher: false})}/>
				}
			</Fragment>
		);
	}
	
}
