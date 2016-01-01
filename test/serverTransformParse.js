import * as parse from '../redux/parseHTTP'

describe('methods to load state to and from parse', () => {

  it('loads state from parse', () => {
    parse.getStateFromParse().then((data) => {
      console.log(data)
    })
  })

})
