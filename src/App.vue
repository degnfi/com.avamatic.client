<template>
  <div class="panel panel-offset ready">
    <notifications
      group="platformNotification"
      position="top right"
      classes="platform-notification alert"
    />
    <div class="container-fluid container-panel">
      <Sidebar v-if="route.sidebar && sidebar" />
      <div class="main-content position-relative" v-if="is_logged">
        <Header v-if="route.header != false" />
        <router-view />
      </div>
      <div class="container-fluid" v-else>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  computed: {
    is_logged() {
      return this.$store.getters.SEND_LOGGED_IN;
    },
    sidebar() {
      return this.$store.getters.SEND_SIDEBAR;
    },
    route() {
      return this.$route.meta;
    },
  },
  components: {
    Header,
    Sidebar,
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Nunito, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.7;
  text-align: left;
  background-color: #f8f8fc;
}

.panel-offset .container-panel:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  pointer-events: none;
  height: 450px;
  background-color: #000;
}

.platform-notification {
  margin-top: 10px;
  margin-right: 10px;
}
.notifications {
  top: 60px !important;
  right: 5px !important;
}

.notification {
  background: none !important;
}

.panel .main-content {
  width: 100%;
  overflow: hidden;
}

@media (min-width: 1200px) {
  .panel .sidenav.show + .main-content {
    padding-left: 40px;
  }
}

.container-panel {
  max-width: 1420px;
  overflow-x: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  padding-left: 0;
  padding-right: 0;
}

a:hover {
  text-decoration: none;
}

.btn-icon {
  margin-left: 0.5em;
}

.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 1.5rem + 2px);
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #8492a6;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #e0e6ed;
  border-radius: 0.25rem;
  -webkit-box-shadow: inset 0 1px 1px rgba(31, 45, 61, 0.075);
  box-shadow: inset 0 1px 1px rgba(31, 45, 61, 0.075);
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.btn-sm {
  width: 2rem;
  height: 2rem;
  line-height: 1rem;
}

.table td,
.table th {
  line-height: 45px;
}

.table td,
.table th {
  font-size: 0.8125rem;
  white-space: nowrap;
}

thead {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  text-transform: none;
  letter-spacing: 0;
  background-color: transparent;
  border-bottom-width: 1px;
}

.navbar-toggler {
  color: #fff;
}
</style>
