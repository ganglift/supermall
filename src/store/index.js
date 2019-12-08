import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

//1安装插件
Vue.use(Vuex)

//2创建store对象
const store = new Vuex.Store({
    getters,
    state: {
        cartList: []
    },
    mutations: {
        addCounter(state, payload) {
            payload.count++
        },
        addToCart(state, payload) {
            payload.checked = false
            state.cartList.push(payload)
        }
    },
    actions: {
        addCart(context, payload) {
            //payload新添加的商品是否为原购物车中已存在的
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
                // let oldProduct = null
                // for (let item of state.cartList) {
                //     if (item.iid === payload.iid) {
                //         oldProduct = item;
                //     }
                // }

            //若oldProduct存在，数量加一，不存在则添加至购物车列表
            if (oldProduct) {
                // oldProduct.count += 1
                context.commit('addCounter', oldProduct)
            } else {
                payload.count = 1
                    // context.state.cartList.push(payload)
                context.commit('addToCart', payload)
            }
        }
    }
})

//3导出至vue实例中(main.js)
export default store