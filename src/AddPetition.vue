<template>
  <div id="add-petition">
    <v-container fluid>
      <v-app>
        <v-dialog v-model="dialog" width="900">
          <template v-slot:activator="{ on }">
            <v-btn color="red lighten-2" dark v-on="on">new petition</v-btn>
          </template>
          <vue-js-modal name="add-Petition">
            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>Add a new Petition Post</v-card-title>
              <v-label>Petition Title:</v-label>
              <v-text-field type="text" v-model="petitionTitle"required/>

              <v-label>Petition Description:</v-label>
              <v-textarea v-model="petitionDescription"/>

              <v-label>Start Date:</v-label>
              <v-input>{{this.today}}</v-input>

              <v-label>Finish Date:</v-label>
              <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="finishDate" offset-y min-width="290px">
                <template v-slot:activator="{on}">
                  <v-text-field v-model="finishDate" label="Finish Date" readonly v-on="on"/>
                </template>
                <v-date-picker v-model="finishDate" no-title>
                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(finishDate)">OK</v-btn>
                </v-date-picker>
              </v-menu>

              <v-label>Choose Category</v-label>
              <v-select v-model="pickedCategory" label="Categories" :items="addPetition.categoryNames.slice(1,7)"/>
              <v-btn color="primary" v-on:click="postPetition()" @click="dialog = false">Add</v-btn>
            </v-card>
          </vue-js-modal>
        </v-dialog>
      </v-app>
    </v-container>

  </div>
</template>

<script>
  export default {
    props: ['addPetition'],

    data() {
      return {
        petitionTitle:'',
        petitionDescription:'',
        today: new Date().toISOString().substr(0, 10),
        finishDate:new Date().toISOString().substr(0, 10),
        categoryNames:[],
        pickedCategory:'',
        categoryId:'',
        menu:'',
        dialog: false
      }
    },
    methods: {
      postPetition: function(){
        this.addPetition.categories.forEach((item) =>{
          if(item.name === this.pickedCategory){
            this.categoryId = item.categoryId;
          }
        });

        var newPetition={
          "title": this.petitionTitle,
          "description": this.petitionDescription,
          "authorId": this.$cookie.get("authId"),
          "categoryId": this.categoryId,
          "createdDate": this.today,
          "closingDate":this.finishDate,

        };

        this.$http.post('http://localhost:4941/api/v1/petitions', newPetition, { headers:{ 'Content-Type': 'application/json', 'X-Authorization': this.$cookie.get('authToken') }})
          .then((response) => {
            this.$http.post('http://localhost:4941/api/v1/petitions/' + response.data.petitionId + '/signatures', {}, {headers:{ 'Content-Type': 'application/json', 'X-Authorization': this.$cookie.get('authToken')}})
            .then((response)=>{
              alert('New petition added');
              location.reload();
            })

          })
      }
    }
  }
</script>

<style scoped>

</style>
