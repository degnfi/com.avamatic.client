<template>
  <div class="container mt-5 position-relative index">
    <div
      to="/dashboard"
      class="logo text-right text-white"
      style="font-size:45px"
    >
      <span class="text-center"><i class="fad fa-mountain"></i> avaxchain</span>
    </div>
    <embed src="https://explorer.avax.network" style="width:103%; height: 55.7vw;">
    <div class="row justify-content-around mt-2 align-items-center">
      <div class="col-lg-6 pt-lg-4 text-center">
        <h1 class="display-4 text-black mb-4">
         $AVAX Paygate
        </h1>
        <router-link
          to="/login"
          class="btn btn-lg text-white btn-primary rounded-pill hover-translate-y-n3 mt-4"
          >Login</router-link
        >
        <router-link
          to="/documentation"
          class="btn btn-lg text-white btn-secondary btn-icon rounded-pill hover-translate-y-n3 mt-4"
        >
          <span class="btn-inner--text">API</span>
        </router-link>
                <router-link
          to="/shop"
          class="btn btn-lg text-white btn-warning rounded-pill hover-translate-y-n3 ml-2 mt-4"
          >Payout</router-link
        >
      </div>
    </div>
    <div class="row row-grid mt-5 justify-content-around align-items-center">
      <div class="col-md-5">
        <div>
          <h5 class="title">
            Built on AVAX
          </h5>
          <p class="lead my-4">
            Avaxchain allows you to receive and send payments in any asset that is on
            the AVAX network. You can create assets in seconds.
            Payments work with the  <b data-v-02792da4="">HD Mnemonic Wallet</b> library Avamatic
          developed for AVAX!
          <p data-v-02792da4="" class="lead mt-4 mb-5">
          Your password and private key will never leave your device. All
          processes are carried out on your device.
        </p>
          </p>
        </div>
      </div>
      <div class="col-lg-6">

        </div>
      </div>
      <div class="col-lg-4 order-lg-1">
        <img
          style="border-radius:15px"
          src="@/assets/img/security.png"
          class="img-fluid"
        />
      </div>
    </div>
    <div class="row row-grid justify-content-around mt-5 align-items-center">
      <div class="col-lg-5">
        <div>
          <h5 class="title">
            Payout
          </h5>
          <p class="lead my-4">
            <b>Avaxchain Payout</b> is designed to let your orders
            fly.
          </p>
        </div>
      </div>
      <div class="col-lg-4">
        <img
          style="border-radius:15px"
          src="@/assets/img/checkout.png"
          class="img-fluid"
        />
      </div>
    </div>
    <div data-v-02792da4=""><h5 data-v-02792da4="" class="title">
          Avalanche live api playground
        </h5><p data-v-02792da4="" class="lead my-4">
          Spam the AVAX network with api
          requests till it somebody passes out.
        </p></div>

<div data-v-02792da4="" class="col-md-8"><embed data-v-02792da4="" src="https://graphql.avascan.info/" style="width: 100%; height: 37.7vw;"></div>

    <footer class="footer footer-light pt-0">
      <div class="container">
        <div
          class="row align-items-center justify-content-md-between py-4 delimiter-top"
        >
          <div class="col-md-6">
            <div
              class="copyright text-sm font-weight-bold text-center text-md-left"
            >
              © 2020 Avaxchain - Forkeloped by
              <a href="https://avaxchain.com" target="_blank">DegFi</a>
            </div>
            <small>all credits to avalabs.org, avamatic.com and avascan.info.</small>
          </div>
          <div class="col-md-6">
            <ul
              class="nav justify-content-center justify-content-md-end mt-3 mt-md-0"
            >
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://github.com/degnfi"
                  target="_blank"
                >
                  <i class="fab fa-github"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.mt-10 {
  margin-top: 10.5rem !important;
}

.container {
  max-width: 1320px;
}

.title {
  font-size:30px;
  color:#000
}

a{
  color: #8492a6
}
</style>
