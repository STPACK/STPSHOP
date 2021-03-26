<template>
  <div>
    <h2>Administrator</h2>
    <h3>Create new admin</h3>
    <v-container fluid d-flex>
      <v-row>
        <v-col xs12 md4>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="onSingup"
          >
            <v-text-field
              v-model="SingupData.name"
              :rules="rules.nameRules"
              label="Name"
              placeholder="ADMIN ex.. admin1"
              required
            ></v-text-field>

            <v-text-field
              v-model="SingupData.email"
              :rules="rules.emailRules"
              placeholder="Use @stpack.com"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="SingupData.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="rules.passwordRules"
              :type="show1 ? 'text' : 'password'"
              label="Password"
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="warning"
              class="mr-4"
              type="sumbit"
              :loading="busy"
            >
              Singup
            </v-btn>
            <v-btn color="error" class="mr-4" @click="reset">clear</v-btn>
          </v-form>
          <errorbar :error="error" />
        </v-col>
        <v-col xs12 md8>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Administrators</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>1212</td>
              </tr>
            </tbody>
          </table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import errorbar from "@/components/errorbar";
import mainAPI from "@/mixins/mainAPI";
export default {
  data() {
    return {
      SingupData: {
        name: "",
        password: "",
        email: ""
      },
      valid: true,
      show1: false
    };
  },
  mixins: [mainAPI],
  components: {
    errorbar
  },

  methods: {
    onSingup() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("admin/createAdmin", this.SingupData);
      }
    },
    reset() {
      this.$store.commit("clearError"),
        (this.SingupData.name = ""),
        (this.SingupData.email = ""),
        (this.SingupData.password = "");
    },
    jobsDone() {
      this.removeErrors();
      this.$router.replace("/");
    }
  }
};
</script>
