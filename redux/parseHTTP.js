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

/* loginToParse */
/* ******************************************** */
export const loginToParse = (username, password) => {
  return new Promise((resolve, reject) => {
    Parse.User.logIn(username, password).then(
      success => resolve(),
      error   => reject(error)
    )
  })
}
/* ******************************************** */

/* getStateFromParse */
/* ******************************************** */
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

        let hintTags = p.get('hints')
        if (hintTags[0] != null) {
          console.log(hintTags)
          hintTags.map(hintId => {
            let releventHint = hints.filter(h => (h.id == hintId))[0] // there should always only be one
            console.log(relevantHint)
            return releventHint.text
          })
        }
        else {
          hintTags = []
        }

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
/* ******************************************** */

/* postStateToParse */
/* ******************************************** */
export const postStateToParse = (state) => {
  return new Promise((resolve, reject) => {

    console.log(state.hints)
    let serverHints = state.hints.map(h => {
      let hint = new Hint()
      hint.set('id', h.id)
      hint.set('text', h.text)
      return hint
    })

    let serverParagraphs = state.paragraphs.map(p => {

      let paragraph = new Paragraph()
      paragraph.set('id', p.id)
      paragraph.set('badText', p.badText)
      paragraph.set('improvedText', p.improvedText)
      paragraph.set('hints', p.hintTags.map(t => t.id))
      return paragraph
    })

    console.log(serverHints)
    console.log(serverParagraphs)

    Parse.Object.saveAll(serverParagraphs).then(success => {
      return Parse.Object.saveAll(serverHints)
    }).then(
      success => resolve(state),
      error   => reject()
    )
  })
}
