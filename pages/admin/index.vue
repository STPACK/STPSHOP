<template>
  <div>
    <v-container fluid>
      <v-btn to="/admin/product" color="light-green">
        poductList
      </v-btn>
      <v-btn to="/admin/administrator" color="light-green">
        Administrator
      </v-btn>
      <v-divider class="mx-2 my-4"></v-divider>
    </v-container>
  </div>
</template>
<script>
import productList from "@/components/category/productList";

export default {
  data() {
    return {
      n: 5
    };
  },

  components: {
    productList
  },
  computed: {}
};
</script>
