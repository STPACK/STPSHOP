<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="orderList"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Order Payment</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-btn small @click="backToOrder()" class="mr-2">
            Back to Order
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn small @click="view(item.productKey, item.orderId)" class="mr-2">
          ดูรายละเอียด
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import mainAPI from "@/mixins/mainAPI";
export default {
  mixins: [mainAPI],
  data() {
    return {
      headers: [
        {
          text: "Payment id",
          align: "start",
          sortable: false,
          value: "productKey"
        },
        { text: "Order id", value: "orderId" },
        { text: "name", value: "name" },
        { text: "e-mail", value: "email" },

        { text: "total", value: "total" },
        { text: "Actions", value: "action", sortable: false }
      ]
    };
  },

  computed: {
    orderList() {
      return this.$store.getters["orderAdmin/payment"];
    },
    paymentList() {
      return this.$store.getters["orderAdmin/confirmPayment"];
    }
  },

  methods: {
    backToOrder() {
      this.$store.dispatch("orderAdmin/getOrderAdmin");
      this.$router.push("/admin/order");
    },

    confirmPayment(key) {
      this.$store.dispatch("order/getUserOrder", key);
      setTimeout(() => this.$router.push("/confirm-payment"), 2000);
    },

    view(key, id) {
      this.$store.dispatch("orderAdmin/getConfirmPayment", {
        payment: key,
        order: id
      });
      setTimeout(() => this.$router.push("/admin/payment/" + key), 300);
    },

    jobsDone() {}
  }
};
</script>
