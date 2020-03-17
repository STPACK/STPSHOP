<template>
<div>


  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My Product</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="700px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                        v-model="editedItem.name"
                        counter
                        maxlength="70"
                        hint="ตั้งชื่อให้สอดคล้องกับประเภทของสินค้า"
                        label="ชื่อสินค้า"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-combobox
                        v-model="editedItem.types"
                        :items="foodCategory"
                        chips
                        label="ชนิดของสินค้า"
                        v-on:change="checkCategory1(editedItem.types)"
                        required
                        
                    ></v-combobox>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                     <v-combobox
                        v-model="editedItem.genus"
                        :items="foodGenus"
                        chips
                        label="ชนิดของสินค้า"
                        required
                    ></v-combobox>
                  </v-col>
                   <v-col cols="12" sm="6" md="6">
                    <v-text-field
                        v-model="editedItem.price"
                        type="number"
                        label="ราคา"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                        v-model="editedItem.volume"
                        type="number"
                        label="จำนวน"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                        v-model="editedItem.detailPD"
                        required
                        label="รายละเอียดสินค้า"
                        counter
                        maxlength="5000"
                        auto-grow
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                        v-model="editedItem.detailPK"
                        required
                        
                        label="รายละเอียดบรรจุภัณฑ์"
                        counter
                        maxlength="2000"
                        auto-grow
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                   <v-text-field
                        v-model="editedItem.imageUrl"
                        label="URL ภาพสินค้า "
                        required
                    ></v-text-field>
                  </v-col>
                 
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      
      <v-icon
        small
        class="mr-2"
        @click="view(item.key)"
      >
        mdi-eye
      </v-icon>
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
     
    </template>
    
  </v-data-table>
    
  </div>
</template>

<script>
  export default {
    data () {
      return{
      dialog: false,
      headers: [
        {
          text: 'Product',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'types', value: 'types' },
        { text: 'genus', value: 'genus' },
        { text: 'volume', value: 'volume' },
        { text: 'price ', value: 'price' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        types: '',
        genus: '',
        detailPD:'',
        imageUrl:'',
        volume: 0,
        price: 0,
      },
      defaultItem: {
        name: '',
        types: '',
        genus: '',
        detailPD:'',
        imageUrl:'',
        volume: 0,
        price: 0,
      },
      foodCategory: [
            'Seafood',
            'Beaf'
        ],
        foodGenus:[
            ''
        ],
    }},

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      
      test () {
        return this.$store.getters['product/products']
      },
      desserts(){
        return this.$store.getters['product/products']
      }
     
    },
    

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      const loadedProducts = this.$store.getters['product/products']
      if (loadedProducts.length === 0) {
        this.$store.dispatch('product/getProducts')
      }
    },
    
    methods: {

      initialize () {
        
        this.desserts = this.$store.getters['product/products']
         
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
       
        confirm('Are you sure you want to delete this item?') &&
        this.$store.dispatch('product/removeProduct', item)

      },

      close () {
        this.dialog = false
        this.foodGenus = ['']
      },
      view(key){
          this.$router.push('/admin/'+key)
      },

      save () {
        if (this.editedIndex > -1) {
         this.$store.dispatch('product/updateProduct', this.editedItem)
        } else {
          
          this.$store.dispatch('product/addProduct', this.editedItem)
        }
        this.close()
      },
      checkCategory1(item){
          this.editedItem.genus = '';
          if (item === 'Seafood'){
              this.foodGenus=['Salmon','Lobster','Fish Roe']
          }else{
              this.foodGenus=['Australia','NewZealand','UnitedStates','Japan']
          }
      },
    },

  }
</script>