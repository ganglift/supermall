<template>
    <div id="home" ref="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

        <!-- <scroll class="content"> -->
            <home-swiper :banners= 'banners' />
            <recommend-view :recommends="recommends"/>
            <feature-view/>
            <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick"/>
            <goods-list :goods="showGoods"/> 
        <!-- </scroll>  -->
        <back-top @click.native="backClick"/>
    </div>

</template>

<script>
    //公共组件
    import NavBar from 'components/common/navbar/NavBar'
    import TabControl from 'components/content/tabControl/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'
    // import Scroll from 'components/common/scroll/Scroll'
     import BackTop from 'components/content/backTop/BackTop'


    //home的子组件
    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/RecommendView'
    import FeatureView from './childComps/featureView'
   
    //导入网络请求
    import {getHomeMultidata, getHomeGoods} from "network/home"
    export default {
        name: 'Home',
        components: {
            NavBar,
            TabControl,
            GoodsList,
            // Scroll,
            BackTop,

            HomeSwiper,
            RecommendView,
            FeatureView
        },
        data() {
            return{
                banners: [],
                recommends: [],
                //3-1设计数据结构，保存数据
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []},
                },
                currentType: 'pop'
            }
        },
        created() {
            //1创建生命周期函数：组件创建好后就请求数据
            this.getHomeMultidata()
            
            //2.请求商品数据
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')
            // getHomeGoods('pop', 1).then(res => {
            //     console.log(res);
                
            // })
        },
        mounted() {
           
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        methods: {
            //事件监听相关方法
            tabClick(index) {
                switch (index) {
                    case 0: 
                    this.currentType = 'pop'
                    break
                    case 1: 
                    this.currentType = 'new'
                    break
                    case 2: 
                    this.currentType = 'sell'
                    break
                }
            },
            backClick(){
                console.log('hhh')
                window.scroll(0,0)
            },

            //网络请求相关方法
            getHomeMultidata() {
                 getHomeMultidata().then(res => {
                //  console.log(res);
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list
                 })
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1
                getHomeGoods(type, page).then(res =>{
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page += 1
                    //  console.log(res);
                })
            }

        }
    }
</script>

<style scroper>
     #home {
        padding-top:44px; 
        /* position: relative;
        height: 100vh; */
     } 
    .home-nav {
        background-color: var(--color-tint);
        color: #fff;

        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        z-index: 9;
    }
    .tab-control {
        position: sticky;
        top: 44px;
        z-index: 9;
    }
    .content {
        /* overflow: hidden; */
        /* height: 300px; */

        position: absolute;
        top: 20px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
</style>