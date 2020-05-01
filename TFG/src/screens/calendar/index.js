import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as i18n from '../../i18n';
import * as config from '../../config';

import {colors} from '../../styles';
import Button from '../../components/button';
import {Calendar} from 'react-native-calendars';
import CalendarDay from '../../components/calendarDay';
import Dialog from '../../components/dialog';
import Icon from '../../components/icon';

const markedDates = {
	'2020-05-15': {
		single: {color: 'black', textColor: 'white'},
	},
	'2020-05-22': {
		selection: {
			color: 'pink',
			isStart: true,
			textColor: 'white'
		},
		multi: [
			{color: 'green'},
			{color: 'blue'},
			{color: 'yellow'},
			{color: 'red'},
			{color: 'purple'},
		]
	}, '2020-05-23': {
		selection: {
			color: 'pink',
			textColor: 'white'
		},
	}, '2020-05-24': {
		selection: {
			color: 'pink',
			isEnd: true,
			textColor: 'white'
		},
	}
};

export default class CalendarScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dialogHelp: false,
			_locale: i18n.currLocale,
			_config: config.currConfig,
			_lastModified: undefined
		}
	}
	
	_updateComponent() {
		this.setState({_locale: i18n.currLocale, _config: config.currConfig, _lastModified: new Date().getTime()});
		this.props.navigation.setOptions({
			title: i18n.get(`calendar.title`),
			headerRight: () =>
				<Icon source={require('../../../assets/icons/icon_help.png')} iconColor={colors.white}
					  style={{marginRight: 16}}
					  onClick={() => this.setState({dialogHelp: true})}/>
		});
		this.props.navigation.dangerouslyGetParent().setOptions({tabBarLabel: i18n.get('calendar.title')});
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
		return <View style={styles.container}>
			<Calendar key={this.state._lastModified}
					  markedDates={markedDates}
					  current={new Date()}
					  minDate={'2020-01-01'}
					  maxDate={'2021-01-01'}
					  monthFormat={'yyyy MMMM'}
					  firstDay={1}
					  onPressArrowLeft={substractMonth => substractMonth()}
					  onPressArrowRight={addMonth => addMonth()}
					  theme={{
						  arrowColor: colors.black,
						  'stylesheet.calendar.main': {
							  week: {
								  marginTop: 1, marginBottom: 1,
								  flexDirection: 'row', justifyContent: 'space-around'
							  }
						  }
					  }}
					  dayComponent={({date, state, marking}) => {
						  let newMarking = {...marking};
						  if (!this.state._config.calendar[0]) newMarking.multi = undefined;
						  if (!this.state._config.calendar[1]) newMarking.selection = undefined;
						  if (!this.state._config.calendar[2]) newMarking.single = undefined;
				
						  return <CalendarDay date={date} state={state} marking={newMarking}/>;
					  }}
			/>
			<View style={styles.helpTextContainer}><Text style={styles.helpText}>{i18n.get('calendar.helpText')}</Text></View>
			<Dialog title={i18n.get('commons.helpDialog.title')}
					buttons={() =>
						<Button label={i18n.get('commons.helpDialog.actions.0')}
								backgroundColor={colors.primary} textColor={colors.white}
								onClick={() => this.setState({dialogHelp: false})}/>
					}
					visible={this.state.dialogHelp}/>
		</View>;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, flexDirection: 'column'
	},
	helpTextContainer: {
		flex: 1, alignItems: 'center', justifyContent: 'center',
		marginHorizontal: 50
	},
	helpText: {
		textAlign: 'center',
		color: colors.grey
	}
})
