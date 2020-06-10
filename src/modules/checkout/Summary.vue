<template>
  <div class="row">
    <div class="col-12">
      <h5 style="color:#000">Order Summary</h5>
      <div class="table-responsive">
        <table class="table mb-0">
          <thead>
            <tr>
              <th class="px-0 bg-transparent border-top-0">Description</th>
              <th class="px-0 bg-transparent border-top-0">Quantity</th>
              <th class="px-0 bg-transparent border-top-0 text-right">
                Cost
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-0">
                <span class="h6 text-sm">{{ order.item_name }}</span>
              </td>
              <td class="px-0">
                {{ order.item_quantity }}
              </td>
              <td class="px-0 text-right">
                {{ order.item_price }} {{ order.asset_code }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card my-5" style="background-color:rgb(241,242,248)">
        <div class="card-body">
          <div class="row justify-content-between align-items-center">
            <div class="col-md-6 order-md-2 mb-4 mb-md-0">
              <div class="d-flex align-items-center justify-content-md-end">
                <span class="h6 text-muted d-inline-block mr-3 mb-0"
                  >Total payment:</span
                >
                <span class="h5 mb-0" style="color:#000"
                  >{{ order.amount }} {{ order.asset_code }}</span
                >
              </div>
            </div>
            <div class="col-md-6 order-md-1">
              <button
                type="button"
                @click="payment()"
                class="btn btn-md btn-success"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "@/event_bus";

export default {
  methods: {
    payment() {
      EventBus.$emit("change_step", 1);
    },
  },
  computed: {
    order() {
      return this.$parent.order;
    },
  },
};
</script>
