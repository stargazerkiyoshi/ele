<template>
    <div class="wrap">
        <div class="myWrap shopheadWrap">
          <div class="shopheadWrapTop">
            <div>
              <div class="shopTitle">{{seller.name}}</div>
              <div class="shopStarWrap">
                <Star class="shopStar" starWidth="16px"></Star>
                <span>(661)</span>
                <span>月售{{seller.sellCount}}单</span>
              </div>
            </div>
            <div class="hartWrap">
              <div>红心</div>
              <div>已收藏</div>
            </div>
          </div>
          <div class="hline"></div>

          <div class="TopBottom">
            <div class="TopBottomItem">
              <p>起送价</p>
              <p>
                <span>{{seller.minPrice}}</span>
                <span>元</span>
              </p>
            </div>
            <div class="vline"></div>
            <div class="TopBottomItem">
              <p>商家配送</p>
              <p>
                <span>{{seller.deliveryPrice}}</span>
                <span>元</span></p>
            </div>
            <div class="vline"></div>
            <div class="TopBottomItem">
              <p>平均配送时间</p>
              <p>
                <span>{{seller.deliveryTime}}</span>
                <span>分钟</span>
              </p>
            </div>
          </div>
        </div>

        <div class="myWrap shopPulishWrap">
          <p class="shopTitle">公告与活动</p>
          <p>{{seller.bulletin}}</p>
          <ul>
            <li>
              <div class="hline"></div>
              <div v-for="v in seller.supports" class="publishItem">
                <img src="#" alt="">
                <span>{{v.description}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="myWrap shopRealPlaceWrap">
          <p class="shopTitle">商家实景</p>
          <div class="pics">
            <img v-for="v in seller.pics" :src="v" alt="">
          </div>
        </div>
        <div class="myWrap shopInfoWrap">
          <p class="shopTitle">商家信息</p>
          <ul>
            <li v-for="v in seller.infos">
              <div class="hline"></div>
              <div class="infoItem">{{v}}</div>
            </li>
          </ul>
        </div>
    </div>
</template>

<script>
    import Star from '../star/Star'
    import {mapState} from 'vuex'
    export default {
        name: "Shop",
        components:{
          Star
        },
        computed:{
          ...mapState(['seller']),
        }
    }

</script>

<style scoped>
  .wrap{
    width: 750px;
    height:900px;
    background: #f3f5f7;
    overflow: auto;
  }
  .myWrap{
    padding:36px;
    background: white;
    margin-bottom: 32px;
    border-top: 2px solid #e5e5e5;
    border-bottom:2px solid #e5e5e5;
  }
  .shopheadWrap{
    height: 303px;
  }
  .shopheadWrapTop{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 36px;
  }
  .shopTitle{
    font-size:28px;
    color:rgb(7,17,27);
    line-height: 28px;
    margin-bottom: 16px;
    text-align: left;
  }
  .shopStar{
    float: left;
    margin-right: 16px;
  }
  .shopStarWrap>span{
    font-size: 20px;
    color:rgb(77,85,93);
    line-height: 36px;
  }
  .shopStarWrap>span:first-of-type(1){
    margin-right: 24px;
  }
  .hartWrap>div:first-child{
    margin-bottom: 8px;
  }
  .hartWrap>div:last-child{
    font-size: 20px;
    color:rgb(77,85,93);
    line-height: 20px;
  }
  .hline{
    height: 1px;
    background: rgba(7,17,27,0.1);
  }
  .TopBottom{
    padding: 36px;
    display: flex;
    justify-content: space-between;
  }
  .TopBottomItem>p:first-child{
    font-size: 20px;
    color:rgb(147,153,159);
    line-height: 20px;
    margin-bottom: 8px;
  }
  .TopBottomItem span:first-of-type{
    font-size: 48px;
    font-weight: 200;
    color:rgb(7,17,27);
    line-height: 48px;
  }
  .TopBottomItem span:last-of-type{
    font-size: 20px;
    font-weight: 200;
    color:rgb(7,17,27);
    line-height: 48px;
  }
  .vline{
    height: 67px;
    width: 2px;
    background: rgba(7,17,27,0.1);
  }
  .shopPulishWrap{
    padding: 36px 36px 0px;

  }
  .shopPulishWrap>p:nth-child(2){
    padding:0px 24px;
    font-size: 24px;
    font-weight: 200;
    color:rgb(240,20,20);
    line-height: 48px;
    text-align: left;
  }
  .publishItem{
    padding:32px 24px;
    font-size:24px;
    font-weight: 200;
    color:rgb(7,17,27);
    line-height: 32px;
    text-align: left;
  }
  .pics{
    width: 100%;
    overflow: auto;
  }
  .pics>img{
    width: 240px;
    height: 180px;
    float: left;
    margin-right: 12px;
  }
  .infoItem{
    padding:32px 24px;
    font-size:24px;
    font-weight: 200;
    color:rgb(7,17,27);
    line-height: 32px;
    text-align: left;
  }
</style>
