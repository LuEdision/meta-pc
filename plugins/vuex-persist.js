import Vue from 'vue';
import VuexPersistence from 'vuex-persist';
import { NoticeBar } from 'vue-easy-notice-bar';
Vue.use(NoticeBar);
export default ({ store }) => {
  new VuexPersistence({
    /* your options */
  }).plugin(store);
};
