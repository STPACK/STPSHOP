<template>
  <div>
    
    <h2 class="mt-8">Hot Deal</h2>

    <v-card>
      <hotdeal/>
    </v-card>
   
    <br><br>

    <v-container fluid grid-list-md class="pa-0">
      <v-layout row wrap>
        <v-flex d-flex   md2   >
          <v-card
            color="#f5f5f5"
            width="100%"
          >
            <v-card-title>
              <v-icon
                large
                left
              >
                mdi-currency-eth
              </v-icon>
              <span class="title font-weight-light">Category</span>
            </v-card-title> 
          <v-divider></v-divider>

          </v-card>
          
        </v-flex >

        <v-flex d-flex xs12  md10>
          <v-layout row wrap>
              <v-flex
                d-flex
                md12
              >
                <v-card
                  color="#f5f5f5"
                  
                  width="100%"
                
                 
                >
                  <v-card-title>All</v-card-title>
                </v-card>
              </v-flex>

              <v-flex
                d-flex
                md12
              >
                <productList
                
                :products="loadedPosts"
                />
              </v-flex>
              

        </v-layout>
      </v-flex>

    </v-layout >
        </v-container>





  </div>
</template>

<script>
import BreadCrumbs from '@/components/menufile/breadCrumbs'
import hotdeal from '@/components/category/hotdeal'
import productList from '@/components/category/productList'


export default {
  
    components:{
        BreadCrumbs,hotdeal,productList
    },
    
    computed: {
    loadedPosts() {
      
    }
  }
    
    

    
}
</script>

<style scoped>

.gg{
  margin: 0;
  padding: 0;

}

</style>