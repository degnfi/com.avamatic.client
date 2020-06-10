<template>
  <div class="page-content">
    <div class="page-title">
      <div class="row justify-content-between align-items-center">
        <div
          class="col-md-6 d-flex align-items-center justify-content-between justify-content-md-start mb-3 mb-md-0"
        >
          <div class="d-inline-block">
            <h5 class="h4 d-inline-block font-weight-400 mb-0 text-white">
              2FA Settings
            </h5>
          </div>
        </div>
        <div
          class="col-md-6 d-flex align-items-center justify-content-between justify-content-md-end"
        ></div>
      </div>
    </div>
    <div class="row">
      <Sidebar />
      <div class="col-lg-8 order-lg-1">
        <div class="card" style="min-height:685px">
          <div class="card-body">
            Waiting for implementation
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/modules/user/Sidebar.vue";

export default {
  components: {
    Sidebar,
  },
};
</script>
