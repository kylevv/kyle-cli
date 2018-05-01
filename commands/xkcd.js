const request = require('request-promise-native')
const termImg = require('term-img')

module.exports = async (env) => {
  const currentComic = await request({url: 'https://xkcd.com/info.0.json', json: true})
  let url = currentComic.img
  let num = currentComic.num
  if (env.random) {
    num = Math.floor(Math.random() * num) + 1
    const randomComic = await request({url: `https://xkcd.com/${num}/info.0.json`, json: true})
    url = randomComic.img
  }
  console.log('NUMBER:', num)
  console.log('IMG:', url)
  const image = await request({url, encoding: null})
  termImg(image)
}
