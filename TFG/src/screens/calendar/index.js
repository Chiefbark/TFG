import React from 'react';
import {View} from 'react-native';
import {LocaleConfig, Calendar} from 'react-native-calendars';
import * as i18n from '../../i18n';
import {colors} from "../../styles";
import Icon from "../../components/icon";
import CommonStack from "../commons/stack";
import CalendarDay from "../../components/calendarDay";
import Dialog from "../../components/dialog";
import Button from "../../components/button";

const markedDates = {
	"2020-04-15": {
		single: {color: "black", textColor: "white"},
	},
	"2020-04-22": {
		selection: {
			color: "pink",
			isStart: true,
			textColor: "white"
		},
		multi: [
			{color: 'green'},
			{color: 'blue'},
			{color: 'yellow'},
			{color: 'red'},
			{color: 'purple'},
		]
	}, "2020-04-23": {
		selection: {
			color: "pink",
			textColor: "white"
		},
	}, "2020-04-24": {
		selection: {
			color: "pink",
			isEnd: true,
			textColor: "white"
		},
	}
};

LocaleConfig.locales[i18n.locale] = i18n.get('commons').calendarLocales;
LocaleConfig.defaultLocale = i18n.locale;

export default class CalendarScreen extends CommonStack {
	constructor(props) {
		super(props);
		this.state = {
			key: 'calendar',
			help: false
		}
	}
	
	_onLocaleChange(locale) {
		super._onLocaleChange(locale);
		if (!LocaleConfig.locales[locale])
			LocaleConfig.locales[locale] = i18n.get('commons').calendarLocales;
		LocaleConfig.defaultLocale = i18n.locale;
	}
	
	componentDidMount() {
		super.componentDidMount();
		this.props.navigation.setOptions({
			headerRight: () =>
				<Icon source={require('../../../assets/icons/icon_help.png')} iconColor={colors.white}
					  style={{marginRight: 16}}
					  onClick={() => this.setState({help: true})}/>
		});
	}
	
	render() {
		return <View>
			<Calendar key={this.state.locale}
					  markedDates={markedDates}
					  current={new Date()}
					  minDate={'2020-01-01'}
					  maxDate={'2021-01-01'}
					  monthFormat={'yyyy MMMM'}
					  firstDay={1}
					  onPressArrowLeft={substractMonth => substractMonth()}
					  onPressArrowRight={addMonth => addMonth()}
					  theme={{
						  arrowColor: colors.text,
						  'stylesheet.calendar.main': {
							  week: {
								  marginTop: 1, marginBottom: 1,
								  flexDirection: 'row', justifyContent: 'space-around'
							  }
						  }
					  }}
					  dayComponent={({date, state, marking}) => {
						  return (
							  <CalendarDay date={date} state={state} marking={marking}/>
						  );
					  }}
			/>
			<Dialog title={i18n.get('commons').helpDialog.title}
					buttons={() =>
						<Button label={i18n.get('commons').helpDialog.actions[0]}
								backgroundColor={colors.primary} textColor={colors.white}
								onClick={() => this.setState({help: false})}/>
					}
					visible={this.state.help}/>
		</View>;
	}
}
