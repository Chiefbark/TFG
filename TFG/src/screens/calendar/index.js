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
			key: 'calendar',
			help: false,
			_config: config.currConfig,
			_lastModified: undefined
		}
	}
	
	_shouldComponentUpdate() {
		let currDate = new Date().getTime();
		if (i18n.lastModified < currDate || config.lastModified < currDate) {
			this.setState({_config: config.currConfig, _lastModified: currDate});
			this.props.navigation.setOptions({
				title: i18n.get(`${this.state.key}.title`),
				headerRight: () =>
					<Icon source={require('../../../assets/icons/icon_help.png')} iconColor={colors.white}
						  style={{marginRight: 16}}
						  onClick={() => this.setState({help: true})}/>
			});
		}
	}
	
	componentDidMount() {
		this.props.navigation.addListener('focus', this._shouldComponentUpdate.bind(this));
		this._shouldComponentUpdate();
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
								onClick={() => this.setState({help: false})}/>
					}
					visible={this.state.help}/>
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
