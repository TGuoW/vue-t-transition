## 一个动画组件

### Usage

#### 组件方式

    import { VueTTransition } from 'vue-t-transition'
    ...
        components: {
            VueTTransition
        }
    ...

    or

    ...
    Vue.use(VueTTransition)
    ...

    then

    ...

    <vue-t-transition :isShow="ss" :needBg="true" :position="['top', 'left']">
        <div style="width: 100px;height: 100px; background:#fff">1231</div>
    </vue-t-transition>

    ...
选项|说明|默认值|类型
--|:--|:--|:--|
isShow|是否显示组件内容|false|Boolean
needBg|是否需要遮罩背景|true|Boolean
position|组件内容位置，长度为1或2的数组，可能的子元素值为top, right, bottom, left|['top','left']|Array
mainStyle|组件内容样式|{}|Object

#### 服务方式

    import VueTTransition from 'vue-t-transition'

    ...
    // open
    VueTTransition({
        needBg: true,
        target: '.aaa',
        position: ['left'],
        target: 'body',
        render: <div>123</div>
    })
    ...
选项|说明|默认值|类型
--|:--|:--|:--|
target|目标父组件|-|选择器字符串
render|组件内容vNode，一般填写jsx或者this.$createElement(...)|-|vNode

