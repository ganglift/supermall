<template>
    <div id="detail">
        <nav-bar>
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="title">
                <span v-for="(item, index) in titles" :key="item.id" 
                class="title-item" :class="{active: currentIndex === index}"
                @click="titleClick(index)">{{item}}  </span>
            </div>
        </nav-bar>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
    name: "DetailNavBar",
    components: {
        NavBar
    },
    data() {
        return{
            titles: ['商品', '参数', '评论', '推荐'],
            currentIndex: 0
            } 
    },
    methods: {
        titleClick(index) {
            this.currentIndex = index;
            this.$emit('titleClick',index);
        },
        backClick() {
            // this.$router.go(-1)
            this.$router.back()
        }
    }
}
</script>
   
<style scoped>
 .title {
        display: flex 
    }

    .title-item {
        flex: 1
    }

    .active {
        color: var(--color-high-text)
    }

    .back img {
        margin-top:10px;
    }
</style>