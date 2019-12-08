<template>
    <div class="cart">
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{cartLength}})</div>
        </nav-bar>
        <cart-list />
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
    export default {
        name: 'Cart',
        components: {
            NavBar,
            CartList,
        },
        computed: {
            // cartLength() {
            //     return this.$store.state.cartList.length
            // },
            // cartList(state) {
            //     return state.cartList
            // }
            ...mapGetters(['cartLength', 'cartList'])
        }

    }
</script>

<style>
    .nav-bar {
        background-color: var(--color-tint);
        color:#fff;
        font-weight: 600;
    }
</style>