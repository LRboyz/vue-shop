<template>
    <div id="mine" v-if="userInfo.token">
        <van-nav-bar
                title="我的"
                :fixed=true
                :border=false
        ></van-nav-bar>
        <!--用户-->
        <van-cell-group style="margin-top: 2.6rem;">
            <van-cell
                    style="background-color: #3bba63;color:#FFF;"
                    label-class="labelClass"
                    is-link
                    :center=true
                    @click="$router.push('/dashboard/mine/userCenter')"
            >
                <template slot="title">
                    <div class="personMsg">
                        <img class="iconImage" src="./images/avator.jpg" alt="">
                        <div class="personInfo">
                            <span>LRboy</span>
                            <span>手机号：{{userInfo.phone}}</span>
                        </div>
                    </div>
                </template>
            </van-cell>
        </van-cell-group>
        <!--我的订单-->
        <van-cell-group>
            <van-cell
                title="我的订单"
                icon="label"
                value="查看全部订单"
                @click="$router.push({path: '/dashboard/mine/mineOrder'})"
                is-link>
            </van-cell>
            <router-link tag="div" :to="{path: '/dashboard/mine/mineOrder'}">
                <van-grid>
                    <van-grid-item
                            v-for="(order, index) in orderData"
                            :key="index"
                            :icon="order.icon"
                            :text="order.title">
                    </van-grid-item>
                </van-grid>
            </router-link>
        </van-cell-group>
        <!--我的优惠券-->
        <van-cell-group style="margin-top: 0.4rem">
            <van-cell title="我的优惠券" icon="gold-coin" value="1张" is-link></van-cell>
            <van-cell title="我的收货地址" icon="todo-list" is-link></van-cell>
        </van-cell-group>
        <!--联系客服-->
        <van-cell-group style="margin-top: 0.4rem">
            <van-cell title="联系客服" icon="phone" value="客服时间 07:00-22:00" is-link></van-cell>
            <van-cell title="意见反馈" icon="smile-comment" is-link></van-cell>
        </van-cell-group>
        <!--小撩买菜-->
        <van-cell-group style="margin-top: 0.4rem">
            <van-cell title="小撩买菜" icon="gift-card" value="下载APP体验更佳" is-link></van-cell>
        </van-cell-group>

        <!--路由的出口-->
        <transition name="router-slider" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
    <SelectLogin v-else/>
</template>

<script>
    import SelectLogin from './../../views/login/SelectLogin'

    import {mapState} from 'vuex'

    export default {
        name: "Mine",
        data() {
            return {
                orderData: [
                    {icon: 'cart-circle-o', title: '待支付'},
                    {icon: 'gift-o', title: '待收货'},
                    {icon: 'smile-comment-o', title: '待评价'},
                    {icon: 'cash-back-record', title: '售后/退款'}
                ]
            }
        },
        computed: {
            ...mapState(["userInfo"])
        },
        components: {
            SelectLogin
        }
    }
</script>

<style lang="less" scoped>
    #mine {
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
    }

    .van-nav-bar {
        background-color: #3bba63;
    }

    .van-nav-bar__title {
        color: #fff;
        font-size: 1rem;
    }

    .personMsg {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .personMsg > img {
        width: 4rem;
        height: 4rem;
        border-radius: 2rem;
        border: 0.12rem solid #FFF;
    }

    .personInfo {
        display: flex;
        flex-direction: column;
        margin-left: 0.8rem;
    }

    .van-cell__left-icon {
        color: orangered;
        font-size: 1.2rem;
    }

    /*转场动画*/
    .router-slider-enter-active, .router-slider-leave-active{
        transition: all 0.3s;
    }

    .router-slider-enter, .router-slider-leave-active{
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>