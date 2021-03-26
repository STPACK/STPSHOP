<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-card
          class="mx-auto"
          width="400px"
          height="150px"
          :hidden="checkCart"
        >
          <v-row justify="center">
            <v-card-title>
              No item in the cart
            </v-card-title>
          </v-row>
          <v-row justify="center">
            <v-card-actions>
              <v-btn to="/category/all">Back to Shopping</v-btn>
            </v-card-actions>
          </v-row>
        </v-card>
        <v-row v-for="(item, index) in cart.items" :key="index">
          <v-card class=" mb-2 d-inline-block" outlined tile width="100%">
            <v-container>
              <v-row>
                <v-col cols="auto">
                  <v-img
                    :src="item.product.imageUrl"
                    max-height="100"
                    max-width="100"
                    contain
                  ></v-img>
                </v-col>
                <v-col cols="5">
                  <nuxt-link to="/">
                    {{ item.product.name }}
                  </nuxt-link>
                </v-col>

                <v-col cols="2">
                  <v-row class="flex-column ">
                    <v-col> ฿{{ item.product.price }} </v-col>

                    <v-col>
                      <v-btn icon @click="removeFromCart(index)">
                        <v-icon color="red"> mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col>
                  <v-btn
                    class="mx-1"
                    fab
                    dark
                    x-small
                    color="green"
                    @click="decreaseQuantity(index)"
                  >
                    <v-icon dark x-small>mdi-minus</v-icon>
                  </v-btn>
                  {{ item.quantity }}
                  <v-btn
                    class="mx-1"
                    fab
                    dark
                    x-small
                    color="green"
                    @click="increaseQuantity(index)"
                  >
                    <v-icon dark x-small>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-card class="pa-2" outlined tile>
          <v-list-item-content>
            <v-list-item-title class="headline"
              >สรุปรายการสั่งซื้อ</v-list-item-title
            >
          </v-list-item-content>
          <v-list-item>
            <v-list-item-title>ยอดสินค้าจำนวน</v-list-item-title>
            <v-list-item-title class="text-right">
              {{ cartTotal.quantity }} ชิ้น</v-list-item-title
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title>ยอดรวม</v-list-item-title>
            <v-list-item-title class="text-right">
              <strong> {{ cartTotal.amount }}฿ </strong></v-list-item-title
            >
          </v-list-item>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn width="100%" color="warning" @click="checkout"
              >Checkout</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import cart from "@/mixins/cart";
export default {
  mixins: [cart],
  data() {
    return {
      carLength: false
    };
  },
  methods: {
    checkout(carTotal) {
      const isLoggedIn = this.$store.getters.loginStatus;
      if (!isLoggedIn) {
        this.$router.push("/login");
      } else {
        this.$router.push("/checkout");
      }
    }
  },
  computed: {
    checkCart() {
      const cartItems = this.cart.items;
      if (cartItems.length === 0) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>
