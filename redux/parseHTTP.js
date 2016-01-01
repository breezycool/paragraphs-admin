import Promise from 'bluebird'
import Parse from 'parse/node'

import {newParagraph} from './paragraphsReducer'
import {hints} from './hintsReducer'

Parse.initialize(
  "tkaxaYALkFGuXoLebRyjGU6zxTV7Yswz7Y04zWG1",
  "KVCwYVJhND1pfaE1lu8tT1Pe3MStpeqHyaevzttj"
);

let Hint = Parse.Object.extend('Hint')
let Paragraph = Parse.Object.extend('Paragraph')

export const getStateFromParse = (state) => {
  var allParagraphs = new Parse.Query(Paragraph)
  var allHints = new Parse.Query(Hint)

  allHints.find().then((serverHints) => {

    // mess with serverHints

    return [serverHints, allParagraphs.find()]
  }).spread((serverHints, serverParagraphs) => {

    // mess with hints and paragraphs
    // create state via reducers (that take in initial state)
    serverParagraphs.forEach((p) => {
      // TODO: do somethign with hintsRefactord
      newParagraph(p.objectId, p.badText, p.improvedText, hintsRefactord)
    })

    state

    return state
  }).then((success) => {
    // success
  }, (error) => {
    // error
    return "ERROR: "+error
  })

}

export const postStateToParse = (state) => {
  // return new Promise((resolve, reject) => {
  //
  //   let hints = []
  //   state.hints.forEach(h => {
  //     let hint = new Hint()
  //     hint.objectId = h.id
  //     hint.text = h.text
  //
  //     hints.push(hint)
  //   })
  //
  //   let paragraphs = []
  //   state.paragraphs.forEach(p => {
  //
  //     let paragraph = new Paragraph()
  //     paragraph.objectId = p.id
  //     paragraph.badText = p.badText
  //     paragraph.improvedText = p.improvedText
  //     paragraph.hints = hintsAsParseObjects(p.hintTags)
  //
  //   })
  //
  //   state.paragraphs.map((p) => {
  //     hintTags = p.hintTags.map(m => )
  //     return {
  //       badText: p.badText,
  //       improvedText: p.improvedText,
  //       hintTags: [
  //
  //       ]
  //     }
  //   })
  //
  //
  //   //TODO: implement Parse logic to send to server
  //
  //   resolve(state)
  // })
}
