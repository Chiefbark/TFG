import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native';

import * as i18n from '../../../i18n';
import * as firebase from '../../../firebase';
import * as config from '../../../config';
import {colors} from '../../../styles';

import Toast from 'react-native-simple-toast';

import Button from '../../button';
import Dialog from '../../dialog';

/**
 * This component allows the user to create & update teachers
 *
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @version 0.0.1
 */
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
									onClick={async () => {
										let obj = {};
										if (!this.state.name || this.state.name === '') obj.errorName = true;
										if (Object.entries(obj).length > 0) this._showError(obj);
										else {
											let obj = {name: this.state.name, nSubjects: this.state.nSubjects};
											let newKey = this.state.key;
											if (!this.state.key)
												newKey = await firebase.getDatabase().ref(`users/${firebase.currFirebaseKey}/profiles/${config.currConfig.profile}/teachers`).push(obj).getKey();
											else
												firebase.getDatabase().ref(`users/${firebase.currFirebaseKey}/profiles/${config.currConfig.profile}/teachers/${this.state.key}`).set(obj).then();
							
											this.props.onSubmit(newKey);
										}
									}}/>
						</Fragment>
					} visible={true}/>
		);
	}
}

TeacherForm.propTypes = {
	/**
	 * Callback triggered when the user submits the form
	 *
	 * This callback receives a param
	 * - `key : String` -- The id of the teacher created/updated
	 */
	onSubmit: PropTypes.func.isRequired,
	/**
	 * Callback triggered when the user cancels the form
	 */
	onCancel: PropTypes.func.isRequired,
	/**
	 * Initial values of the form
	 *
	 * `Object : {key: String, obj: Object}`
	 *
	 * `key` : id of the teacher
	 *
	 * `obj`
	 * - `name : String` : name of the teacher (required)
	 */
	teacher: PropTypes.shape({
		key: PropTypes.string.isRequired,
		obj: PropTypes.shape({
			name: PropTypes.string.isRequired
		}).isRequired
	})
}
