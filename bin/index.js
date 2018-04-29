#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')

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

program.parse(process.argv)
