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
            <v-list-item class="grow">
                

                <v-list-item-content>
                <v-btn  tile max-width="150" color="green"  @click="editeName" >Edit your Name</v-btn>
                
                <div :hidden="edite">
                 <v-text-field
                    label="New Your Name"
                 
                    v-model="newName"
                ></v-text-field>
                </div>
                </v-list-item-content>

                <v-row
                align="center"
                justify="end"
                :hidden="edite"
                >
                <v-btn class="ma-1" color="primary" dark @click="submit" :loading="busy">
                    <v-icon dark >mdi-checkbox-marked-circle</v-icon>
                </v-btn>

                <v-btn class="ma-1" color="red" dark @click="cancle">
                    <v-icon dark >mdi-cancel</v-icon>
                </v-btn>
                </v-row>
            </v-list-item>
            </v-card-actions>
        </v-card>

    </div>
</template>

<script>
import mainAPI from '@/mixins/mainAPI'
export default {
    data(){
        return{
            newName:'',
            edite:true
        }
    },
     mixins:[mainAPI],
    methods:{
        editeName(){
            this.edite = !this.edite
        },
        cancle(){
            this.newName = ''
            this.edite = !this.edite
        },
        submit(){
            return this.$store.dispatch('updateProfile',this.newName)
        },
        jobsDone(){
           this.removeErrors()
           this.$router.replace("/")
      }

    },
    computed:{
      userProfile () {
      return this.$store.getters.user
      }
    }
    
    
}
</script>