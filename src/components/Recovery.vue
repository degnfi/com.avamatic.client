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
            ><i class="fad fa-spinner"></i> Avaxchain</span
          >
        </router-link>
        <div class="row justify-content-center mb-5">
          <div class="col-sm-8 col-lg-6">
            <div class="card shadow zindex-100 mb-10">
              <div class="card-body px-md-5 py-5">
                <div class="mb-3">
                  <h6 class="h3">Recovery</h6>
                  <p class="text-muted mb-0">
                    If you lose your password and secret key, the only chance to
                    recover your account is mnemonic seed
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
                          placeholder="mnemonic seed"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="btn btn-md btn-primary btn-icon rounded-pill"
                    @click="generate_wallet(mnemonic)"
                  >
                    <span class="btn-inner--text">Generate wallet</span>
                    <span class="btn-inner--icon"
                      ><i class="far fa-long-arrow-alt-right"></i
                    ></span>
                  </button>
                </div>
                <div v-if="wallet">
                  <div class="form-group mt-3">
                    <label class="form-control-label">Public key</label>
                    <div class="input-group input-group-merge">
                      <input
                        type="email"
                        class="form-control"
                        v-model="wallet.public_key"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="form-group mt-3">
                    <label class="form-control-label">Private key</label>
                    <div class="input-group input-group-merge">
                      <input
                        type="email"
                        class="form-control"
                        v-model="wallet.secret_key"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="form-group mt-3">
                    <label class="form-control-label"
                      >Public extended key</label
                    >
                    <div class="input-group input-group-merge">
                      <input
                        type="email"
                        class="form-control"
                        v-model="wallet.public_extended_key"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="form-group mt-3">
                    <label class="form-control-label"
                      >Private extended key</label
                    >
                    <div class="input-group input-group-merge">
                      <input
                        type="email"
                        class="form-control"
                        v-model="wallet.private_extended_key"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer px-md-5">
                <small>Looking for login?</small>
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
import AvaHDWallet from "ava-hd-wallet";

export default {
  data() {
    return {
      mnemonic: null,
      wallet: null,
    };
  },
  methods: {
    generate_wallet(mnemonic) {
      const wallet = AvaxHDWallet.fromMnemonic(mnemonic);

      this.wallet = {
        public_key: wallet.publicKey,
        secret_key: wallet.privateKey,
        public_extended_key: wallet.publicExtendedKey,
        private_extended_key: wallet.privateExtendedKey,
      };
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
