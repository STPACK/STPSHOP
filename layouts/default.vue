<template>
  <v-app  >
    <div>
      <v-app-bar height="80px" fixed  elevate-on-scroll  > 


        <v-toolbar-items class="ml-12" >
         
          <v-btn   text to="/">STPACK.COM</v-btn> 
        </v-toolbar-items>

        <div class="d-flex searchBar">
          <v-text-field
            label="Search"
            single-line
            dense
            outlined
            class="searchInput"
          > 
          </v-text-field>
          <v-btn color="warning" >S<v-icon>mdi-alarm</v-icon></v-btn>
        </div>
        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn text to="/login"><v-icon>mdi-export-variant</v-icon>User</v-btn>
          <v-btn text><v-icon>mdi-plus-circle</v-icon>Order</v-btn>
          <v-btn text><v-icon>mdi-export-variant</v-icon>Masseage</v-btn>
          <v-btn text><v-icon>mdi-export-variant</v-icon>Cart</v-btn>
        
        </v-toolbar-items >
      </v-app-bar>
    </div> 
    


    <div class="menubar">
      <v-toolbar height="48px"   flat  color="#ffdec9">
        <div>
           <v-menu 
          open-on-hover
          offset-y
          
          >
            <template v-slot:activator="{ on }">
              <v-btn
                color="warning" 
                class="ml-12"
                text
                tile
                v-on="on"
               
              >
                <v-icon>mdi-export-variant</v-icon>Categories
              </v-btn>         
            </template>

             <v-card
              width="250"
              class="mx-auto"
              flat
            >
              <v-menu
                    v-for="item in items"
                    :key="item.title"
                    offset-x
                    :nudge-width="200"
                    
                    open-on-hover  

                >
                    <template v-slot:activator="{ on }">
                       
                       <v-list-item-content> 
                            <v-list-item-title v-text="item.title" v-on="on" @click="Goto(item.title)" ></v-list-item-title>
                        </v-list-item-content>

                    </template>
                    <v-card flat>
                        <v-list>
                            <v-list-item
                                v-for="subItem in item.items"
                                :key="subItem.title"
                                
                            >
                                <v-list-item-content>
                                <v-list-item-title v-text="subItem.title" ></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>



                    </v-card>
                    
                </v-menu>
              
            </v-card>
          </v-menu>
          
        </div>
         <menubar/>
      
      
      
      

      <v-spacer></v-spacer>

      <v-toolbar-items>
         <v-btn text>TEL 0XX-XXXXXX</v-btn>
       
      </v-toolbar-items>
     

      
    </v-toolbar>
  </div>
    <v-content>
      <div class="contrainer">

        <nuxt />
      
      </div>
    </v-content>
    
    <v-footer
     
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import menubar from '@/components/menufile/menutab'
export default {
  components:{
    menubar,
  },



  data () {
    return {
      
      
      items: [
          {
            title: 'all',
            
          },
          {
            title: 'Seafood',
            items: [
              { title: 'Salmon'},
              { title: 'lobster'},
              { title: 'Uni'},
            ],
          },
          {
            title: 'Beaf', 
            items: [
              { title: 'ออสเตเรีย' },
              { title: 'newzeland' },
              { title: 'us' },
              { title: 'Japanese' },
            ],
          },
          
          
        ],
      
  }
},
methods:{
        Goto(goto){
            this.$router.push('/category/'+goto)
            console.log("/cat/"+goto)

            
        },
        
    }

}
</script>



<style scoped>

*{
    text-decoration: none;
    
    
}
.contrainer{
  width: 80%;
  margin: 0 auto;
  
  
}

.searchBar{
    
    width: 50%;
    height: 50%;
    margin-left: 80px;
   
}

.menubar{
  margin-top: 80px;
}


</style>
