<template>
  <div>
    <v-text-field
      v-model="groupName"
      label="Group Name"
      required
      class="my-5"
    ></v-text-field>
    <v-btn color="warning" class="mr-4" @click="onSubmit">
      Add
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groupName: "",
      group: null
    };
  },

  //  created(){
  //   const loadedGroups = this.$store.getters['admin/groups']
  //   if(loadedGroups.length === 0 ){
  //     this.$store.dispatch('admin/getGroups')
  //   }
  // },
  methods: {
    onSubmit() {
      this.$store.dispatch("admin/createGroup", { name: this.groupName });
    }
  }
  // computed:{
  //   groups(){
  //       return this.$store.getters['admin/groups']
  //   },

  // },
};
</script>
