<template>
  <div>
    <v-container fluid>
      <v-app>
        <h2>Register</h2>
        <v-col cols="6" sm="3">
          <v-form v-on:submit.prevent="addUser()">
            <v-text-field v-model="firstName" :rules="nameRules" label="First name" required/>
            <v-text-field v-model="lastName" :rules="nameRules" label="Last name" required/>
            <v-text-field v-model="email" :rules="emailRules" label="Email" required/>
            <v-text-field v-model="password" label="Password" required/>
            <v-text-field v-model="confirmPassword" label="Confirm Password" required/>
            <v-text-field v-model="city" label="City (Optional)"/>
            <v-text-field v-model="country" label="Country (Optional)"/>
            <v-btn type="submit">Register</v-btn>
          </v-form>
        </v-col>
      </v-app>
    </v-container>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        confirmPassword: '',
        email: '',
        password: '',
        city: '',
        country: '',
        nameRules:[
          v => (v && v.length <= 64) || '64 characters limit for name'
        ],
        emailRules:[
          v => /.+@.+/.test(v) || 'invalid email'
        ]
      }
    },

    methods: {
      addUser: function() {
        if (this.password !== this.confirmPassword){
          alert("Passwords not matched" + this.password + this.confirmPassword);
        }
        else{
          var registration = {};
          registration["name"] = this.firstName + ' ' + this.lastName;
          registration["email"] = this.email;
          registration["password"] = this.password;
          if (this.city.length > 0){
            registration["city"] = this.city;
          }
          if (this.country.length > 0){
            registration["country"] = this.country;
          }
          this.$http.post('http://localhost:4941/api/v1/users/register', registration, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then((response) => {
              this.logIn();
            })
        }
      },
      logIn: function(){
        var login = {};
        login["email"] = this.email;
        login["password"] = this.password;

        this.$http.post('http://localhost:4941/api/v1/users/login', login, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then((response) =>{
            this.$cookie.set("authId", response.data.userId);
            this.$cookie.set("authToken", response.data.token);
            location.reload();
          })
      }
    }
  }
</script>
<style>

</style>
