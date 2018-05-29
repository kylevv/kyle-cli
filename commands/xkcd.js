const request = require('request-promise-native')

module.exports = async (env) => {
  const currentComic = await request({url: 'https://xkcd.com/info.0.json', json: true})
  let url = currentComic.img
  let num = currentComic.num
  if (env.random) {
    num = Math.floor(Math.random() * num) + 1
    const randomComic = await request({url: `https://xkcd.com/${num}/info.0.json`, json: true})
    url = randomComic.img
  }
  const img = await request({url, encoding: null})
  return {num, url, img}
}
