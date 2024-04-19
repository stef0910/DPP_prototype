<template>
    <v-container grid-list-md>
        <v-row justify="center">
            <v-col cols=auto>
                <v-card width="700" height="200" variant="outlined">
                    <v-card-title>Enter Product ID:</v-card-title>

                    <v-card-text>
                        <v-text-field label="Product ID" prepend-icon="mdi-pencil" v-model="productID"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" :disabled="!productID" @click="getDPPInformation">Get DPP Information</v-btn>
                    </v-card-actions>
                </v-card>
                <br>
               
                <br>
                <v-card width="700" height="auto" variant="outlined">
                    <v-card-title v-if="events.length>0">Events for Product ID = {{ events[0].returnValues.productID }} </v-card-title>
                    <v-card-text>
                        <v-list>
                        <v-list-item v-for="(event, index) in events" :key="index">
                            <v-list-item-title>{{ event.event }}</v-list-item-title>
                            <v-list-item-subtitle v-if="event.returnValues.fileHash"> File Hash:     
                                <a
                                :href="`https://amethyst-elegant-ox-737.mypinata.cloud/ipfs/${event.returnValues.fileHash}`"
                                target="_blank">
                                {{ event.returnValues.fileHash }}
                                </a>
                            </v-list-item-subtitle>
                            <v-list-item-subtitle v-if="event.returnValues.oldProductID">Old Product ID: {{ event.returnValues.oldProductID }}</v-list-item-subtitle>
                            <v-list-item-subtitle v-if="event.returnValues.newProductID">New Product ID: {{ event.returnValues.newProductID }}</v-list-item-subtitle>
                            <v-list-item-subtitle v-if="event.returnValues.recycler">Recycler Address: {{ event.returnValues.recycler }}</v-list-item-subtitle>
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
            events: [],
        };
    },
    methods: {
        async getDPPInformation() {
            if (!this.productID) {
                alert("No ProductID entered");
                return;
            }
            try {
                console.log(this.productID);
                const response = await axios.post('http://localhost:3003/getInformation', {productID: this.productID});
                console.log("Events:", response.data);
                this.events = response.data.events;
            } catch (error) {
                console.error("Upload Fehler:", error);
            }
        }
    }

}
</script>