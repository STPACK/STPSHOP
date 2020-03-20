<template>
    <v-container >
    <v-row >
     
      
      <v-col cols="8">
         

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
                            <nuxt-link to="/">
                                {{ item.product.name }}
                            </nuxt-link>
                        </v-col>

                        <v-col cols="2">
                            <v-row
                                class="flex-column "
                                
                            >
                                <v-col >
                                ฿{{item.product.price}}
                                </v-col>

                                <v-col >
                                <v-btn icon>
                                    <v-icon>mdi-bookmark</v-icon>
                                </v-btn>
                                
                                </v-col>

                                
                            </v-row>
                        </v-col>
                        <v-col>
                             <v-btn class="mx-1" fab  dark  x-small color="green">
                        <v-icon dark x-small>mdi-minus</v-icon>
                    </v-btn>
                    {{ item.quantity }}
                    <v-btn class="mx-1"  fab  dark  x-small color="green">
                        <v-icon dark x-small>mdi-plus</v-icon>
                    </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
          
            </v-card>
              
          </v-row>
         
          
        
      </v-col>
      <v-col cols="4">
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
            <v-list-item-title class="text-right"> {{cartTotal.quantity}}  ชิ้น</v-list-item-title>
        </v-list-item>
        <v-list-item>
            <v-list-item-title>ยอดรวม</v-list-item-title>
            <v-list-item-title class="text-right"> <strong>  {{cartTotal.amount}}฿ </strong></v-list-item-title>
        </v-list-item>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

import cart from '@/mixins/cart'
export default {
    mixins: [cart],
    
    
    
}
</script>