import React from 'react';
import TokenInput from './TokenInput/index';
import {uniq, without} from 'lodash-node';
import ComboboxOption from './TokenInput/lib/option';

let namez = [
  "Yolanda",
  "Ysabel",
  "Yulissa"
  ].map(function(name) {
  return {
    id: name,
    name: name
  }
});

const TagSelect = React.createClass({

	getInitialState() {
		let names = [
		 //this.props.hintTags
		  ].map(function(name) {
		  return {
			id: name,
			name: name
		  }
		});
		  console.log(this.props.hintTags.toString());
		return {
			selected: [], //this.props.hintTags
			options: []//this.props.hints.text
		};
	},

	handleChange(value) {
		this.setState({
			selected: value
		})
	},

	handleRemove(value) {
		let selectedOptions = uniq(without(this.state.selected,value))
		this.handleChange(selectedOptions)
	},

	handleSelect(value, combobox) {
		if(typeof value === 'string') {
			value = {id: value, name: value};
		}

		let selected = uniq(this.state.selected.concat([value]))
		this.setState({
			selected: selected,
			selectedToken: null
		})

		this.handleChange(selected)
	},

	handleInput(userInput) {
		// this.setState({selectedStateId: null});
		this.filterTags(userInput);
	},

	filterTags(userInput) {

		if (userInput === '')
			return this.setState({options: []});
		var filter = new RegExp('^'+userInput, 'i');
		this.setState({options: this.state.options.filter(function(state) {
			return filter.test(state.name) || filter.test(state.id);
		})});
	},

	renderComboboxOptions() {
		return this.state.options.map(function(name) {
			return (
				<ComboboxOption
					key={name.id}
					value={name}
				>{name.name}</ComboboxOption>
			);
		});
	},

	render() {
		let selectedFlavors = this.state.selected.map(function(tag) {
			return <li key={tag.id}>{tag.name}</li>
		})

		let options = this.state.options.length ?
			this.renderComboboxOptions() : [];

		return (
			<div>
				<TokenInput
					onChange={this.handleChange}
					onInput={this.handleInput}
					onSelect={this.handleSelect}
					onRemove={this.handleRemove}
					selected={this.state.selected}
					menuContent={options}
				/>
			</div>
		);
	}
})

export default TagSelect
