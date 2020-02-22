<template>
    
    <v-container fluid  >
        <h2>แก้ไข</h2>
        <v-divider class="mx-2 my-4"></v-divider>
        <addnewPD
        :postList="post"
        
        />
        
        
        
        
    </v-container>

        
    
</template>

<script>
import addnewPD from '@/components/form/addnewPD'

export default {
    components:{
        addnewPD
    },
    data() {
    return {
        post: {
            productName:'king of beaf5'  ,
            category:'beaf',
            genus:'newZealand',
            detailPD:'lorem10sdfasdfa asdf a asdfasdf asdf asdf asdf asdf asdfasdf asdf sefsef',
            detailPK:'asdf asdfawe asd adsf asd1654sdf asd5f4 a6s5df4a96se4f65 a6s5d4f 6a4s6d5f4 6asd5f4 6a54sdf',
            price:3200,
            id:'asdf54654',
            volume:20,
            imageUrl:'https://cdn.vuetifyjs.com/images/cards/cooking.png',
        },
        tr:'hello worlkd'
    }
    }
}
</script>