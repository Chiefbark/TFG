import React from 'react';
import {View, Text, Image} from 'react-native';
import * as i18n from "../../i18n";
import Button from "../../components/button";
import {colors} from "../../styles";

export default class NewProfile7 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	
	componentDidMount() {
		this.props.navigation.setOptions({
			title: i18n.get('newProfile.screens.6.title')
		});
	}
	
	render() {
		return (
			<View style={{flex: 1, padding: 32, alignItems: 'center', justifyContent: 'flex-start'}}>
				<View style={{flexDirection: 'row', paddingHorizontal: 32, alignItems: 'center', paddingVertical: 12}}>
					<Image source={require('../../../assets/icons/icon_party.png')}
						   style={{width: 32, height: 32}}/>
					<Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingHorizontal: 16}}>
						{i18n.get('newProfile.screens.6.subtitle')}
					</Text>
					<Image source={require('../../../assets/icons/icon_party.png')}
						   style={{width: 32, height: 32}}/>
				</View>
				<View style={{marginTop: 16}}>
					<Text style={{
						textAlign: 'center',
						marginBottom: 8
					}}>{i18n.get('newProfile.screens.6.description.0')}</Text>
				</View>
				<Text style={{textAlign: 'center', marginTop: 24}}>{i18n.get('newProfile.screens.6.description.1')}</Text>
				<Button label={i18n.get('newProfile.screens.6.nextButton')} backgroundColor={colors.primary} textColor={colors.white}/>
			</View>
		)
	}
}
