import { shallowMount } from '@vue/test-utils'
import Vue from 'vue/dist/vue'
import CTransition from '../src/CTransition.vue'
import CTransitionConstructor from '../src/entry'

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

const camelCase = function(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};
const getStyle = (element, styleName) => {
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
}
let id = 0
const createElm = function() {
  const elm = document.createElement('div');

  elm.id = 'app' + ++id;
  document.body.appendChild(elm);

  return elm;
};

const createVue = function(Compo, mounted = false) {
  return new Vue(Compo).$mount(mounted === false ? null : createElm());
};

const $i = CTransitionConstructor({
  target: 'body',
  render: ''
})

const h = $i.$createElement

describe('CTransition', () => {
  it('position', (done) => {
    const vm = createVue({
      template: `
      <div style="width: 400px; height: 400px" class="test"></div>
    `,
    }, true);
    const instance = CTransitionConstructor({
      needBg: true,
      target: '.test',
      render: <div>123</div>
    })
    Vue.prototype.$nextTick(() => {
      const {mainElm} = instance.$refs
      expect(mainElm.classList.contains('c-transition-main-top')).toBe(true);
      done()
    })

  })
  it('position', () => {
    const vm = createVue({
      components: { CTransition },
      template: `
      <div style="width: 400px; height: 400px">
        <CTransition :isShow="true" :needBg="true">
          <div style="width:100px;height:100px;"></div>
        </CTransition>
      </div>
    `,
    }, true);
    const instance = vm.$children[0]
    const {mainElm} = instance.$refs
    expect(mainElm.classList.contains('c-transition-main-top')).toBe(true);
  })

  // it('renders default message if not passed a prop', () => {
  //   const defaultMessage = 'default message'
  //   const wrapper = shallowMount(Message)
  //   expect(wrapper.text()).toBe(defaultMessage)
  // })
})