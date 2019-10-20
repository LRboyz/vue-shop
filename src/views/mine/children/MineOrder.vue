<template>
    <div id="orderDetail">
        <!--导航栏-->
        <van-nav-bar
                title="我的订单"
                left-arrow
                :fixed=true
                :border=true
                @click-left="$router.go(-1)"
        ></van-nav-bar>

        <van-tabs
                v-model="activeName"
                style="margin-top: 2.6rem"
                title-active-color="#75a342"
                color="#75a342"
                @click="dealWithTabClick"
        >
            <van-tab title="全部" name="a">
                <MineOrderItem v-for="(order, index) in allOrderArr" :order="order" :key="order._id"/>
            </van-tab>
            <van-tab title="待支付" name="b">
                <MineOrderItem v-for="(order, index) in allWillOrderArr" :order="order" :key="order._id"/>
            </van-tab>
            <van-tab title="待收货" name="c">
                <MineOrderItem v-for="(order, index) in allPayOrderArr" :order="order" :key="order._id"/>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import MineOrderItem from './components/MineOrderItem'
    import {getOrder} from './../../../service/api/index'
    import {mapState} from 'vuex'
    import {Toast} from 'vant'

    export default {
        name: "MineOrder",
        data() {
            return {
                activeName: 'a',
                allOrderArr: null, // 所有的订单
                allWillOrderArr: null, // 所有待支付的订单
                allPayOrderArr: null, // 所有支付的订单
            };
        },
        computed: {
            ...mapState(['userInfo'])
        },
        mounted() {
            // 获取订单数据
            this.initOrder();
        },
        components: {
            MineOrderItem
        },
        methods: {
            async initOrder() {
                let result = await getOrder(this.userInfo.token);
                if (result.success_code === 200) {
                    this.allOrderArr = result.data;
                    console.log(this.allOrderArr);
                } else {
                    Toast({
                        message: '订单获取失败',
                        duration: 600
                    });
                }
            },
            async dealWithTabClick(name, title) {
                if (name === 'a') {
                    this.allOrderArr = await this.getTabOrder();
                } else if (name === 'b') {
                    this.allWillOrderArr = await this.getTabOrder('will')
                } else if (name === 'c') {
                    this.allPayOrderArr = await this.getTabOrder('pay')
                }
            },
            async getTabOrder(status) {
                let result = await getOrder(this.userInfo.token, status);
                if (result.success_code === 200) {
                    return result.data;
                } else {
                    Toast({
                        message: '订单获取失败',
                        duration: 600
                    });
                }
            }

        }
    }
</script>

<style scoped>
    #orderDetail {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 120%;
        background-color: #f5f5f5;
        z-index: 200;
    }
</style>