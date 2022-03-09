'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_SERVER_URL:'"http://127.0.0.1:7777"',
  FACTORY_CONTRACT_ADDRESS:'""',
  IPFS_URL: '"https://ipfs.infura.io/ipfs/"',
  ERC721_CONTRACT_ADDRESS:'"0x5068ac0B6424fEB18C5533Af7707b6bE41b054E5"',
  MARKET_CONTRACT_ADDRESS:'"0xB452C6418964CdB00f8b0706C709e7c73FeD8EAd"'
})

