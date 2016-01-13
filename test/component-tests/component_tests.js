import React from 'react';
import {renderIntoDocument} from 'react-addons-test-utils';

import {expect} from 'chai';

import setup_fake_dom from './setup_fake_dom';

var TestUtils = require('react-addons-test-utils');
var assert = require('assert');

import {ParagraphBox} from '../../components/ParagraphBox';
import {DisplayBox} from '../../components/DisplayBox'
import {EditBox} from '../../components/EditBox'

// CommonJS syntax is used for importing rewire for compatibility
// with babel-loader.
//
// See https://github.com/jhnns/rewire-webpack/issues/12#issuecomment-95797024
// for an explanation
var rewire = require('rewire');

const TEST_PARAGRAPH = {
	id: "mockedId",
	isEditing: false,
	isPushed: false,
	isBadText: true,
	badText: 'this is badText',
	improvedText: 'this is improvedText',
	hintTags: []
};


describe('DisplayBox', () => {
  it('should display paragraph details', () => {
    const paragraph = TEST_PARAGRAPH;
    const item = renderIntoDocument(
      <DisplayBox 	badText={paragraph.badText}
					isPushed={paragraph.isPushed}
					improvedText={paragraph.improvedText}
					hintTags={paragraph.hintTags}
					isBadText={paragraph.isBadText}/>
    );
    expect(item.props.badText).to.equal("this is badText")
  });
});