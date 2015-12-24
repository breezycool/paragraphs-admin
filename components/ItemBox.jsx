import React from 'react';

export const ItemBox = () => {
	return (
  	<div>
			<div>
				Paragraph text.
			</div>	
			<div>
				<button className="btn btn-primary glyphicon glyphicon-pencil">Edit</button>
				<button className="btn btn-danger glyphicon glyphicon-trash">Remove</button>
			</div>
  	</div>
  );
}