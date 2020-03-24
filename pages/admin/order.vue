<template>
    <div>
        <v-data-table
    :headers="headers"
    :items="orderList"
    sort-by="calories"
    class="elevation-1"
  >
  <template v-slot:item.detail.status="{ item }">
      <v-chip :color="getColor(item.detail.status)" dark  >{{getStatus(item.detail.status)}}</v-chip>
    </template>
       <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>All Order</v-toolbar-title>
        
        <v-spacer></v-spacer>
        <v-btn small  @click="test()"  class="mr-2">
            ดูรายละเอียด 
       </v-btn>
        <v-btn small  @click="orderPayment()"  class="mr-2">
            Orderแจ้งการโอนเงิน 
       </v-btn>

       
      </v-toolbar>

      
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
        { text: 'date', value: 'detail.date' },
        { text: 'userID', value: 'detail.userID' },
        { text: 'quantity', value: 'detail.total.amount' },
        { text: 'Status ', value: 'detail.status' },
        
        { text: 'Actions', value: 'action', sortable: false },
      ],
      
      
      
    }},

    computed: {
      orderList(){
        return this.$store.getters['orderAdmin/order']
      },
     
     
    },
    created () {
      const loadedOrder = this.$store.getters['orderAdmin/order']
      if (loadedOrder.length === 0) {
        this.$store.dispatch('orderAdmin/getOrderAdmin')
      }
    },
    
    
    methods: {

      test () {
       this.$store.dispatch('orderAdmin/getOrderAdmin')
      },

      orderPayment (key) {
       
       this.$store.dispatch('orderAdmin/getPayment',key)
       setTimeout(() => (this.$router.push('/admin/order-payment')), 2000)
        
      },

      view(key){

        this.$store.dispatch('order/getUserOrder',key)
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