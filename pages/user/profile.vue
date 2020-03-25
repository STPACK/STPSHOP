<template>
    <div>

         <v-card
            class="mx-auto"
            color="#4b4c52"
            dark
            max-width="550"
        >
            <v-card-title>
                <span class="title font-weight-light">Your Profile </span>
            </v-card-title>

            <v-card-text >
                <h2>Name  : {{userProfile.name}}</h2>
                <h2>Email : {{userProfile.email}}</h2>
            </v-card-text>

            <v-card-actions>
                
            
                

               
                <v-btn  tile  color="green"  @click="editePassword" >change Password</v-btn>
                <v-btn  tile  color="green"  @click="editeName" >Edit your Name</v-btn>
               
              
                
                
            </v-card-actions>
             <v-expand-transition>
                <div v-show="!edite" class="px-3">
                    <v-divider></v-divider>
                       
                 <v-text-field
                    label="New  Name"
                  
                    v-model="newName"
                ></v-text-field>
               
                

               
                <v-btn class="ma-1" color="primary" dark @click="submitNAme" :loading="busy">
                    <v-icon dark >mdi-checkbox-marked-circle</v-icon>
                </v-btn>

                <v-btn class="ma-1" color="red" dark @click="cancle">
                    <v-icon dark >mdi-cancel</v-icon>
                </v-btn>
                
                    
                    
                </div>
            </v-expand-transition>
             <v-expand-transition>
                <div v-show="!edite1" class="px-3">
                    <v-divider></v-divider>
                  <form>     
                 <v-text-field
                   
                    type="password"
                    label="New Password"
                     hint="At least 6 characters"
                    
                    
                   
                    required
                    
                    v-model="newPassword"
                ></v-text-field>
                 
               
                

               
                <v-btn class="ma-1" color="primary" dark @click="changePassword" :loading="busy">
                    <v-icon dark >mdi-checkbox-marked-circle</v-icon>
                </v-btn>

                <v-btn class="ma-1" color="red" dark @click="cancle">
                    <v-icon dark >mdi-cancel</v-icon>
                </v-btn>
                 </form>
                    
                    
                </div>
            </v-expand-transition>
        </v-card>

    </div>
</template>

<script>
import mainAPI from '@/mixins/mainAPI'
export default {
    data(){
        return{
            newName:'',
            newPassword:'',
           
            edite:true,
            edite1:true,
            passwordRules:[
                    v => !!v || 'password is required',
                    v => v.length >= 6 || 'password must be more than 6 characters',
                    
                    
            ]
        }
    },
     mixins:[mainAPI],
    methods:{
        editeName(){
            this.edite = !this.edite
            if(!this.edite1){
                this.edite1=!this.edite1
            }
             
        },
        editePassword(){
            this.edite1 = !this.edite1
            if(!this.edite){
                this.edite=!this.edite
            }
           
        },
        cancle(){
            this.newName = ''
            this.edite = !this.edite
        },
        submitNAme(){
            return this.$store.dispatch('updateProfile',this.newName)
        },
        changePassword(){
            return this.$store.dispatch('changePwd',this.newPassword)
        },
        jobsDone(){
           this.removeErrors()
           this.$router.replace("/")
      },
      passwordConfirmationRule() {
       (this.newPassword === this.RenewPassword) || 'Password must match'
    },

    },
    computed:{
      userProfile () {
      return this.$store.getters.user
      },
      
    }
    
    
}
</script>