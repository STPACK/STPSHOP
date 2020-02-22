<template>
    
       <v-container fluid  >
            <h2>เพิ่มสินค้าใหม่</h2>
            <v-divider class="mx-2 my-4"></v-divider>
            <addnewPD/>
           
          
           
          
       </v-container>

        
    
</template>

<script>
import addnewPD from '@/components/form/addnewPD'
export default {
    components:{
        addnewPD
    }
}
</script>