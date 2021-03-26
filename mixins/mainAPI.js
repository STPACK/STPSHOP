export default {
  data() {
    return {
      rules: {
        nameRules: [
          v => !!v || "Name is required",
          v => v.length <= 15 || "Name must be less than 10 characters"
        ],
        lastNRules: [
          v => !!v || "Name is required",
          v => v.length <= 20 || "Name must be less than 10 characters"
        ],
        emailRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        passwordRules: [
          v => !!v || "password is required",
          v => v.length >= 6 || "password must be more than 6 characters"
        ],
        phoneRules: [
          v => !!v || "phone is required",
          v => v.length >= 10 || "password must be more than 6 characters"
        ],
        required: [v => !!v || "required !!"]
      }
    };
  },
  methods: {
    removeErrors() {
      this.$store.commit("clearError");
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    busy() {
      return this.$store.getters.busy;
    },
    JobDone() {
      return this.$store.getters.JobDone;
    }
  },
  watch: {
    JobDone(value) {
      if (value) {
        this.$store.commit("setJobDone", false);
        this.jobsDone();
      }
    }
  }
};
