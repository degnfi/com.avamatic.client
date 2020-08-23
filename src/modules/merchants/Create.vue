<template>
  <div class="page-content">
    <div class="page-title">
      <div class="row justify-content-between align-items-center">
        <div
          class="col-md-6 d-flex align-items-center justify-content-between justify-content-md-start mb-3 mb-md-0"
        >
          <div class="d-inline-block">
            <h5 class="h4 d-inline-block font-weight-400 mb-0 text-white">
              Create merchant
            </h5>
          </div>
        </div>
        <div
          class="col-md-6 d-flex align-items-center justify-content-between justify-content-md-end"
        >
          <div class="actions actions-dark d-inline-block">
            <router-link to="/merchants" class="action-item ml-md-4">
              <i class="far fa-arrow-right mr-2"></i>Active merchants
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="form-group">
          <label class="form-control-label">
            xPub key (Extended public key)
          </label>
          <p>
            <small
              >Extended public key (xPub) will be used for generating a unique,
              unused corresponding address for your customers to send payment
              to.</small
            >
          </p>
          <input type="text" v-model="xpub" class="form-control" disabled />
        </div>
        <div class="form-group">
          <label class="form-control-label">
            Merchant name
          </label>
          <input type="text" v-model="name" class="form-control" />
        </div>
        <div class="form-group">
          <label class="form-control-label">
            Merchant description
          </label>
          <input type="text" v-model="description" class="form-control" />
        </div>
        <div class="form-group">
          <label class="form-control-label">
            Merchant logo
          </label>
          <input type="text" v-model="logo" class="form-control" />
        </div>
        <div
          class="form-group"
          style="background:#eee;padding:20px;min-height:240px"
        >
          <div class="float-right" @click="add_asset_row()">
            <button
              class="btn btn-sm btn-success btn-icon-only rounded-circle mt-1"
            >
              <span class="btn-inner--icon"><i class="far fa-plus"></i></span>
            </button>
          </div>
          <label class="form-control-label">
            Accepted assets
          </label>
          <p>
            <small
              >To get payment, you must specify the assets that will be accepted
              on checkout.</small
            >
          </p>
          <div class="row" v-for="(asset, index) in assets">
            <div class="col-12 col-md-4">
              <div class="form-group">
                <label class="form-control-label">
                  Asset code
                </label>
                <input
                  type="text"
                  v-model="asset.asset_code"
                  class="form-control"
                  placeholder="BTC"
                />
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-group">
                <label class="form-control-label">
                  Asset ID
                </label>
                <input
                  type="text"
                  class="form-control"
                  v-model="asset.asset_id"
                  placeholder="RAbZs9XX2ZBosktASJmLS75BgzPse3uMjuphSUwTMDvJr5hr3Ki"
                />
              </div>
            </div>
            <div class="col-12 col-md-1">
              <div class="form-group">
                <label class="form-control-label">
                  Remove
                </label>
                <button
                  class="btn btn-sm btn-danger btn-icon-only rounded-circle mt-1"
                  @click="remove_asset_row(index)"
                >
                  <span class="btn-inner--icon"
                    ><i class="far fa-minus"></i
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-control-label">
            IPN URL
          </label>
          <p>
            <small>IPN URL to be notified when a payment is received.</small>
          </p>
          <input type="text" v-model="ipn" class="form-control" />
        </div>
        <div class="form-group">
          <label class="form-control-label">
            Successfull Transaction URL
          </label>
          <p>
            <small
              >Successfull Transaction URL to be redirected when a payment is
              completed.</small
            >
          </p>
          <input type="text" v-model="success_url" class="form-control" />
        </div>
        <div class="form-group">
          <label class="form-control-label">
            Cancel Transaction URL
          </label>
          <p>
            <small
              >Cancel Transaction URL to be redirected when a payment is not
              completed.</small
            >
          </p>
          <input type="text" v-model="cancel_url" class="form-control" />
        </div>
        <div class="text-right">
          <button
            type="button"
            @click="create_merchant()"
            class="btn btn-md btn-primary rounded-pill"
          >
            Create merchant
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: null,
      description: null,
      logo: null,
      ipn: null,
      success_url: null,
      cancel_url: null,
      assets: [
        {
          asset_code: "AVA",
          asset_id: "AVA",
        },
      ],
    };
  },
  computed: {
    xpub() {
      return JSON.parse(this.$store.getters.SEND_WALLET).public_extended_key;
    },
  },
  methods: {
    create_merchant() {
      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + this.$store.getters.SEND_TOKEN,
        },
      };
      this.axios
        .post(
          "merchants/create",
          {
            xpub: this.xpub,
            name: this.name,
            description: this.description,
            assets: this.assets,
            logo: this.logo,
            ipn: this.ipn,
            success_url: this.success_url,
            cancel_url: this.cancel_url,
          },
          axiosConfig
        )
        .then(() => {
          this.$notify({
            group: "platformNotification",
            title: "Successful.",
            text: "Merchant successfuly created!",
            type: "alert-success",
          });
          this.$router.push("/merchants");
        })
        .catch(() => {
          this.$notify({
            group: "platformNotification",
            title: "Error.",
            text: "Error!",
            type: "alert-danger",
          });
        });
    },
    add_asset_row() {
      document.createElement("tr");
      this.assets.push({
        asset_code: "",
        asset_id: "",
      });
    },
    remove_asset_row(index) {
      if (this.assets.length > 1) {
        this.assets.splice(index, 1);
      }
    },
  },
};
</script>
