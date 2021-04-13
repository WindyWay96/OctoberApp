const superagent = require('superagent')
const readline = require('readline-sync')

const regex = /([0-9]{2} ){4}([0-9]{2})/g

/*
 * retrieve phone number of a company from a google search page,
 * @param: url - an url to the google search page
 * return: an empty string if not found, otherwise a phone number
 * e.g: 01 12 34 12 54
*/
const getPhoneNumber = url => (
  new Promise((resolve, reject) => {
    superagent
      .get(url)
      .then(response => {
        const phoneNumber = response.text.match(regex)
        if (phoneNumber === null) {
          resolve('')
        }
        resolve(phoneNumber[0])
      })
      .catch(err => {
        reject(err)
      })
  })
)

/*
  * add an input value to an array while replacing all spaces with +
  * @param: array - a list of values
  * @param: question - the question demanding an input
*/
const getInput = question => {
  const value = readline.question(question)
  if (value.length > 0) {
    return value.replaceAll(' ', '+')
  }
  return value
}

/*
 * find fields in an object that contains empty string
 * @param: object
 * return a string of fields
*/
const findEmptyString = object => Object.values(object).reduce((array, element, index) => {
  if (element === '') {
    array.push(Object.keys(object)[index])
  }
  return array
}, []).join(', ')

module.exports = {
  getPhoneNumber,
  getInput,
  findEmptyString
}
