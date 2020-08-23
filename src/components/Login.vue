<template>
  <div>
    <div class="py-5 d-flex align-items-center">
      <div class="w-100">
        <router-link
          to="/"
          class="logo d-md-block text-center mb-5 text-white"
          style="font-size:35px"
        >
          <span class="text-center"
            ><i class="fad fas fa-stroopwafel fa-spin"></i> Avaxchain</span
          >
        </router-link>
        <div class="row justify-content-center mb-5">
          <div class="col-sm-8 col-lg-6">
            <div class="card shadow zindex-100">
              <div class="card-body px-md-5 py-5">
                <div class="mb-5">
                  <h6 class="h3">Login</h6>
                  <p class="text-muted mb-0">
                    Sign in to your account to continue.
                  </p>
                </div>
                <span class="clearfix"></span>
                <form role="form">
                  <div class="form-group">
                    <label class="form-control-label">UID</label>
                    <div class="input-group input-group-merge">
                      <input
                        type="email"
                        class="form-control"
                        v-model="username"
                        placeholder="945c4c61-bbcb-4aaa-bacc-bfa67eaad620"
                      />
                    </div>
                  </div>
                  <div class="form-group mb-4">
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >
                      <div>
                        <label class="form-control-label">Password</label>
                      </div>
                      <div class="mb-2">
                        <router-link
                          to="/recovery"
                          class="small text-muted text-underline--dashed border-primary"
                          >Lost password?</router-link
                        >
                      </div>
                    </div>
                    <div class="input-group input-group-merge">
                      <input
                        type="password"
                        class="form-control"
                        id="input-password"
                        placeholder="Password"
                        v-model="password"
                      />
                    </div>
                  </div>
                  <div class="mt-4">
                    <button
                      type="button"
                      class="btn btn-md btn-primary rounded-pill"
                      @click="login()"
                    >
                      <span class="btn-inner--text">Sign in</span>
                      <span class="btn-icon">
                        <i class="far fa-long-arrow-alt-right"></i
                      ></span>
                    </button>
                  </div>
                </form>
              </div>
              <div class="card-footer px-md-5">
                <small>Don't you have an account?</small>
                <router-link to="/signup" class="text-secondary small font-weight-bold">
                  Signup</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
const avalanche = require("avalanche");

export default {
  data() {
    return {
      username: null,
      password: null,
      avm: null,
      is_loading: false,
    };
  },
  created() {
    this.avm = this.$avax
  },
  methods: {
    login() {
      this.axios
        .post("encrypted", { username: this.username })
        .then((response) => {
          var auth = this.username + ":" + this.password;
          var result = JSON.parse(response.data.encrypted);
          var secret = this.decrypt_data(result.payload, auth);

          this.$localStorage.set("is_logged", true);
          let keychain = this.avm.keyChain();

          let bintools = avalanche.BinTools.getInstance();

          let mypk = bintools.avaDeserialize(JSON.parse(secret).secret_key);
          let addr = keychain.importKey(mypk);
          let keypair = keychain.getKey(addr);

          this.signature = keypair.sign("its mert").toString("hex");

          this.$store.commit("UPDATE_WALLET", secret);
          this.axios
            .post("login", {
              username: this.username,
              signature: this.signature,
            })
            .then((response) => {
              this.$store.commit("UPDATE_LOGGED_IN", true);
              this.$store.commit("UPDATE_TOKEN", response.data.token);
              this.$store.commit("UPDATE_UID", this.username);
              this.$notify({
                group: "platformNotification",
                title: "Successful.",
                text: "Successfuly logged in!",
                type: "alert-success",
              });
              this.$router.push("/dashboard");
            })
            .catch((e) => {
              this.$notify({
                group: "platformNotification",
                title: "Error.",
                text: "Signature challenge error!",
                type: "alert-danger",
              });
            });
        })
        .catch(() => {
          this.$notify({
            group: "platformNotification",
            title: "Error.",
            text: "Account cannot be decrypt!",
            type: "alert-danger",
          });
        });
    },
    decrypt_data(transitmessage, pass) {
      var salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
      var iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32));
      var encrypted = transitmessage.substring(64);
      var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: 16,
        iterations: 10000,
      });
      var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
      });
      return decrypted.toString(CryptoJS.enc.Utf8);
    },
  },
};
</script>
