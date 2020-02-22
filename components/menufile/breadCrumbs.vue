<template>
     <v-breadcrumbs :items="breadC">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

</template>

<script>
  export default {
    
    props:{
        breadC:{
            types: Array,
            required: true
        }
    }
  }
</script>