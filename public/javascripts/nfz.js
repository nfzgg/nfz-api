import('./web3.min.js');

window.addEventListener('load', function () {
    addListeners();
  })

if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
    window.web3 = new Web3(window.ethereum);
}

const addrNFZFactory = '0x4c4af5e192db9d02c65a1486f6f34c30eafc55b0';

var accounts;
var ethereumButton;
var showAccount;
var infuseButton;

async function addListeners() {
    ethereumButton = document.getElementById('enableEthereumButton');
    showAccount = document.getElementById('showAccount');
    infuseButton = document.getElementById('infuseButton');

    ethereumButton.addEventListener('click', () => {
        getAccount();
      });

    infuseButton.addEventListener('click', () => {
        infuseCollection();
    })
}

async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    showAccount.innerHTML = account;
	return account;
}

async function infuseCollection() {
    NFTCollection = document.getElementById('NFTCollection').value;
    NFZName = document.getElementById('NFZName').value;

    const NFZFactory = await new window.web3.eth.Contract(abiNFZFactory, addrNFZFactory);
    const account = await getAccount();

    const deployed = await NFZFactory.methods.infuse(NFZName, 'NFZ', NFTCollection).send({from: account});
	console.log('NFZ deployed\n' + JSON.stringify(deployed));
    alert('NFZ deployed at ' + deployed.events[0].address);
}


abiNFZFactory = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "infusedCollection",
				"type": "address"
			}
		],
		"name": "infuse",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]