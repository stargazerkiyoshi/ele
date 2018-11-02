<template>
    <div class="myheader">
      <div class="headImg"><img :src="$store.state.seller.avatar" alt="勺子"></div>
      <div class="headRight">
        <div class="shopName">
          <img src="@/assets/brand.png" alt="品牌">
          <h2>{{$store.state.seller.name}}</h2>
        </div>
        <div class="sendName">
          <p>{{$store.state.seller.description}}/{{$store.state.seller.deliveryTime}}分钟送达</p>
        </div>
        <div class="discountInfo">
          <img src="@/assets/decrease.png" alt="减">
          <span>{{$store.state.seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="discountNum">
        <span>{{$store.state.seller.supports.length}}个 ></span>
      </div>
      <div @click="showFloat" class="notice">
        <img src="@/assets/bulletin.png" alt="">
        <span>{{$store.state.seller.bulletin}}</span>
        <span>></span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "",
        data:function () {
          return {
          }
        },
        methods:{
          showFloat(){
            this.$emit("showFloat");
          }
        },
        created:function () {
          var self=this;
          $.ajax({
            type:"get",
            url:"/api/seller",
            async:true,
            dataType:"json",
            success:function (res) {
              self.$store.dispatch("initalSellerData",res);
            }
          })
        }
    }
</script>

<style scoped>
  .myheader{
    width: 750px;
    height: 268px;
    padding-top: 48px;
    padding-right:24px;
    background:#666;
    position: relative;
  }
  .headImg{
    width:128px;
    height:128px;
    background: yellow;
    float:left;
    margin-left: 48px;
  }
  .headImg>img{
    width: 128px;
  }
  .headRight{
    height: 128px;
    padding:4px 0px;
    margin-left: 32px;
    float: left;
  }
  .shopName{
    vertical-align:middle;
  }
  .shopName>img{
    height:36px;
    vertical-align: middle;
  }
  .shopName>h2{
    font-size:32px;
    color:white;
    font-weight:bold;
    line-height: 36px;
    display:inline-block;
    vertical-align: middle;
  }
  .sendName>p{
    font-size: 24px;
    color:white;
    font-weight: 200;
    line-height: 24px;
    text-align: left;
    margin-top: 14px;
    margin-bottom: 14px;
  }
  .discountInfo{
    text-align: left;
    vertical-align:middle;
  }
  .discountInfo>img{
    width: 24px;
    vertical-align:middle;
    /*float: left;*/
  }
  .discountInfo>span{
      display: inline-block;
      vertical-align: middle;
      color:white;
  }
  .discountNum{
      height: 32px;
      width:72px;
      border-radius: 16px;
      background:black;
      color:white;
      position: absolute;
      right:24px;
      bottom: 92px;
      font-size:20px;
      font-weight: 200;
      line-height: 32px;
  }
  .notice{
    width: 750px;
    /*height: 56px;*/
    line-height: 56px;
    padding:0px 24px;
    vertical-align:middle;
    position: absolute;
    bottom: 0px;
    text-align: left;
    background:rgba(7,17,27,0.2);
    font-size: 20px;
    color:white;
    font-weight: 200;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .notice>img{
    height:24px;
    vertical-align:middle;
  }
  .notice>span{
    display: inline-block;
    vertical-align:middle;
  }

</style>
