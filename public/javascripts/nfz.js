import('./web3.min.js');

window.addEventListener('load', function () {
    addListeners();
  })

if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    window.web3 = new Web3(window.ethereum);
}

var accounts;
var ethereumButton;
var showAccount;
var infuseButton;
var transferNFZButton;

var aline;
var anca;
var marios;
var mike;

const addrAline = '0x3BB3D8e0748603C040c88357e053B73f106aAEA3';
const addrAnca = '0xbDe66C7b596fAf0d4f9501EEfc3f1348312A2995';
const addrMarios = '0x48093A68Acfc7627f369048EF58eb23209C792E4';
const addrMike = '0x1a0E80fbdb3B3f2Fc82F848c660Fb5555f703Ab0';

const addrNFZFactory = '0x4c4af5e192db9d02c65a1486f6f34c30eafc55b0';
var addrNFZ = '0x46D286f71A9e0DA3f97BDA5c475C79Ea680Dbd16';
var addrNFT = '0xB706416c431f6d5B878aF563A1D822d39118612b';

async function addListeners() {
    ethereumButton = document.getElementById('enableEthereumButton');
    showAccount = document.getElementById('showAccount');
    infuseButton = document.getElementById('infuseButton');
	updateBalancesButton = document.getElementById('updateBalancesButton');
	transferNFZButton = document.getElementById('transferNFZButton');

	aline = document.getElementById('aline');
	anca = document.getElementById('anca');
	marios = document.getElementById('marios');
	mike = document.getElementById('mike');

	selectNetwokButton = document.getElementById("selectNetworkButton");

	if (ethereumButton) {
    	ethereumButton.addEventListener('click', () => {
        	getAccount();
		});
	}

	if (infuseButton) {
		infuseButton.addEventListener('click', () => {
			infuseCollection();
		});
	}


	if (updateBalancesButton) {
		updateBalancesButton.addEventListener('click', () => {
			updateBalances();
		});
	}

	if (transferNFZButton) {
		transferNFZButton.addEventListener('click', () => {
			transferNFZ();
		});
	}


	if (selectNetwokButton) {
		selectNetwokButton.addEventListener('click', () => {
			document.getElementById("infuse-form").classList.remove("hidden");
		});
	}

}

async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    showAccount.innerHTML = account;
	return account;
}

async function infuseCollection() {
    const NFTCollection = document.getElementById('NFTCollection').value;
    const NFZName = document.getElementById('NFZName').value;

    const NFZFactory = await new window.web3.eth.Contract(abiNFZFactory, addrNFZFactory);
    const account = await getAccount();

    const deployed = await NFZFactory.methods.infuse(NFZName, 'NFZ', NFTCollection).send({from: account});
	console.log('NFZ deployed\n' + JSON.stringify(deployed));
    alert('NFZ deployed at ' + deployed.events[0].address);
	addrNFZ = deployed.events[0].address;
}

async function transferNFZ() {
	const transferFrom = document.getElementById('transferFrom').value;
	const transferTo = document.getElementById('transferTo').value;
	const tokenId = document.getElementById('tokenId').value;

	const NFZClone = await new window.web3.eth.Contract(abiNFZ, addrNFZ);
	const account = await getAccount();

	const deployed = await NFZClone.methods.safeTransferFrom(transferFrom, transferTo, tokenId).send({from: account});
	alert('NFZ token ' + tokenId + ' transferred from ' + transferFrom + ' to ' + transferTo);
}

function updateBalances() {
	balanceNFT(addrAline).then(balance => {
		aline.firstChild.innerHTML = 'NFT Balance: ' + balance;
	})
	balanceNFZ(addrAline).then(balance => {
		aline.lastChild.innerHTML = 'NFZ Balance: ' + balance;
	})
	balanceNFT(addrAnca).then(balance => {
		anca.firstChild.innerHTML = 'NFT Balance: ' + balance;
	})
	balanceNFZ(addrAnca).then(balance => {
		anca.lastChild.innerHTML = 'NFZ Balance: ' + balance;
	})
	balanceNFT(addrMarios).then(balance => {
		marios.firstChild.innerHTML = 'NFT Balance: ' + balance;
	})
	balanceNFZ(addrMarios).then(balance => {
		marios.lastChild.innerHTML = 'NFZ Balance: ' + balance;
	})
	balanceNFT(addrMike).then(balance => {
		mike.firstChild.innerHTML = 'NFT Balance: ' + balance;
	})
	balanceNFZ(addrMike).then(balance => {
		mike.lastChild.innerHTML = 'NFZ Balance: ' + balance;
	})
}

async function balanceNFZ(owner) {
	const request = await fetch('/api/nfz/' + addrNFZ + '/balance/' + owner);
	const response = await request.json();
	return response.balance;
}

async function balanceNFT(owner) {
	const request = await fetch('/api/collection/' + addrNFT + '/balance/' + owner);
	const response = await request.json();
	return response.balance;
}