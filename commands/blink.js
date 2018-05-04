const fs = require('fs-extra')
const path = require('path')

module.exports = async (program, kit, env) => {
  const srcPath = env.src
  const destPath = env.dest
  if (/projects\/blink/.test(destPath)) return Promise.rejet(new Error('Wrong Dest Director!'))
  if (env.backup) {
    const prefix = typeof env.backup === 'string' ? env.backup : 'x'
    const files = await fs.readdir(destPath)
    const renamePromises = files
      .filter((file) => file === 'blink.js' || file === `blink-${kit}.js`)
      .map((file) => fs.rename(path.join(destPath, file), path.join(destPath, `${prefix}${file}`)))
    await Promise.all(renamePromises)
  }
  return fs.copy(srcPath, destPath, {
    filter: (src) => {
      src = src.replace(srcPath, '')
      return !src || src === '/blink.js' || src === `/blink-${kit}.js`
    }
  })
}
