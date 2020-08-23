<template>
  <div class="page-content">
    <div class="page-title">
      <div class="row justify-content-between align-items-center">
        <div
          class="col-md-6 d-flex align-items-center justify-content-between justify-content-md-start mb-3 mb-md-0"
        >
          <div class="d-inline-block">
            <h5 class="h4 d-inline-block font-weight-400 mb-0 text-white">
              Wallet
              <i class="fas fa-redo" @click="fetch_assets()"></i>
            </h5>
          </div>
        </div>
        <div
          class="col-md-6 d-flex align-items-center justify-content-between justify-content-md-end"
        >
          <div class="actions actions-dark d-inline-block">
            <router-link to="/wallet/create" class="action-item ml-md-4">
              <i class="far fa-plus mr-2"></i>Create an asset on AVAX
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="card" style="height:735px">
      <div class="table-responsive">
        <table class="table align-items-center">
          <thead>
            <tr>
              <th scope="col" class="sort" data-sort="name">Asset</th>
              <th scope="col" class="sort" data-sort="budget">Balance</th>
              <th scope="col" class="sort" data-sort="status">Deposit</th>
              <th scope="col" class="sort" data-sort="status">Withdraw</th>
            </tr>
          </thead>
          <tbody class="list" v-if="!is_loading">
            <tr v-if="native_asset">
              <th scope="row">
                <div class="media align-items-center">
                  <img
                    src="@/assets/img/icons/avax-token.png"
                    style="padding:3px;width:45px;height:45px;background:#000"
                    class="rounded-circle"
                  />
                  <div class="media-body ml-3">
                    <span style="font-size:15px;color:#000"
                      >AVA - <span style="color:#696969">AVA</span></span
                    >
                  </div>
                </div>
              </th>
              <td style="font-size:17px;color:#000" v-if="native_asset.balance">
                {{ native_asset.balance }}
              </td>
              <td style="font-size:17px;color:#000" v-else>
                0
              </td>
              <td>
                <button
                  class="btn btn-success"
                  data-toggle="modal"
                  data-target="#depositModal"
                  @click="select_asset(native_asset)"
                >
                  <i class="fas fa-arrow-up"></i> Deposit
                </button>
              </td>
              <td>
                <button
                  class="btn btn-danger"
                  data-toggle="modal"
                  data-target="#withdrawModal"
                  @click="select_asset(native_asset)"
                >
                  <i class="fas fa-arrow-down"></i> Withdraw
                </button>
              </td>
            </tr>
            <tr v-for="(asset, index) in assets" :key="index">
              <th scope="row">
                <div class="media align-items-center">
                  <img
                    src="@/assets/img/icons/unknown.svg"
                    style="padding:3px;width:45px;height:45px;background:#000"
                    class="rounded-circle"
                  />
                  <div class="media-body ml-3">
                    <span style="font-size:15px;color:#000"
                      >{{ asset.symbol }} -
                      <span style="color:#696969">{{
                        short_it(asset.asset)
                      }}</span></span
                    >
                  </div>
                </div>
              </th>
              <td style="font-size:17px;color:#000">
                {{ asset.balance.toFixed(asset.denomination) }}
              </td>
              <td>
                <button
                  class="btn btn-success btn-md"
                  data-toggle="modal"
                  data-target="#depositModal"
                  @click="select_asset(asset)"
                >
                  <i class="fas fa-arrow-up"></i> Deposit
                </button>
              </td>
              <td>
                <button
                  class="btn btn-danger btn-md"
                  data-toggle="modal"
                  data-target="#withdrawModal"
                  @click="select_asset(asset)"
                >
                  <i class="fas fa-arrow-down"></i> Withdraw
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <i
              class="fas fa-circle-notch mt-3 ml-3 fa-spin"
              style="font-size:40px"
            ></i>
          </tbody>
        </table>
      </div>
    </div>
    <Deposit />
    <Withdraw />
  </div>
</template>

<script>
import EventBus from "@/event_bus";
import Deposit from "@/modules/user/modals/Deposit.vue";
import Withdraw from "@/modules/user/modals/Withdraw.vue";
import BN from "bn.js";

export default {
  components: {
    Deposit,
    Withdraw,
  },
  data() {
    return {
      is_loading: false,
      native_asset: {},
      active_asset: null,
      interval: null,
    };
  },
  created() {
    let vm = this;
    EventBus.$on("update_assets", function() {
      vm.fetch_assets();
    });

    this.fetch_assets();

    this.interval = window.setInterval(() => {
      this.fetch_assets();
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  computed: {
    assets() {
      return this.$store.getters.SEND_ASSETS;
    },
  },
  methods: {
    short_it(input) {
      if (typeof input == "string") {
        return input.substring(0, 9) + "...";
      } else {
        return "-";
      }
    },
    async fetch_assets() {
      this.is_loading = true;
      let wallet = JSON.parse(this.$store.getters.SEND_WALLET);

      this.$avax.getAllBalances(wallet.public_key).then((response) => {
        this.$store.commit("UPDATE_ASSETS_EMPTY");
        let assets = response;
        assets.forEach((asset, index) => {
          if (asset.asset == "AVA") {
            this.native_asset.name = asset.asset;
            this.native_asset.asset = asset.asset;
            this.native_asset.symbol = asset.asset;
            this.native_asset.balance = asset.balance / Math.pow(10, 9);
            this.native_asset.denomination = 9
            assets.splice(index, index);
          } else {
            this.$avax.getAssetDescription(asset.asset).then((asset_detail) => {
              assets[index]["balance"] =
                asset.balance / Math.pow(10, asset_detail.denomination);
              assets[index]["name"] = asset_detail.name;
              assets[index]["symbol"] = asset_detail.symbol;
              assets[index]["denomination"] = asset_detail.denomination;
              this.$store.commit("UPDATE_ASSETS", assets[index]);
            });
          }
        });
        this.is_loading = false;
      });

      // update account
      EventBus.$emit("update_account");
    },
    select_asset(asset) {
      this.active_asset = asset;
    },
  },
};
</script>
