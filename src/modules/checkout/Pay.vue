<template>
  <div>
    <p class="text-center">
      <img
        src="https://chart.googleapis.com/chart?chs=150x150&amp;chld=M%7C0&amp;cht=qr&amp;chl=X-THISDEMOADDRESS"
      />
    </p>
    <label>Destination Address</label>
    <div class="input-group input-group-md">
      <input
        type="text"
        v-model="order.destination"
        class="form-control"
        disabled
      />
      <div class="input-group-append">
        <button
          type="button"
          class="btn btn-primary"
          v-clipboard:copy="order.destination"
          v-clipboard:success="on_copy"
        >
          <i class="fad fa-clipboard"></i>
        </button>
      </div>
    </div>
    <label class="mt-3">Amount</label>
    <div class="input-group input-group-md">
      <input type="text" v-model="order.amount" class="form-control" disabled />
      <div class="input-group-append">
        <button
          type="button"
          class="btn btn-primary"
          v-clipboard:copy="order.amount"
          v-clipboard:success="on_copy"
        >
          <i class="fad fa-clipboard"></i>
        </button>
      </div>
    </div>
    <label class="mt-3">Asset</label>
    <div class="input-group input-group-md">
      <input
        type="text"
        v-model="order.asset_code"
        class="form-control"
        disabled
      />
      <div class="input-group-append">
        <button
          type="button"
          class="btn btn-primary"
          v-clipboard:copy="order.asset_code"
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
        v-model="order.asset_id"
        class="form-control"
        disabled
      />
      <div class="input-group-append">
        <button
          type="button"
          class="btn btn-primary"
          v-clipboard:copy="order.asset_id"
          v-clipboard:success="on_copy"
        >
          <i class="fad fa-clipboard"></i>
        </button>
      </div>
    </div>
    <button
      type="button"
      @click="summary()"
      class="btn btn-md btn-warning mt-4"
    >
      <i class="fad fa-arrow-left"></i>
      Back to Summary
    </button>
  </div>
</template>

<script>
import EventBus from "@/event_bus";

export default {
  methods: {
    summary() {
      EventBus.$emit("change_step", 0);
    },
    on_copy: function() {
      this.$notify({
        group: "platformNotification",
        title: "Success",
        text: "You just copied!",
        type: "alert-success",
      });
    },
  },
  computed: {
    order() {
      return this.$parent.order;
    },
  },
};
</script>
