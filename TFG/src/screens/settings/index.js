import React, {Fragment} from 'react';
import {ScrollView} from 'react-native';

import * as i18n from '../../i18n';
import * as firebase from '../../firebase';
import * as config from '../../config';
import {colors} from '../../styles';

import Button from '../../components/button';
import Dialog from '../../components/dialog';
import ListHeader from '../../components/listHeader';
import ListItem from '../../components/listItem';
import Switch from '../../components/switch';

export default class SettingsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profiles: undefined,
			dialogProfile: false,
			dialogLanguage: false,
			_locale: i18n.currLocale,
			_config: config.currConfig
		}
	}
	
	_updateComponent() {
		this.setState({_locale: i18n.currLocale, _config: config.currConfig});
		this.props.navigation.setOptions({title: i18n.get(`settings.title`)});
		this.props.navigation.dangerouslyGetParent().setOptions({tabBarLabel: i18n.get('settings.title')});
	}
	
	componentDidMount() {
		i18n.addListener(this._updateComponent.bind(this));
		this._updateComponent();
		firebase.ref('profiles').on('value', snapshot => {
			let data = snapshot.val() || {};
			this.setState({profiles: data});
		});
	}
	
	componentWillUnmount() {
		i18n.removeListener(this._updateComponent.bind(this));
	}
	
	render() {
		return (
			<Fragment>
				<ScrollView style={{flex: 1}}>
					{/*	CONFIG ABOUT PROFILE	*/}
					<ListHeader label={i18n.get('settings.headers.0')}/>
					<ListItem title={this.state.profiles ? this.state.profiles[config.currConfig.profile].name : ''}
							  titleStyles={{fontWeight: 'normal'}}
							  rightItem={() =>
								  <Button label={i18n.get('settings.actions.1')}
										  textColor={colors.lightGrey}
										  onClick={() => this.setState({dialogProfile: true})}
								  />
							  }
							  feedback={false}
							  style={{paddingVertical: 4}}/>
					{/*	CONFIG ABOUT LANGUAGE	*/}
					<ListHeader label={i18n.get('settings.headers.1')}/>
					<ListItem title={i18n.get(`commons.languages.${i18n.getSelectedLang()}.name`)}
							  titleStyles={{fontWeight: 'normal'}}
							  rightItem={() =>
								  <Button label={i18n.get('settings.actions.1')}
										  textColor={colors.lightGrey}
										  onClick={() => this.setState({dialogLanguage: true})}
								  />
							  }
							  feedback={false}
							  style={{paddingVertical: 4}}/>
					{/*	CONFIG ABOUT NOTIFICATIONS	*/}
					<ListHeader label={i18n.get('settings.headers.2')}/>
					<ListItem title={i18n.get(`settings.items.0`)}
							  titleStyles={{fontWeight: 'normal'}}
							  rightItem={() =>
								  <Switch initialValue={this.state._config.notifications[0]}
										  onChange={(value) => {
											  let newConfig = this.state._config;
											  newConfig.notifications[0] = value;
											  config.setConfig(newConfig);
										  }}
										  style={{marginRight: 8}}
								  />
							  }
							  feedback={false}
							  style={{paddingVertical: 8}}/>
					<ListItem title={i18n.get(`settings.items.1`)}
							  titleStyles={{fontWeight: 'normal'}}
							  rightItem={() =>
								  <Switch initialValue={this.state._config.notifications[1]}
										  onChange={(value) => {
											  let newConfig = this.state._config;
											  newConfig.notifications[1] = value;
											  config.setConfig(newConfig);
										  }}
										  style={{marginRight: 8}}
								  />
							  }
							  feedback={false}
							  style={{paddingVertical: 8}}/>
					{/*	CONFIG ABOUT CALENDAR	*/}
					<ListHeader label={i18n.get('settings.headers.3')}/>
					<ListItem title={i18n.get(`settings.items.2`)}
							  titleStyles={{fontWeight: 'normal'}}
							  rightItem={() =>
								  <Switch initialValue={this.state._config.calendar[0]}
										  onChange={(value) => {
											  setTimeout(() => {
												  let newConfig = this.state._config;
												  newConfig.calendar[0] = value;
												  config.setConfig(newConfig);
											  }, 0)
										  }}
										  style={{marginRight: 8}}
								  />
							  }
							  feedback={false}
							  style={{paddingVertical: 8}}/>
					<ListItem title={i18n.get(`settings.items.3`)}
							  titleStyles={{fontWeight: 'normal'}}
							  rightItem={() =>
								  <Switch initialValue={this.state._config.calendar[1]}
										  onChange={(value) => {
											  setTimeout(() => {
												  let newConfig = this.state._config;
												  newConfig.calendar[1] = value;
												  config.setConfig(newConfig);
											  }, 0)
										  }}
										  style={{marginRight: 8}}
								  />
							  }
							  feedback={false}
							  style={{paddingVertical: 8}}/>
					<ListItem title={i18n.get(`settings.items.4`)}
							  titleStyles={{fontWeight: 'normal'}}
							  rightItem={() =>
								  <Switch initialValue={this.state._config.calendar[2]}
										  onChange={(value) => {
											  setTimeout(() => {
												  let newConfig = this.state._config;
												  newConfig.calendar[2] = value;
												  config.setConfig(newConfig);
											  }, 0)
										  }}
										  style={{marginRight: 8}}
								  />
							  }
							  feedback={false}
							  style={{paddingVertical: 8}}/>
				</ScrollView>
				{/*	PROFILE DIALOG	*/}
				<Dialog title={i18n.get('commons.profileDialog.title')} loading={this.state.loadingProfile}
						content={() =>
							<Fragment>
								{this.state.profiles?.map((element, index) =>
									<ListItem key={index} title={element.name} titleStyles={{fontWeight: 'normal'}}
											  onClick={() => {
												  this.setState({loadingProfile: true})
												  setTimeout(async () => {
													  if (config.currConfig.profile !== index) {
														  let newConfig = this.state._config;
														  newConfig.profile = index;
														  config.setConfig(newConfig);
													  }
													  this.setState({dialogProfile: false, loadingProfile: false});
												  }, 0)
											  }}
											  style={[
												  {borderLeftWidth: 10, borderLeftColor: colors.transparent},
												  config.currConfig.profile === index && {borderLeftColor: colors.primary}
											  ]}/>
								)}
							</Fragment>
						}
						buttons={() =>
							<Fragment>
								<Button label={i18n.get('commons.profileDialog.actions.0')}
										backgroundColor={colors.primary} textColor={colors.white}
										onClick={() => this.setState({dialogProfile: false})}/>
							</Fragment>
						}
						visible={this.state.dialogProfile}/>
				{/*	LANGUAGE DIALOG	*/}
				<Dialog title={i18n.get('commons.languageDialog.title')} loading={this.state.loadingLang}
						content={() =>
							<Fragment>
								{i18n.get('commons.languages')
									.map(element =>
										<ListItem key={element.iso} title={element.name} titleStyles={{fontWeight: 'normal'}}
												  onClick={() => {
													  this.setState({loadingLang: true})
													  setTimeout(async () => {
														  if (i18n.currLocale !== element.iso)
															  i18n.setLocale(element.iso);
														  this.setState({dialogLanguage: false, loadingLang: false});
													  }, 0)
												  }}
												  style={[
													  {borderLeftWidth: 10, borderLeftColor: colors.transparent},
													  i18n.currLocale === element.iso && {borderLeftColor: colors.primary}
												  ]}/>
									)}
							</Fragment>
						}
						buttons={() =>
							<Fragment>
								<Button label={i18n.get('commons.languageDialog.actions.0')}
										backgroundColor={colors.primary} textColor={colors.white}
										onClick={() => this.setState({dialogLanguage: false})}/>
							</Fragment>
						}
						visible={this.state.dialogLanguage}/>
			</Fragment>
		);
	}
	
}
