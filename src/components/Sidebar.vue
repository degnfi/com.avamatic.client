<template>
  <div class="sidebar show" id="sidebar-main">
    <div class="sidebar-header d-flex align-items-center">
      <router-link
        to="/"
        class="navbar-brand text-white"
        style="font-size:35px;margin-left:20px;margin-top:-10px"
      >
        <span class="text-center"><i class="fad fa-mountain"></i> Avaxchain</span>
      </router-link>
      <div class="ml-auto">
        <div
          class="sidebar-toggler sidebar-toggler-dark d-md-none active"
        >
          <div class="sidebar-toggler-inner">
            <i class="sidebar-toggler-line bg-white"></i>
            <i class="sidebar-toggler-line bg-white"></i>
            <i class="sidebar-toggler-line bg-white"></i>
          </div>
        </div>
      </div>
    </div>
    <div
      class="sidebar-user d-flex flex-column align-items-center justify-content-between text-center"
    >
      <div>
        <img width="95" height="95" src="@/assets/img/avatar.png" class="" />
        <div class="mt-4">
          <h5 class="mb-0 text-white">
            {{ short_it($store.getters.SEND_UID) }}
          </h5>
          <span class="d-block text-sm text-white opacity-8 mb-3 mt-2"
            >User</span
          >
          <router-link
            to="/wallet"
            class="btn-spec bg-white rounded-pill"
          >
            <span v-if="account">{{ account / 1000000000 }} AVAX</span>
            <span v-else> {{ account }} AVAX </span>
          </router-link>
        </div>
      </div>
      <div class="d-flex mt-3 justify-content-between">
        <button class="btn-spec border-white">
          <span class="text-white">{{ short_it(wallet.public_key) }} </span>
          <i
            class="far fa-copy text-white"
            v-clipboard:copy="wallet.public_key"
            v-clipboard:success="on_copy"
          ></i>
        </button>
      </div>
    </div>
    <div class="clearfix mt-5">
      <router-link
        to="/dashboard"
        class="btn btn-square text-sm"
        v-bind:class="{ active: route.name == 'dashboard' }"
      >
        <span class="d-block"><i class="fas fa-home fa-2x"></i></span>
        <span class="d-block pt-2">Dashboard</span>
      </router-link>
      <router-link
        to="/wallet"
        class="btn btn-square text-sm"
        v-bind:class="{ active: route.name == 'wallet' }"
      >
        <span class="d-block"><i class="fas fa-wallet fa-2x"></i></span>
        <span class="d-block pt-2">Wallet</span>
      </router-link>
      <router-link
        to="/merchants"
        class="btn btn-square text-sm"
        v-bind:class="{ active: route.name == 'merchants' }"
      >
        <span class="d-block"><i class="fas fa-suitcase fa-2x"></i></span>
        <span class="d-block pt-2">Merchants</span>
      </router-link>
      <router-link
        to="/orders"
        class="btn btn-square text-sm"
        v-bind:class="{ active: route.name == 'orders' }"
      >
        <span class="d-block"><i class="fas fa-receipt fa-2x"></i></span>
        <span class="d-block pt-2">Orders</span>
      </router-link>
      <router-link
        to="/settings"
        class="btn btn-square text-sm"
        v-bind:class="{ active: route.name == 'settings' }"
      >
        <span class="d-block"><i class="fas fa-cogs fa-2x"></i></span>
        <span class="d-block pt-2">Settings</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    account() {
      return this.$store.getters.SEND_ACCOUNT;
    },
    wallet() {
      return JSON.parse(this.$store.getters.SEND_WALLET);
    },
    route() {
      return this.$route;
    },
  },
  methods: {
    short_it(input) {
      if (typeof input == "string") {
        return input.substring(0, 18) + "...";
      } else {
        return "-";
      }
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
};
</script>

<style scoped>
.sidebar {
  display: block;
  margin-left: 40px;
  width: 250px;
  min-width: 250px;
}

.sidebar.show {
  display: block;
  margin-left: 75px;
  width: 250px;
  min-width: 250px;
}

.panel .sidebar-header {
  padding: 1.5rem 0;
  margin-bottom: 1.5rem;
}

.btn-spec {
  display: inline-block;
  font-weight: 600;
  color: #000;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.5rem 1.25rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.25rem;
}

.btn {
  width: 113px !important;
  height: 113px !important;
  float: left;
  background: transparent;
  color: #8492a6;
  margin: 0 0 24px;
}

.btn-square {
  width: 108px !important;
  height: 108px !important;
  padding: 1rem;
  border-radius: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

.btn:nth-child(odd) {
  margin-right: 24px;
}

.active {
  background-color: #000;
  color: #fff;
}
</style>
