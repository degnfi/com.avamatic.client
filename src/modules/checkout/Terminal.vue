<template>
  <div v-if="order">
    <router-link
      to="/"
      class="logo d-none d-sm-block text-center text-white"
      style="font-size:35px"
    >
      <span class="text-center"><i class="fad fa-mountain"></i> Avaxchain</span>
    </router-link>
    <div class="card card-body align-center col-md-6">
      <div class="row align-items-center mb-5">
        <div class="col-sm-6 mb-3 mb-sm-0">
          <img :src="order.merchant_details.logo" alt="" height="30" />
        </div>
        <div class="col-sm-6 text-sm-right">
          <span class="badge badge-pill badge-success ml-2" v-if="order.is_paid"
            >Paid</span
          >
          <span
            class="badge badge-pill badge-warning ml-2"
            v-else-if="!order.is_paid && !order.timeout"
            >Payment Pending</span
          >
          <span class="badge badge-pill badge-danger ml-2" v-else
            >Payment Failed</span
          >
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-md-8">
          <h6 style="color:#000">{{ order.merchant_details.name }}</h6>
          <p class="text-sm">
            {{ order.merchant_details.description }}
          </p>
        </div>
      </div>
      <hr />
      <Success v-if="order.is_paid" />
      <Timeout v-else-if="order.timeout && !order.is_paid" />
      <Summary v-else-if="step == 0" />
      <Pay v-else-if="step == 1" />
      <hr />
      <p class="text-center">Payments processed by <b>Avaxchain</b></p>
    </div>
  </div>
</template>

<script>
import EventBus from "@/event_bus";
import Summary from "@/modules/checkout/Summary.vue";
import Pay from "@/modules/checkout/Pay.vue";
import Success from "@/modules/checkout/Success.vue";
import Timeout from "@/modules/checkout/Timeout.vue";

export default {
  data() {
    return {
      order: null,
      step: 0,
    };
  },
  created() {
    let vm = this;
    EventBus.$on("change_step", function(value) {
      vm.step = value;
    });

    this.fetch_order(this.$route.params.id);

    window.setInterval(() => {
      this.fetch_order(this.$route.params.id);
    }, 7500);
  },
  components: {
    Summary,
    Pay,
    Success,
    Timeout,
  },
  methods: {
    fetch_order(id) {
      this.axios.get("orders/" + id).then((response) => {
        this.order = response.data;
        this.order.destination_w_tag = this.order.destination.substring(this.order.destination.indexOf("-") + 1)
      });
    },
  },
};
</script>

<style scoped>
.card {
  margin: 0 auto;
  float: none;
}
.logo {
  margin-top: 50px;
  margin-bottom: 40px;
}
.badge{
  padding:10px;
}
</style>
