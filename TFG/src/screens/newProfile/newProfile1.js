import React, {Fragment} from 'react';

import {View, Text, Image, BackHandler, StyleSheet} from 'react-native';
import * as i18n from "../../i18n";
import Dialog from "../../components/dialog";
import Button from "../../components/button";
import {colors} from "../../styles";
import {StackActions} from '@react-navigation/native';

export default class NewProfile1 extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {}
	}
	
	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', () => {
			this.setState({dialogExit: true});
			return true;
		});
		this.props.navigation.setOptions({title: i18n.get('newProfile.title')});
	}
	
	render() {
		return (
			<Fragment>
				<View style={{flex: 1, padding: 32, alignItems: 'center', justifyContent: 'flex-start'}}>
					<View style={{flexDirection: 'row', paddingHorizontal: 32, alignItems: 'center', paddingVertical: 12}}>
						<Image source={require('../../../assets/icons/icon_wizard.png')} style={{width: 32, height: 32}}/>
						<Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 16}}>
							{i18n.get('newProfile.screens.0.subtitle')}
						</Text>
						<Image source={require('../../../assets/icons/icon_wizard.png')} style={{width: 32, height: 32}}/>
					</View>
					<Text style={{textAlign: 'center', marginTop: 16, marginBottom: 100}}>
						{i18n.get('newProfile.screens.0.description')}
					</Text>
					<Button label={i18n.get('newProfile.screens.0.nextButton') + '  ➤'} backgroundColor={colors.primary}
							textColor={colors.white}
							onClick={() => this.props.navigation.dispatch(StackActions.push('NewProfile2'))}
							style={{position: 'absolute', bottom: 50, right: 16, borderRadius: 1000}}
					/>
				</View>
				<Dialog title={i18n.get('newProfile.screens.0.exitDialog.title')}
						content={() => <Text>{i18n.get('newProfile.screens.0.exitDialog.description')}</Text>}
						buttons={() =>
							<Fragment>
								<Button label={i18n.get('newProfile.screens.0.exitDialog.actions.0')}
										onClick={() => this.setState({dialogExit: false})}/>
								<Button label={i18n.get('newProfile.screens.0.exitDialog.actions.1')}
										backgroundColor={colors.primary} textColor={colors.white}
										onClick={() => this.setState({dialogExit: false})}
								/>
							</Fragment>
						}
						visible={this.state.dialogExit}/>
			</Fragment>
		)
	}
}
