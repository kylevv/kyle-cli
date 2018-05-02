#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')
const xkcd = require('../commands/xkcd')
const blink = require('../commands/blink')

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
      .catch((err) => {
        console.log('ERR:', err)
      })
  })

program
  .command('blink <kit>')
  .description('move blink dev files to creative dir')
  .option('-b, --backup', 'Rename original files at the destination')
  .option('--src', 'Specify a source directory')
  .option('--dest', 'Specify a destination directory')
  .action(function (kit, env) {
    blink(program, kit, env)
      .catch((err) => {
        console.log('ERR:', err)
      })
  })

program.parse(process.argv)
