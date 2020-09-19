<template>
  <div id="show petitions">
    <v-app>
      <v-container fluid>
        <v-btn small @click="sortBy('title')">
          <span class="caption text-lowercase">By petition title</span>
        </v-btn>
        <v-btn small @click="sortByReverse('title')">
          <span class="caption text-lowercase">By petition title reverse</span>
        </v-btn>
        <v-btn small @click="sortByReverse('signatureCount')">
          <span class="caption text-lowercase">By number of signatures</span>
        </v-btn>
        <v-btn small @click="sortBy('signatureCount')">
          <span class="caption text-lowercase">By number of signatures reverse</span>
        </v-btn>

        <v-row>
          <v-col cols="6" sm="3">
            <v-select class="d-flex" v-model="categoryFilter" label="Categories" :items="addPetition.categoryNames"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="3">
            <v-text-field type="text" v-model="search" aria-placeholder="search petitions" label="Search Petition"/>
          </v-col>
        </v-row>
      </v-container>
      <div id="petitionDetail">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left"/>
                <th class="text-left">Title</th>
                <th class="text-left">Author</th>
                <th class="text-left">Signatures</th>
                <th class="text-left">Detail</th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="petition in filteredPetitions">
              <tb><v-img :src="'http://localhost:4941/api/v1/petitions/' + petition.petitionId + '/photo'" :lazy-src="'src/assets/default-petition.png'" max-width="200" max-height="200"/></tb>
              <td>{{petition.title}}</td>
              <td>{{petition.authorName}}</td>
              <td>{{petition.signatureCount}}</td>
              <td><router-link :to="{name: 'petition', params: {petitionId: petition.petitionId}}">View</router-link></td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-app>

  </div>
</template>

<script>
  export default {
    props: ['addPetition'],
    data () {
      return {
        search:'',
        categoryFilter:''
      }
    },
    methods: {
      sortBy: function(prop){
        this.addPetition.petitions.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
      },
      sortByReverse: function(prop){
        this.addPetition.petitions.sort((a,b) => a[prop] < b[prop] ? 1 : -1)
      },

    },
    computed:{
      filteredPetitions: function(){
        return this.addPetition.petitions.filter((petition) => {
          return (petition.title.match(this.search))&&(petition.category.match(this.categoryFilter));
        });
      }
    }
  }
</script>

<style>
</style>
