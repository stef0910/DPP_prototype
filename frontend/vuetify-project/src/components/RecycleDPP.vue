<template>
    <v-container grid-list-md>
        <v-row justify="center">
            <v-col cols=auto>
                <v-card width="700" height="210" variant="outlined">
                    <v-card-title>Recycle DPP:</v-card-title>
                    <v-card-text>
                        <v-text-field label="Enter Product ID" prepend-icon="mdi-pencil" v-model="productID"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" :disabled="!productID" @click="recycleDPP">Recycle DPP</v-btn>
                    </v-card-actions>
                </v-card>
                <br>
                <v-card width="700" height="190" variant="outlined">
                    <v-card-title>Smart Contract Response</v-card-title>
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
            productID: '',
            smartContractResponse: {},
        };
    },
    methods: {
        async recycleDPP() {
            if (!this.productID) {
                alert("Please enter Product ID.");
                return;
            }
            try {
                console.log(this.productID);
                const response = await axios.post('http://localhost:3003/recycleDPP', {productID: this.productID});
                console.log("Upload Antwort:", response.data);
                this.smartContractResponse = response.data.smartContractResponse;
            } catch (error) {
                console.error("Upload Fehler:", error);
            }
        }
    }
}
</script>