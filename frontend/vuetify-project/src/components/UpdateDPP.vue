<template>
    <v-container grid-list-md>
        <v-row justify="center">
            <v-col cols=auto>
                <v-card width="700" height="280" variant="outlined">
                    <v-card-title>Upload AAS:</v-card-title>
                    <v-card-text>
                        <v-file-input accept=".json" label="Select JSON File" filled v-model="selectedFile"></v-file-input>
                        <v-text-field label="Enter Product ID" prepend-icon="mdi-pencil" v-model="productID"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" :disabled="!selectedFile" @click="uploadToServer">Update DPP</v-btn>
                    </v-card-actions>
                </v-card>
                <br>
                <v-card width="700" height="200" variant="outlined">
                    <v-card-title>IPFS Details</v-card-title>
                    <v-card-text>
                        <v-list>
                        <v-list-item>
                            <v-list-item-subtitle>IPFS-Hash: {{ ipfsResponse.IpfsHash }}</v-list-item-subtitle>
                            <v-list-item-subtitle>PinSize: {{ ipfsResponse.PinSize }}</v-list-item-subtitle>
                            <v-list-item-subtitle>Timestamp: {{ ipfsResponse.Timestamp }}</v-list-item-subtitle>
                        </v-list-item>
                        </v-list>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            :href="ipfsResponse.IpfsHash ? `https://amethyst-elegant-ox-737.mypinata.cloud/ipfs/${ipfsResponse.IpfsHash}` :'#!'" 
                            color="primary" 
                            target="_blank"
                            :disabled=!ipfsResponse.IpfsHash
                            >Open File on IPFS-Hash
                        </v-btn>
                    </v-card-actions>
                </v-card >
                <br>
                <v-card width="700" height="190" variant="outlined">
                    <v-card-title>Smart Contract Details</v-card-title>
                    <v-card-text>
                        <v-list>
                        <v-list-item>
                            <v-list-item-subtitle>Transaction Hash: {{ smartContractResponse.transactionHash }}</v-list-item-subtitle>
                            <v-list-item-subtitle>Block Number: {{ smartContractResponse.blockNumber }}</v-list-item-subtitle>
                            <v-list-item-subtitle>Block Hash: {{ smartContractResponse.blockHash }}</v-list-item-subtitle>
                            <v-list-item-subtitle>From: {{ smartContractResponse.from }}</v-list-item-subtitle>
                            <v-list-item-subtitle>Smart Contract Adress: {{ smartContractResponse.to }}</v-list-item-subtitle>
                            <v-list-item-subtitle>Gas Price: {{ smartContractResponse.effectiveGasPrice }}</v-list-item-subtitle>
                            <v-list-item-subtitle>Gas Used: {{ smartContractResponse.gasUsed }}</v-list-item-subtitle>
                        </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            selectedFile: null,
            productID: '',
            ipfsResponse: {},
            smartContractResponse: {},
        };
    },
    methods: {
        async uploadToServer() {
            if (!this.selectedFile || !this.productID) {
                alert("Please select a file and enter product ID.");
                return;
            }
            const formData = new FormData();
            formData.append("file", this.selectedFile[0]);
            formData.append("productID", this.productID);
            console.log(this.selectedFile[0]);
            console.log(this.productID);
            try {
                const response = await axios.post('http://localhost:3003/update', formData);
                console.log("Upload Antwort:", response.data);
                this.ipfsResponse = response.data.ipfsResponse;
                this.smartContractResponse = response.data.smartContractResponse;
            } catch (error) {
                console.error("Upload Fehler:", error);
            }
        }
    }
}
</script>