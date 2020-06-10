<template>
  <div class="page-content">
    <div class="page-title">
      <div class="row justify-content-between align-items-center">
        <div
          class="col-md-6 d-flex align-items-center justify-content-between justify-content-md-start mb-3 mb-md-0"
        >
          <div class="d-inline-block">
            <h5 class="h4 d-inline-block font-weight-400 mb-0 text-white">
              Merchants list
            </h5>
          </div>
        </div>
        <div
          class="col-md-6 d-flex align-items-center justify-content-between justify-content-md-end"
        >
          <div class="actions actions-dark d-inline-block">
            <router-link to="/merchants/create" class="action-item ml-md-4">
              <i class="far fa-plus mr-2"></i>Create merchant account
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="card" style="height:735px">
      <div class="table-responsive">
        <table class="table align-items-center">
          <thead>
            <tr>
              <th scope="col" class="sort" data-sort="name">Name</th>
              <th scope="col" class="sort" data-sort="status">Status</th>
              <th scope="col" class="sort" data-sort="action">Action</th>
            </tr>
          </thead>
          <tbody class="list">
            <tr v-for="merchant in merchants">
              <th scope="row">
                <div class="media align-items-center">
                  <div>
                    <img
                      :src="merchant.logo"
                      class="icon rounded-circle"
                    />
                  </div>
                  <div class="media-body ml-4">
                    <span class="text-sm">{{
                      merchant.name
                    }}</span>
                  </div>
                </div>
              </th>
              <td style="font-size:20px">
                <span class="badge badge-success mr-4" v-if="merchant.status == 1">
                  active
                </span>
                <span class="badge badge-danger mr-4" v-else>
                 deactivated
                 </span>
              </td>
              <td>
                <router-link
                  class="btn btn-secondary btn-md"
                  :to="'/merchants/' + merchant._id"
                  ><i class="far fa-arrow-right" style="font-size:13px"></i> View merchant</router-link
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      merchants: null,
    };
  },
  computed: {
    wallet() {
      return this.$store.getters.SEND_WALLET;
    },
  },
  mounted() {
    this.fetch_merchants();
  },
  methods: {
    fetch_merchants() {
      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + this.$store.getters.SEND_TOKEN,
        },
      };
      this.axios.get("merchants", axiosConfig).then((response) => {
        this.merchants = response.data;
      });
    },
    fetch_details(id) {
      console.log(id);
      EventBus.$emit("fetch_merchant_details", id);
    },
  },
};
</script>

<style>
.icon {
  width:48px;
  height:48px
}
</style>