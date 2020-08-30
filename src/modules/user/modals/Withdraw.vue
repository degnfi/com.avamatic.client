<template>
  <div
    class="modal fade"
    id="withdrawModal"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content" v-if="asset">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Withdraw {{ asset.symbol }}
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
          <label class="mt-3">Destination</label>
          <div class="input-group input-group-md">
            <input type="text" v-model="destination" class="form-control" />
          </div>
          <label class="mt-3">Amount</label>
          <div class="input-group input-group-md">
            <input type="text" v-model="amount" class="form-control" />
          </div>
          <button
            class="btn btn-danger btn-md mt-3 float-right"
            @click="withdraw"
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BN from "bn.js";
import EventBus from "@/event_bus";
export default {
  data() {
    return {
      destination: null,
      amount: null,
    };
  },
  computed: {
    asset() {
      return this.$parent.active_asset;
    },
  },
  methods: {
    async withdraw() {
      try {
        let wallet = JSON.parse(this.$store.getters.SEND_WALLET);
        let myKeychain = this.$ava.keyChain();
        const importExternal = myKeychain.importKey(wallet.secret_key);
        myKeychain.getKey(importExternal);
        let myAddresses = this.$ava.keyChain().getAddresses();
        let addressStrings = this.$ava.keyChain().getAddressStrings();
        let utxos = await this.$ava.getUTXOs(myAddresses);
        let assetid = this.asset.asset;
        if (this.asset.asset == "AVA") {
          assetid = "nznftJBicce1PfWQeNEVBmDyweZZ6zcM3p78z9Hy9Hhdhfaxm";
        }
        console.log(this.asset.denomination)
        console.log(this.amount)
        let sendAmount = new BN(
          this.amount * Math.pow(10, this.asset.denomination)
        );
        console.log(sendAmount)
        let friendsAddress = this.destination;
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
        if (status == "Accepted" || status == "Processing") {
          this.$notify({
            group: "platformNotification",
            title: "Successful.",
            text: "Successfuly done!",
            type: "alert-success",
          });
          // update account
          EventBus.$emit("update_assets");
          this.destination = null;
          this.amount = null;
          // close modal and reset inputs
          document.getElementById("withdrawModal").click();
        } else {
          this.$notify({
            group: "platformNotification",
            title: "Error.",
            text: "Error!",
            type: "alert-danger",
          });
        }
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
