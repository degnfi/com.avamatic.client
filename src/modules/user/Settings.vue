<template>
  <div class="page-content">
    <div class="page-title">
      <div class="row justify-content-between align-items-center">
        <div
          class="col-md-6 d-flex align-items-center justify-content-between justify-content-md-start mb-3 mb-md-0"
        >
          <div class="d-inline-block">
            <h5 class="h4 d-inline-block font-weight-400 mb-0 text-white">
              Account settings
            </h5>
          </div>
        </div>
        <div
          class="col-md-6 d-flex align-items-center justify-content-between justify-content-md-end"
        ></div>
      </div>
    </div>
    <div class="row">
      <Sidebar />
      <div class="col-lg-8 order-lg-1">
        <div class="card" style="height:685px">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-control-label">UID / Username</label>
                  <input
                    class="form-control"
                    type="text"
                    v-model="$store.getters.SEND_UID"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-control-label"
                    >Wallet derivation path</label
                  >
                  <input
                    class="form-control"
                    type="text"
                    value="m/44/570/0"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-control-label">Private key</label>
                  <input
                    class="form-control"
                    type="text"
                    placeholder="hidden"
                    v-model="wallet.secret_key"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-control-label"
                    >Merchant accounts derivation path</label
                  >
                  <input
                    class="form-control"
                    type="text"
                    value="m/merchant/index"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-control-label">Extended public key</label>
                  <input
                    class="form-control"
                    type="text"
                    v-model="wallet.public_extended_key"
                    placeholder="hidden"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-control-label">Extended private key</label>
                  <input
                    class="form-control"
                    type="text"
                    placeholder="hidden"
                    v-model="wallet.private_extended_key"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/modules/user/Sidebar.vue";

export default {
  computed: {
    wallet() {
      return JSON.parse(this.$store.getters.SEND_WALLET);
    },
  },
  components: {
    Sidebar,
  },
};
</script>
