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

    // let state.hints.map(h => {
    //   let hint = new Hint()
    //   h.id = hint.id
    //   h.text = hint.text
    // })
    //
    // let state.paragraphs.map(p => {
    //
    //   let hintTags = p.hintTags.map(t => {
    //
    //   })
    //
    //   let paragraph = new Paragraph()
    //   paragraph.id = p.id
    //   paragraph.badText = p.badText
    //   paragraph.improvedText = p.improvedText
    //
    // })

    resolve(state)
  })
}
