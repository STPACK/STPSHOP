<template>
    
    <div>

        <v-container fluid>
              <v-btn to="/portal/product"  color="light-green">
                    new poductList
                </v-btn>
              <v-btn to="/admin/product"  color="light-green">
                    poductList
                </v-btn>
                <v-btn to="/admin/user-group"  color="light-green">
                    User Group
                </v-btn>
                <v-btn to="/admin/administrator"  color="light-green">
                    Administrator
                </v-btn>
                 <v-divider class="mx-2 my-4"></v-divider>
                 <h2>Edit Post</h2>
                 <v-layout>
                  
                <!-- <productList
                isAdmin
                :products="loadedPosts"
                /> -->
                <input type="number"  v-model="n">
                <button @click="testjs">TEST</button>
              
                     
                 </v-layout>
                

        </v-container>
    </div>
</template>
<script>
import productList from '@/components/category/productList'

export default {
    data(){
        return{
            n:5
        }
    },
    
    components:{
        productList
    },
    computed: {
        
    },
    methods:{
        testjs(){
            var  n = this.n
            for(var i=0;i<n;i++){
                var nr='';
                for(var j=1;j<n-i;j++){
                    nr= nr+' '
                }
                for(var k=0;k<(2*i+1);k++){
                    nr= nr+'*'
                }
                console.log(nr)
            }
        }
    }
        
  
}
</script>