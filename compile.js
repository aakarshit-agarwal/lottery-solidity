const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const sourceCode = fs.readFileSync(inboxPath, 'utf8');

// var input = {
//     language: 'Solidity',
//     sources: {
//         'Inbox.sol': {
//             content: sourceCode,
//         },
//     },
//     settings: {
//         outputSelection: {
//             '*': {
//                 '*': ['*'],
//             },
//         },
//     },
// };
// console.log(JSON.parse(solc.compile(JSON.stringify(input))));
module.exports = solc.compile(sourceCode, 1).contracts[':Lottery'];
