<template>
    <div class="wrap">
      <div class="evaluationWrap">
        <div class="evaluationLeft">
          <p>{{seller.score}}</p>
          <p>综合评分</p>
          <p>高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="vline"></div>
        <div class="evaluationRight">
          <div class="eval">
            <span>服务态度</span>
            <Star  :score="seller.serviceScore" starWidth="16px"></Star>
            <span>{{seller.serviceScore}}</span>
          </div>
          <div class="eval">
            <span>食物口味</span>
            <Star :score="seller.foodScore" starWidth="16px"></Star>
            <span>{{seller.foodScore}}</span>
          </div>
          <div class="eval1">
            <span>送达时间</span>
            <span>{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="evaluationBody">
        <div class="btnAndFilerWrap">
          <div class="btnWrap">
            <div @click="changeFilerNum(0)" class="mybtns btnAll">
              全部
              <span>{{ratings.length}}</span>
            </div>
            <div @click="changeFilerNum(1)" class="mybtns btnSatisfied">
              满意
              <span>{{getSatisfiedNum}}</span>
            </div>
            <div @click="changeFilerNum(2)" class="mybtns btnDissatisfied">
              不满意
              <span>{{getDisSatisfiedNum}}</span>
            </div>
          </div>
          <div class="hline"></div>
          <div class="btnFilter">
            <span>对勾</span>
            <span>只看有内容的评价</span>
          </div>
        </div>
        <ul class="allItem">
          <li v-for="(v,k) in ratings" v-show="filerNum==0?true:(filerNum==1&&v.rateType==0)?true:(filerNum==2&&v.rateType==1)?true:false" class="items">
              <div class="headImg">
                <img :src="v.avatar" alt="">
              </div>
              <div class="itemRight">
                <p>
                  <span>{{v.username}}</span>
                  <span>{{getDate(k)}}</span>
                </p>
                <p>
                  <Star class="inlineStar" starWidth="12px"></Star>
                  <span class="itemSendTime">{{v.deliveryTime}}分钟送达</span>
                </p>

                <p>{{v.text}}</p>
                <div>
                  <div class="zan">赞一个</div>
                  <ul class="myFoodsList">
                    <li>大王香菇卤肉饭</li>
                  </ul>
                </div>
              </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    import Star from '../star/Star'
    import {mapState} from 'vuex'
    import {getMyDate} from '../../common/common'
    export default {
        name: "Comment",
        components:{
          Star
        },
        data(){
          return {
            filerNum: 0
          }
        },
        methods:{
          getDate(k){
            return getMyDate(parseInt(this.ratings[k].rateTime));
          },
          changeFilerNum(n){
            this.filerNum=n;
          }

        },
        computed:{
          ...mapState(['seller','ratings']),
          getSatisfiedNum(){
            var num=0
            for(var i=0;i<this.ratings.length;i++){
              if(this.ratings[i].rateType==0){
                num++;
              }
            }
            return num;
          },
          getDisSatisfiedNum(){
            return this.ratings.length-this.getSatisfiedNum;
          }
        },
        created:function () {
          var self=this;
          $.ajax({
            type:'get',
            url:'/api/ratings',
            async:true,
            dataType:'json',
            success:function (res) {
              self.$store.dispatch("initalRatingsData",res);
            }
          })
        }
    }
</script>

<style scoped>
  .wrap{
    width:750px;
    height:986px;
    background: #f3f5f7;

  }
  .evaluationWrap {
    width: 100%;
    height:212px;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2px solid #e6e7e8;
    border-bottom: 2px solid #e6e7e8;
  }
  .vline{
    width: 1px;
    background: #f3f5f7;
    height: 140px;
  }
  .evaluationLeft{
    width:275px;
    height: 140px;
  }
  .evaluationLeft>p:first-child{
    font-size: 48px;
    color:rgb(255,153,0);
    line-height: 56px;
  }
  .evaluationLeft>p:nth-child(2){
    font-size: 24px;
    color:rgb(7,17,27);
    line-height: 24px;
    margin-top: 12px;
  }
  .evaluationLeft>p:last-child{
    font-size:20px;
    color:rgb(7,17,27);
    line-height: 20px;
    margin-top: 16px;
  }
  .evaluationRight{
    width:474px;
    height: 140px;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .eval{
     width: 378px;
     display: flex;
     justify-content: space-between;
   }
  .eval1{
    width: 378px;
    text-align: left;
  }
  .eval1>span:nth-child(1){
    margin-right: 36px;
  }
  .evaluationBody{
    width: 750px;
    height: 742px;
    margin-top: 32px;
    overflow: auto;
  }
  .btnAndFilerWrap{
    width: 750px;
    height: 236px;
    padding: 36px;
    background: white;
    border-bottom: 2px solid #e6e7e8;
  }
  .btnWrap{
    margin-bottom: 36px;
    color:#637078;
    overflow: hidden;
  }
  .btnAll{
    background: #449fdb;
  }
  .btnSatisfied{
    background: #ccecf8;
  }
  .btnDissatisfied{
    background: #e9ebec;
  }
  .btnActive{
    background: #00a0dc;
    color:white;
  }
  .mybtns{
    width: 120px;
    line-height: 64px;
    float:left;
    margin-right: 16px;
    text-align: center;
    border-radius: 1px;
  }
  .mybtns>span{
    font-size: 16px;
  }
  .hline{
    width: 100%;
    height: 1px;
    background: #e6e7e8;
  }
  .btnFilter{
    margin-top: 29px;
    text-align: left;
  }
  .allItem{
    background: white;
  }
  .items{
    padding:36px;
    overflow: hidden;
    text-align: left;
  }
  .headImg{
    width: 56px;
    min-height: 189px;
    float: left;
    margin-right: 24px;
  }
  .headImg>img{
    width: 56px;
  }
  .inlineStar{
    display: inline-block;
  }
  .itemSendTime{
    font-size: 20px;
    font-weight: 200;
    color:rgb(147,153,159);
    line-height: 24px;
    margin-left: 12px;
  }
  .itemRight>p:first-of-type{
    font-size: 20px;
    line-height: 24px;
    overflow: hidden;
  }
  .itemRight>p:first-of-type>span:first-child{
    color:rgb(7,17,27);
    float: left;
  }
  .itemRight>p:first-of-type>span:last-child{
    font-weight: 200;
    color:rgb(147,153,159);
    line-height: 24px;
    float: right;
  }
  .itemRight>p:nth-of-type(3){
      margin-top: 12px;
  }
  .itemRight>div:last-child{
    margin-top: 16px;
    overflow: hidden;
  }
  .zan{
    float: left;
  }
  .myFoodsList{
    display: inline-block;
    float: left;
  }
  .myFoodsList>li{
    float: left;
  }

</style>
