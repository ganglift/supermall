<template>
    <div class="wrapper" ref="wrapper"> 
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: "Scroll",
    data() {
        return {
            scroll: null
        }
    },
    mounted() {
        this.scroll = new BScroll(this.$refs.wrapper,{
             probeType: 3,
            pullUpLoad: true,
            click:true
        })
        this.scroll.on('scroll', (position) => {})
    },
    
}
</script>

<style scoped>
    .wrapper {
        height: 300px;
    }
</style>