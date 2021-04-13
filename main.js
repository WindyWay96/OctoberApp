const func = require('./functions.js')

let tries = 3
const main = async () => {
  console.log(`You have ${tries} trie(y) left`)
  console.log('Enter company info')

  const companyInfo = {
    Name: func.getInput('Company name: '),
    Address: func.getInput('Address: '),
    Siret: func.getInput('SIRET: ')
  }

  const query = Object.values(companyInfo).filter(el => (el !== '')).join('+')
  const emptyInfo = func.findEmptyString(companyInfo)
  const url = `www.google.com/search?q=${query}`

  const phoneNumber = await func.getPhoneNumber(url)
  if (tries === 0) {
    console.log('You tried too much. Better luck next time')
    process.exit(0)
  }
  tries -= 1
  if (phoneNumber !== '') {
    console.log(`The company's phone number is: ${phoneNumber}`)
  } else if (phoneNumber === '' && emptyInfo.length > 0) {
    console.log(`Cannot find phone number, try adding more info, missing ${emptyInfo}`)
    main()
  } else {
    console.log('Cannot find phone number of this company, try again')
    main()
  }
}

main()
