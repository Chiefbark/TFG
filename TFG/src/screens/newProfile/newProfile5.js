import React, {Fragment} from 'react';
import {View, Text} from 'react-native';

import * as i18n from '../../i18n';
import {colors} from '../../styles';

import {StackActions} from '@react-navigation/native';

import Button from '../../components/button';

export default class NewProfile5 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			continueVisible: true
		}
	}
	
	componentDidMount() {
		this.props.navigation.setOptions({
			title: i18n.get('timetable.title'),
		});
	}
	
	render() {
		return <Fragment>
			<View style={{flex: 1, padding: 32, alignItems: 'center', justifyContent: 'flex-start'}}>
				<View style={{flexDirection: 'row', paddingHorizontal: 32, alignItems: 'center', paddingVertical: 12}}>
					<Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 16}}>
						{i18n.get('newProfile.screens.4.subtitle')}
					</Text>
				</View>
				<View style={{marginTop: 16}}>
					<Text style={{
						textAlign: 'center',
						marginBottom: 8
					}}>{i18n.get('newProfile.screens.4.description.0')}</Text>
				</View>
				<Text style={{textAlign: 'center', marginTop: 24}}>{i18n.get('newProfile.screens.4.description.1')}</Text>
			</View>
			<Button
				label={i18n.get('newProfile.screens.4.nextButton') + '  ➤'}
				backgroundColor={colors.primary}
				textColor={colors.white} disabled={!this.state.continueVisible}
				onClick={() => this.props.navigation.dispatch(
					StackActions.push('NewProfile6', {key: this.props.route.params.id_schedule, day: 0})
				)}
				style={{
					position: 'absolute', bottom: 50, right: 16, borderRadius: 1000, opacity: this.state.continueVisible ? 1 : 0
				}}
			/>
		</Fragment>
	}
}
