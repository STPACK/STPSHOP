<template>
<div>
    <BreadCrumbs
    :breadC='breadC'
        
    />
    
    <h1>page  Producr ID  : {{ $route.params.id}}</h1>
    <v-divider></v-divider>

   <v-container fluid grid-list-md pa-0 mt-4>
      <v-layout row wrap>

        <v-flex d-flex  md5>
          <v-card 
          width="100%"
          flat>
            <v-img
                        :src="'https://picsum.photos/500/300?image='+this.$route.params.id"
                        :lazy-src="`https://picsum.photos/10/6?image=`+this.$route.params.id"
                        aspect-ratio="1.5"
                    />
          </v-card>
        </v-flex>
       
        <v-flex d-flex  md7 >
          <v-layout row wrap >

            <v-flex d-flex md12 >
              <v-card  width="100%" flat>
                <v-tabs >
                    <v-tab  >รายละเอียดสินค้า</v-tab>
                    <v-tab >รายละเอียดบรรจุภัณฑ์สินค้า</v-tab>  
                    <v-tab-item
                        v-for="i in 2"
                        :key="i"
                    >
                        <v-card flat >
                            <v-card-text><p>รายละเอียดของ {{lorem}}  {{$route.params.id}} {{i}} </p> </v-card-text>
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
                                $600.00
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
                        <p>สินค้าคงเหลือ > 100</p>
                    </v-card-text>
                  </v-card>
                </v-flex>
                
              
            </v-flex>

            <v-flex d-flex>
              <v-card width="100%"  flat tile>
                  <v-card-action>
                    <input type="number" value="1" >
                    <v-btn class="ma-2" tile color="green" dark>
                        
                        <v-icon left> mdi-shopping-outline</v-icon> BUY NOW
                        
                        </v-btn>

                  </v-card-action>
                  
              </v-card>
            </v-flex>
            
            
            
          </v-layout>
        </v-flex>
        
       
      </v-layout>
    </v-container>


</div>
</template>

<script>
import BreadCrumbs from '@/components/menufile/breadCrumbs'
export default {
    components:{
        BreadCrumbs
    },
    data: () => ({
      breadC: [
        {
          text: 'Category',
          disabled: false,
          href: '/category/all',
        },
        {
          text: 'all',
          disabled: true,
          href: '/category/all',
        },
      ],
    lorem: `Lorem ipsum dolor sit amet, mel at clita quando. T
    e sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, 
    explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu,Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure neLorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure neLorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure ne alienum argumentum ius ad. Pri eu justo aeque torquatos.`
     
    }),

    
}
</script>