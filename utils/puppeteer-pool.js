const pagePool = require('./page-pool');
const genericPool = require('generic-pool');
/**
 * 生成一个puppeteer链接池
 * @param {Object} [options] 创建池的配置
 * @param {Object} [options.poolConfig] 链接池的配置参数
 * @param {Number} [poolConfig.max = 10] 链接池的最大容量
 * @param {Number} [poolConfig.min = 2] 链接池的最小活跃量
 * @param {Boolean} [poolConfig.testOnBorrow = true] 在将 实例 提供给用户之前，池应该验证这些实例。
 * @param {Boolean} [poolConfig.autoStart = true] 启动时候是否初始化实例
 * @param {Number} [poolConfig.idleTimeoutMillis = 60*60*1000] 实例多久不使用将会被关闭（60分钟）
 * @param {Number} [poolConfig.evictionRunIntervalMillis = 3*60*1000] 多久检查一次是否在使用实例（3分钟）
 * @param {Object} [options.puppeteerConfig] puppeteer的启动参数配置
 */
const puppeteerPool = (options = { poolConifg: {}, puppeteerConfig: {} }) => {
  const config = {
    max: 10,
    min: 2,
    maxUses: 2048,
    testOnBorrow: true,
    autoStart: true,
    idleTimeoutMillis: 60 * 60 * 1000,
    evictionRunIntervalMillis: 3 * 60 * 1000,
    ...options.poolConfig
  }

  const launchOptions = {
    ignoreHTTPSErrors: true,
    headless: true,
    pipe: true,
    args: [
      // '--disabled-3d-apis',
      // '--block-new-web-contents',
      // '--disable-databases',
      '–disable-dev-shm-usage',
      // '--disable-component-extensions-with-background-pages',
      '–-no-sandbox',
      // '--disable-setuid-sandbox',
      '–-no-zygote',
      '–-single-process',
      '--no-first-run',
      '--disable-local-storage',
      // '--disable-media-session-api',
      // '--disable-notifications',
      // '--disable-pepper-3d',
      '--disabled-gpu'
    ],
    ...options.puppeteerConfig
  }

  const factory = {
    create: async() => {
      const page = await pagePool(config, launchOptions)
      return Promise.resolve(page)
    },
    destroy: async (instance) => {
      if(instance.drain) {
        await instance.drain()
          .then(() => {
            instance.clear()
          })
      }
      instance.closeBrowser()
    },
    validate: (instance) => {
      return Promise.resolve(true)
    }
  }

  const pool = genericPool.createPool(factory, config)

  return pool
}

module.exports = puppeteerPool