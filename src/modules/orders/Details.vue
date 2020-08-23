<template>
  <div class="page-content" v-if="details">
    <div class="page-title">
      <div class="row justify-content-between align-items-center">
        <div
          class="col-md-6 d-flex align-items-center justify-content-between justify-content-md-start mb-3 mb-md-0"
        >
          <div class="d-inline-block">
            <h5 class="h4 d-inline-block font-weight-400 mb-0 text-white">
              Order details
              <span class="badge badge-success" v-if="details.is_paid"
                >Paid</span
              >
              <span
                class="badge badge-warning"
                v-else-if="
                  !details.is_paid &&
                    new Date(details.createdAt).getTime() + 1000 * 60 * 30 >
                      new Date().getTime()
                "
                >Pending payment</span
              >
              <span class="badge badge-danger" v-else
                >Failed</span
              >
            </h5>
          </div>
        </div>
        <div
          class="col-md-6 d-flex align-items-center justify-content-between justify-content-md-end"
        >
          <div class="actions actions-dark d-inline-block">
            <router-link to="/orders" class="action-item ml-md-4">
              <i class="far fa-arrow-right mr-2"></i>Back to orders
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="card page">
      <div class="form-group">
        <label class="form-control-label">
          Order ID
        </label>
        <input
          type="text"
          v-model="details._id"
          class="form-control"
          disabled
        />
      </div>
      <div class="form-group">
        <label class="form-control-label">
          Item
        </label>
        <input
          type="text"
          v-model="details.item_name + ' / Quantity: ' + details.item_quantity"
          class="form-control"
          disabled
        />
      </div>
      <div class="form-group">
        <label class="form-control-label">
          Payment asset
        </label>
        <input
          type="text"
          v-model="details.asset_code"
          class="form-control"
          disabled
        />
      </div>
      <div class="form-group">
        <label class="form-control-label">
          Amount
        </label>
        <input
          type="text"
          v-model="details.amount"
          class="form-control"
          disabled
        />
      </div>
      <div class="form-group">
        <label class="form-control-label">
          Derivation path
        </label>
        <p>
          <small>Unique derivation path of payment address. </small>
        </p>
        <input
          type="text"
          v-model="details.derivation_path"
          class="form-control"
          disabled
        />
      </div>
      <label class="form-control-label">
        Payment wallet
      </label>
      <p>
        <small
          >Avaxchain generates payment addresses via xPub that you provide, and
          each of these payment addresses has a unique public key and private
          key. Each address is used for only one payment. Here you are presented
          with the information you need to manage the address of the current
          order. If you wish, you can transfer the payment wallet to your
          current Avaxchain account you are using.
        </small>
      </p>
      <div
        class="form-group"
        style="background:#000;padding:20px;min-height:240px;color:#fff"
      >
        <label class="form-control-label">
          Public key
        </label>
        <p>
          <small
            >Unique payment address which is generated for the order.
          </small>
        </p>
        <input
          type="text"
          v-model="payment_account.publicKey"
          class="form-control"
          disabled
        />
        <label class="form-control-label mt-3">
          Private key
        </label>
        <p>
          <small>Private key which is belongs to the payment address. </small>
        </p>
        <input
          type="text"
          v-model="payment_account.privateKey"
          class="form-control"
          disabled
        />
        <button
          class="btn btn-md btn-success mt-3"
          v-if="details.is_paid"
          @click="transfer()"
        >
          Transfer all received amount to my Avaxchain account
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AvaHDWallet from "ava-hd-wallet";
import BN from "bn.js";
import EventBus from "@/event_bus";
export default {
  data() {
    return {
      details: null,
      payment_account: null,
    };
  },
  created() {
    this.fetch_details(this.$route.params.id);
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    xprv() {
      return JSON.parse(this.$store.getters.SEND_WALLET).private_extended_key;
    },
    wallet() {
      return JSON.parse(this.$store.getters.SEND_WALLET);
    },
  },
  methods: {
    fetch_details(id) {
      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + this.$store.getters.SEND_TOKEN,
        },
      };
      this.axios
        .get("orders/" + id + "/details", axiosConfig)
        .then((response) => {
          this.details = response.data;
          AvaHDWallet.setPath(response.data.derivation_path);
          this.payment_account = AvaHDWallet.fromExtendedPrivateKey(this.xprv);
        });
    },
    async transfer() {
      try {
        let myKeychain = this.$ava.keyChain();
        const importExternal = myKeychain.importKey(
          this.payment_account.privateKey
        );
        myKeychain.getKey(importExternal);
        let myAddresses = this.$ava.keyChain().getAddresses();
        let addressStrings = this.$ava.keyChain().getAddressStrings();
        let utxos = await this.$ava.getUTXOs(myAddresses);
        let assetid = this.details.asset_id;
        if (this.details.asset_id == "AVA") {
          assetid = "21d7KVtPrubc5fHr6CGNcgbUb4seUjmZKr35ZX7BZb5iP8pXWA";
        }
        this.$ava.getAssetDescription(assetid).then(async (asset_detail) => {
          let sendAmount = new BN(
            this.details.amount * Math.pow(10, asset_detail.denomination)
          );
          let friendsAddress = this.wallet.public_key;
          let unsignedTx = await this.$ava.buildBaseTx(
            utxos,
            sendAmount,
            [friendsAddress],
            addressStrings,
            addressStrings,
            assetid
          );
          let signedTx = this.$ava.signTx(unsignedTx);
          let txid = await this.$ava.issueTx(signedTx);
          let status = await this.$ava.getTxStatus(txid);
          this.$notify({
            group: "platformNotification",
            title: "Successful.",
            text: "Successfuly transfered!",
            type: "alert-success",
          });
          // update account
          EventBus.$emit("update_account");
          this.$router.push("/wallet");
        });
      } catch (e) {
        this.$notify({
          group: "platformNotification",
          title: "Error.",
          text: e.message,
          type: "alert-danger",
        });
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
