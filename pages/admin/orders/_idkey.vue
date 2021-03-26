<template>
  <v-container>
    <v-row>
      <v-col cols="7">
        <v-row v-for="(item, items) in orderList.items" :key="items">
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
                    <v-col> ฿{{ item.price }} </v-col>
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
          <v-card-title>
            ที่อยู่จัดส่ง
          </v-card-title>
          <v-card-subtitle>
            {{ orderList.detail.address.name }}
            {{ orderList.detail.address.lastName }} <br />
            {{ orderList.detail.address.phone }}
            {{ orderList.detail.address.email }} <br />
            {{ orderList.detail.address.address }} <br />

            {{ $route.params.idkey }}
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
            <v-list-item-title class="text-right"
              >{{ orderList.detail.total.quantity }} ชิ้น</v-list-item-title
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title>ยอดรวม</v-list-item-title>
            <v-list-item-title class="text-right">
              <strong>
                {{ orderList.detail.total.amount }}฿</strong
              ></v-list-item-title
            >
          </v-list-item>
          <v-alert
            text
            prominent
            type="error"
            icon="mdi-cloud-alert"
            :hidden="alert"
          >
            Please Set Status
          </v-alert>

          <v-divider></v-divider>

          <v-card-actions>
            <v-row>
              <v-col>
                <v-btn
                  width="80%"
                  height="40px"
                  :color="getColor(orderList.detail.status)"
                  >{{ getStatus(orderList.detail.status) }}</v-btn
                >
              </v-col>
              <v-col>
                <v-select
                  :items="items"
                  label="Status"
                  solo
                  v-model="status"
                ></v-select>
                <v-btn class="mx-3" color="green" dark @click="confirm"
                  ><v-icon dark>mdi-checkbox-marked-circle</v-icon></v-btn
                >

                <v-btn class="mx-3" color="red" dark @click="cancle"
                  ><v-icon dark>mdi-cancel</v-icon></v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: ["เตรียมการจัดส่ง", "จัดส่องเรียบร้อย", "กรุณาติดต่อเจ้าหน้าที่"],
      status: "",
      alert: true
    };
  },

  methods: {
    check() {
      if (this.status === "เตรียมการจัดส่ง") return "packing";
      else if (this.status === "จัดส่องเรียบร้อย") return "done";
      else if (this.status === "กรุณาติดต่อเจ้าหน้าที่") return "error";
      else return null;
    },
    confirm() {
      const index = this.check();

      let data = {
        status: index,
        userID: this.orderList.detail.userID,
        orderID: this.$route.params.idkey
      };

      if (index === null) {
        this.alert = false;
        setTimeout(() => (this.alert = true), 2000);
      } else {
        this.$store.dispatch("orderAdmin/changeStatus", data);
        setTimeout(() => this.$router.push("/admin/order"), 2000);
        console.log(data);
      }
    },
    cancle() {
      this.$router.push("/admin/order");
    },
    getColor(status) {
      if (status === "wait") return "purple lighten-2";
      else if (status === "confirm") return "warning";
      else if (status === "complete") return "light-blue darken-1";
      else if (status === "packing") return "light-green";
      else if (status === "done") return "green";
      else if (status === "error") return "red";
    },
    getStatus(status) {
      if (status === "wait") return "รอแจ้งการชำระเงิน";
      else if (status === "confirm") return "รอตรวจสอบการแจ้งชำระเงิน";
      else if (status === "complete") return "ชำระเงินเรียบร้อย";
      else if (status === "packing") return "เตรียมการจัดส่ง";
      else if (status === "done") return "จัดส่องเรียบร้อย";
      else if (status === "error") return "กรุณาติดต่อเจ้าหน้าที่";
    }
  },
  computed: {
    orderList() {
      return this.$store.getters["orderAdmin/actionOrder"];
    }
  }
};
</script>
