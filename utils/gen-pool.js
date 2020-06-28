const genericPool = require('generic-pool');

const genPool = (factory, config) => {

  /**
   * 创建一个链接池
   */
  const pool = genericPool.createPool(factory, config)
  const genericAcquire = pool.acquire.bind(pool)

  /**
   * 消耗次数统计
   */
  pool.acquire = () => 
    genericAcquire()
      .then((instance) => {
        instance.useCont += 1;
        return instance
      })
  /**
   * 不管调用成功与否，都消耗一次实例
   */
  pool.use = fn => {
    let resource
    return pool.acquire()
      .then(res => {
        resource = res
        return resource
      })
      .then(fn)
      .then(
        (res) => {
          pool.release(resource)
          return res
        },
        (err) => {
          pool.release(resource)
          return err
        }
      )
  }

  return pool
}

module.exports = genPool