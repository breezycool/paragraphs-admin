import React from 'react';

export const EditBox = () => {
	return (
  	<div>
			<textarea name="edit" id="edit" cols="30" rows="10">
			</textarea>
			<div>
				<button className="btn btn-secondary glyphicon glyphicon-trash">Save</button>
			</div>
  	</div>
  );
}