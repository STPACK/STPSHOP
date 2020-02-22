<template>
    <v-flex d-flex row>
        <productPreview
        v-for="product in products"
        :key="product.id"
        :is-admin="isAdmin"
        :imageUrl="product.imageUrl"
        :id="product.id"
        :productName="product.productName"
        :price="product.price"
        md3
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
        isAdmin:{
            type:Boolean,
            default:false
        },
        products:{
            type:Array,
            required: true
        }
    },
    

    
}
</script>