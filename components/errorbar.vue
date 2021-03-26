<template>
  <transition name="slide" type="animation">
    <div v-if="error">
      <v-alert type="error" dense outlined class="my-5">
        {{ error }}
      </v-alert>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["error"]
};
</script>
