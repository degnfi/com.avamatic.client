<template>
  <div
    class="modal fade"
    id="depositModal"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content" v-if="asset">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Deposit {{ asset.symbol }}
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div>
            <p class="text-center">
              <img
                :src="
                  'https://chart.googleapis.com/chart?chs=150x150&amp;chld=M%7C0&amp;cht=qr&amp;chl=' +
                    wallet.public_key
                "
              />
            </p>
            <label class="mt-3">Public key</label>
            <div class="input-group input-group-md">
              <input
                type="text"
                v-model="wallet.public_key"
                class="form-control"
                disabled
              />
              <div class="input-group-append">
                <button
                  type="button"
                  class="btn btn-primary"
                  v-clipboard:copy="wallet.public_key"
                  v-clipboard:success="on_copy"
                >
                  <i class="fad fa-clipboard"></i>
                </button>
              </div>
            </div>
            <label class="mt-3">Asset code</label>
            <div class="input-group input-group-md">
              <input
                type="text"
                v-model="asset.symbol"
                class="form-control"
                disabled
              />
              <div class="input-group-append">
                <button
                  type="button"
                  class="btn btn-primary"
                  v-clipboard:copy="asset.name"
                  v-clipboard:success="on_copy"
                >
                  <i class="fad fa-clipboard"></i>
                </button>
              </div>
            </div>
            <label class="mt-3">Asset ID</label>
            <div class="input-group input-group-md">
              <input
                type="text"
                v-model="asset.asset"
                class="form-control"
                disabled
              />
              <div class="input-group-append">
                <button
                  type="button"
                  class="btn btn-primary"
                  v-clipboard:copy="asset.asset"
                  v-clipboard:success="on_copy"
                >
                  <i class="fad fa-clipboard"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    wallet() {
      return JSON.parse(this.$store.getters.SEND_WALLET);
    },
    asset() {
      return this.$parent.active_asset;
    },
  },
  methods: {
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
