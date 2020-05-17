import React, {Fragment} from 'react';

import {View, Text, Image, ActivityIndicator} from 'react-native';

import * as i18n from '../../i18n';
import * as config from '../../config';
import {colors} from '../../styles';

import {StackActions} from '@react-navigation/native';

import Button from '../../components/button';
import * as firebase from '../../firebase';

export default class NewProfile1 extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {}
	}
	
	componentDidMount() {
		this.props.navigation.setOptions({title: i18n.get('newProfile.title')});
		firebase.ref('profiles')
			.once('value', snapshot => this.setState({nProfiles: snapshot.numChildren()}))
	}
	
	render() {
		return (
			<Fragment>
				<View style={{position: 'relative', flex: 1, padding: 32, alignItems: 'center', justifyContent: 'flex-start'}}>
					<ActivityIndicator size={25} animating={this.state.loading} color={colors.primary}
									   style={{
										   backgroundColor: colors.white, borderRadius: 1000,
										   opacity: this.state.loading ? 1 : 0, padding: 5
									   }}/>
					<View style={{flexDirection: 'row', paddingHorizontal: 32, alignItems: 'center', paddingVertical: 12}}>
						<Image source={require('../../../assets/icons/icon_wizard_art.png')} style={{width: 32, height: 32}}/>
						<Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 16}}>
							{i18n.get('newProfile.screens.0.subtitle')}
						</Text>
						<Image source={require('../../../assets/icons/icon_wizard_art.png')} style={{width: 32, height: 32}}/>
					</View>
					<Text style={{textAlign: 'center', marginTop: 16, marginBottom: 100}}>
						{i18n.get('newProfile.screens.0.description.0')}
					</Text>
					{this.state.nProfiles > 0 &&
					<Button label={i18n.get('newProfile.screens.0.prevButton')}
							textColor={colors.primary}
							onClick={() => {
								this.setState({loading: true})
								setTimeout(async () =>
										config.setNavigation('default')
									, 0)
							}}
							style={{position: 'absolute', bottom: 50, left: 16}}
					/>
					}
					<Button label={i18n.get('newProfile.screens.0.nextButton') + '  ➤'} backgroundColor={colors.primary}
							textColor={colors.white}
							onClick={() => this.props.navigation.dispatch(StackActions.push('NewProfile2'))}
							style={{position: 'absolute', bottom: 50, right: 16, borderRadius: 1000}}
					/>
				</View>
			</Fragment>
		)
	}
}
