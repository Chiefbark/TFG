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
			name: this.props.teacher?.obj.name ?? undefined
		}
	}
	
	_showError(ref) {
		ref.setNativeProps({
			placeholderTextColor: colors.red,
			borderBottomColor: colors.red
		});
		Toast.showWithGravity(i18n.get('commons.teacherForm.toast'), Toast.LONG, Toast.TOP);
		setTimeout(() => {
			ref.setNativeProps({
				placeholderTextColor: colors.lightGrey,
				borderBottomColor: colors.grey
			});
		}, 3500);
	}
	
	render() {
		return (
			<Dialog title={i18n.get('commons.teacherForm.title')}
					content={() =>
						<TextInput ref={ref => this._name = ref}
								   placeholder={i18n.get('commons.teacherForm.placeholders.0')}
								   placeholderTextColor={colors.lightGrey}
								   onChangeText={(value) => this.setState({name: value})}
								   value={this.state.name} autoCapitalize={'words'}
								   style={{borderBottomWidth: 1, borderBottomColor: colors.lightGrey}}/>
					}
					buttons={() =>
						<Fragment>
							<Button label={i18n.get('commons.teacherForm.actions.0')}
									onClick={() => {
										this.props.onCancel();
									}}
							/>
							<Button label={i18n.get('commons.teacherForm.actions.1')}
									backgroundColor={colors.primary} textColor={colors.white}
									onClick={() => {
										if (!this.state.text || this.state.text === '')
											this._showError(this._name);
										else {
											let obj = {name: this.state.name};
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
			name: PropTypes.string.isRequired
		}).isRequired
	})
}
