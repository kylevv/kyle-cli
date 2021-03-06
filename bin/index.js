#!/usr/bin/env node

const program = require('commander')
const os = require('os')
const path = require('path')
const termImg = require('term-img')
const pkg = require('../package.json')
const xkcd = require('../commands/xkcd')
const blink = require('../commands/blink')
const muni = require('../commands/muni')
const qr = require('../commands/qr')

program.cwd = process.cwd()

program
  .version(pkg.version)

program
  .command('greet')
  .description('say hello')
  .action(function () {
    console.log('Hello Kyle!')
  })

program
  .command('is <adj>')
  .description('describe Kyle')
  .action(function (adj) {
    console.log(`Agreed, he is ${adj}`)
  })

program
  .command('encode <string>')
  .description('URI encode the input')
  .action(function (string) {
    console.log(encodeURIComponent(string))
  })

program
  .command('decode <string>')
  .description('URI decode teh input')
  .action(function (string) {
    console.log(decodeURIComponent(string))
  })

program
  .command('xkcd')
  .option('-r, --random', 'Random comic')
  .description('View an XKCD comic')
  .action(function (env) {
    xkcd(env)
      .then((comic) => {
        console.log('NUMBER:', comic.num)
        console.log('IMG:', comic.url)
        termImg(comic.img, () => {
          console.log('Unsupported terminal (use iTerm >= 3)')
        })
      })
      .catch((err) => {
        console.log('ERR:', err)
      })
  })

program
  .command('blink <kit>')
  .description('move blink dev files to creative dir')
  .option('-b, --backup [prefix]', 'Rename original files at the destination')
  .option('--src <src>', 'Specify a source directory', (src) => src.replace(/^~/, os.homedir()))
  .option('--dest <dest>', 'Specify a destination directory', (dest) => dest.replace(/^~/, os.homedir()))
  .action(function (kit, env) {
    if (!env.src) env.src = path.join(os.homedir(), 'projects/blink/dist')
    if (!env.dest) env.dest = path.join(program.cwd, 'src')
    blink(program, kit, env)
      .catch((err) => {
        console.log('ERR:', err)
      })
  })

program
  .command('muni')
  .description('inbound train predictions')
  .action(function (env) {
    muni(env)
      .catch((err) => {
        console.log('ERR:', err)
      })
  })

program
  .command('qr <string>')
  .description('generate qr code')
  .action(function (string) {
    qr(string)
      .then((img) => {
        termImg(img, () => {
          console.log('Unsupported terminal (use iTerm >= 3)')
        })
      })
      .catch((err) => {
        console.log('ERR:', err)
      })
  })

program.parse(process.argv)
