import { shallowMount } from '@vue/test-utils'
import Vue from 'vue/dist/vue'
import CTransition from '../src/CTransition.vue'
import CTransitionConstructor from '../src/entry'
import { doesNotReject } from 'assert';

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


describe('CTransition', () => {
  it('renders props.msg when passed', (done) => {
    const vm = createVue({
      components: { CTransition },
      template: `
      <div>
        <CTransition :isShow="true" :needBg="true">
          <div style="width:100px;height:100px;"></div>
        </CTransition>
      </div>
    `,
    }, true);
    Vue.prototype.$nextTick(() => {

      const element = document.querySelector('.c-transition-main')
      // const height = getStyle(element, 'height')
      // const width = getStyle(element, 'width')
      const child = element.children[0]
      const childHeight = getStyle(child, 'height')
      const childWidth = getStyle(child, 'width')
      const width = '100px'
      const height = '100px'

      expect([height, width]).toEqual([childHeight, childWidth])
      done()
    })
  })

  // it('renders default message if not passed a prop', () => {
  //   const defaultMessage = 'default message'
  //   const wrapper = shallowMount(Message)
  //   expect(wrapper.text()).toBe(defaultMessage)
  // })
})