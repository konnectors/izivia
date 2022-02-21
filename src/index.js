const {
  BaseKonnector,
  scrape,
  saveBills,
  log,
  utils,
  errors
} = require('cozy-konnector-libs')

const Browser = require('cozy-konnector-libs/dist/libs/CozyBrowser')
const browser = new Browser()
const cheerio = require('cheerio')

const VENDOR = 'template'
const baseUrl = 'http://books.toscrape.com'

module.exports = new BaseKonnector(start)

async function start(fields, cozyParameters) {
  log('info', 'Authenticating ...')
  if (cozyParameters) log('debug', 'Found COZY_PARAMETERS')
  await authenticate(fields.login, fields.password)
  log('info', 'Successfully logged in')

  // log('info', 'Fetching the list of documents')
  // await browser.visit(`${baseUrl}/index.html`)

  // const $ = cheerio.load(browser.html())
  // log('info', 'Parsing list of documents')
  // const documents = await parseDocuments($)

  // log('info', 'Saving data to Cozy')
  // await saveBills(documents, fields, {
  //   identifiers: ['Izivia'],
  //   sourceAccount: this.accountId,
  //   sourceAccountIdentifier: fields.login
  // })
}

async function authenticate(login, password) {
  await browser.visit('https://client.izivia.com/account/#/login')
  await browser.assert.success()
  // await browser.fill('#user', login)
  // await browser.fill('#password', password)
  // await browser.pressButton(`[type=submit]`)
  log('debug', browser.html())
  if (
    !browser.redirected ||
    browser.location._url !== 'https://client.izivia.com/account/#/'
  ) {
    log('error', browser.query('.error'))
    throw new Error(errors.LOGIN_FAILED)
  }
}

// function parseDocuments($) {
//   const docs = scrape(
//     $,
//     {
//       title: {
//         sel: 'h3 a',
//         attr: 'title'
//       },
//       amount: {
//         sel: '.price_color',
//         parse: normalizePrice
//       },
//       fileurl: {
//         sel: 'img',
//         attr: 'src',
//         parse: src => `${baseUrl}/${src}`
//       }
//     },
//     'article'
//   )
//   return docs.map(doc => ({
//     ...doc,
//     date: new Date(),
//     currency: 'EUR',
//     filename: `${utils.formatDate(new Date())}_${VENDOR}_${doc.amount.toFixed(
//       2
//     )}EUR${doc.vendorRef ? '_' + doc.vendorRef : ''}.jpg`,
//     vendor: VENDOR,
//     metadata: {
//       importDate: new Date(),
//       version: 1
//     }
//   }))
// }

// function normalizePrice(price) {
//   return parseFloat(price.replace('£', '').trim())
// }
