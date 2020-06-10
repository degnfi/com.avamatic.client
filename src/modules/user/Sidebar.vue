<template>
  <div class="col-lg-4 order-lg-5">
    <div class="card">
      <div class="list-group list-group-flush">
        <router-link to="/settings"
        v-bind:class="{ active: route.name == 'settings' }"
          class="list-group-item text-secondary"
        >
          <div class="media">
            <i class="fas fa-user"></i>
            <div class="media-body ml-3">
              <p class="mb-1">Settings</p>
              <p class="mb-0 text-sm">
                Display your wallet
              </p>
            </div>
          </div>
        </router-link>
        <router-link to="/security" v-bind:class="{ active: route.name == 'security' }"  class="list-group-item text-secondary">
          <div class="media">
            <i class="fas fa-shield"></i>
            <div class="media-body ml-3">
              <p class="mb-1">2FA</p>
              <p class="mb-0 text-sm">
                Extra security for your wallet with 2FA
              </p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    route() {
      return this.$route;
    },
  },
};
</script>

<style>
.text-sm {
  font-size: 15px;
}
.media > i {
  position: relative;
  top: 4px;
}

.list-group-item.active{
  background-color:#fafbfe;
  border-color:#dfdfdf
}
</style>
