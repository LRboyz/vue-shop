import Vue from  'vue'

// 人民币过滤器
Vue.filter('moneyFormat', (value)=>{
    return '¥' + Number(value).toFixed(2);
});