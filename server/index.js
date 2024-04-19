require('dotenv').config( {path: '../.env'} );
const express = require('express');
const axios = require("axios");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {createDPP, authorizeOperator, updateDPP, getEvents, integrateDPP, recycleDPP} = require ('./smartContractInteraction.js');

const FormData = require('form-data');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const productID = req.body.productID;
        const oldProductID = req.body.oldProductID;
        const integrate = req.body.integrate === "true";

        const formData = new FormData();
        formData.append('file', req.file.buffer, req.file.originalname);
        const response_ipfs = await axios.post ('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            headers: {
                ...formData.getHeaders(),
                Authorization: `Bearer ${process.env.JWT_DEV}`
            },
        });
        const IpfsHash = response_ipfs.data.IpfsHash;
        
        let smartContractResponse;
        if (integrate && oldProductID) {
            smartContractResponse = await integrateDPP(oldProductID, productID, IpfsHash);
        }else {
            smartContractResponse = await createDPP(productID, IpfsHash);
        } 
        console.log(smartContractResponse)
        res.send({ipfsResponse: response_ipfs.data, smartContractResponse: smartContractResponse });

    }catch (error) {
        console.error(error);
        res.status(500).send('Fehler beim Hochladen auf IPFS');
    }
});

app.post('/update', upload.single('file'), async (req, res) => {
    try {
        const productID = req.body.productID;
        const formData = new FormData();
        formData.append('file', req.file.buffer, req.file.originalname);
        const response_ipfs = await axios.post ('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            headers: {
                ...formData.getHeaders(),
                Authorization: `Bearer ${process.env.JWT_DEV}`
            },
        });
        const IpfsHash = response_ipfs.data.IpfsHash;
        const smartContractResponse = await updateDPP(productID, IpfsHash);
        console.log(smartContractResponse)
        res.send({ipfsResponse: response_ipfs.data, smartContractResponse: smartContractResponse });

    }catch (error) {
        console.error(error);
        res.status(500).send('Fehler beim erstellen des DPP');
    }
});


app.post('/authorizeOperator', async (req, res) => {
    try {
        const operatorAddress = req.body.operatorAddress;
        const smartContractResponse = await authorizeOperator(operatorAddress);
        res.send({smartContractResponse: smartContractResponse });

    }catch (error) {
        console.error(error);
        res.status(500).send('Fehler beim autorisieren des Operators');
    }
});

app.post('/getInformation', async (req, res) => {
    try {
        const productID = req.body.productID;
        const events = await getEvents(productID);
        res.send({events: events});

    }catch (error) {
        console.error(error);
        res.status(500).send('Fehler beim Abrufen der Events');
    }
});

app.post('/recycleDPP', async (req, res) => {
    try {
        const productID = req.body.productID;
        console.log(productID);
        const smartContractResponse = await recycleDPP(productID);
        console.log(smartContractResponse)
        res.send({smartContractResponse: smartContractResponse });

    }catch (error) {
        console.error(error);
        res.status(500).send('Fehler beim recyclen des DPP');
    }
});

app.listen(3003, ()=> {
    console.log("Running on port 3003")
})