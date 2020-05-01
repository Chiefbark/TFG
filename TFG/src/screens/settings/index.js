import React, {Fragment} from 'react';
import {ScrollView} from 'react-native';
import * as i18n from '../../i18n';
import * as config from '../../config';

import {colors} from "../../styles";
import Button from '../../components/button';
import Dialog from "../../components/dialog";
import ListHeader from "../../components/listHeader";
import ListItem from "../../components/listItem";
import Switch from '../../components/switch';

export default class SettingsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dialogLanguage: false,
			_locale: i18n.currLocale,
			_config: config.currConfig,
			_lastModified: undefined
		}
	}
	
	_updateComponent() {
		this.setState({_locale: i18n.currLocale, _config: config.currConfig, _lastModified: new Date().getTime()});
		this.props.navigation.setOptions({title: i18n.get(`settings.title`)});
		this.props.navigation.dangerouslyGetParent().setOptions({tabBarLabel: i18n.get('settings.title')});
	}
	
	componentDidMount() {
		i18n.addListener(this._updateComponent.bind(this));
		config.addListener(this._updateComponent.bind(this));
		this._updateComponent();
	}
	
	componentWillUnmount() {
		i18n.removeListener(this._updateComponent.bind(this));
		config.removeListener(this._updateComponent.bind(this));
	}
	
	render() {
		return (
			<Fragment>
				<ScrollView style={{flex: 1}}>
					<ListHeader label={i18n.get('settings.headers.0')}/>
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
								  <Switch
									  initialValue={this.state._config.notifications[0]}
									  onChange={async (value) => {
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
								  <Switch
									  initialValue={this.state._config.notifications[1]}
									  onChange={async (value) => {
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
								  <Switch
									  initialValue={this.state._config.calendar[0]}
									  onChange={async (value) => {
										  let newConfig = this.state._config;
										  newConfig.calendar[0] = value;
										  config.setConfig(newConfig);
									  }}
									  style={{marginRight: 8}}
								  />
							  }
							  feedback={false}
							  style={{paddingVertical: 8}}/>
					<ListItem title={i18n.get(`settings.items.3`)}
							  titleStyles={{fontWeight: 'normal'}}
							  rightItem={() =>
								  <Switch
									  initialValue={this.state._config.calendar[1]}
									  onChange={async (value) => {
										  let newConfig = this.state._config;
										  newConfig.calendar[1] = value;
										  config.setConfig(newConfig);
									  }}
									  style={{marginRight: 8}}
								  />
							  }
							  feedback={false}
							  style={{paddingVertical: 8}}/>
					<ListItem title={i18n.get(`settings.items.4`)}
							  titleStyles={{fontWeight: 'normal'}}
							  rightItem={() =>
								  <Switch
									  initialValue={this.state._config.calendar[2]}
									  onChange={async (value) => {
										  let newConfig = this.state._config;
										  newConfig.calendar[2] = value;
										  config.setConfig(newConfig);
									  }}
									  style={{marginRight: 8}}
								  />
							  }
							  feedback={false}
							  style={{paddingVertical: 8}}/>
				</ScrollView>
				{/*	LANGUAGE DIALOG	*/}
				<Dialog title={i18n.get('commons.languageDialog.title')}
						content={() =>
							<Fragment>
								{i18n.get('commons.languages')
									.map(element =>
										<ListItem key={element.iso} title={element.name} titleStyles={{fontWeight: 'normal'}}
												  onClick={() => {
													  this.setState({dialogLanguage: false});
													  i18n.setLocale(element.iso);
													  this._updateComponent();
												  }}
										/>
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
