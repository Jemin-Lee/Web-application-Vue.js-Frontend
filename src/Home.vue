<template>
  <div>
    <v-app>
      <v-container fluid>
        <h1>Petition Site</h1>
        <div v-if="userLoggedIn()===true">
          <v-btn v-on:click="logOut()">Log out</v-btn>
          <home-petitions v-bind:addPetition="addPetition"/>
          <add-petition  v-bind:addPetition="addPetition"/>
        </div>
        <div v-if="userLoggedIn()===false">
          <v-btn v-on:click="registerOrLogin = 'home-register'">Register</v-btn>
          <v-btn v-on:click="registerOrLogin = 'home-login'">Login</v-btn>
          <component v-bind:is="registerOrLogin"/>
          <home-petitions v-bind:addPetition="addPetition"/>
        </div>
      </v-container>
    </v-app>




  </div>
</template>

<script>
  import Petitions from './Petitions.vue';
  import Register from './Register.vue';
  import Login from './Login.vue';
  import AddP from './AddPetition.vue';

  export default {
    components: {
      'home-petitions': Petitions,
      'home-register': Register,
      'home-login': Login,
      'add-petition': AddP
    },
    data() {
      return {
        registerOrLogin:'',

        openCreatePetition: false,

        error: "",
        errorFlag: false,

        addPetition: {
          petitions: [],
          categories: [],
          categoryNames: []
        }

      }
    },
    mounted: function(){
      this.getPetitions();
      this.getCategories();
    },
    methods: {
      getCategories: function() {
        this.$http.get('http://localhost:4941/api/v1/petitions/categories')
          .then((response) => {
            this.addPetition.categories = response.data;
            this.getCategoryNames();
          })
      },
      getCategoryNames: function(){
        this.addPetition.categoryNames.push('');
        this.addPetition.categories.forEach((item) =>{
          this.addPetition.categoryNames.push(item.name);
        })

      },
      getPetitions: function(){
        this.$http.get('http://localhost:4941/api/v1/petitions')
          .then((response) => {
            this.addPetition.petitions = response.data;
          })
      },
      logOut: function(){
        this.$http.post('http://localhost:4941/api/v1/users/logout', {}, {
          headers: {
            'X-Authorization': this.$cookie.get('authToken')
          }
        })
          .then((response)=>{
            this.$cookie.delete('authId');
            this.$cookie.delete('authToken');
            location.reload();
          })
      },
      userLoggedIn: function(){
        return !!(this.$cookie.get('authId') && this.$cookie.get('authToken'));
      }
    }
  }
</script>

<style>

</style>
