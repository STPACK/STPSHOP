<template>
<div>


  <v-data-table
    :headers="headers"
    :items="orderList"
    sort-by="calories"
    class="elevation-1"
  >
  <template v-slot:item.status="{ item }">
      <v-chip :color="getColor(item.status)" dark  >{{getStatus(item.status)}}</v-chip>
    </template>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My Order</v-toolbar-title>
        
        <v-spacer></v-spacer>
        

       
      </v-toolbar>
    </template>

    <template v-slot:item.action="{ item }">
      
     
      <v-btn small  @click="view(item.key,item.status)"  class="mr-2">
            ดูรายละเอียด 
       </v-btn>
      <v-btn small :hidden="item.status === 'wait' ? false :true" @click="confirmPayment(item.key,item.status)">
            แจ้งโอนเงิน  
       </v-btn>
      
     
     
    </template>
    
  </v-data-table>
    
  </div>
</template>

<script>
import mainAPI from '@/mixins/mainAPI'
  export default {
     mixins:[mainAPI],
    data () {
      return{
      headers: [
        {
          text: 'OrderKey',
          align: 'start',
          sortable: false,
          value: 'key',
        },
        { text: 'Date', value: 'date' },
        { text: 'quantity', value: 'total.quantity' },
        { text: 'Price', value: 'total.amount' },
        { text: 'Status ', value: 'status' },
        
        { text: 'Actions', value: 'action', sortable: false },
      ],
      
      
      
    }},

    computed: {
      orderList(){
        return this.$store.getters['order/order']
      },
     
     
    },
    
    created () {
      const loadedOrder = this.$store.getters['order/order']
      if (loadedOrder.length === 0) {
        this.$store.dispatch('order/getOrder')
      }
    },
    
    methods: {

      test () {
       this.$store.dispatch('order/getOrder')
      },

      confirmPayment (key,payload) {
        var status=''
        if (payload === "wait"){
          status = 'orders'
        }else{ status ="ordersed"}
       
       this.$store.dispatch('order/getUserOrder',{key:key,status:status})
       setTimeout(() => (this.$router.push('/confirm-payment')), 2000)
        
      },

      view(key,payload){
        var status=''
        if (payload === "wait"){
          status = 'orders'
        }else{ status ="ordersed"}

        
        this.$store.dispatch('order/getUserOrder',{key:key,status:status})
        setTimeout(() => (this.$router.push('/orders/'+key)), 1000)
         
      },

      
      getColor (status) {
        if (status === "wait") return 'purple lighten-2'
        else if (status === "confirm") return 'warning'
        else if (status === "complete") return 'light-blue darken-1'
        else if (status === "packing") return 'light-green'
        else if (status === "done") return 'green'
        else if (status === "error")return 'red'
      },
      getStatus (status) {
        if (status === "wait") return "รอแจ้งการชำระเงิน"
        else if (status === "confirm") return 'ได้รับการแจ้งชำระเงิน รอตรวจสอบ'
        else if (status === "complete") return 'ชำระเงินเรียบร้อย'
        else if (status === "packing") return 'เตรียมการจัดส่ง'
        else if (status === "done") return 'จัดส่องเรียบร้อย'
        else  if (status === "error")return 'กรุณาติดต่อเจ้าหน้าที่'
        
      },


      jobsDone(){

      }
    },

  }
</script>