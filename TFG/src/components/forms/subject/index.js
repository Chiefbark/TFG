import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TextInput, Slider} from 'react-native';

import * as i18n from '../../../i18n';
import * as firebase from '../../../firebase';
import * as config from '../../../config';
import {colors, subjectColors} from '../../../styles';

import Toast from 'react-native-simple-toast';

import Button from '../../button';
import ColorPicker from '../../colorPicker';
import Dialog from '../../dialog';
import Icon from "../../icon";
import Picker from '../../picker';
import TeacherForm from "../teacher";

/**
 * This component allows the user to create & update subjects
 *
 * @author {@link https://github.com/Chiefbark|Chiefbark}
 * @version 0.0.1
 */
export default class SubjectForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			key: this.props.subject?.key ?? undefined,
			name: this.props.subject?.obj.name ?? undefined,
			percentage: this.props.subject?.obj.percentage ?? 15,
			color: this.props.subject?.obj.color ?? undefined,
			id_teacher: this.props.subject?.obj.id_teacher ?? undefined
		}
	}
	
	_showError(props) {
		this.setState({...props});
		Toast.showWithGravity(i18n.get('commons.form.toast'), Toast.LONG, Toast.TOP);
		setTimeout(() => this.setState({errorName: false, errorTeacher: false, errorColor: false}), 3500);
	}
	
	componentDidMount() {
		firebase.getDatabase().ref(`users/${firebase.currFirebaseKey}/profiles/${config.currConfig.profile}/teachers`).on('value', snapshot => {
			let data = snapshot.val() || {};
			this.setState({teachers: Object.entries(data)});
		});
	}
	
	render() {
		return (
			<Fragment>
				<Dialog title={i18n.get('commons.subjectForm.title')}
						content={() =>
							<Fragment>
								<TextInput onFocus={() => this.setState({_nameFocused: true})}
										   onBlur={() => this.setState({_nameFocused: false})}
										   placeholder={i18n.get('commons.subjectForm.placeholders.0')}
										   placeholderTextColor={this.state.errorName ? colors.red : colors.lightGrey}
										   onChangeText={(value) => this.setState({name: value})}
										   value={this.state.name} autoCapitalize={'words'}
										   style={{
											   borderBottomWidth: 1,
											   borderBottomColor: this.state.errorName ? colors.red : colors.lightGrey
										   }}/>
								<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
									<View style={{flex: 1}}>
										<Picker initialValue={this.state.id_teacher}
												data={this.state.teachers?.map(e => {
													return {label: e[1].name, value: e[0]};
												}) ?? []}
												placeholder={i18n.get('commons.subjectForm.placeholders.1')}
												error={this.state.errorTeacher} disabled={this.state._nameFocused}
												onValueChange={value => this.setState({id_teacher: value})}
												style={{flex: 1}}
										/>
									</View>
									<Icon source={require('../../../../assets/icons/icon_add.png')}
										  iconColor={colors.white}
										  onClick={() => this.setState({dialogTeacher: true})}
										  style={{
											  backgroundColor: colors.primary,
											  borderTopRightRadius: 4, borderBottomRightRadius: 4,
											  padding: 14.5
										  }}/>
								</View>
								<View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap'}}>
									<Text style={{color: colors.grey}}>{i18n.get('commons.subjectForm.placeholders.3')}</Text>
									<Text style={{color: colors.primary}}>{this.state.percentage}%</Text>
									<Text style={{color: colors.grey}}>{i18n.get('commons.subjectForm.placeholders.4')}</Text>
								</View>
								<Slider style={{flex: 1, height: 40}}
										minimumValue={5} maximumValue={100} value={this.state.percentage} step={5}
										minimumTrackTintColor={colors.primaryLight} maximumTrackTintColor={colors.grey}
										thumbTintColor={colors.primary}
										onSlidingComplete={(value) => this.setState({percentage: value})}
								/>
								<Text style={{textAlign: 'center', color: colors.grey}}>
									{i18n.get('commons.subjectForm.placeholders.5')}
								</Text>
								<ColorPicker
									data={subjectColors}
									marked={this.props.subjectColors}
									initialValue={this.state.color}
									onValueChange={(value) => this.setState({color: value})}
									style={{borderBottomWidth: 1, borderColor: this.state.errorColor ? colors.red : colors.transparent}}
								/>
								<Text style={{textAlign: 'center', color: colors.grey}}>
									{i18n.get('commons.subjectForm.placeholders.6')}
								</Text>
							</Fragment>
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
											if (!this.state.id_teacher || this.state.id_teacher === 0) obj.errorTeacher = true;
											if (!this.state.color || this.state.color === '') obj.errorColor = true;
											if (Object.entries(obj).length > 0) this._showError(obj);
											else {
												let obj = {
													name: this.state.name,
													percentage: this.state.percentage,
													color: this.state.color,
													id_teacher: this.state.id_teacher
												};
								
												let newKey = this.state.key;
												if (!this.state.key)
													newKey = await firebase.getDatabase().ref(`users/${firebase.currFirebaseKey}/profiles/${config.currConfig.profile}/subjects`).push(obj).getKey();
												else
													await firebase.getDatabase().ref(`users/${firebase.currFirebaseKey}/profiles/${config.currConfig.profile}/subjects/${this.state.key}`).set(obj);
								
												this.props.onSubmit(newKey);
								
												if (this.props.subject && this.props.subject.obj.id_teacher)
													firebase.getDatabase().ref(`users/${firebase.currFirebaseKey}/profiles/${config.currConfig.profile}/teachers/${this.props.subject.obj.id_teacher}`)
														.once('value', snapshot => {
															snapshot.ref.update({nSubjects: snapshot.val().nSubjects - 1});
														}).then();
								
												firebase.getDatabase().ref(`users/${firebase.currFirebaseKey}/profiles/${config.currConfig.profile}/teachers/${this.state.id_teacher}`)
													.once('value', snapshot => {
														snapshot.ref.update({nSubjects: snapshot.val().nSubjects + 1});
													}).then();
											}
										}}/>
							</Fragment>
						} visible={!this.state.dialogTeacher}/>
				{this.state.dialogTeacher &&
				<TeacherForm onSubmit={(value) => this.setState({dialogTeacher: false, id_teacher: value})}
							 onCancel={() => this.setState({dialogTeacher: false})}/>
				}
			</Fragment>
		);
	}
}

SubjectForm.propTypes = {
	/**
	 * Callback triggered when the user submits the dialog
	 *
	 * This callback receives a param
	 * - `key : String` -- The id of the subject created/updated
	 */
	onSubmit: PropTypes.func.isRequired,
	/**
	 * Callback triggered when the user cancels the dialog
	 */
	onCancel: PropTypes.func.isRequired,
	/**
	 * Initial values of the form
	 *
	 * `Object : {key: String, obj: Object}`
	 *
	 * `key` : id of the subject
	 *
	 * `obj`
	 * - `name : String` : name of the subject (required)
	 * - `percentage : Number` : percentage of the subject (required)
	 * - `color : String` : color of the subject (required)
	 * - `id_teacher : String` : id of the teacher associated (optional)
	 */
	subject: PropTypes.shape({
		key: PropTypes.string.isRequired,
		obj: PropTypes.shape({
			name: PropTypes.string.isRequired,
			percentage: PropTypes.number.isRequired,
			color: PropTypes.string.isRequired,
			id_teacher: PropTypes.string
		}).isRequired
	})
}
