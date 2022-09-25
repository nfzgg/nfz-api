const fs = require('fs');

const express = require('express');
const router = express.Router();
const Web3 = require("web3");

const web3 = new Web3('https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');

const jsonERC721 = fs.readFileSync('./abis/ERC721.json');
const jsonNFZUpgradeable = fs.readFileSync('./abis/NFZUpgradeable.json');
const jsonNFZFactory = fs.readFileSync('./abis/NFZFactory.json');

const abiERC721 = JSON.parse(jsonERC721);
const abiNFZUpgradeable = JSON.parse(jsonNFZUpgradeable);
const abiNFZFactory = JSON.parse(jsonNFZFactory);

// Contract addresses on Goerli
const addrERC721 = '0xd236d7a671ff0b62e92d7be3f722994c4349c14c';
const addrNFZUpgradeable = '0xa7e5a8bda8f76dc15545b8c34c637a5fcfcb5655';
const addrNFZFactory = '0xba13fe3f1906c312c6b073de0dfbe3f10431de91';

const NFZUpgradeable = new web3.eth.Contract(abiNFZUpgradeable, addrNFZUpgradeable);
const NFZFactory = new web3.eth.Contract(abiNFZFactory, addrNFZFactory);

router.get('/', function(res, res, next) {
  res.send('API service up');
})

router.get('/collection/:addr', function(req, res, next) {
  getCollectionMetadata(req.params.addr).then((metadata) => {res.send(metadata)});
})

async function getCollectionMetadata(addr) {
  const ERC721 = new web3.eth.Contract(abiERC721, addr);
  var metadata = {}
  metadata.name = await ERC721.methods.name().call();
  metadata.symbol = await ERC721.methods.symbol().call();
  console.log(metadata);
  return metadata;
}

module.exports = router;
