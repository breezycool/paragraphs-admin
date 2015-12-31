import {expect} from 'chai'

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
