<template>
  <div>
    <v-card class="mx-auto" width="500px">
      <v-card-title>
        แจ้งการโอนเงิน
      </v-card-title>
      <v-card-subtitle> แบบฟอร์มแจ้งการโอนเงิน </v-card-subtitle>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                readonly
                :value="ret()"
                label="เลขที่ใบสั่งซื้อ"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="userData.name"
                :rules="rules.nameRules"
                :counter="15"
                label="First name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="userData.lastName"
                :rules="rules.lastNRules"
                :counter="20"
                label="Last name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="userData.email"
                :rules="rules.required"
                label="Email"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="userData.phone"
                :rules="rules.required"
                label="Phone Number"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="userData.total"
                :rules="rules.required"
                label="จำนวนเงิน"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <input
                type="file"
                @change="onImageSelect"
                ref="image"
                accept="image/*"
              />
            </v-col>
          </v-row>

          <v-btn
            @click="confirm()"
            :disabled="!valid"
            class="mr-2"
            color="green"
          >
            ยืนยันการโอนเงิน
          </v-btn>

          <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-overlay>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import mainAPI from "@/mixins/mainAPI";
import cart from "@/mixins/cart";
export default {
  mixins: [mainAPI, cart],
  data() {
    return {
      overlay: false,
      valid: true,

      userData: {
        orderId: "",
        name: "",
        lastName: "",
        email: "",
        phone: "",
        total: "",
        image: null,
        imageName: ""
      }
    };
  },

  methods: {
    tyu() {
      this.userData.orderId = this.ret();
    },

    ret() {
      const data = this.orderData.payload;
      return data;
    },

    onImageSelect(event) {
      var d = new Date();
      var n = d.getTime();
      const files = event.target.files;
      this.userData.imageName = n + files[0].name;
      this.userData.image = files[0];
      console.log("change");
    },
    confirm() {
      this.userData.orderId = this.ret();
      this.overlay = !this.overlay;
      setTimeout(() => {
        this.overlay = false;
      }, 3000);

      this.$store.dispatch("order/confirmPayment", this.userData);
    },
    jobsDone() {
      this.removeErrors();
      this.$router.replace("/order");
    }
  },
  computed: {
    orderData() {
      return this.$store.getters["order/orderInfo"];
    }
  }
};
</script>
