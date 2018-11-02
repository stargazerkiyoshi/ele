<template>
  <div class="cartwrap">

    <span class="totalprice">￥{{$store.state.totalPrice}}</span>
    <span>|</span>
    <span>另需配送费￥{{$store.state.seller.deliveryPrice}}元</span>
    <div class="purchasebtn">
      {{$store.state.totalPrice<20?'￥20元起送':'结算'}}
    </div>
    <div v-show="$store.state.isShowCart" class="cartItemWrap">
      <div class="cartItemTitle">
        <span>购物车</span>
        <span>清空</span>
      </div>
      <div v-for="(v,k) in goods">
        <div v-for="(i,index) in v.foods" v-if="i.count!=0" class="cartItem">
          <span>{{i.name}}</span>
          <Addcart @minusNum="minusNum" :which-cate="k" :which-foods="index" :count="i.count" class="cartItemAddbtn"></Addcart>
          <span>{{i.count*i.price}}</span>
          <span>￥</span>
        </div>
      </div>

    </div>
    <div @click="showCart" class="carticonwrap">
      <span class="icon-shopping_cart carticon"></span>
    </div>
  </div>
</template>

<script>
  import Addcart from '../Addcart/Addcart'
  import {mapState} from 'vuex'
    export default {
        name: "Cart",
        components:{
          Addcart
        },
        data:function(){
          return {
            mySelectFoods:[]
          }
        },
        updated:function(){
          for(let i=0;i < this.$store.state.goods.length;i++){
            for(let j=0;j<this.$store.state.goods[i].foods.length;j++){
              this.mySelectFoods.push(this.$store.state.goods[i].foods[j]);
            }
          }
        },
        methods:{
          showCart(){
            // this.judgeShowCart=!this.judgeShowCart;
            var isShowCart=!this.$store.state.isShowCart;
            this.$store.commit("showCart",isShowCart);
          },
          minusNum(){

          }
        },
        computed:{
          ...mapState(['goods']),
        }
    }
</script>

<style scoped>
  @import "../../assets/css/style.css";
  .cartwrap{
    width: 750px;
    height: 96px;
    background: #141d27;
    color:rgba(255,255,255,0.4);
    line-height: 96px;
  }
  .carticonwrap{
    width: 112px;
    height: 112px;
    line-height: 112px;
    border:12px solid #141d27;
    border-radius: 50%;
    background: #2b343c;
    position: absolute;
    left: 36px;
    top: -16px;
  }
  .carticon{
    font-size: 48px;
    color:#80858a;
  }
  .cartwrap>span:nth-of-type(1){
    font-size: 32px;
    font-weight: 700;
    float: left;
    margin-left: 160px;
  }
  .cartwrap>span:nth-of-type(2){
    float:left;
    margin-left: 24px;
    margin-right: 24px;
  }
  .cartwrap>span:nth-of-type(3){
    float:left;
    font-size: 24px;
  }
  .purchasebtn{
    width: 210px;
    line-height: 96px;
    background: #2b333b;
    float: right;
    font-size: 24px;
    font-weight: 700;
  }
  .cartItemWrap{
    width: 100%;
    max-height: 515px;
    position: absolute;
    bottom: 96px;
    overflow: auto;
  }
  .cartItemTitle{
      line-height: 80px;
      padding:0px 36px;
      background:#f3f5f7;
      overflow:hidden;
  }
  .cartItemTitle > span:first-child{
    font-size: 28px;
    font-weight: 200;
    color:rgb(7,17,27);
    float:left;
  }
  .cartItemTitle>span:last-child{
    font-size: 24px;
    color:rgb(0,160,220);
    float: right;
  }
  .cartItem{
    line-height: 96px;
    background:white;
    padding:0px 36px;
    overflow: hidden;
  }
  .cartItem>span:first-child{
    font-size:28px;
    color:rgb(7,17,27);
    float:left;
  }
  .cartItem>span:nth-child(4){
    font-size: 20px;
    font-weight: normal;
    color:rgb(240,20,20);
    float:right;
  }
  .cartItem>span:nth-child(3){
    font-size: 28px;
    font-weight: 700;
    color:rgb(240,20,20);
    float:right;
  }
  .cartItemAddbtn{
    color:black;
    float:right;
    margin-top: 36px;
  }
</style>
