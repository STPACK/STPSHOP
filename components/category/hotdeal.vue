<template>
  <div>
    <v-tabs background-color="#f5f5f5" show-arrows height="250" center-active>
      <v-tabs-slider color="#f5f5f5" />
      <v-tab v-for="i in 10" :key="i" class="pa-1">
        <v-card
          width="200px"
          height="280px"
          color="#f5f5f5"
          flat
          :href="'/hotdeal/' + i"
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            width="200px"
            height="200px"
          />
          <v-card-title> Item {{ i }} </v-card-title>
        </v-card>
      </v-tab>
    </v-tabs>
  </div>
</template>

<script>
export default {};
</script>
