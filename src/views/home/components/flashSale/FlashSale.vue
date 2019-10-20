<template>
    <div class="wrapper">
        <div class="titleWrapper">
            <div class="title">限时抢购</div>
            <span class="actionStateText">07:00场</span>
            <div class="actionStateTextEnd">已结束</div>
            <span class="more">更多</span>
        </div>
        <div class="itemsWrapper">
             <FlashSaleItem
                     v-for="(product, index) in flash_sale_product_list"
                     :product="product"
                     :key="product.id"
             />
        </div>
    </div>
</template>

<script>
    import FlashSaleItem from './FlashSaleItem'
    export default {
        name: "FlashSale",
        props:{
            flash_sale_product_list: Array
        },
        components:{
            FlashSaleItem
        }
    }
</script>

<style scoped>
    .wrapper {
        position: relative;
        margin-top: 0.625rem;
        padding: 1.25rem 0 0.9375rem 0;
        background: white; }

    .titleWrapper {
        position: relative;
        margin: 0 0.625rem 0.625rem 0.625rem;
        height: 1.5625rem;
    }

    .title {
        display: inline-block;
        border-left: 4px #3cb963 solid;
        padding-left: 0.3125rem;
        height: 1.3125rem;
        line-height: 1.3125rem;
        vertical-align: middle;
        font-size: 1.1875rem; }

    .actionStateText {
        display: inline-block;
        vertical-align: middle;
        line-height: 0.875rem;
        font-size: 0.875rem;
        border-radius: 3px;
        padding: 0.15625rem;
        /*border: 1px solid #FE3824;*/
        color: #FE3824;
        margin-left: 0.3125rem; }

    .actionStateTextEnd {
        display: inline-block;
        vertical-align: middle;
        line-height: 0.875rem;
        font-size: 0.875rem;
        border-radius: 3px;
        padding: 0.15625rem;
        border: 1px solid #999;
        color: #666;
        margin-left: 0.3125rem;
    }

    .more {
        position: absolute;
        top: 0;
        right: 0;
        height: 1.5625rem;
        line-height: 1.5625rem;
        font-size: 0.875rem;
        color: #2EB257;
    }

    .itemsWrapper {
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
    }

    .itemsWrapper::-webkit-scrollbar{
        display: none
    }
</style>