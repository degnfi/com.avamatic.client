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
        stroke="#D06079"
        stroke-width="6"
        stroke-miterlimit="10"
        cx="65.1"
        cy="65.1"
        r="62.1"
      />
      <line
        class="path line"
        fill="none"
        stroke="#D06079"
        stroke-width="6"
        stroke-linecap="round"
        stroke-miterlimit="10"
        x1="34.4"
        y1="37.9"
        x2="95.8"
        y2="92.3"
      />
      <line
        class="path line"
        fill="none"
        stroke="#D06079"
        stroke-width="6"
        stroke-linecap="round"
        stroke-miterlimit="10"
        x1="95.8"
        y1="38"
        x2="34.4"
        y2="92.2"
      />
    </svg>
    <h3 class="text-secondary mt-4">
      The order was canceled because the payment was not made within 30 minutes.
    </h3>
    <h4 class="mt-3 mb-4" style="font-size:16px">
      If you think there is an error, you can send an e-mail to
      Degnfi
    </h4>
    <a
      style="font-size:15px;color:grey"
      :href="order.merchant_details.cancel_url"
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
