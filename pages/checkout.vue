<template>
    <v-container >
    <v-row >
      <v-col cols="7">
        <v-row 
          v-for="(item,index) in cart.items" :key="index" 
        >
          <v-card
            class=" mb-2 d-inline-block"
            outlined
            tile
            width="100%"
          >
              <v-container>
                  <v-row >
                        <v-col cols="auto">
                        <v-img :src="item.product.imageUrl" max-height="100" max-width="100" contain></v-img>
                        </v-col>
                        <v-col cols="5">
                            
                                {{ item.product.name }}
                            
                        </v-col>

                        <v-col cols="2">
                            <v-row
                                class="flex-column "
                                
                            >
                                <v-col >
                                ฿{{item.product.price}}
                                </v-col>

                            </v-row>
                        </v-col>
                        <v-col>
                             
                    {{ item.quantity }}
                    
                        </v-col>
                    </v-row>
                </v-container>
          
            </v-card>
              
          </v-row>
          <v-row>
            <v-card
              
             
              
              width="100%"
              
            >
        <v-form v-model="valid">
          <v-container>
          <v-row>
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-text-field
                                v-model="userData.name"
                                :rules="rules.nameRules"
                                :counter="15"
                                label="First name"
                                required
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-text-field
                                v-model="userData.lastName"
                                :rules="rules.lastNRules"
                                :counter="20"
                                label="Last name"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-text-field
                                v-model="userData.email"
                                :rules="rules.address"
                                
                                label="Email"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            md="6"
                        >
                            <v-text-field
                                v-model="userData.phone"
                                :rules="rules.required"
                                label="Phone Number"
                                
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            md="12"
                        >
                            <v-text-field
                                v-model="userData.address"
                                :rules="rules.required"
                                label="Address"
                                required
                                
                            ></v-text-field>
                        </v-col>
                        </v-row>
                        </v-container>
		  </v-form>
          
          </v-card>
           
            
            
          </v-row>

         
          
        
      </v-col>
      <v-col cols="5">
        <v-card>
           <v-card-title>
             ที่อยู่จัดส่ง
            </v-card-title>
            <v-card-subtitle>
              {{userData.name}}  {{userData.lastName}} <br>
              {{userData.address}} <br>
              {{userData.phone}}
            </v-card-subtitle>
          
        </v-card>


        <v-card
          class="pa-2"
          outlined
          tile
        >
           <v-list-item-content>
        <v-list-item-title class="headline">สรุปรายการสั่งซื้อ</v-list-item-title>
        
      </v-list-item-content>
        <v-list-item>
            <v-list-item-title>ยอดสินค้าจำนวน</v-list-item-title>
            <v-list-item-title class="text-right">{{cartTotal.quantity}} ชิ้น</v-list-item-title>
        </v-list-item>
        <v-list-item>
            <v-list-item-title>ยอดรวม</v-list-item-title>
            <v-list-item-title class="text-right" > <strong> {{cartTotal.amount}} ฿</strong></v-list-item-title>
        </v-list-item>
        {{cart.total}}
        {{cart.address}}
       
        <v-divider></v-divider>

        <v-card-actions>
            <v-btn  width="100%" color="green" @click="confirm(cartTotal)" >ยืนยันการสั่งซื้อ</v-btn>
           
        </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import mainAPI from '@/mixins/mainAPI'
import cart from '@/mixins/cart'
export default {
     mixins:[mainAPI,cart],
    data () {
    return {
        valid: true,
       
        userData:{
            name:'',
            lastName:'',
            email:'',
            phone:'',
            address:'',
        }
    }
  },
 
  methods: {
    confirm(cartTotal){
       this.$store.commit('catalog/updateTotal', cartTotal)
       this.$store.commit('catalog/updateAddress', this.userData)
       this.$store.dispatch('catalog/postOrder', this.cart)

    },
    jobsDone(){
      this.removeErrors()
      this.$router.replace("/")
    }
    
  },

}
</script>