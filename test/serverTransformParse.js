import * as parse from '../redux/parseHTTP'

describe('methods to load state to and from parse', () => {

  it('loads correct state from parse', (done) => {
    parse.getStateFromParse().then((data) => {
      done()
    })
  })

})
