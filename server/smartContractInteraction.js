require('dotenv').config( {path: '../.env'} );
const Web3 = require('web3');
const contractABI = require('./../blockchain/build/contracts/DPP.json');

// Verbinden mit RPC-Server
const web3 = new Web3('http://localhost:7545');

// Smart Contract Instanz erstellen
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractInstance = new web3.eth.Contract(contractABI.abi, contractAddress);

// Adresse Benutzer, der Transaktion sendet (Ganache Testuser)
const manufacturerAddress = process.env.MANUFACTURER;
const mechanicAddress = process.env.MECHANIC;
const recyclerAddress = process.env.RECYCLER;

async function createDPP(productID, fileHashAAS){
    try {
        const receipt = await contractInstance.methods.createDPP(productID, fileHashAAS)
            .send({ from: manufacturerAddress })
        return receipt;
    } catch (error) {
        console.error('Fehler bei createDPP:', error);
    }
}

async function authorizeOperator(operatorAddress){
    try {
        const receipt = await contractInstance.methods.authorizeOperator(operatorAddress)
            .send({ from: manufacturerAddress })
        return receipt;
    } catch (error) {
        console.error('Fehler bei authorizeOperator:', error);
    }
}

async function updateDPP(productID, fileHashAAS){
   try {
        const receipt = await contractInstance.methods.updateDPP(productID, fileHashAAS)
            .send({ from: mechanicAddress })
        return receipt;
    } catch (error) {
        console.error('Fehler bei updateDPP:', error);
    }
}

async function getEvents(productID) {
    const events = await contractInstance.getPastEvents( 'allEvents', {
        fromBlock: 0,
        toBlock: 'latest',
        filter: { productID: productID }
    });
    return events;
}

async function integrateDPP(oldProductID, productID, IpfsHash){
    try {
        const receipt = await contractInstance.methods.integrateDPP(oldProductID, productID, IpfsHash)
            .send({ from: manufacturerAddress })
        return receipt;
    } catch (error) {
        console.error('Fehler bei integrateDPP:', error);
    }
}

async function recycleDPP(productID){
    try {
        const receipt = await contractInstance.methods.recycleDPP(productID)
            .send({ from: recyclerAddress })
        return receipt;
    } catch (error) {
        console.error('Fehler bei recycleDPP:', error);
    }
}


module.exports = {
    createDPP,
    authorizeOperator,
    updateDPP,
    getEvents,
    integrateDPP,
    recycleDPP
}