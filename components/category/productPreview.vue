<template>
    
    <v-flex>
        <v-card  hover  >
            <v-card :href="postLink"  >
                <v-img
                :src="imageUrl"
                aspect-ratio="1"
                />
            </v-card>
            <v-card-title>
                {{productName}}
            </v-card-title>

            <v-card-subtitle>
                Bath=> {{price}}
                <v-icon right>
                    mdi-shopping-outline
                </v-icon>
            </v-card-subtitle>
            
        </v-card>             
    </v-flex>
     
</template>

<script>
export default {
    name:'productPreview',
    props:{
        id:{
            type: String,
            required:true
        },

        isAdmin:{
            type: Boolean,
            default: false
        },
        imageUrl:{
            type:String,
            required:true
        },
        productName:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        
    },
    computed:{
        postLink(){
            return this.isAdmin ? '/admin/'+this.id : '/product/'+this.id
        }
    },
    
   
    
}
</script>

