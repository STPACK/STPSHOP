<template>
<div>


  <v-data-table
    :headers="headers"
    :items="desserts"
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
         <v-btn  color="green" @click="test" >test</v-btn>

       
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      
     
      <v-btn small  @click="view(item.key)"  class="mr-2">
            ดูรายละเอียด  
       </v-btn>
      <v-btn small :hidden="item.status === 'wait' ? false :true" @click="confirmPayment(item.key)">
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
      desserts(){
        return this.$store.getters['order/order']
      }
     
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

      confirmPayment (key) {
       
       this.$store.dispatch('order/getUserOrder',key)
       setTimeout(() => (this.$router.push('/confirm-payment')), 500)
        

      },

      
      view(key){
        this.$store.dispatch('order/getUserOrder',key)
        setTimeout(() => (this.$router.push('/orders/'+key)), 500)
         
            
          
          
      },

      
      getColor (status) {
        if (status === "wait") return 'warning'
        else if (status === "confirm") return 'light-green'
        else if (status === "Transport") return 'green'
        else if (status === "complete") return 'light-blue'
        else if (status === "error")return 'red'
      },
      getStatus (status) {
        if (status === "wait") return "รอแจ้งการโอนเงิน"
        else if (status === "confirm") return 'ยืนยันการโอนเงิน'
        else if (status === "Transport") return 'กำลังจัดส่ง'
        else if (status === "complete") return 'จัดส่งเสร็จสิ้น'
        else  if (status === "error")return 'กรุณาติดต่อเจ้าหน้าที่'
        
      },


      jobsDone(){

      }
    },

  }
</script>