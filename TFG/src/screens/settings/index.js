import React, {Fragment} from 'react';
import {View, Text, ScrollView} from 'react-native';
import * as i18n from '../../i18n';
import CommonStack from "../commons/stack";

import Button from '../../components/button';
import ListHeader from "../../components/listHeader";
import ListItem from "../../components/listItem";
import {colors} from "../../styles";
import Dialog from "../../components/dialog";
import Switch from '../../components/switch';

export default class SettingsScreen extends CommonStack {
	constructor(props) {
		super(props);
		this.state = {
			key: 'settings',
			languageDialog: false
		}
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
										  onClick={() => this.setState({languageDialog: true})}
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
									  initialValue={false}
									  onChange={() => console.log(i18n.get(`settings.items.0`), 'changed value')}
									  style={{marginRight: 8}}
								  />
							  }
							  feedback={false}
							  style={{paddingVertical: 8}}/>
					<ListItem title={i18n.get(`settings.items.1`)}
							  titleStyles={{fontWeight: 'normal'}}
							  rightItem={() =>
								  <Switch
									  initialValue={true}
									  onChange={() => console.log(i18n.get(`settings.items.1`), 'changed value')}
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
									  initialValue={true}
									  onChange={() => console.log(i18n.get(`settings.items.2`), 'changed value')}
									  style={{marginRight: 8}}
								  />
							  }
							  feedback={false}
							  style={{paddingVertical: 8}}/>
					<ListItem title={i18n.get(`settings.items.3`)}
							  titleStyles={{fontWeight: 'normal'}}
							  rightItem={() =>
								  <Switch
									  initialValue={true}
									  onChange={() => console.log(i18n.get(`settings.items.3`), 'changed value')}
									  style={{marginRight: 8}}
								  />
							  }
							  feedback={false}
							  style={{paddingVertical: 8}}/>
					<ListItem title={i18n.get(`settings.items.4`)}
							  titleStyles={{fontWeight: 'normal'}}
							  rightItem={() =>
								  <Switch
									  initialValue={true}
									  onChange={() => console.log(i18n.get(`settings.items.4`), 'changed value')}
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
													  this.setState({languageDialog: false});
													  i18n.setLocale(element.iso);
												  }}
										/>
									)}
							</Fragment>
						}
						buttons={() =>
							<Fragment>
								<Button label={i18n.get('commons.languageDialog.actions.0')}
										backgroundColor={colors.primary} textColor={colors.white}
										onClick={() => this.setState({languageDialog: false})}/>
							</Fragment>
						}
						visible={this.state.languageDialog}/>
			</Fragment>
		);
	}
	
}
