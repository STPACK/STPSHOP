<template>
    
    <v-flex>
        <v-card hover flat
                width="300" height="400" 
        >
            <v-card @click="postLink()"  flat >
                <v-img
                    :src="imageUrl"
                    contain
                    height="250px"
                />
            </v-card>   
            <v-card flat  height="85px">
            <v-card-title >
                {{name}}
            </v-card-title>
            
            </v-card>
            <v-card-actions>
               
                     Bath=> {{price}}
               
              
                 <v-spacer></v-spacer>
                 <v-btn class="ma-2" tile color="green" dark  @click="addToCart(product)">
                        
                        <v-icon>mdi-cart-outline</v-icon>ADD
                        
                        </v-btn>
                
            </v-card-actions>
            <v-divider></v-divider>

        </v-card>             
    </v-flex>
     
</template>

<script>
import cart from '@/mixins/cart'

export default {
    data(){
        return{
            product:{
                name:this.name,
                idKey:this.idKey,
                imageUrl:this.imageUrl,
                price:this.price,
                productID:this.productID

            }
        }
    },
    mixins: [cart],
    props:{
        productID:{
            type: String,
            required:true
        },

        imageUrl:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        price:{
            type:String,
            required:true
        },
        idKey:{
            type:String,
            required:true
        },
        
    },
    methods:{
        postLink(){
            this.$router.push('/product/'+this.idKey)
        }
    },

    
    
    
   
    
}
</script>

<style scoped>
*{
    font-family: 'Sarabun', sans-serif;
    font-size: 15px;
}
</style>
