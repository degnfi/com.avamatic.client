<template>
  <div class="page-content">
    <div class="page-title">
      <div
        class="row justify-content-between align-items-center"
        style="max-height:32px"
      >
        <div
          class="col-md-6 d-flex align-items-center justify-content-between justify-content-md-start mb-3 mb-md-0"
        >
          <div class="d-inline-block">
            <h5 class="h4 d-inline-block font-weight-400 mb-0 text-white">
              Last Transactions
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div class="card" style="height:735px">
      <div class="table-responsive">
        <table class="table align-items-center">
          <thead>
            <tr>
              <th scope="col">Tx ID</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Asset</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody class="list" style="filter: blur(1.5px);">
            <tr v-for="x in 15">
              <td>
              CK13N12N312Z...
            </td>
            <td>
              X-5xwX2QboCwwDa...
            </td>
            <td>
              X-5IAMasd1l23m2...
            </td>
            <td>
              AVA
            </td>
            <td>
              0.1231292
            </td>
            </tr>
          </tbody>
        </table>
        </div>
    </div>
  </div>
  <embed data-v-62448b22="" src="https://degnfi.github.io/avascan/" style="width: 100%; height: 33.7vw;">
  </div>
</div>
</div>

</template>

<script>
export default {
  data() {
    return {
      transactions: null,
      is_loading: false,
    };
  },
  created() {
    // this.fetch_transactions();
  },
  computed: {
    wallet() {
      return JSON.parse(this.$store.getters.SEND_WALLET);
    },
  },
  methods: {
    fetch_transactions() {
      this.is_loading = true;

      var addressWithoutChainTag = this.wallet.public_key;
      addressWithoutChainTag = addressWithoutChainTag.substring(
        addressWithoutChainTag.indexOf("-") + 1
      );

      this.axios
        .get(
          "https://explorerapi.avax.network/x/transactions?limit=50&address=" +
            addressWithoutChainTag
        )
        .then((response) => {
          this.transactions = response.data.transactions;
          console.log(this.transactions)
          this.is_loading = false;
        });
    },
    short_it(input) {
      if (typeof input == "string") {
        return input.substring(0, 15) + "...";
      } else {
        return "-";
      }
    },
  },
};
</script>

<style>
.page-content {
  padding-left: 20px;
}
</style>
