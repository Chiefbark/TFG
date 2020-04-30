import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import * as i18n from '../../i18n';
import * as config from '../../config';
import {colors} from '../../styles';
import Icon from '../../components/icon';
import CommonStack from '../commons/stack';
import CalendarDay from '../../components/calendarDay';
import Dialog from '../../components/dialog';
import Button from '../../components/button';

const markedDates = {
	'2020-04-15': {
		single: {color: 'black', textColor: 'white'},
	},
	'2020-04-22': {
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
	}, '2020-04-23': {
		selection: {
			color: 'pink',
			textColor: 'white'
		},
	}, '2020-04-24': {
		selection: {
			color: 'pink',
			isEnd: true,
			textColor: 'white'
		},
	}
};

export default class CalendarScreen extends CommonStack {
	constructor(props) {
		super(props);
		this.state = {
			key: 'calendar',
			config: undefined,
			help: false,
			randKey: 0
		}
		config.config().then(config => {
			this.setState({config: config})
		});
	}
	
	_onConfigChange(config) {
		this.setState({config: config, randKey: (this.state.randKey + 1)});
	}
	
	componentDidMount() {
		super.componentDidMount();
		this.props.navigation.setOptions({
			headerRight: () =>
				<Icon source={require('../../../assets/icons/icon_help.png')} iconColor={colors.white}
					  style={{marginRight: 16}}
					  onClick={() => this.setState({help: true})}/>
		});
		config.addListener(this._onConfigChange.bind(this));
	}
	
	componentWillUnmount() {
		super.componentWillUnmount();
		config.removeListener(this._onConfigChange);
	}
	
	render() {
		return <View style={styles.container}>
			<Calendar key={this.state.randKey}
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
						  if (this.state.config) {
							  if (!this.state.config.calendar[0]) newMarking.multi = undefined;
							  if (!this.state.config.calendar[1]) newMarking.selection = undefined;
							  if (!this.state.config.calendar[2]) newMarking.single = undefined;
						  }
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
