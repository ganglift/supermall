<template>
    <div id="detail" ref="detail">
       <!-- <ul>
           <li v-for="item in $store.state.cartList" :key="item.id">{{item}}</li>
       </ul> -->
        <detail-nav-bar @titleClick="titleClick"/>
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods= "goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo"/>
        <detail-params-info ref="params" :param-info="paramInfo"/>
        <detail-comment-info ref="comment" :comment-info="commentInfo"/>
        <goods-list ref="recommend" :goods="recommend"/>
        <detail-bottom-bar @addToCart="addToCart"/>
         <back-top @click.native="backClick"/>
    </div>
</template>
<script>
//导入组件
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamsInfo from './childComps/DetailParamsInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'
import DetailBottomBar from './childComps/DetailBottomBar'
import BackTop from 'components/content/backTop/BackTop'

//导入网络请求的方法
import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail"
export default {
    name: "Detail",
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamsInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        BackTop
    },
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommend: [],
            themeTopYs: []
        }
    },
    created() {
        //1保存传入的iid
        // console.log(this.$route.params)
        this.iid = this.$route.params.iid

        //2根据iid请求数据
        getDetail(this.iid).then(res => {
            console.log(res)
            const data = res.result;
            //获取轮播图
            this.topImages = res.result.itemInfo.topImages
            //获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            //获取店铺信息
            this.shop = new Shop(data.shopInfo)
            //获取商品详情信息
            this.detailInfo = data.detailInfo;
            //取出商品参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
            //取出评论信息
            if(data.rate.list) {
                this.commentInfo = data.rate.list[0];
            }
        })
        //3 获取推荐数据
        getRecommend().then(res => {
            // console.log(res)
            this.recommend = res.data.list
        })
        this.$nextTick((index) => {
           this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

        console.log(this.themeTopYs)
        })  
    },
    methods: {
        titleClick(index) {
            console.log(index);
            window.scrollTo(0, -this.themeTopYs[index])
            console.log(this.themeTopYs[index])
            this.$refs.detail.scroll(0, -this.themeTopYs[index])
            // this.$nextTick((index) => {
            //     window.scroll(0, -this.themeTopYs[index]) 

// });
        },
        addToCart() {
            //获取购物车中需要展示的信息
            const product = {}
            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.newPrice
            product.iid = this.iid

            //将商品添加到购物车中
            // this.$store.commit('addCart', product)
            this.$store.dispatch('addCart', product)
        },
        backClick(){
                console.log('hhh')
                window.scroll(0,0)
        // getOffsetTop(index) {
        //     this.themeTopYs.push(0);
        //     this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

        //     console.log(this.themeTopYs)
        }
    },
    mounted() {
            // this.themeTopYs.push(0);
            // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

            // console.log(this.themeTopYs)
    },
    updated() {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

        console.log(this.themeTopYs)
    }
}
</script>

<style scoped>
  
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
</style>