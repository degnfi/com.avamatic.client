import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ encodingType: 'aes', isCompression: false });

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        account: null,
        is_logged: null,
        platform_token: null,
        uid: null,
        assets: [],
        sidebar: true
    },
    plugins: [createPersistedState()],
    mutations: {
        UPDATE_LOGGED_IN(state, payload) {
            state.is_logged = payload
        },
        UPDATE_WALLET(state, payload) {
            ls.set('wallet', payload)
        },
        UPDATE_TOKEN(state, payload) {
            state.platform_token = payload
        },
        UPDATE_ACCOUNT(state, payload) {
            state.account = payload
        },
        UPDATE_UID(state, payload) {
            state.uid = payload
        },
        UPDATE_ASSETS(state, payload) {
            state.assets.push(payload)
        },
        UPDATE_ASSETS_EMPTY(state) {
            state.assets = []
        },
        UPDATE_SIDEBAR(state, payload) {
            state.sidebar = payload
        },
    },
    getters: {
        SEND_LOGGED_IN(state) {
            return state.is_logged
        },
        SEND_WALLET() {
            return ls.get('wallet')
        },
        SEND_TOKEN(state) {
            return state.platform_token;
        },
        SEND_ACCOUNT(state) {
            return state.account;
        },
        SEND_UID(state) {
            return state.uid;
        },
        SEND_ASSETS(state) {
            return state.assets;
        },
        SEND_SIDEBAR(state) {
            return state.sidebar;
        },
    }
});
