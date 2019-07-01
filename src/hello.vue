<template>
<div>
    <button @click="resr">asda</button>
    <div class="aaa">
        <button @click="resr">asda</button>
        <c-transition :isShow="ss" :needBg="true">
            <div>1231</div>
        </c-transition>
    </div>
</div>

</template>

<script>
import CTransition from './CTransition'
import a from './entry'
export default {
    data () {
        return {
            ss: false,
            value: 'aa6aa',
            i: null,
            options: [
                {value: 'aaa', label: 'asdasd'},
                {value: 'aa6aa', label: 'asdasd1'},
                {value: 'aa3aa', label: 'asdasd1'},
                {value: 'a1aaa', label: 'asdasd1'},
                {value: 'aaa3a', label: 'asdasd1'},
                {value: 'aa51aa', label: 'asdasd1'},
                {value: 'aaa1a', label: 'asdasd1'},
                {value: 'aa23aa', label: 'asdasd1'},
                {value: 'aa4aa', label: 'asdasd1'},
                {value: 'a5aaa', label: 'asdasd1'},
                {value: 'aa41aa', label: 'asdasd1'},
                {value: 'aa5aa', label: 'asdasd1'},
                {value: 'aaaga', label: 'asdasd1'},
                {value: 'aaaqa', label: 'asdasd1'},
                {value: 'aasaaa', label: 'asdasd1'},
                {value: 'aavaa', label: 'asdasd1'},
                {value: 'aaaa', label: 'asdasd1'},
                {value: 'aahaa', label: 'asdasd1'},
                {value: 'aajaa', label: 'asdasd1'},
                {value: 'aabaa', label: 'asdasd1'},
                {value: 'aaaaa', label: 'asdasd12'}
            ]
        }
    },
    components: {
        CTransition
    },
    methods: {
        resr () {
            // this.ss = !this.ss
            if (this.i && this.i.isShow) {
                this.i.close()
                this.i = null
                return
            }
            this.i = a({
                needBg: true,
                target: '.aaa',
                render: <div>123</div>
            })
        }
    }
}
</script>
