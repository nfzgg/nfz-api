window.addEventListener('load', function () {
    addListeners();
  })

if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
}

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
}

async function infuseCollection() {
    console.log('Infuse');
}