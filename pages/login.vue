<template>
    <div>
        <v-container fluid>
            
                
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation       
                    @submit.prevent="onLogin"   
                >
                    <v-text-field
                    v-model="UserData.email"
                     :rules="rules.emailRules"
                    label="email"
                    required
                    ></v-text-field>
                
                    <v-text-field
                    v-model="UserData.password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="rules.passwordRules"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    @click:append="show1 = !show1"
                    ></v-text-field>
                
                    <v-btn :disabled="!valid" color="success" class="mr-4"
                    type="submit" :loading="busy" >
                        login
                    </v-btn>
                    <v-btn color="error" class="mr-4" @click="reset">clear</v-btn>
                    <v-btn color="warning" class="mr-4" to="/singup">SingUp</v-btn>
                  
                </v-form>
                <errorbar  :error="error" />

            
        </v-container>
    </div>
       
</template>

<script>
import errorbar from '@/components/errorbar'
import mainAPI from '@/mixins/mainAPI'
export default {
    
    data(){
        return{
            UserData:{
                email:'',
                password:'',
            },
            valid: true,
            show1: false,
                  
        }
    },
    mixins:[mainAPI],
    components:{
        errorbar
    },
    beforeCreate () {
      const loggedIn = this.$store.getters.loginStatus
      if (loggedIn) {
        this.$router.replace('/')
      }
    },
    
    methods: {
        onLogin () {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('loginUser',this.UserData)
            }
        },
        reset () {
        this.UserData.email = '',
        this.UserData.password = ''

        },
        jobsDone(){
           this.removeErrors()
           this.$router.replace("/")
      }
   
  },
   

}

</script>