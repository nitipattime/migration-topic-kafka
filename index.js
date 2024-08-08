// index.js
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { migrateUp, migrateDown } = require('./migration');
const argv = yargs(hideBin(process.argv)).argv

yargs(hideBin(process.argv))
    .command('up', 'Run migration up', async () => {
        await migrateUp();
        test = argv.c
        console.log('text : %d', test);
    })
    .command('down', 'Run migration down', async () => {
        await migrateDown();
    })
    .help()
    .argv;
