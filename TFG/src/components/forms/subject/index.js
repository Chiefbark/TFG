import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TextInput, Slider} from 'react-native';
import * as i18n from '../../../i18n';
import * as firebase from '../../../firebase';
import Toast from 'react-native-simple-toast';
import Dialog from '../../dialog';
import Button from '../../button';
import Picker from '../../picker';
import {colors, subjectColors} from '../../../styles';
import Icon from "../../icon";
import TeacherForm from "../teacher";
import ColorPalette from '../../colorPicker';

export default class SubjectForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			key: this.props.subject?.key ?? undefined,
			name: this.props.subject?.obj.name ?? undefined,
			percentage: this.props.subject?.obj.percentage ?? 15,
			color: this.props.subject?.obj.color ?? undefined,
			id_teacher: this.props.subject?.obj.id_teacher ?? 0
		}
	}
	
	_showError(props) {
		this.setState({...props});
		Toast.showWithGravity(i18n.get('commons.form.toast'), Toast.LONG, Toast.TOP);
		setTimeout(() => this.setState({errorName: false, errorTeacher: false, errorColor: false}), 3500);
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
										<Picker data={this.props.teachers} value={this.state.id_teacher}
												placeholder={i18n.get('commons.subjectForm.placeholders.1')}
												error={this.state.errorTeacher} disabled={this.state._nameFocused}
												onValueChange={itemValue => this.setState({id_teacher: itemValue})}
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
								<ColorPalette
									data={subjectColors}
									disabled={this.props.subjectColors}
									value={this.state.color}
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
										onClick={() => {
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
												this.props.onSubmit();
												if (!this.state.key)
													firebase.getDatabase().ref(`users/${firebase.currFirebaseKey}/subjects`).push(obj);
												else
													firebase.getDatabase().ref(`users/${firebase.currFirebaseKey}/subjects/${this.state.key}`).set(obj);
											}
										}}/>
							</Fragment>
						} visible={!this.state.dialogTeacher}/>
				{this.state.dialogTeacher &&
				<TeacherForm onSubmit={() => this.setState({dialogTeacher: false})}
							 onCancel={() => this.setState({dialogTeacher: false})}/>
				}
			</Fragment>
		);
	}
}

SubjectForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	subject: PropTypes.shape({
		key: PropTypes.string.isRequired,
		obj: PropTypes.shape({
			name: PropTypes.string.isRequired,
			percentage: PropTypes.number.isRequired,
			color: PropTypes.string.isRequired,
			id_teacher: PropTypes.string.isRequired
		}).isRequired
	}),
	teachers: PropTypes.array
}
