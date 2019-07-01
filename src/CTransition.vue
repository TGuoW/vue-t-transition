<script>

// eslint-disable-next-line no-useless-escape
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

const addStyle = (options, instance) => {
  let maskStyle = {};
  instance.originalPosition = getStyle(document.body, 'position');
  // ['top', 'left'].forEach(property => {
  //   let scroll = property === 'top' ? 'scrollTop' : 'scrollLeft';
  //   maskStyle[property] = options.target.getBoundingClientRect()[property] +
  //     document.body[scroll] +
  //     document.documentElement[scroll] +
  //     'px';
  // });
  // ['height', 'width'].forEach(property => {
  //   maskStyle[property] = options.target.getBoundingClientRect()[property] + 'px';
  // });
  const filterProperty = ['top', 'right', 'bottom', 'left']
  Object.keys(maskStyle).forEach(property => {
    !filterProperty.includes(property) && (instance.style[property] = maskStyle[property])
  });
};

export default {
  name: 'CTransition',
  props: {
    isShow: {
      type: Boolean,
      default () {
        return false
      }
    },
    needBg: {
      type: Boolean,
      default () {
        return false
      }
    },
    position: {
      type: Array,
      default () {
        return ['bottom','right']
      }
    },
    mainStyle: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    realIsShow: {
      get: function () {
        return this.isShow
      },
      set: function (newValue) {

      }
    }
  },
  methods: {
    close () {
      this.isShow = false
    },
    handleAfterLeave () {
      if (this.render) {
        this.$destroy(true)
      }
    },
    handleClick () {
      if (event.target !== event.currentTarget) return
      this.close()
    }
  },
  render () {
    const { position } = this
    this.$nextTick(() => {
      const { target } = this
      const {bgElm, mainElm} = this.$refs
      if (bgElm) {
        const targetElm = target ? document.querySelector(target) : bgElm.parentElement
        if (getComputedStyle(targetElm, null).getPropertyValue('position') === 'static') {
          targetElm.style.position = 'relative'
        }
      }
      if (mainElm && !this.render) {
        const sourceElm = this.$slots.default[0].elm
        sourceElm && addStyle({target: sourceElm}, mainElm)
      }
    })
    const bgClass = ['c-transition-bg']
    const mainClass = ['c-transition-main']
    const mainStyle = {...this.mainStyle}
    position.forEach(property => {
      mainStyle[property] = 0
    })

    if (this.isShow) {
      bgClass.push('c-transition-block')
      mainClass.push('c-transition-block')
    }
    if (this.needBg) {
      bgClass.push('c-transition-bg-bg')
    }
    mainClass.push('c-transition-main-' + position[0] || 'left')
    return (
      <transition name="slide-fade"  on-after-leave={this.handleAfterLeave}>
        {this.isShow && <div ref="bgElm" class={bgClass} on-click={this.handleClick}>
          <div ref="mainElm" class={mainClass} style={mainStyle}>
            {this.$slots.default}
          </div>
        </div>}
      </transition>
    )
  }
}
</script>

<style scoped>
  .slide-fade-enter-active {
    transition: all .8s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
  }
  .slide-fade-enter .c-transition-main-left {
    transform: translateX(-100%)
  }
  .slide-fade-leave-to .c-transition-main-left {
    transform: translateX(-100%)
  }
    .slide-fade-enter .c-transition-main-top {
    transform: translateY(-100%)
  }
  .slide-fade-leave-to .c-transition-main-top {
    transform: translateY(-100%)
  }
    .slide-fade-enter .c-transition-main-right {
    transform: translateX(100%)
  }
  .slide-fade-leave-to .c-transition-main-right {
    transform: translateX(100%)
  }
    .slide-fade-enter .c-transition-main-bottom {
    transform: translateY(100%)
  }
  .slide-fade-leave-to .c-transition-main-bottom {
    transform: translateY(100%)
  }
  .c-transition-bg {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100000;
    overflow: hidden;
  }
  .c-transition-bg-bg {
    background: rgba(0, 0, 0, 0.3);
  }
  .c-transition-main {
    /* animation:slide-in 0.5s; */
    position: absolute;
    transition: all .8s;
    position: absolute;
  }
  .c-transition-block {
    display: block;
  }
</style>

