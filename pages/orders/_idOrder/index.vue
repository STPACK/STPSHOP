<template>
  <v-container>
    <v-row>
      <v-col cols="7">
        <v-row v-for="(item, index) in loadedOrder" :key="index">
          <v-card class=" mb-2 d-inline-block" outlined tile width="100%">
            <v-container>
              <v-row>
                <v-col cols="auto">
                  <v-img
                    :src="item.imageUrl"
                    max-height="100"
                    max-width="100"
                    contain
                  ></v-img>
                </v-col>
                <v-col cols="5">
                  {{ item.product }}
                </v-col>

                <v-col cols="2">
                  <v-row class="flex-column ">
                    <v-col> {{ item.price }}฿ </v-col>
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
        <v-card class="pa-2" outlined tile>
          <v-card-title>
            ที่อยู่จัดส่ง
          </v-card-title>
          <v-card-subtitle>
            {{ loadedOrderInfi.address.name }}
            {{ loadedOrderInfi.address.lastName }} <br />
            {{ loadedOrderInfi.address.phone }} <br />
            {{ loadedOrderInfi.address.address }}
          </v-card-subtitle>
        </v-card>

        <v-card class="pa-2" outlined tile>
          <v-list-item-content>
            <v-list-item-title class="headline"
              >สรุปรายการสั่งซื้อ</v-list-item-title
            >
          </v-list-item-content>
          <v-list-item>
            <v-list-item-title>ยอดสินค้าจำนวน</v-list-item-title>
            <v-list-item-title class="text-right">
              {{ loadedOrderInfi.total.quantity }}ชิ้น</v-list-item-title
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title>ยอดรวม</v-list-item-title>
            <v-list-item-title class="text-right">
              <strong>
                {{ loadedOrderInfi.total.amount }} ฿</strong
              ></v-list-item-title
            >
          </v-list-item>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn width="100%" color="green" to="/order">Back to Order</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import mainAPI from "@/mixins/mainAPI";
import cart from "@/mixins/cart";
export default {
  mixins: [mainAPI, cart],
  data() {
    return {};
  },

  methods: {
    jobsDone() {
      this.removeErrors();
      this.$router.replace("/");
    }
  },
  computed: {
    loadedOrder() {
      return this.$store.getters["order/userOrder"];
    },
    loadedOrderInfi() {
      return this.$store.getters["order/orderInfo"];
    }
  }
};
</script>
