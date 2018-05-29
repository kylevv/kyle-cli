const qr = require('qr-image')

module.exports = async (string) => {
  return qr.imageSync(string)
}
