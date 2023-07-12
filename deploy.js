const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const dotenv = require('dotenv');
const { interface, bytecode } = require('./compile');

dotenv.config();
const provider = new HDWalletProvider(
    process.env.Account,
    process.env.InfuraGoerliUrl
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Using account to deploy contract', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: ['Hi there!'],
        })
        .send({ gas: 1000000, from: accounts[0] })
        .catch(function (error) {
            console.log('Promise Rejected', error);
        });
    console.log('Contract deployed to account', result.options.address);
    provider.engine.stop();
};
deploy();
