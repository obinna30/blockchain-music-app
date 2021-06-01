const express= require('express')
const routes = require('./routes')
const Web3 = require('web3');
const mongodb = require('mongodb').MongoClient
const contract = require('truffle-contract');
const artifacts = require('./build/Inbox.json');


// integrating our solidity smart contract with node using web3
if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
  } else {
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}
const LMS = contract(artifacts)
LMS.setProvider(web3.currentProvider)


// initializing dotenv
require('dotenv').config();

// app config
const app =express()

// middleware
app.use(express.json())

// db config
mongodb.connect(process.env.DB,{ useUnifiedTopology: true },(err,client)=>{
    const db =client.db('Cluster0')


    //home
    routes(app,db)
    app.listen(process.env.PORT || 8082, () => {
        console.log('listening on port 8082');
     })
})
 