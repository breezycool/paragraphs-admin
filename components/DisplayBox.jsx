import React from 'react';
import TokenInput from '../otherlibs/reakt-tokeninput/index';
import {uniq} from 'lodash-node';
import {without} from 'lodash-node';

let CULTURE_SHIPS = [
  {id: 1, name: '5*Gelish-Oplule'},
  {id: 2, name: '7*Uagren'},
// ...
  {id: 249, name: 'Zero Gravitas'},
  {id: 250, name: 'Zoologist'}
]

// const MySelect = React.createClass({

//   getInitialState() {
//     return {selectedShips: []}
//   },

//   handleDeselect(index) {
//     let selectedShips = this.state.selectedShips.slice()
//     selectedShips.splice(index, 1)
//     this.setState({selectedShips})
//   },
//   handleSelectionChange(selectedShips) {
//     this.setState({selectedShips})
//   },
//   render() {
//     let {selectedShips} = this.state
//     return <div style={{width: '20%'}}>
//       <br/>
//       <FilteredMultiSelect
//         onChange={this.handleSelectionChange}
//         options={CULTURE_SHIPS}
//         selectedOptions={selectedShips}
//         textProp="name"
//         valueProp="id"
//         classNames={
// 			   { button: 'btn btn-sm btn-block btn-warning glyphicon glyphicon-plus',
// 			   	 buttonActive: 'FilteredMultiSelect__button--active',
// 			   	 filter: 'form-control',
// 			   	 select: 'form-control'}
// 			  }
// 		size='3'
// 		buttonText=" Add Hint"
// 		/>
//       {selectedShips.length === 0 && <p>(Select a hint for this paragraph.)</p>}
//       {selectedShips.length > 0 && <ul>
//         {selectedShips.map((ship, i) => <li key={ship.id}>
//           {`${ship.name} `}
//           <button type="button" onClick={this.handleDeselect.bind(null, i)}>
//             &times;
//           </button>
//         </li>)}
//       </ul>}
//     </div>
//   }
// })

var DanSelect = React.createClass({
  getInitialState: function() {
    return {
      selected: [],
      options: {}
    };
  },

  handleChange: function(value) {
    this.setState({
      selected: value
    })
  },

  handleRemove: function(value) {
    var selectedOptions = uniq(without(this.state.selected,value))
    this.handleChange(selectedOptions)
  },

  handleSelect: function(value, combobox) {
    if(typeof value === 'string') {
      value = {id: value, name: value};
    }

    var selected = uniq(this.state.selected.concat([value]))
    this.setState({
      selected: selected,
      selectedToken: null
    })

    this.handleChange(selected)
  },

  handleInput: function(userInput) {
    // this.setState({selectedStateId: null});
    this.filterTags(userInput);
  },

  filterTags: function(userInput) {
    if (userInput === '')
      return this.setState({options: []});
    var filter = new RegExp('^'+userInput, 'i');
    this.setState({options: names.filter(function(state) {
      return filter.test(state.name) || filter.test(state.id);
    })});
  },

    renderComboboxOptions: function() {
    return this.state.options.map(function(name) {
      return (
        <ComboboxOption
          key={name.id}
          value={name}
        >{name.name}</ComboboxOption>
      );
    });
  },

  render: function() {
    var selectedFlavors = this.state.selected.map(function(tag) {
      return <li key={tag.id}>{tag.name}</li>
    })


    var options = this.state.options.length ?
      this.renderComboboxOptions() : [];

    return (
      <div>
        <TokenInput
            onChange={this.handleChange}
            onInput={this.handleInput}
            onSelect={this.handleSelect}
            onRemove={this.handleRemove}
            selected={this.state.selected}
			menuContent={options} 	/>

        <h2>Selected</h2>
        <ul>
          {selectedFlavors}
        </ul>
      </div>
    );
  }
})

export const DisplayBox = React.createClass({

	getDefaultProps() {
		return {
			backgroundColor: "#FFF",
			height: "100%",
			width: "45%",
			margin: "8px"
		}
	},

	render() {
		return (
			<div>
				<div>
					{this.props.text}
				</div>	
				<div>
					<button style={{margin: '0.2em'}}
						className="btn btn-primary glyphicon glyphicon-pencil"
						onClick={this.props.onClickHandler}
					> Edit</button>
					<button style={{margin: '0.2em'}} className="btn btn-danger glyphicon glyphicon-trash"
						onClick={this.props.onClickRemoveHandler}
					> Remove</button>
				</div>
				<div>
					<DanSelect/>
				</div>	
			</div>
		);
	}
})

export default DisplayBox
