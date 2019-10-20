<template>
   <div id="userCenter">
       <!--导航栏-->
       <van-nav-bar
               title="用户中心"
               left-arrow
               :fixed=true
               :border=true
               @click-left="$router.go(-1)"
       ></van-nav-bar>
       <div class="logout">
           <button @click="logOut">退出登录</button>
       </div>
   </div>
</template>

<script>
    import {getLogOut} from './../../../service/api/index'
    import {mapMutations} from 'vuex'
    import {Toast} from 'vant'
    export default {
        name: "UserCenter",
        methods: {
            ...mapMutations(["RESET_USER_INFO", "CLEAR_CART"]),
            async logOut(){
                let result = await getLogOut();
                if(result.success_code === 200){
                    // 清空本地的数据
                    this.RESET_USER_INFO();
                    // 清空本地的购物车
                    this.CLEAR_CART();
                    Toast({
                       message: '退出登录成功！',
                       duration: 500
                    });
                }
            }
        }
    }
</script>

<style scoped>
   #userCenter{
       position: fixed;
       top: 0;
       left: 0;
       bottom: 0;
       right: 0;
       background-color: #f5f5f5;
       z-index: 200;
   }

   .logout{
       margin-top: 4rem;
       height: 2.5rem;
       width: 100%;
       background-color: #fff;
       display: flex;
       justify-content: center;
       align-items: center;
   }

   .logout button{
       background-color: transparent;
   }
</style>