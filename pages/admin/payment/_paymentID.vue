<template>
    <v-container >
    <v-row >
      <v-col cols="7">
        <v-row 
          v-for="(item,items) in orderList.items" :key="items" 
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
                        <v-img :src="item.imageUrl" max-height="100" max-width="100" contain></v-img>
                        </v-col>
                        <v-col cols="5">
                            
                                {{ item.product }}
                            
                        </v-col>

                        <v-col cols="2">
                            <v-row
                                class="flex-column "
                                
                            >
                                <v-col >
                                ฿{{item.price}}
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
          

         
          
        
      </v-col>
      <v-col cols="5">
        <v-card>
            <v-img :src="paymentList.imageUrl" max-height="200" max-width="200" contain></v-img>
           <v-card-title>
            รูปแนบ
            </v-card-title>
            <v-card-subtitle>
            {{paymentList.name}}  {{paymentList.lastName}} <br>
            {{paymentList.email}}  {{paymentList.phone}} <br>
            {{paymentList.address}} 
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
            <v-list-item-title class="text-right">{{orderList.detail.total.quantity}} ชิ้น</v-list-item-title>
        </v-list-item>
        <v-list-item>
            <v-list-item-title>ยอดรวม</v-list-item-title>
            <v-list-item-title class="text-right" > <strong> {{orderList.detail.total.amount}}฿</strong></v-list-item-title>
        </v-list-item>
       
       
        <v-divider></v-divider>

        <v-card-actions>
            <v-btn  width="50%" color="green"  @click="confirm" >ยืนยันการโอนเงิน</v-btn>
            <v-btn  width="50%" color="red"  to="/admin/order-payment" >ยกเลิก</v-btn>
           
        </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
  
  </v-container>
</template>


<script>


export default {
     
    data () {
    return {
        
        
        
    }
  },
 
  methods: {
    
        confirm(){
            const payload = {
              userID: this.orderList.detail.userID,
              payment: this.paymentList.productKey,
              orderID: this.paymentList.orderId,
                         
            }
            confirm('Are you sure ?') &&
            this.$store.dispatch('orderAdmin/confirmPayment',payload)
            setTimeout(() => (this.$router.push('/admin/order-payment')), 2000)
            this.$store.dispatch('orderAdmin/getPayment')
        }
   
    
  },
   computed: {
      paymentList(){
        return this.$store.getters['orderAdmin/confirmPayment']
      },
      orderList(){
        return this.$store.getters['orderAdmin/confirmOrder']
      },
      
     
     
    },
   

}
</script>