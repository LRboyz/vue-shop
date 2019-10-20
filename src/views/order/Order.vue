<template>
    <div id="order">
        <!--导航栏-->
        <van-nav-bar
                title="填写订单"
                left-arrow
                :fixed=true
                :border=true
                @click-left="onClickLeft"
        ></van-nav-bar>

        <!--收货地址-->
        <van-contact-card
                :type="address_type"
                add-text="选择收货地址"
                :name="address_name"
                :tel="address_phone"
                @click="chooseAddress"
                style="margin-top: 3rem"
        ></van-contact-card>

        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="送达时间" :value="arriveDate" @click="showDatePopup" is-link></van-cell>
            <router-link :to="{path: '/confirmOrder/orderDetail'}">
                <van-cell :value="`共${goodsCount}件`" is-link :center=true>
                    <template slot="title">
                        <img v-for="(goods, index) in threeShopCart" :src="goods.small_image" alt="" style="width: 3rem;">
                    </template>
                </van-cell>
            </router-link>
        </van-cell-group>

        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="支付方式" value="微信"></van-cell>
        </van-cell-group>

        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="备注">
                <input type="text" style="text-align: right" placeholder="选填，备注您的特殊需求！" v-model="notice">
            </van-cell>
        </van-cell-group>

        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="商品金额" :value="`¥${totalPrice}`"></van-cell>
            <van-cell title="配送费" :value="`¥${disPrice}`"></van-cell>
        </van-cell-group>

        <van-submit-bar
                :price="totalPrice*100 + disPrice*100"
                button-text="提交订单"
                label="实付"
                @submit="onSubmit">
        </van-submit-bar>

        <!--弹出日期组件-->
        <van-popup v-model="dateShow" round position="bottom">
            <van-datetime-picker
                v-model="currentDate"
                type="datetime"
                :min-date="minDate"
                :max-date="maxDate"
                @cancel="onDateCancel"
                @confirm="onDateConfirm"
            >
            </van-datetime-picker>
        </van-popup>

        <!--支付二维码-->
        <van-popup  v-model="isPay" round position="center">
            <qriously :value="qrcode" :size="200" />
        </van-popup>

        <transition name="router-slider" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import PubSub from 'pubsub-js'
    import Moment from 'moment'
    import {mapState} from 'vuex'
    import {Toast} from 'vant'
    import {postOrder, orderPaySuccess, getWXCode, queryPayStatus, getAllSelectedGoods, delAllSelectedGoods} from './../../service/api/index'
    export default {
        name: "Order",
        data() {
            return {
                // 1. 地址
                address_type: 'add', // 地址卡片类型
                address_name: null, // 收货人
                address_phone: null, // 收货人电话
                address_id: null, // 收货人地址ID

                // 2. 日期
                dateShow: false,
                minDate: new Date(),
                maxDate: new Date(2021, 10, 1),
                currentDate: new Date(),
                // 3. 送达时间
                arriveDate: '请选择送达时间',
                // 4. 备注
                notice: null,

                isPay: false, // 是否显示二维码蒙版
                qrcode: null, // 生成二维码的URL地址
            }
        },
        computed:{
            ...mapState(['shopCart', 'userInfo']),
            // 商品总件数
            goodsCount(){
                let selectedGoodsCount = 0;
                Object.values(this.shopCart).forEach((goods, index)=>{
                    if(goods.checked){
                        selectedGoodsCount += 1;
                    }
                });
                return selectedGoodsCount;
            },
            // 商品总价
            totalPrice(){
                let totalPrice = 0;
                Object.values(this.shopCart).forEach((goods, index)=>{
                    if(goods.checked){
                        totalPrice += goods.price * goods.num;
                    }
                });
                return totalPrice.toFixed(2);
            },
            //  取购物车中前三件选中的
            threeShopCart(){
                let shopCart = [];
                Object.values(this.shopCart).forEach((goods, index)=>{
                    if(goods.checked){
                        shopCart.push(goods);
                    }
                });
                return shopCart.slice(0, 3);
            },
            // 配送费
            disPrice(){
                // 商品总价 > 40 免配送费  <40 6元
                if(this.totalPrice > 40){
                    return 0;
                }else {
                    return 6;
                }
            }
        },
        mounted() {
            // 接收收货地址
            PubSub.subscribe('userAddress', (msg, address) => {
                if (msg === 'userAddress') {
                    // console.log(address);
                    // 修改卡片的类型
                    this.address_type = 'edit';
                    this.address_name = address.name;
                    this.address_phone = address.tel;
                    this.address_id = address.address_id;
                }
            })
        },
        methods: {
            // 1.点击了左边
            onClickLeft() {
                // alert(1);
                this.$router.back();
            },
            // 2.选择地址
            chooseAddress() {
                // alert(0);
                // /confirmOrder/myAddress
                this.$router.push('/confirmOrder/myAddress');
            },
            // 3.提交订单
            async onSubmit() {
               // 3.1 数据验证
               if(!this.address_id){
                  Toast({
                      message: '请选择收货地址',
                      duration: 500
                  });
                  return;
               }

               if(this.arriveDate === '请选择送达时间'){
                   Toast({
                       message: '请选择送达时间',
                       duration: 500
                   });
                   return;
               }

                if(!this.notice){
                    Toast({
                        message: '请添加注意事项',
                        duration: 500
                    });
                    return;
                }

                // 3.2 处理订单相关
                if(this.userInfo.token){
                    // 3.2.1 查询购物车订单
                    let goodsResult = await getAllSelectedGoods(this.userInfo.token);
                    // console.log(goodsResult);
                    // 3.2.2 创建订单
                    if(goodsResult.success_code === 200){
                        let orderResult = await postOrder(this.userInfo.token, this.address_id, this.arrive_time, goodsResult.data, this.notice, this.totalPrice, this.disPrice);
                        console.log(orderResult);
                        // 3.3.3 删除购物车中已经生成订单的商品
                        if(orderResult.success_code === 200){
                            let delResult = await delAllSelectedGoods(this.userInfo.token);
                            console.log(delResult);
                            // 3.3.4 发起微信支付
                            if(delResult.success_code === 200){
                                 // 测试，测试，测试
                                 let urlResult = await getWXCode(orderResult.data.order_id, 1);
                                 console.log(urlResult);
                                 if(urlResult.code_url){ // 有值
                                     this.isPay = true;
                                     this.qrcode = urlResult.code_url;
                                     // 3.3.5 验证用户是否扫码
                                     let payResult = await queryPayStatus(orderResult.data.order_id);
                                     console.log(payResult);
                                     if(payResult.success){
                                         Toast({
                                             message: payResult.message,
                                             duration: 1000
                                         });
                                         this.isPay = false;
                                         // 3.3.6 通知自己服务器订单支付成功
                                         let statusResult = await orderPaySuccess(this.userInfo.token, orderResult.data.order_id);
                                         console.log(statusResult);
                                         if(statusResult.success_code === 200){
                                              // 3.3.7 跳转到我的
                                             this.$router.replace('/dashboard/mine');
                                             window.sessionStorage.setItem('tabBarActiveIndex', '3');
                                         }
                                     }
                                 }
                            }else {
                                Toast({
                                    message: '订单处理出现问题！',
                                    duration: 500
                                });
                            }
                        }else {
                            Toast({
                                message: '购物车同步出现问题！',
                                duration: 500
                            });
                        }
                    }else {
                        Toast({
                            message: '获取订单商品失败！',
                            duration: 500
                        });
                    }
                }
            },
            // 4.展示日期组件
            showDatePopup(){
                this.dateShow = true;
            },
            // 5. 取消日期组件
            onDateCancel(){
                this.dateShow = false;
            },
            // 6. 确认日期组件
            onDateConfirm(value){
                this.dateShow = false;
                this.arriveDate = Moment(value).format('YYYY-MM-DD hh:mm');
                // console.log(value);
            }
        },
        beforeDestroy() {
            PubSub.unsubscribe('userAddress');
        }
    }
</script>

<style scoped>
    #order {
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
    }

    /*转场动画*/
    .router-slider-enter-active, .router-slider-leave-active {
        transition: all 0.3s;
    }

    .router-slider-enter, .router-slider-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>