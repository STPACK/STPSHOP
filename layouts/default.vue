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
        
          
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn
                  text
                  :disabled="!userLoggedIn"
                  v-on="on"
                  >
                    Hi {{username}}
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in userMenu"
                    :key="index"
                    :to= item.link
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item to="/admin" v-if="userIsAdmin">
                    <v-list-item-title >admin</v-list-item-title>
                  </v-list-item>
                  <v-list-item to="/admin/product" v-if="userIsAdmin">
                    <v-list-item-title >Product</v-list-item-title>
                  </v-list-item>
                  <v-list-item to="/admin/order" v-if ="userIsAdmin">
                    <v-list-item-title >Order</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="Logout">
                    <v-list-item-title >Logout</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-btn text to="/login" :hidden="userLoggedIn" >Login<v-icon >mdi-account-outline</v-icon></v-btn>  
              <v-btn text @click="Logout"  :hidden="!userLoggedIn" >Logout<v-icon>mdi-export-variant</v-icon></v-btn>  
              <v-btn text to="/cart">
                 <v-badge
                    :content="cart.items.length"
                    :value=" cart.items.length > 0 ? true : false "
                    color="green"
                  >
                    Cart
                    <v-icon>mdi-cart-outline</v-icon>
                    
                </v-badge>
                </v-btn>
        
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
        
         <v-btn text>{{this.$store.getters.user}}</v-btn>
       
      </v-toolbar-items>
     

      
    </v-toolbar><br>
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
import cart from '@/mixins/cart' 
export default {
  components:{
    menubar,
  },
  mixins: [cart],
  data () {
    return {
      
     username:'Guest',
    
     userMenu: [
          {
            title: 'Profile',
            link:'/user/profile'
          },
          {
            title: 'Change Password',
            link:'/user/change-password'
          },
       ],
      items: [
          {
            title: 'all',
            
          },
          {
            title: 'Seafood',
            items: [
              { title: 'Selmon'},
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
      },
      Logout(){
          this.$store.dispatch('logOut')
          this.$router.push('/')
      }
        
    },
    created () {
    if (!this.userLoggedIn) {
      this.$store.dispatch('setAuthStatus')
    }    
    },
    
    computed:{
      userProfile () {
      return this.$store.getters.user
      },
      userLoggedIn () {
      return this.$store.getters.loginStatus
      },
      userIsAdmin () {
      return this.$store.getters.userRole === 'admin'
      },
  
      },
      
    

    watch: {
    userProfile (value) {
      
      if (value) {
        this.username = value.name

      } else {
        this.username = 'Guest'
       
      }
    }
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
