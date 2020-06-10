<template>
  <div class="page-content" v-if="details">
    <div class="page-title">
      <div class="row justify-content-between align-items-center">
        <div
          class="col-md-6 d-flex align-items-center justify-content-between justify-content-md-start mb-3 mb-md-0"
        >
          <div class="d-inline-block">
            <h5 class="h4 d-inline-block font-weight-400 mb-0 text-white">
              Merchant details
            </h5>
          </div>
        </div>
        <div
          class="col-md-6 d-flex align-items-center justify-content-between justify-content-md-end"
        >
          <div class="actions actions-dark d-inline-block">
            <router-link to="/merchants" class="action-item ml-md-4">
              <i class="far fa-arrow-right mr-2"></i>Back to merchants list
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="card page">
      <h5 class="mb-3">API</h5>
      <div class="form-group">
        <label class="form-control-label">
          xPub
        </label>
        <p>
          <small
            >Extended public key (xPub) will be used for generating a unique,
            unused corresponding address for your customers to send payment to.
          </small>
        </p>
        <input
          type="text"
          v-model="details.xpub"
          class="form-control"
          disabled
        />
      </div>
      <div class="form-group">
        <label class="form-control-label">
          Derivation path
        </label>
        <p>
          <small
            >You need to use this derivation path to spend the received
            payments.
          </small>
        </p>
        <input
          type="text"
          v-model="'m/' + details.account + '/index'"
          class="form-control"
          disabled
        />
      </div>
      <div class="form-group">
        <label class="form-control-label">
          Merchant Key
        </label>
        <p>
          <small>Unique merchant identifier key to create order. </small>
        </p>
        <input
          type="text"
          v-model="details._id"
          class="form-control"
          disabled
        />
      </div>
      <div class="form-group">
        <label class="form-control-label">
          Merchant Secret Key
        </label>
        <p>
          <small>Secret key to verify the IPN request.</small>
        </p>
        <input
          type="text"
          v-model="details.secret"
          class="form-control"
          disabled
        />
      </div>
      <hr />
      <h5 class="mb-3">Customization</h5>
      <div class="form-group">
        <label class="form-control-label">
          Merchant name
        </label>
        <input type="text" v-model="details.name" class="form-control" />
      </div>
      <div class="form-group">
        <label class="form-control-label">
          Merchant description
        </label>
        <input type="text" v-model="details.description" class="form-control" />
      </div>
      <div class="form-group">
        <label class="form-control-label">
          Merchant logo
        </label>
        <input type="text" v-model="details.logo" class="form-control" />
      </div>
      <div class="form-group">
        <label class="form-control-label">
          IPN URL
        </label>
        <input type="text" v-model="details.ipn" class="form-control" />
      </div>
      <div class="form-group">
        <label class="form-control-label">
          Successfull Transaction URL
        </label>
        <input type="text" v-model="details.success_url" class="form-control" />
      </div>
      <div class="form-group">
        <label class="form-control-label">
          Cancel Transaction URL
        </label>
        <input type="text" v-model="details.cancel_url" class="form-control" />
      </div>
      <hr />
      <h5 class="mb-3">Assets</h5>
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
        <div class="row" v-for="(asset, index) in details.assets">
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
      <button
        type="button"
        class="btn btn-md btn-success rounded-pill mr-auto"
        disabled
      >
        Save not available
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      details: null,
    };
  },
  created() {
    this.fetch_details(this.$route.params.id);
  },
  methods: {
    fetch_details(id) {
      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + this.$store.getters.SEND_TOKEN,
        },
      };
      this.axios.get("merchants/" + id, axiosConfig).then((response) => {
        this.details = response.data;
      });
    },
    add_asset_row() {
      document.createElement("tr");
      this.details.assets.push({
        asset_code: "",
        asset_id: "",
      });
    },
    remove_asset_row(index) {
      if (this.details.assets.length > 1) {
        this.details.assets.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
.page {
  padding: 25px;
}
</style>
