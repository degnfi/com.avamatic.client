<template>
  <nav class="navbar navbar-expand-lg border-bottom">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" @click="sidebar()">
        <i class="fas fa-th"></i>
      </button>
      <div class="d-lg-none ml-auto">
        <ul class="navbar-nav flex-row align-items-center">
          <li
            class="nav-item dropdown dropdown-animate"
            style="position: static;"
          >
            <a
              class="nav-link pr-lg-0"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span>
                <img width="30" height="30" src="@/assets/img/avatar.png" />
              </span>
            </a>
            <div
              class="dropdown-menu dropdown-menu-sm dropdown-menu-right dropdown-menu-arrow"
            >
              <router-link to="/settings" class="dropdown-item">
                <i class="far fa-cog"></i>
                <span class="ml-2">Settings</span>
              </router-link>
              <div class="dropdown-divider"></div>
              <button to="#" @click="logout()" class="dropdown-item">
                <i class="far fa-sign-out-alt"></i>
                <span class="ml-2">Logout</span>
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div
        class="collapse navbar-collapse navbar-collapse-fade"
        id="navbar-main-collapse"
      >
        <ul class="navbar-nav align-items-lg-center">
          <li class="border-top opacity-2 my-2"></li>
          <li class="nav-item">
            <router-link class="nav-link pl-lg-0" to="/dashboard">
              Dashboard
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link pl-lg-0" to="/merchants">
              Merchants
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link pl-lg-0" to="/documentation">
              API Documentation
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-lg-auto align-items-center d-none d-lg-flex">
          <li class="nav-item dropdown dropdown-animate">
            <a
              class="nav-link pr-lg-0"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div class="media media-pill align-items-center">
                <span class="avatar rounded-circle">
                  <img width="30" height="30" src="@/assets/img/avatar.png" />
                </span>
                <div class="ml-2 d-none d-lg-block">
                  <span class="mb-0 text-sm  font-weight-bold">{{
                    short_it($store.getters.SEND_UID)
                  }}</span>
                </div>
              </div>
            </a>
            <div
              class="dropdown-menu dropdown-menu-sm dropdown-menu-right dropdown-menu-arrow"
            >
              <router-link to="/settings" class="dropdown-item">
                <i class="far fa-cog"></i>
                <span class="ml-2">Settings</span>
              </router-link>
              <div class="dropdown-divider"></div>
              <button to="#" @click="logout()" class="dropdown-item">
                <i class="far fa-sign-out-alt"></i>
                <span class="ml-2">Logout</span>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import EventBus from "@/event_bus";

export default {
  created() {
    let vm = this;
    EventBus.$on("update_account", function() {
      vm.fetch_account();
    });

    EventBus.$on("logout", function() {
      vm.logout();
    });

    if (this.$store.getters.SEND_LOGGED_IN) {
      this.fetch_account();

      window.setInterval(() => {
        this.fetch_account();
      }, 30000);
    }
  },
  methods: {
    fetch_account() {
      var wallet = JSON.parse(this.$store.getters.SEND_WALLET);
      this.$ava
        .getBalance(
          wallet.public_key,
          "nznftJBicce1PfWQeNEVBmDyweZZ6zcM3p78z9Hy9Hhdhfaxm"
        )
        .then((response) => {
          this.$store.commit("UPDATE_ACCOUNT", response.words[0]);
        });
    },
    logout() {
      this.$localStorage.remove("vuex");
      this.$localStorage.remove("wallet");
      this.$localStorage.remove("_secure__ls__metadata");
      this.$router.push("/login");
      location.reload();
    },
    sidebar() {
      if (this.$store.getters.SEND_SIDEBAR) {
        this.$store.commit("UPDATE_SIDEBAR", false);
      } else {
        this.$store.commit("UPDATE_SIDEBAR", true);
      }
    },
    short_it(input) {
      if (typeof input == "string") {
        return input.substring(0, 8) + "...";
      } else {
        return "-";
      }
    },
  },
};
</script>

<style>
.border-bottom {
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1) !important;
}

.navbar {
  margin-bottom: 1.5rem;
  padding: 1rem 1rem;
}

.nav-item {
  margin-right: 1.5rem;
}

.nav-link {
  color: hsla(0, 0%, 100%, 0.85);
}

.card {
  margin-top: 1.5rem;
}

a {
  color: white;
}

.navbar-nav .dropdown-menu {
  width: calc(100% - 20px);
  position: absolute;
  top: 60px;
  left: 10px;
  right: auto;
}
</style>
