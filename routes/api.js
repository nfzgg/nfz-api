const fs = require('fs');

const express = require('express');
const router = express.Router();
const Web3 = require("web3");

const infuraKey = process.env.INFURA_KEY || '9aa3d95b3bc440fa88ea12eaa4456161';
const web3 = new Web3('https://goerli.infura.io/v3/' + infuraKey);

const jsonERC721 = fs.readFileSync('./abis/ERC721.json');
const jsonNFZUpgradeable = fs.readFileSync('./abis/NFZUpgradeable.json');
const jsonNFZFactory = fs.readFileSync('./abis/NFZFactory.json');

const abiNFZFactory = JSON.parse(jsonNFZFactory);
const abiERC721 = JSON.parse(jsonERC721);
const abiNFZUpgradeable = JSON.parse(jsonNFZUpgradeable);

// Contract addresses on Goerli
const addrNFZFactory = '0x4c4af5e192db9d02c65a1486f6f34c30eafc55b0';
// NFT collection '0xB706416c431f6d5B878aF563A1D822d39118612b';
// NFZ instance 0x46D286f71A9e0DA3f97BDA5c475C79Ea680Dbd16


const NFZFactory = new web3.eth.Contract(abiNFZFactory, addrNFZFactory);

router.get('/', function(res, res, next) {
  res.send('API service up');
})

router.get('/collection/:addr', function(req, res, next) {
  getCollectionMetadata(req.params.addr).then((metadata) => {res.send(metadata)});
})

async function getCollectionMetadata(addr) {
  var metadata = {};
  try {
    const ERC721 = new web3.eth.Contract(abiERC721, addr);
    metadata.name = await ERC721.methods.name().call();
    metadata.symbol = await ERC721.methods.symbol().call();
  } catch (e) {
    metadata.err = e.message;
  } finally {
    return metadata;
  }
}

router.get('/nfz/:addr', function(req, res, next) {
  getNFZMetadata(req.params.addr).then((metadata => {res.send(metadata)}));
})

async function getNFZMetadata(addr) {
  var metadata = {};
  try {
    const NFZ = new web3.eth.Contract(abiNFZUpgradeable, addr);
    metadata.name = await NFZ.methods.name().call();
    metadata.symbol = await NFZ.methods.symbol().call();
    metadata.infusedCollection = await NFZ.methods.infusedCollection().call();
  } catch (e) {
    metadata.err = e.message;
  } finally {
    return metadata;
  }
}

module.exports = router;
