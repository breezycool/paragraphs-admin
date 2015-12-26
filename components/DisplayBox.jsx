import React from 'react';
import FilteredMultiSelect from 'react-filtered-multiselect';

let CULTURE_SHIPS = [
  {id: 1, name: '5*Gelish-Oplule'},
  {id: 2, name: '7*Uagren'},
// ...
  {id: 249, name: 'Zero Gravitas'},
  {id: 250, name: 'Zoologist'}
]

const MySelect = React.createClass({

  getInitialState() {
    return {selectedShips: []}
  },

  handleDeselect(index) {
    let selectedShips = this.state.selectedShips.slice()
    selectedShips.splice(index, 1)
    this.setState({selectedShips})
  },
  handleSelectionChange(selectedShips) {
    this.setState({selectedShips})
  },
  render() {
    let {selectedShips} = this.state
    return <div style={{width: '20%'}}>
      <br/>
      <FilteredMultiSelect
        onChange={this.handleSelectionChange}
        options={CULTURE_SHIPS}
        selectedOptions={selectedShips}
        textProp="name"
        valueProp="id"
        classNames={
			   { button: 'btn btn-sm btn-block btn-warning glyphicon glyphicon-plus',
			   	 buttonActive: 'FilteredMultiSelect__button--active',
			   	 filter: 'form-control',
			   	 select: 'form-control'}
			  }
		size='3'
		buttonText=" Add Hint"
		/>
      {selectedShips.length === 0 && <p>(Select a hint for this paragraph.)</p>}
      {selectedShips.length > 0 && <ul>
        {selectedShips.map((ship, i) => <li key={ship.id}>
          {`${ship.name} `}
          <button type="button" onClick={this.handleDeselect.bind(null, i)}>
            &times;
          </button>
        </li>)}
      </ul>}
    </div>
  }
})

<<<<<<< HEAD
export const DisplayBox = React.createClass({

=======
const DisplayBox = React.createClass({
	getDefaultProps() {
		return {
			backgroundColor: "#FFF",
			height: "100%",
			width: "45%",
			margin: "8px"
		}
	},
>>>>>>> refs/remotes/origin/master
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
					<MySelect/>
				</div>	
			</div>
		);
	}
})

export default DisplayBox
