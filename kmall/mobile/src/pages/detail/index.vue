<template>
    <div class="Detail">
     <div class="product-intro clearfix">
    <div class="product-img">
        <div class="product-main-img">
            <img :src=detaileContent.mainImage alt="" />
        </div>
         <p>{{detaileContent}}</p>
        <!-- <ul class="product-small-img-list clearfix">
            
            <li class="product-small-img-item" v-for="image in detaileContent.images">
                <img :src="image" alt="" />
            </li>
           
        </ul> -->
    </div>
    </div>
<!--     <div class="product-info">
        <h2 class="product-name">{{name}}</h2>
        <p class="product-description">{{description}}</p>
        <div class="product-info-item product-price">
            <span class="label">价格:</span>
            <span class="info">￥{{price}}</span>
        </div>
        <div class="product-info-item">
            <span class="label">库存:</span>
            <span class="info">{{stock}}</span>
        </div>
        <div class="product-info-item product-count">
            <span class="label">数量:</span>
            <input type="text" value="1" class="count-input" readonly />
            <span class="count-btn plus">+</span>
            <span class="count-btn minus">-</span>
        </div>
        <div class="add-cart">
            <a href="javascript:;" class="btn add-cart-btn">添加购物车</a>
        </div>                                                  
    </div>
</div>
<div class="product-detail">
    <div class="tab">
        <ul class="tab-list clearfix">
            <li class="tab-item active">商品详情</li>
        </ul>
        <div class="tab-content">
            {{{detail}}}
        </div>
    </div>
</div> -->
    </div>
</template>

<script>
	import {GET_DETAILE} from './store/types.js'
	import { mapGetters } from 'vuex'
    export default {
        name:'Detail',
        mounted(){
        	var detailId=this.$route.params.detailId;
            this.$store.dispatch(GET_DETAILE,detailId)
            console.log(this.$store.state.detail.detaile)
        }
        , 
        computed:{
            ...mapGetters([
                'detaileContent'
            ])
        }    
    }

</script>

<style scoped lang="less">
    .product-main-img img{
        width: 100%;
    }
    .product-main-img p{
        width: 100%;
    }
</style>