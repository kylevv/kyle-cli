const request = require('request-promise-native')

Array.prototype.flatten = function () { // eslint-disable-line
  return this.reduce((result, el) => {
    return result.concat(Array.isArray(el) ? el.flatten() : el)
  }, [])
}

const ensureArray = (value) => {
  return Array.isArray(value) ? value : [value]
}

module.exports = async (env) => {
  const url = 'http://webservices.nextbus.com/service/publicJSONFeed?command=predictions&a=sf-muni&stopId=15417'
  const results = await request({url: url, json: true})
  const departures = ensureArray(results.predictions)
    .filter((line) => !!line.direction)
    .map((line) => {
      return ensureArray(line.direction)
        .map((direction) => {
          return ensureArray(direction.prediction)
            .map((train) => {
              return {
                line: line.routeTag,
                time: train.minutes
              }
            })
        })
    })
    .flatten()
    .sort((a, b) => +a.time - +b.time)
    .slice(0, 10)

  console.log(departures)
}
