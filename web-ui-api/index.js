const webApi = require('./webApi')
const { Repository } = require('./repository')

const repo = new Repository('mongodb://mongo:27017', 'seneca-nodejs-poc-1');

webApi.start(repo)

console.log("Started");


