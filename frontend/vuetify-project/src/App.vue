<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <v-list dense>
        <v-list-item 
          @click="selectedTab = 'AASUpload'"
          :active="selectedTab === 'AASUpload'" 
          active-class="deep-purple--text text--accent-4">
          <v-list-item-title>Create DPP</v-list-item-title>
        </v-list-item>
        <v-list-item 
          @click="selectedTab = 'AuthorizeOperator'"
          :active="selectedTab === 'AuthorizeOperator'" 
          active-class="deep-purple--text text--accent-4">
          <v-list-item-title>Authorize Operator</v-list-item-title>
        </v-list-item>
        <v-list-item 
          @click="selectedTab = 'UpdateDPP'" 
          :active="selectedTab === 'UpdateDPP'" 
          active-class="deep-purple--text text--accent-4">
          <v-list-item-title>Update DPP</v-list-item-title>
        </v-list-item>
        <v-list-item 
          @click="selectedTab = 'DPPInformation'" 
          :active="selectedTab === 'DPPInformation'" 
          active-class="deep-purple--text text--accent-4">
          <v-list-item-title>DPP Information</v-list-item-title>
        </v-list-item>
        <v-list-item 
          @click="selectedTab = 'RecycleDPP'" 
          :active="selectedTab === 'RecycleDPP'"
          active-class="deep-purple--text text--accent-4">
          <v-list-item-title>Recycle DPP</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <component :is="selectedTabComponent" />
    </v-main>
  </v-app>
</template>

<script setup>
import {ref, computed} from 'vue';
import AASUpload from './components/AASUpload.vue';
import AuthorizeOperator from './components/AuthorizeOperator.vue';
import UpdateDPP from './components/UpdateDPP.vue';
import DPPInformation from './components/DPPInformation.vue';
import RecycleDPP from './components/RecycleDPP.vue';

const selectedTab = ref('AASUpload');

const components = {
  AASUpload,
  AuthorizeOperator,
  UpdateDPP,
  DPPInformation,
  RecycleDPP
};

const selectedTabComponent = computed(() => components[selectedTab.value]);
</script>
