<template>
    <v-flex d-flex row>
        

        
        <productPreview
        v-for="product in products"
        :key="product.productID"
        :imageUrl="product.imageUrl"
        :productID="product.productID"
        :name="product.name"
        :price="product.price"
        :idKey="product.key"
        
        />

        
        
        
    </v-flex>

</template>


<script>
import productPreview from '@/components/category/productPreview'
export default {
    components:{
        productPreview
    },
    props:{
       
        products:{
            type:Array,
            required: true
        }
    },
    

    
}
</script>