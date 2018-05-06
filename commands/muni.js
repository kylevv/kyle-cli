const request = require('request-promise-native')

Array.prototype.unzipAll = function () {
  return this.reduce((result, el) => {
    return result.concat(Array.isArray(el) ? el.unzipAll() : el)
  }, [])
}

Array.prototype.ensureArray = function () {
  return this
}

Object.prototype.ensureArray = function () {
  return [this]
}

module.exports = async (env) => {
  const url = 'http://webservices.nextbus.com/service/publicJSONFeed?command=predictions&a=sf-muni&stopId=15417'
  const results = await request({url: url, json: true})
  const departures = results.predictions
    .ensureArray()
    .filter((line) => !!line.direction)
    .map((line) => {
      return line.direction
        .ensureArray()
        .map((direction) => {
          return direction.prediction
            .ensureArray()
            .map((train) => {
              return {
                line: line.routeTag,
                time: train.minutes
              }
            })
        })
    })
    .unzipAll()
    .sort((a, b) => +a.time - +b.time)
    .slice(0, 10)

  console.log('departures:,', departures)
}
