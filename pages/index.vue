<template>
  <div>
    <div class="contrainer">
      <v-container fluid grid-list-md>
        <panel />
        <v-layout row wrap>
          <v-flex d-flex xs12 md8>
            <v-carousel
              cycle
              height="400"
              hide-delimiter-background
              hide-delimiters
              show-arrows-on-hover
            >
              <v-carousel-item v-for="(slide, i) in slides" :key="i">
                <v-sheet :color="colors[i]" height="100%">
                  <v-row class="fill-height" align="center" justify="center">
                    <div class="display-3">{{ slide }} Slide</div>
                  </v-row>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </v-flex>
          <v-flex d-flex xs12 md4>
            <v-layout row wrap>
              <v-flex v-for="n in 2" :key="n" d-flex xs6 md12>
                <v-card color="red lighten-2" dark>
                  <v-card-text>{{ lorem.slice(0, 90) }}</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <v-card
      tile
      flat
      dark
      color="blue-grey darken-3"
      width="100%"
      class="d-flex justify-center"
    >
      <v-card color="blue-grey darken-3" flat>
        <v-card-title>
          <v-icon large left> mdi-twitter</v-icon> Free Shipping</v-card-title
        >
        <v-card-subtitle>Free delivery over 2000 bath</v-card-subtitle>
      </v-card>
      <v-card color="blue-grey darken-3" flat>
        <v-card-title>
          <v-icon large left> mdi-twitter</v-icon>Free Returns</v-card-title
        >
        <v-card-subtitle>hassle return </v-card-subtitle>
      </v-card>
      <v-card color="blue-grey darken-3" flat>
        <v-card-title>
          <v-icon large left> mdi-twitter</v-icon>Secure Shopping</v-card-title
        >
        <v-card-subtitle>best security feature</v-card-subtitle>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import panel from "@/components/panel-brand";

export default {
  components: {
    panel
  },
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
    };
  }
};
</script>

<style scoped>
.contrainer {
  width: 82%;
  margin: 0 auto;
}
</style>
