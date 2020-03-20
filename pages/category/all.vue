<template>
  <div>
    <panel/>

    
    <h2 class="mt-8">สินค้าทั้งหมด</h2>
    <br><br>

    <v-container fluid grid-list-md class="pa-0">
      <v-layout row wrap>
      

              
              <v-flex
                d-flex
                md12
              >
                <productList
                
                :products="loadedPosts"
                />
              </v-flex>
              


    </v-layout >
        </v-container>





  </div>
</template>

<script>

import hotdeal from '@/components/category/hotdeal'
import productList from '@/components/category/productList'
import panel from '@/components/panel-brand'


export default {
  
    components:{
        hotdeal,productList,panel
    },

    created () {
      const loadedProducts = this.$store.getters['product/products']
      if (loadedProducts.length === 0) {
        this.$store.dispatch('product/getProducts')
      }
    },
    computed: {
    loadedPosts() {
      return this.$store.getters['product/products']
    },
    
  }
    
    

    
}
</script>

<style scoped>

.gg{
  margin: 0;
  padding: 0;

}
h2{
  font-family: 'Sarabun', sans-serif;
}

</style>