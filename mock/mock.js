const getData = () => {
  let res = []
  for(let i = 0; i < 10; i++) {
    res.push({
      id: `${i + 1}`,
      name: `pony${i + 1}`,
      title: `title${i + 1}`,
      description: `description${i + 1}`,
      keywords: [
        'key1',
        'key2',
        'key3',
        'key4'
      ]
    })
  }
  return res
}
module.exports = getData