import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native';
import * as i18n from '../../../i18n';
import * as firebase from '../../../firebase';

import Dialog from '../../dialog';
import Button from '../../button';
import {colors} from '../../../styles';

export default class TeacherForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			key: this.props.teacher?.key ?? undefined,
			text: this.props.teacher?.obj.name ?? undefined
		}
	}
	
	render() {
		return (
			<Dialog title={i18n.get('commons.teacherForm.title')}
					content={() =>
						<TextInput placeholder={i18n.get('commons.teacherForm.placeholders.0')}
								   onChangeText={(value) => this.setState({text: value})}
								   value={this.state.text} autoCapitalize={'words'}
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
										let obj = {key: this.state.key, name: this.state.text};
										this.props.onSubmit(obj);
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
