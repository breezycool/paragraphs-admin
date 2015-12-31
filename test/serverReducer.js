import {expect} from 'chai'
import {server} from '../redux/serverReducer'
import {createStore} from 'redux'

import {transformStateToServer, transformStateFromServer} from '../redux/actions'

import {Parse} from 'parse/node'

describe('parse cloud api', () => {

  let liveTests = false

  let Paragraph
  beforeEach(() => {
    Parse.initialize("tkaxaYALkFGuXoLebRyjGU6zxTV7Yswz7Y04zWG1", "KVCwYVJhND1pfaE1lu8tT1Pe3MStpeqHyaevzttj");
    Paragraph = Parse.Object.extend('Paragraphs')
  })

  it('can read initial paragraphs in cloud', (done) => {
    if (!liveTests) return done()

    let query = new Parse.Query(Paragraph)
    query.find({
      success: (results) => {
         expect(results).to.exist
         done()
      },
      error: (error) => {
         throw new Error("Parse returned an error")
      }
    })
  })

  it('can add and destroy a paragraph', (done) => {
    if (!liveTests) return done()

    var newParagraph = new Paragraph()
    newParagraph.save(null, {
      success: (paragraph) => {
        paragraph.destroy({
          success: (success) => {
            done()
          },
          error: (error) => {
            throw new Error("Couldn't destroy paragraph")
          }
        })
      },
      error: (error) => {
        throw new Error("Couldn't save paragraph")
      }
    })
  })

})

describe('server reducer', () => {

  let store
  beforeEach(() => {
    store = createStore(server)
  })

  it('handles a default action with undefined state', () => {
    let action = {type: 'default'}
    store.dispatch(action)
  })

  it('handles SAVE_STATE_TO_SERVER', () => {
    let action = {type: 'default'}
    store.dispatch(action)
    let state = store.getState()
    store.dispatch(transformStateToServer())
    let newState = store.getState()
    expect(state).to.equal(newState)

  })

})
