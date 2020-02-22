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
                        v-model="SingupData.name"
                        :rules="rules.nameRules"
                        label="Name"
                        required
                    ></v-text-field>

                     <v-text-field
                        v-model="SingupData.email"
                        :rules="rules.emailRules"
                        label="E-mail"
                        required
                    ></v-text-field>
                
                    <v-text-field
                        v-model="SingupData.password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="rules.passwordRules"
                        :type="show1 ? 'text' : 'password'"
                        label="Password"
                        @click:append="show1 = !show1"
                    ></v-text-field>
                
                    <v-btn :disabled="!valid" color="warning" class="mr-4"
                    type="sumbit" :loading="busy" >
                        Singup
                    </v-btn>
                    <v-btn color="error" class="mr-4" @click="reset">clear</v-btn>
                    
                   
                  
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
            SingupData:{
                name:'',
                password:'',
                email:'',
            },
            valid: true,
            show1: false,
            
              
        }
    },
    mixins:[mainAPI],
    components:{
        errorbar
    },
    
    methods: {
        onLogin () {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('singupUser',this.SingupData) 
            }
        },
       reset(){
        this.$store.commit('clearError'),
        this.SingupData.name = '',
        this.SingupData.email = '',
        this.SingupData.password = ''

       },
      
   
  },
   

}

</script>