// import React from 'react/addons';
// import {expect} from 'chai';

// import {store} from '../redux/store'
// import {EditBoxContainer} from '../components/EditBox';
// import {ItemBoxContainer} from '../components/ItemBox';

// /* react dom testing preprocess */
// import jsdom from 'jsdom';

// const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
// const win = doc.defaultView;

// global.document = doc;
// global.window = win;

// // from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
// Object.keys(window).forEach((key) => {
//   if (!(key in global)) {
//     global[key] = window[key];
//   }
// });
// /* ----------------------- */

// const {renderIntoDocument, Simulate}
//   = React.addons.TestUtils;

// describe('EditBox', () => {
// 	it('should render into document', () => {
// 		const component = renderIntoDocument(

// 			<EditBoxContainer store={store}/>
// 		)
// 	})
// })

// describe('ItemBox', () => {
// 	it('should render EditBox on edit button click', () => {

// 	})
// })