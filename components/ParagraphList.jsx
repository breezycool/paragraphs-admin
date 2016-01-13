import React from 'react';

import {DropParagraphBox} from './ParagraphBox'

export const ParagraphList = React.createClass({
	render() {
		return (
			<div className="col-md-6 text-center">
				<h3> Paragraphs </h3>
				{Object.keys(this.props.paragraphs).map((index) => {
					return <DropParagraphBox
						key={index}
						index={index}
						paragraph={this.props.paragraphs[index]}
						actions={this.props.actions}

					/>
				})}
				<button
					className="btn btn-sm btn-info glyphicon glyphicon-plus"
					onClick={()=>{
						this.props.actions.addParagraph(this.props.paragraphs.length, 'write your bad text here', 'write your improved text here', [])
					}}
				 > </button>
				 <hr />
			</div>
		)
	}
})
