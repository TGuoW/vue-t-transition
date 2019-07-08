import VueTTransition from './vue-t-transition.vue';

/* istanbul ignore next */
VueTTransition.install = function(Vue) {
  Vue.component(VueTTransition.name, Switch);
};

export default VueTTransition;