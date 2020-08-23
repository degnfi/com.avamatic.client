<template>
  <div class="page-content">
    <div class="page-title">
      <div class="row justify-content-between align-items-center">
        <div
          class="col-md-6 d-flex align-items-center justify-content-between justify-content-md-start mb-3 mb-md-0"
        >
          <div class="d-inline-block">
            <h5 class="h4 d-inline-block font-weight-400 mb-0 text-white">
              Create an asset
            </h5>
          </div>
        </div>
        <div
          class="col-md-6 d-flex align-items-center justify-content-between justify-content-md-end"
        >
          <div class="actions actions-dark d-inline-block">
            <router-link to="/wallet" class="action-item ml-md-4">
              <i class="far fa-arrow-right mr-2"></i>Back to wallet
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="form-group">
          <label class="form-control-label">
            Asset name
          </label>
          <p>
            <small
              >Asset name is a human-readable name for the asset. Not
              necessarily unique.</small
            >
          </p>
          <input
            type="text"
            v-model="name"
            class="form-control"
            placeholder="Cool Asset"
          />
        </div>
        <div class="form-group">
          <label class="form-control-label">
            Asset symbol
          </label>
          <p>
            <small
              >Asset symbol is a shorthand symbol for the asset. Between 0 and 4
              characters. Not necessarily unique.</small
            >
          </p>
          <input
            type="text"
            v-model="symbol"
            class="form-control"
            placeholder="COOL"
          />
        </div>
        <div class="form-group">
          <label class="form-control-label">
            Asset denomination
          </label>
          <p>
            <small
              >Determines how balances of this asset are displayed by user
              interfaces. If denomination is 0, 100 units of this asset are
              displayed as 100. If denomination is 1, 100 units of this asset
              are displayed as 10.0. If denomination is 2, 100 units of this
              asset are displays as .100, etc.</small
            >
          </p>
          <input
            type="number"
            v-model.number="denomination"
            class="form-control"
            placeholder="9"
          />
        </div>
        <div
          class="form-group"
          style="background:#000;padding:20px;min-height:240px;color:#fff"
        >
          <div class="float-right" @click="add_holder_row()">
            <button
              class="btn btn-sm btn-success btn-icon-only rounded-circle mt-1"
            >
              <span class="btn-inner--icon"><i class="far fa-plus"></i></span>
            </button>
          </div>
          <label class="form-control-label">
            Initial holders
          </label>
          <p>
            <small
              >Specifies that address holds amount units of the asset at
              genesis.</small
            >
          </p>
          <div class="row" v-for="(account, index) in initial_holders">
            <div class="col-12 col-md-3">
              <div class="form-group">
                <label class="form-control-label">
                  Address
                </label>
                <input
                  type="text"
                  v-model="account.address"
                  class="form-control"
                  placeholder="X-HoLd3R4DDRes8ZSyNpCdzbXBE5CT5CUv"
                />
              </div>
            </div>
            <div class="col-12 col-md-3">
              <div class="form-group">
                <label class="form-control-label">
                  Amount
                </label>
                <input
                  type="number"
                  class="form-control"
                  v-model.number="account.amount"
                  placeholder="50000000"
                />
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="form-group">
                <label class="form-control-label">
                 <small>Real issued amount ( calc by: amount / 10 ^ {{ denomination }})</small>
                </label>
                <input
                  type="text"
                  class="form-control"
                  v-model="(account.amount / Math.pow(10, denomination)).toFixed(denomination)"
                  disabled
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
                  @click="remove_holder_row(index)"
                >
                  <span class="btn-inner--icon"
                    ><i class="far fa-minus"></i
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="text-right">
          <button
            type="button"
            @click="create_asset()"
            class="btn btn-md btn-primary rounded-pill"
          >
            Create asset
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BN from "bn.js";

export default {
  data() {
    return {
      name: null,
      symbol: null,
      denomination: 9,
      form_amount: null,
      initial_holders: [
        {
          address: JSON.parse(this.$store.getters.SEND_WALLET).public_key,
          amount: 1000,
        },
      ],
    };
  },
  methods: {
    async create_asset() {
      this.$ava
        .createFixedCapAsset(
          null,
          null,
          this.name,
          this.symbol,
          this.denomination,
          this.initial_holders
        )
        .then(() => {
          this.$notify({
            group: "platformNotification",
            title: "Successful.",
            text: "Successfuly done!",
            type: "alert-success",
          });
          setTimeout(() => {
            this.$router.push("/wallet");
          }, 1500);
        })
        .catch((e) => {
          this.$notify({
            group: "platformNotification",
            title: "Error.",
            text: e,
            type: "alert-danger",
          });
        });
    },
    add_holder_row() {
      document.createElement("tr");
      this.initial_holders.push({
        address: "",
        amount: "",
      });
    },
    remove_holder_row(index) {
      if (this.initial_holders.length > 1) {
        this.initial_holders.splice(index, 1);
      }
    },
    getAddresses(input) {
      let result = [];
      for (let i = 0; i < input.length; i++) {
        result.push(input[i].toBuffer());
      }
      return result;
    },
  },
};
</script>
