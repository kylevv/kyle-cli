const fs = require('fs-extra')
const path = require('path')

module.exports = async (program, kit, env) => {
  let srcPath = path.join(__dirname, '../fixtures/src')
  // let dest = program.cwd
  let destPath = path.join(__dirname, '../fixtures/dest')
  return fs.copy(srcPath, destPath, {
    filter: (src) => {
      src = src.replace(srcPath, '')
      return !src || src === '/blink.js' || src === `/blink-${kit}.js`
    }
  })
}
