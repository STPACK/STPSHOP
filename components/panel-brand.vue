<template>
  <div>
    <div class="head">
      <nuxt-link to="/">
        <img src="~/static/logo.png" alt="logo" class="logo" />
      </nuxt-link>

      <h1>FOOD HUNTER ไล่ล่าวัตถุดิบคุณภาพ ส่งตรงถึงบ้านคุณ</h1>
      <v-row class="bar my-3">
        <v-btn text>วิธีการสั่งซื้อ</v-btn>
        <v-btn text>แจ้งการโอนเงิน</v-btn>
        <v-btn text>ติดต่อเรา</v-btn>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goto() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.logo {
  width: 140px;
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
}
.head {
  margin: 0 auto;
  text-align: center;
  font-family: "Kanit", sans-serif;
}
h1 {
  font-family: "Kanit", sans-serif;
}
.bar {
  text-align: center;
  justify-content: center;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
