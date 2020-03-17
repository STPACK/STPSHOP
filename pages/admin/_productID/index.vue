<template>
<div>
    
    
    <h1> {{product.name}}</h1>
    <v-divider></v-divider>

   <v-container fluid grid-list-md pa-0 mt-4>
      <v-layout row wrap>

        <v-flex d-flex  md7>
          <v-card 
          width="100%"
          flat>
            <v-img
                        :src="product.imageUrl"
                        
                        aspect-ratio="1"
                    />
          </v-card>
        </v-flex>
       
        <v-flex d-flex  md5 >
          <v-layout row wrap >

            <v-flex d-flex md12 >
              <v-card  width="100%" flat>
                <v-tabs >
                    <v-tab  >รายละเอียดสินค้า</v-tab>
                    <v-tab-item   >
                        <v-card flat >
                            <v-card-text><p>  {{product.detailPD}}  </p> </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab >รายละเอียดบรรจุภัณฑ์สินค้า</v-tab>  
                    <v-tab-item   >
                        <v-card flat >
                            <v-card-text><p>  {{product.detailPK}}  </p> </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
              </v-card>
            </v-flex>
            
            <v-flex d-flex md12 py-0 >
              
                <v-flex d-flex  md4 pa-0>
                  <v-card
                    width="100%" flat 
                  >
                    <v-card-title>
                        $ {{product.price}}
                    </v-card-title>
                    <v-card-subtitle>
                        จัดส่งฟรีขั้นต่ำ 2000 บาท
                    </v-card-subtitle>
                  </v-card>
                </v-flex>
                <v-flex d-flex md8 pa-0>
                  <v-card
                    width="100%"  flat tile
                  >
                    <v-card-text class="green--text">
                        <p>IN STOCK</p>
                        <p> {{product.volume}}</p>
                    </v-card-text>
                  </v-card>
                </v-flex>
                
              
            </v-flex>

            <v-flex d-flex>
              <v-card width="100%"  flat tile>
                  
                    <input type="number" value="1" >
                    <v-btn class="ma-2" tile color="green" dark>
                        
                        <v-icon left> mdi-shopping-outline</v-icon> BUY NOW
                        
                        </v-btn>

               
                  
              </v-card>
            </v-flex>
            
            
            
          </v-layout>
        </v-flex>
        
       
      </v-layout>
    </v-container>


</div>
</template>

<script>

import { fireApp } from '@/plugins/firebase'

export default {
    asyncData ({ params }) { // search engine friendly
    return fireApp.database().ref(`products/${params.productID}`).once('value')
      .then(snapShot => {
        let product = snapShot.val()
        product.key = params.id // snapShot.key
        return { product }
      })
  },
  
    
}
</script>