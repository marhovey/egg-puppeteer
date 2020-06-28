const puppeteer = require('puppeteer');
const genPool = require('./gen-pool');

const pagePool = async (config, options) => {

  const browser = await puppeteer.launch(options)

  const factory = {
    create: () => {
      return browser.newPage()
        .then(instance => {
          instance.useCont = 0;
          return instance
        })
    },
    destroy: (instance) => {
      instance.close()
    },
    validate: (instance) => {
      return Promise.resolve(instance)
              .then(valid => {
                Promise.resolve(valid && (config.maxUses <= 0 || instance.useCont < config.maxUses))
              })
    }
  }

  const pool = genPool(factory, config)
  pool.closeBrowser = () => {
    return browser.close()
  }
  return pool
}

module.exports = pagePool