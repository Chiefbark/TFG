import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native';
import * as i18n from '../../../i18n';
import * as firebase from '../../../firebase';
import Toast from 'react-native-simple-toast';

import Dialog from '../../dialog';
import Button from '../../button';
import {colors} from '../../../styles';

export default class TeacherForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			key: this.props.teacher?.key ?? undefined,
			name: this.props.teacher?.obj.name ?? undefined,
			nSubjects: this.props.teacher?.obj.nSubjects ?? 0
		}
	}
	
	_showError(props) {
		this.setState({...props});
		Toast.showWithGravity(i18n.get('commons.form.toast'), Toast.LONG, Toast.TOP);
		setTimeout(() => this.setState({errorName: false, errorTeacher: false}), 3500);
	}
	
	render() {
		return (
			<Dialog title={i18n.get('commons.teacherForm.title')}
					content={() =>
						<TextInput placeholder={i18n.get('commons.teacherForm.placeholders.0')}
								   placeholderTextColor={this.state.errorName ? colors.red : colors.lightGrey}
								   onChangeText={(value) => this.setState({name: value})}
								   value={this.state.name} autoCapitalize={'words'}
								   style={{borderBottomWidth: 1, borderBottomColor: this.state.errorName ? colors.red : colors.lightGrey}}/>
					}
					buttons={() =>
						<Fragment>
							<Button label={i18n.get('commons.form.actions.0')}
									onClick={() => {
										this.props.onCancel();
									}}
							/>
							<Button label={i18n.get('commons.form.actions.1')}
									backgroundColor={colors.primary} textColor={colors.white}
									onClick={() => {
										let obj = {};
										if (!this.state.name || this.state.name === '') obj.errorName = true;
										if (Object.entries(obj).length > 0) this._showError(obj);
										else {
											let obj = {name: this.state.name, nSubjects: this.state.nSubjects};
											this.props.onSubmit();
											if (!this.state.key)
												firebase.getDatabase().ref(`users/${firebase.currFirebaseKey}/teachers`).push(obj);
											else
												firebase.getDatabase().ref(`users/${firebase.currFirebaseKey}/teachers/${this.state.key}`).set(obj);
										}
									}}/>
						</Fragment>
					} visible={true}/>
		);
	}
}

TeacherForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	teacher: PropTypes.shape({
		key: PropTypes.string.isRequired,
		obj: PropTypes.shape({
			name: PropTypes.string.isRequired,
			nSubjects: PropTypes.string
		}).isRequired
	})
}
