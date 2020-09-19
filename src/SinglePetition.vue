<template>
  <div id="petition">
    <v-app>
      <v-container fluid>
        <h1>Petition Detail</h1>
        <v-btn :to="{name: 'home'}">Home</v-btn>
        <br>
        <br>
        <h1>{{petitionsDetail.title}}</h1>
        <v-simple-table>
          <tr><v-img :src="'http://localhost:4941/api/v1/petitions/' + petitionsDetail.petitionId + '/photo'" :lazy-src="'src/assets/default-petition.png'" max-width="400" max-height="400"/></tr>
          <br>
          <tr><strong>Description: </strong>{{petitionsDetail.description}}</tr>
          <br>
          <tr><strong>Category: </strong>{{petitionsDetail.category}}</tr>
          <br>
          <tr><strong>Author: </strong>{{petitionsDetail.authorName}}</tr>
          <tr>({{petitionsDetail.authorCity}}, {{petitionsDetail.authorCountry}})</tr>
          <br>
          <tr><strong>Created Date: </strong>{{petitionsDetail.createdDate}}</tr>
          <tr><strong>Closing Date: </strong>{{petitionsDetail.closingDate}}</tr>
        </v-simple-table>

        <br>
        <br>
        <h1>Signatures</h1>

        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left"/>
              <th class="text-left">Name</th>
              <th class="text-left">Signed Date</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="signature in petitionSignatures">

              <td><v-img :src="'http://localhost:4941/api/v1/users/' + signature.signatoryId + '/photo'" :lazy-src="'src/assets/logo.png'" max-width="100" max-height="100"/></td>
              <td>{{signature.name}}</td>
              <td>{{signature.signedDate}}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </v-app>


    <div>
      <div v-if="petitionsDetail.authorId == this.$cookie.get('authId')">
        <v-btn>Edit</v-btn>
        <v-btn @click="deletePetition()">Delete</v-btn>
      </div>
      <div v-else>
        <div v-if="petitionSigned()">
          <v-btn @click="deleteSignature()">Un-sign</v-btn>
        </div>
        <div v-else>
          <v-btn @click="postSignature()">sign</v-btn>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        petitionId: this.$route.params.petitionId,
        petitionsDetail: [],
        petitionSignatures: []
      }
    },
    mounted:
      function(){
        this.getPetition(this.petitionId);
        this.getPetitionSignatures(this.petitionId);
      },
    methods: {
      getPetition: function(id){
        this.$http.get('http://localhost:4941/api/v1/petitions/' + id)
          .then((response) => {
            this.petitionsDetail = response.data;
          })
      },
      getPetitionSignatures: function (id) {
        this.$http.get('http://localhost:4941/api/v1/petitions/' + id + '/signatures')
          .then((response) => {
            this.petitionSignatures = response.data;
          })
          .catch((error) => {
            this.error = error;
            this.errorFlag = true;
          });
      },
      deletePetition: function(){
        this.$http.delete('http://localhost:4941/api/v1/petitions/' + this.petitionId , { headers:{ 'Content-Type': 'application/json', 'X-Authorization': this.$cookie.get('authToken') }})
          .then((response)=>{
            alert('petition deleted');
            this.$router.push('/');
          })
      },
      postSignature: function(){
        this.$http.post('http://localhost:4941/api/v1/petitions/' + this.petitionId + '/signatures', {}, {headers:{ 'X-Authorization': this.$cookie.get('authToken') , 'Content-Type': 'application/json'}})
          .then((response) =>{
            alert('petition signed');
            location.reload();
          })
      },
      petitionSigned: function(){
        let result = false;
        this.petitionSignatures.forEach((item)=>{
          if(item.signatoryId == this.$cookie.get('authId')){
            result = true;
          }
        });
        return result;
      },
      deleteSignature: function(){
        this.$http.delete('http://localhost:4941/api/v1/petitions/' + this.petitionsDetail.petitionId + '/signatures', {headers:{'X-Authorization':this.$cookie.get('authToken')}})
          .then((response)=>{
            alert('Petition Unsigned');
            location.reload();
          })
      }
    }
  }
</script>

<style scoped>

</style>
