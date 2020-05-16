import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native';

import * as i18n from '../../../i18n';
import * as firebase from '../../../firebase';
import {colors} from '../../../styles';

import Toast from 'react-native-simple-toast';

import Button from '../../button';
import Dialog from '../../dialog';

/**
 * This component allows the user to update the profile info
 *
 * @author {@link https://github.com/Chiefbark Chiefbark}
 * @version 0.0.1
 */
export default class ProfileInfoForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			key: this.props.profile.key,
			name: this.props.profile.obj.name
		}
	}
	
	_showError(props, msg = 0) {
		this.setState({...props});
		Toast.showWithGravity(i18n.get(`commons.form.toasts.${msg}`), Toast.LONG, Toast.TOP);
		setTimeout(() => this.setState({errorName: false, errorTeacher: false}), 3500);
	}
	
	render() {
		return (
			<Dialog title={i18n.get('commons.profileInfoForm.title')} loading={this.state.loading}
					content={() =>
						<TextInput placeholder={i18n.get('commons.profileInfoForm.placeholders.0')}
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
											await this.setState({loading: true})
											let obj = {name: this.state.name};
											firebase.ref('currProfile').update(obj).then();
											this.props.onSubmit(this.state.key);
										}
									}}/>
						</Fragment>
					} visible={true}/>
		);
	}
}

ProfileInfoForm.propTypes = {
	/**
	 * Callback triggered when the user submits the form
	 *
	 * This callback receives a param
	 * - `key : String` -- The id of the profile updated
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
	 * `key` : id of the profile (required)
	 *
	 * `obj`
	 * - `name : String` : name of the profile (required)
	 */
	profile: PropTypes.shape({
		key: PropTypes.string.isRequired,
		obj: PropTypes.shape({
			name: PropTypes.string.isRequired
		}).isRequired
	}).isRequired
}
