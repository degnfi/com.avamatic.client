<template>
  <div>
    <router-link
      to="/"
      class="logo d-none d-sm-block text-center text-white"
      style="font-size:35px"
    >
      <span class="text-center"><i class="fad fas fa-stroopwafel fa-spin"></i> Avaxchain</span>
    </router-link>
    <div class="card card-body align-center col-md-6">
      <div class="mb-3">
        <div class="text-center mb-sm-0">
          <img src="@/assets/img/demo-item.png" width="450" />
        </div>
      </div>
      <div class="mb-3">
       <span class="badge badge-pill badge-success" style="font-size:17px"
          >0.000001 AVA</span
        >
      </div>
      <div class="row">
        <div class="col-lg-6 col-md-8">
          <h4 style="color:#000">{{item_name}}</h4>
          <p class="text-sm">
            DefiDegenprotocols
            Millions
          </p>
        </div>
      </div>
      <label>Quantity</label>
      <input v-model="quantity" class="col-md-3 form-control"></input>
      <button class="mt-3 btn btn-primary" @click="order()">Buy now</button>
      <small class="mt-3">* Unreal DefiDegenprotocols.</small>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      item_name: "Defi coins ",
      quantity: 1
    }
  },
  methods:{
    order(){
      this.axios.get("orders/create?merchant=5ee1312d45045a484e476769&asset_code=AVA&asset_id=AVA&item_name="+this.item_name+"&item_price="+0.000001+"&item_quantity="+this.quantity).then((response) => {
        this.$router.push('/checkout/'+response.data._id)
      });
    }
  }
}
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
.badge {
  padding: 10px;
}
</style>
