<template>
  <div>
    <v-container fluid>
      <v-app>
        <h1>Login</h1>
        <v-col cols="6" sm="3">
          <v-form v-on:submit.prevent="logIn()">
            <v-text-field v-model="email" label="Email" required></v-text-field>
            <v-text-field v-model="password" label="Password" required></v-text-field>
            <v-btn type="submit">Login</v-btn>
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
          email:'',
          password:''
        }
      },
      methods: {
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
          .catch((error)=>{
            alert(error.statusMessage);
          })
        }
      }
    }
</script>

<style>

</style>
