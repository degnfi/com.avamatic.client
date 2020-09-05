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
            ><i class="fad fa-mountain"></i> Avaxchain</span
          >
        </router-link>
        <div class="row justify-content-center mb-5">
          <div class="col-sm-8 col-lg-6">
            <div class="card shadow zindex-100">
              <div class="card-body px-md-5 py-5">
                <div class="mb-3">
                  <h6 class="h3">Create account</h6>
                  <p class="text-muted mb-0">
                    Have an account and unlock access to the entire AVAX network
                  </p>
                </div>
                <div
                  style="background: rgb(0, 0, 0); padding: 25px; border-radius: 5px;"
                >
                  <div class="form-group">
                    <div class="input-group mt-3">
                      <label class="form-control-label text-white"
                        >mnemonic recovery passphrase
                      </label>
                      <div class="input-group input-group-merge">
                        <input
                          type="email"
                          class="form-control"
                          v-model="mnemonic"
                          placeholder="name@example.com"
                          disabled
                        />
                        <button
                          class="btn btn-dark btn-xs copy-btn ml-1"
                          v-clipboard:copy="mnemonic"
                          v-clipboard:success="on_copy"
                        >
                          <svg
                            class="bi bi-clipboard"
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4 1.5H3a2 2 0 00-2 2V14a2 2 0 002 2h10a2 2 0 002-2V3.5a2 2 0 00-2-2h-1v1h1a1 1 0 011 1V14a1 1 0 01-1 1H3a1 1 0 01-1-1V3.5a1 1 0 011-1h1v-1z"
                              clip-rule="evenodd"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M9.5 1h-3a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 005 1.5v1A1.5 1.5 0 006.5 4h3A1.5 1.5 0 0011 2.5v-1A1.5 1.5 0 009.5 0h-3z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <p class="text-danger">
                    If you lose this phrase, you could lose your wallet.
                  </p>
                  <div class="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      id="verify"
                      v-model="checked"
                    />
                    <label class="form-check-label" for="verify" style="color:white"
                      >I've saved my recovery phrase</label
                    >
                  </div>
                </div>
                <div class="form-group mt-3">
                  <label class="form-control-label">Account ID</label>
                  <div class="input-group input-group-merge">
                    <input
                      type="email"
                      class="form-control"
                      v-model="username"
                      placeholder="name@example.com"
                      disabled
                    />
                    <div class="input-group-append">
                      <span class="input-group-text"
                        ><a
                          @click="generate_uid()"
                          style="color:black"
                          data-toggle="password-text"
                          data-target="#input-password"
                          ><i class="far fa-wind-turbine"></i></a
                      ></span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-control-label">Email</label>
                  <div class="input-group input-group-merge">
                    <input
                      type="email"
                      class="form-control"
                      v-model="email"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>
                <div class="form-group mb-4">
                  <label class="form-control-label">Password</label>
                  <div class="input-group input-group-merge">
                    <input
                      type="password"
                      class="form-control"
                      id="input-password"
                      v-model="password"
                      placeholder="********"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-control-label">Confirm password</label>
                  <div class="input-group input-group-merge">
                    <input
                      type="password"
                      class="form-control"
                      id="input-password-confirm"
                      v-model="confirm_password"
                      placeholder="********"
                    />
                  </div>
                </div>
                <div class="mt-4">
                  <button
                    type="button"
                    class="btn btn-md btn-primary btn-icon rounded-pill"
                    @click="signup()"
                    :disabled="!checked || password != confirm_password"
                  >
                    <span class="btn-inner--text">Create my account</span>
                    <span class="btn-inner--icon"
                      ><i class="far fa-long-arrow-alt-right"></i
                    ></span>
                  </button>
                </div>
              </div>
              <div class="card-footer px-md-5">
                <small>Already have an account?</small>
                <router-link to="/login" class="text-secondary small font-weight-bold">
                  Log in</router-link
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
import AvaHDWallet from "ava-hd-wallet";
import { v4 as uuidv4 } from "uuid";
const avalanche = require("avalanche");

export default {
  data() {
    return {
      xchain: null,
      username: null,
      password: null,
      confirm_password: null,
      email: null,
      mnemonic: null,
      signature: null,
      encrypted_block: null,
      checked: false,
    };
  },
  created() {
    this.xchain = this.$ava

    this.username = uuidv4();
    this.generate_wallet();
  },
  methods: {
    generate_wallet() {
      this.mnemonic = AvaHDWallet.generateMnemonic(); // -> "mushroom crew fluid nephew movie roof guess gas intact actor off race guilt genuine solar move save quarter impact great stove print tourist damp"
      const wallet = AvaHDWallet.fromMnemonic(this.mnemonic);

      let keychain = this.xchain.keyChain();

      let bintools = avalanche.BinTools.getInstance();

      let mypk = bintools.avaDeserialize(wallet.privateKey);
      let addr = keychain.importKey(mypk);
      let keypair = keychain.getKey(addr);

      this.signature = keypair.sign("its mert").toString("hex");

      this.wallet = JSON.stringify({
        public_key: wallet.publicKey,
        secret_key: wallet.privateKey,
        public_extended_key: wallet.publicExtendedKey,
        private_extended_key: wallet.privateExtendedKey,
      });
    },
    signup() {
      this.encrypted_block = this.encrypt_data(
        this.wallet,
        this.username + ":" + this.password
      );
      const post_data = {
        username: this.username,
        email: this.email,
        signature: this.signature,
        sync: JSON.stringify({
          pbkdf2_iterations: "10000",
          payload: this.encrypted_block,
        }),
      };

      this.axios.post("signup", post_data).then((response) => {
        this.$notify({
          group: "platformNotification",
          title: "Successful.",
          text: "Successfuly registered!",
          type: "alert-success",
        });
        this.$store.commit("UPDATE_WALLET", this.wallet);
        this.$store.commit("UPDATE_TOKEN", response.data.token);
        this.$store.commit("UPDATE_LOGGED_IN", true);
        this.$store.commit("UPDATE_UID", this.username);
        this.$router.push("/dashboard");
      });
    },
    encrypt_data(msg, pass) {
      var salt = CryptoJS.lib.WordArray.random(128 / 8);
      var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: 16,
        iterations: 10000,
      });
      var iv = CryptoJS.lib.WordArray.random(128 / 8);
      var encrypted = CryptoJS.AES.encrypt(msg, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
      });
      var transitmessage =
        salt.toString() + iv.toString() + encrypted.toString();
      return transitmessage;
    },
    generate_uid() {
      this.username = uuidv4();
    },
    on_copy: function() {
      this.$notify({
        group: "platformNotification",
        title: "Success",
        text: "You just copied!",
        type: "alert-success",
      });
    },
  },
};
</script>
