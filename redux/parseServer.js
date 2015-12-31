import Promise from 'bluebird'
import Parse from 'parse/node'

Parse.initialize(
  "tkaxaYALkFGuXoLebRyjGU6zxTV7Yswz7Y04zWG1",
  "KVCwYVJhND1pfaE1lu8tT1Pe3MStpeqHyaevzttj"
);

export const transformStateToServer = (state) => {

  return new Promise((resolve, reject) => {

    //TODO: implement Parse logic to send to server

    resolve(state)
  })
}

export const transformStateFromServer = (state) => {

    return new Promise((resolve, reject) => {

      //TODO: implement Parse logic to send to server

      resolve(state)
    })
}
