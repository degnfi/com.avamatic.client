<template>
  <div class="text-center" style="padding:25px">
    <svg
      width="100px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 130.2 130.2"
    >
      <circle
        class="path circle"
        fill="none"
        stroke="#73AF55"
        stroke-width="6"
        stroke-miterlimit="10"
        cx="65.1"
        cy="65.1"
        r="62.1"
      />
      <polyline
        class="path check"
        fill="none"
        stroke="#73AF55"
        stroke-width="6"
        stroke-linecap="round"
        stroke-miterlimit="10"
        points="100.2,40.2 51.5,88.8 29.8,67.5 "
      />
    </svg>
    <h3 class="text-secondary mt-4">Payment is successfully done</h3>
    <h4>
      <a
        :href="'https://explorer.avax.network/address/' + order.destination_w_tag"
        target="_blank"
        style="font-size:15px;color:grey"
        >Check on Avax Explorer</a
      >
    </h4>
    <a
      style="font-size:15px;color:grey"
      :href="order.merchant_details.success_url"
      >Return merchant's site</a
    >
  </div>
</template>

<script>
export default {
  computed: {
    order() {
      return this.$parent.order;
    },
  },
};
</script>
