import React, {Fragment} from 'react';
import {View, Text, FlatList} from 'react-native';

import * as i18n from '../../i18n';
import * as config from '../../config';
import * as firebase from '../../firebase';
import {colors} from '../../styles';
import {getISODate} from '../../utils';

import Button from '../../components/button';
import Dialog from '../../components/dialog';
import Icon from '../../components/icon';
import ListHeader from '../../components/listHeader';
import ListItem from '../../components/listItem';
import Picker from '../../components/picker';

export default class AbsencesScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currMonth: this.props.route.params?.month ?? new Date().getMonth() + 1,
			currSubject: this.props.route.params?.id_subject ?? undefined,
			_locale: i18n.currLocale
		}
	}
	
	_updateComponent() {
		this.setState({_locale: i18n.currLocale});
		this.props.navigation.setOptions({
			title: i18n.get(`absences.title`),
			headerRight: () => !this.props.route.params && (
				<Icon source={require('../../../assets/icons/icon_filter.png')} iconColor={colors.white}
					  style={{marginRight: 16}}
					  onClick={() => this.setState({dialogFilter: true})}/>
			)
		});
		this.props.navigation.dangerouslyGetParent().setOptions({
			tabBarLabel: i18n.get('absences.title'),
			tabBarVisible: !this.props.route.params
		});
		
		firebase.ref('subjects').off('value')
		firebase.ref('absences').off('value')
		firebase.ref('subjects').on('value', snapshot => {
			let data = snapshot.val() || {};
			this.setState({subjects: Object.entries(data)});
		})
		firebase.ref('absences').on('value', snapshot => {
			let data = snapshot.val() || {};
			let arr = Object.entries(data);
			if (this.state.currMonth)
				arr = arr.filter(e => parseInt(e[0].split('-')[1]) === this.state.currMonth);
			arr = arr.map(e => {
				let absences = [];
				Object.entries(e[1]).forEach(x => {
					if (this.state.currSubject && x[1].id_subject === this.state.currSubject)
						absences.push({date: e[0], id_schedule: x[0], id_subject: x[1].id_subject})
					else if (!this.state.currSubject)
						absences.push({date: e[0], id_schedule: x[0], id_subject: x[1].id_subject})
				})
				return absences;
			})
			this.setState({absences: [].concat.apply([], arr)});
		})
	}
	
	_filterComponent() {
		firebase.ref('absences').once('value', snapshot => {
			let data = snapshot.val() || {};
			let arr = Object.entries(data);
			if (this.state.currMonth)
				arr = arr.filter(e => parseInt(e[0].split('-')[1]) === this.state.currMonth);
			arr = arr.map(e => {
				let absences = [];
				Object.entries(e[1]).forEach(x => {
					if (this.state.currSubject && x[1].id_subject === this.state.currSubject)
						absences.push({date: e[0], id_schedule: x[0], id_subject: x[1].id_subject})
					else if (!this.state.currSubject)
						absences.push({date: e[0], id_schedule: x[0], id_subject: x[1].id_subject})
				})
				return absences;
			})
			this.setState({absences: [].concat.apply([], arr)});
		})
	}
	
	componentDidMount() {
		i18n.addListener(this._updateComponent.bind(this));
		config.addConfigListener(this._updateComponent.bind(this));
		this._updateComponent();
		this.setState({tempMonth: this.state.currMonth, tempSubject: this.state.tempSubject});
	}
	
	componentWillUnmount() {
		i18n.removeListener(this._updateComponent.bind(this));
		config.removeConfigListener(this._updateComponent.bind(this));
		this.props.navigation.dangerouslyGetParent().setOptions({tabBarVisible: true});
	}
	
	render() {
		let append = 'Total'
		const month = i18n.get(`commons.calendarLocales.monthNames.${this.state.currMonth - 1}`)
		const subject = this.state.subjects?.find(e => e[0] === this.state.currSubject)
		if (month && subject) append = month + ', ' + subject[1].name
		else if (month) append = month
		else if (subject) append = subject[1].name
		return (
			<Fragment>
				<ListHeader label={`${i18n.get('absences.headers.0')} ${append}`}/>
				<FlatList style={{flex: 1}}
						  ref={(ref) => this.flatList = ref}
						  data={this.state.absences}
						  keyExtractor={(item, index) => `${index}`}
						  ListEmptyComponent={() =>
							  <View style={{
								  flex: 1, alignItems: 'center', justifyContent: 'center',
								  paddingVertical: 50, paddingHorizontal: 30
							  }}>
								  <Text style={{textAlign: 'center'}}>{i18n.get('absences.emptyList')}</Text>
							  </View>
						  }
						  ItemSeparatorComponent={() => <View style={{flex: 1, backgroundColor: colors.primaryDark, height: 1}}/>}
						  ListFooterComponent={() => <View style={{paddingVertical: 25}}/>}
						  renderItem={({item}) => {
							  const subject = this.state.subjects?.find(e => e[0] === item.id_subject);
							  return subject && (
								  <ListItem title={subject[1].name} subtitle={getISODate(item.date)}/>
							  ) || undefined
						  }}
				/>
				{this.state.dialogFilter &&
				<Dialog title={i18n.get('absences.filterDialog.title')}
						content={() =>
							<Fragment>
								<Picker initialValue={this.state.currMonth ? `${this.state.currMonth}` : undefined}
										data={i18n.get('commons.calendarLocales.monthNames').map((element, index) => {
											return {label: element, value: `${index + 1}`}
										})} placeholder={i18n.get('absences.filterDialog.placeholders.0')}
										onValueChange={value => this.setState({tempMonth: value})}/>
								<Picker initialValue={this.state.currSubject}
										data={this.state.subjects.map(e => {
											return {label: e[1].name, value: e[0]}
										})} placeholder={i18n.get('absences.filterDialog.placeholders.1')}
										onValueChange={value => this.setState({tempSubject: value})}/>
							</Fragment>
						}
						buttons={() =>
							<Fragment>
								<Button label={i18n.get('absences.filterDialog.actions.0')}
										onClick={() => {
											this.setState({dialogFilter: false})
										}}
								/>
								<Button label={i18n.get('absences.filterDialog.actions.1')}
										textColor={colors.primary}
										onClick={() => {
											this.setState({
												dialogFilter: false,
												currMonth: new Date().getMonth() + 1, currSubject: undefined
											}, () => this._filterComponent())
										}}
								/>
								<Button label={i18n.get('absences.filterDialog.actions.2')}
										backgroundColor={colors.primary} textColor={colors.white}
										onClick={() => {
											this.setState({
												dialogFilter: false,
												currMonth: this.state.tempMonth ? parseInt(this.state.tempMonth) : undefined,
												currSubject: this.state.tempSubject
											}, () => this._filterComponent())
										}}
								/>
							</Fragment>}
						visible={true}/>
				}
			</Fragment>
		)
	}
	
}
