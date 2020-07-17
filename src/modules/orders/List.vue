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
              Last Merchant Orders
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div class="card" style="height:650px">
      <div class="table-responsive">
        <table class="table align-items-center">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Item</th>
              <th scope="col">Asset</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody class="list">
            <tr v-for="order in orders">
              <td>
                <router-link
                  :to="'/orders/' + order._id"
                  class="text-secondary"
                  style="font-size:15px"
                >
                  {{ order._id }}
                </router-link>
              </td>
              <td>
                <b class="media-body">
                  <a href="#" class="mb-0 text-sm" style="color:#000">{{
                    order.item_name
                  }}</a>
                </b>
              </td>
              <td>
                {{ order.asset_code }}
              </td>
              <td>
                {{ order.amount }}
              </td>
              <td>
                <span class="text-success" v-if="order.is_paid"
                  ><i class="fad fa-check"></i> Paid</span
                >
                <span
                  class="text-warning"
                  v-else-if="
                    !order.is_paid &&
                      new Date(order.createdAt).getTime() + 1000 * 60 * 30 >
                        new Date().getTime()
                  "
                  ><i class="fad fa-spinner"></i> Pending</span
                >
                <span class="text-danger" v-else
                  ><i class="fad fa-times"></i> Failed</span
                >
              </td>
              <td>
                {{ order.createdAt }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "@/event_bus";
import BN from "bn.js";

export default {
  data() {
    return {
      orders: null,
      avm: null,
    };
  },
  created() {
    this.fetch_orders();
  },
  methods: {
    fetch_orders() {
      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + this.$store.getters.SEND_TOKEN,
        },
      };
      this.axios
        .get("/orders", axiosConfig)
        .then((response) => {
          this.orders = response.data;
        })
        .catch((err) => {
          EventBus.$emit("logout");
        });
    },
  },
};
</script>
