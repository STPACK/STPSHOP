<template>
  <div>
    <v-menu :close-on-content-click="false" open-on-hover offset-y>
      <template v-slot:activator="{ on }">
        <v-btn color="warning" class="ml-12" text tile v-on="on">
          <v-icon>mdi-export-variant</v-icon>Categories
        </v-btn>
      </template>

      <v-card class="mx-auto">
        <v-tabs vertical>
          <v-tab hover>
            <v-icon left>mdi-account</v-icon>
            Option 1
          </v-tab>
          <v-tab hover>
            <v-icon left>mdi-lock</v-icon>
            Option 2
          </v-tab>
          <v-tab>
            <v-icon left>mdi-access-point</v-icon>
            Option 3
          </v-tab>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  Sed aliquam ultrices mauris. D
                </p>

                <p>
                  Nam ipsum risus, rutrum vitae, vestibulum eu
                </p>

                <p class="mb-0">
                  Phasellus dolor. Fusce neque. Fusce fermentum , tincidunt et,
                  tincidunt eget, semper nec, quam. Phasellus blandit leo ut
                  odio.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  Morbi nec metus. Suspendisse faucibus, nunc et pelles tellus,
                  vitae iaculis lacus elit id tortor. Sed mollis, eros et
                  ultrices tempus, mauris ipsum aliquam libero, non adipiscing
                  dolor urna a orci. Curabitur ligula sapien, tincidunt non,
                  euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
                </p>

                <p>
                  Suspendisse feugiat. Suspendisse faucibus, nunt amet ultrices
                  semper, ligula arcu tristique sapien, a accumsan nisi mauris
                  ac eros. In hac habitasse platea dictumst. Fusce ac felis sit
                  amet ligula pharetra condimentum.
                </p>

                <p>
                  Sed consequat, leo eget bibendum sodales, augue velitNam
                  commodo suscipit quam. In consectetuer turpis ut velit. Sed
                  cursus turpis vitae tortor. Aliquam eu nunc.
                </p>

                <p>
                  Etiam ut purus mattis mauris sodales aliquam. Untum odio nec
                  arcu.
                </p>

                <p class="mb-0">
                  Donec venenatis vulputate lorem. Aenean vi arcu. Suspendisse
                  enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  Fusce a quam. Phasellus nec sem in justo pellentesque , a
                  accums eget, vestibulum et, tempor auctor, justo.
                </p>

                <p class="mb-0">
                  Cras sagittis. Phasellus nec sem in jod ut, mi. Donec qu. Nam
                  at tortor in tellus interdum sagittis.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-menu>
  </div>
</template>
