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

export const getStateFromParse = () => {
  var allParagraphs = new Parse.Query(Paragraph)
  var allHints = new Parse.Query(Hint)

  return new Promise((resolve, reject) => {

    let server = {}

    allHints.find().then((serverHints) => {
      server.hints = serverHints
      return allParagraphs.find()

    }).then((serverParagraphs) => {
      server.paragraphs = serverParagraphs
      return server

    }).then((success) => {

      // transform hints
      let hints = server.hints.map(h => {
        return {
          id: h.id,
          text: h.get('text'),
          isEditing: false
        }
      })

      // transform paragraphs
      let paragraphs = server.paragraphs.map(p => {

        let hintTags = p.get('hints').map(hintId => {
          let releventHint = hints.filter(h => h.id == hintId)[0] // there should always only be one
          return releventHint.text
        })

        return {
          id: p.id,
          badText: p.get('badText'),
          improvedText: p.get('improvedText'),
          isEditing: false,
          hintTags: hintTags
        }
      })

      // transform to state
      let state = {
        hints: hints,
        paragraphs: paragraphs
      }

      resolve(state)

    }, (error) => {
      // error
      resolve( "ERROR: "+error)
    })
  })

}

export const postStateToParse = (state) => {
  return new Promise((resolve, reject) => {
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
    resolve(state)
  })
}
