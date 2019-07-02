import Vue from 'vue'
import Main from './CTransition.vue'
const CTransiionConstructor = Vue.extend(Object.assign({}, Main))

let instance

export default function (options) {
  instance = new CTransiionConstructor({
    data () {
      return {
        target: options.target,
        render: options.render
      }
    }
  })
  const propertyArr = ['needBg', 'position', 'mainStyle']
  propertyArr.forEach(property => {
    options[property] !== undefined && (instance[property] = options[property])
  })

  instance.vm = instance.$mount()
  instance.$slots.default = [options.render]
  const parentElm = document.querySelector(options.target)
  if (!parentElm) return
  parentElm.appendChild(instance.vm.$el)
  instance.vm.isShow = true;
  instance.dom = instance.vm.$el
  return instance.vm
}

export const CTransition = Main
