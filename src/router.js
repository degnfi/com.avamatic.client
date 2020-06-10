import Vue from 'vue'
import Router from 'vue-router'

// Home
import Home from './components/Home.vue'

// Authentications
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Recovery from './components/Recovery.vue'

// User
import Dashboard from './modules/user/Dashboard.vue'
import Wallet from './modules/user/Wallet.vue'
import CreateAsset from './modules/user/CreateAsset.vue'
import Settings from './modules/user/Settings.vue'
import Security from './modules/user/Security.vue'

// Merchants
import Merchants from './modules/merchants/List.vue'
import CreateMerchant from './modules/merchants/Create.vue'
import ShowMerchant from './modules/merchants/Details.vue'

// Orders
import Orders from './modules/orders/List.vue'
import ShowOrder from './modules/orders/Details.vue'

// Checkout
import CheckoutTerminal from './modules/checkout/Terminal.vue'

// Doc
import Documentation from './modules/documentation/API.vue'

// Shop
import Shop from './modules/shop/List.vue'

// Not found
import NotFound from './components/404.vue'

import store from "./store";

Vue.use(Router);

const ACCESS_ALL = "ALL";
const ACCESS_ANON_ONLY = "ANONYMOUS";
const ACCESS_USER_ONLY = "USER"

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        access: ACCESS_ALL,
        header: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        access: ACCESS_ANON_ONLY
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: {
        access: ACCESS_ANON_ONLY
      }
    },
    {
      path: '/recovery',
      name: 'recovery',
      component: Recovery,
      meta: {
        access: ACCESS_ANON_ONLY
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        access: ACCESS_USER_ONLY,
        sidebar: true
      }
    },
    {
      path: '/merchants',
      name: 'merchants',
      component: Merchants,
      meta: {
        access: ACCESS_USER_ONLY,
        sidebar: true
      }
    },
    {
      path: '/merchants/create',
      name: 'create_merchant',
      component: CreateMerchant,
      meta: {
        access: ACCESS_USER_ONLY,
        sidebar: true
      }
    },
    {
      path: '/merchants/:id',
      name: 'show_merchant',
      component: ShowMerchant,
      meta: {
        access: ACCESS_USER_ONLY,
        sidebar: true
      }
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      meta: {
        access: ACCESS_USER_ONLY,
        sidebar: true
      }
    },
    {
      path: '/orders/:id',
      name: 'show_order',
      component: ShowOrder,
      meta: {
        access: ACCESS_USER_ONLY,
        sidebar: true
      }
    },
    {
      path: '/checkout/:id',
      name: 'checkout',
      component: CheckoutTerminal,
      meta: {
        access: ACCESS_ALL,
        header: false
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: {
        access: ACCESS_USER_ONLY,
        sidebar: true
      }
    },
    {
      path: '/security',
      name: 'security',
      component: Security,
      meta: {
        access: ACCESS_USER_ONLY,
        sidebar: true
      }
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: Wallet,
      meta: {
        access: ACCESS_USER_ONLY,
        sidebar: true
      }
    },
    {
      path: '/wallet/create',
      name: 'create_asset',
      component: CreateAsset,
      meta: {
        access: ACCESS_USER_ONLY,
        sidebar: true
      }
    },
    {
      path: '/documentation',
      name: 'documentation',
      component: Documentation,
      meta: {
        access: ACCESS_ALL,
        sidebar: false,
        header: false
      }
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop,
      meta: {
        access: ACCESS_ALL,
        sidebar: false,
        header: false
      }
    },
    {
      path: '*',
      component: NotFound,
      meta: {
        access: ACCESS_ALL,
        header: false
      }
    }
  ]
})


router.beforeEach((to, from, next) => {
  let checkAccess = access =>
    to.matched.some(record => record.meta.access == access);
  next();
  if (checkAccess(ACCESS_USER_ONLY) && !store.getters.SEND_LOGGED_IN) {
    next({
      name: "login"
    });
  } else if (checkAccess(ACCESS_ANON_ONLY) && store.getters.SEND_LOGGED_IN) {
    next({
      name: "dashboard"
    });
  }
  else {
    next();
  }
});

export default router;