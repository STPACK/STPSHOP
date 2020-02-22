<template>
    <div>
        <button@click="test">asdf</button@click="test">
         <v-form
                ref="form"
                v-model="valid"
            >

                <v-flex>
                    <h4>ข้อมูลทั่วไป</h4>
                   
                    <v-text-field
                        v-model="newPost.productName"
                        :rules="[rules.required]"
                        counter
                        maxlength="50"
                        hint="ตั้งชื่อให้สอดคล้องกับประเภทของสินค้า"
                        label="ชื่อสินค้า"
                        required
                    ></v-text-field>

                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-combobox
                                v-model="newPost.category"
                                :items="foodCategory"
                                chips
                                label="ชนิดของสินค้า"
                                v-on:change="checkCategory1(newPost.category)"
                                required
                                :rules="[rules.required]"
                            ></v-combobox>

                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-combobox
                                v-model="newPost.genus"
                                :items="foodGenus"
                                chips
                                label="ชนิดของสินค้า"
                                required
                                :rules="[rules.required]"
                                
                            ></v-combobox>
                        </v-col>
                    </v-row>

                    <v-textarea
                        v-model="newPost.detailPD"
                        required
                        :rules="[rules.required]"
                        label="รายละเอียดสินค้า"
                        counter
                        maxlength="5000"
                        auto-grow
                    ></v-textarea>
                    <v-textarea
                        v-model="newPost.detailPK"
                        required
                        :rules="[rules.required]"
                        label="รายละเอียดบรรจุภัณฑ์"
                        counter
                        maxlength="2000"
                        auto-grow
                    ></v-textarea>

                </v-flex>

                <v-divider class="mx-2 my-4"></v-divider>

                <v-flex>
                    <h4>ข้อมูลการขาย</h4>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="newPost.price"
                                :rules="[rules.required]"
                                type="number"
                                label="ราคา"
                                required
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="newPost.volume"
                                :rules="[rules.required]"
                                type="number"
                                label="จำนวน"
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>                
                </v-flex>

                <v-divider class="mx-2 my-4"></v-divider>

                <v-flex>
                    <h4>การจัดการสื่อ</h4>
                    <v-text-field
                        v-model="newPost.imageUrl"
                        :rules="[rules.required]"
                        label="URL ภาพสินค้า "
                        required
                    ></v-text-field>
                </v-flex>
                <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="submit"
                >
                    Submit
                </v-btn>

                <v-btn
                    color="error"
                    class="mr-4"
                    @click="reset"
                >
                    Reset 
                </v-btn>

            </v-form>
    </div>
</template>

<script>
export default {
    props:{
        postList:{
            type: Object,
            required: false
        }
    },

    data () {
      return {
          newPost: this.postList 
          ? {...this.postList} 
          : {
              productName:""  ,
              category:'',
              genus:'',
              detailPD:'',
              detailPK:'',
              price:0,
              volume:'',
              imageUrl:'',
          },
        valid: true,

        rules: {
            required: value => !!value || 'Required.',
        } ,
        foodCategory: [
            'seafood',
            'beaf'
        ],
        foodGenus:[
            ''
        ],

      }
    },
    methods:{

        checkCategory1(item){
            this.newPost.genus = '';
            if (item === 'seafood'){
                this.foodGenus=['salmon','lobster','uni']
            }else{
                this.foodGenus=['australia','newZealand','unitedStates','japan']
            }
        },
        submit () {
            if (this.$refs.form.validate()) {
                console.log(this.newPost)
            }
        },
        reset () {
            this.$refs.form.reset();
            window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
            });
        },
        test(){
            console.log(this.postList)
        }
    }
}
</script>