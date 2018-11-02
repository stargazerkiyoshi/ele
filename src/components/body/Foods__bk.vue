<template>
  <div class="mybody">
    <div class="sidebar">
      <ul v-for="(v,k) in goods">
        <li @click="activeItem(k)" :class="currentIndex==k?'activeitems':'sideitems'"><p>{{v.name}}{{currentIndex}}</p></li>
        <div class="line"></div>
      </ul>
    </div>
    <div class="foodswrap">
      <!--<transition name="slide">-->
        <div @scroll.native="scrollItem" id="slidewrap" :style="{top:scrollHeight}">
        <ul  v-for="v in goods">
          <li>
          <div class="foodtitle">
            <div class="vline"></div>
            {{v.name}}
          </div>
          <div v-for="i in v.foods" class="foodinfoitem">
            <img :src="i.image" alt="">
            <p class="foodname">{{i.name}}</p>
            <p class="foodtext fooddescription">{{i.description}}</p>
            <p class="foodtext">月售<span class="foodsellcount">{{i.sellCount}}</span>份  好评率<span>{{i.rating}}</span>%</p>
            <div class="foodprice">
              <div class="price">
                <span>￥</span>
                <span>{{i.price}}</span>
              </div>
              <div v-if="i.oldPrice!=''" class="oldprice">
                <span>￥</span>
                <span>{{i.oldPrice}}</span>
              </div>
            </div>
            <div class="addbtn">+</div>
          </div>
          </li>

        </ul>
        </div>
      <!--</transition>-->
    </div>
  </div>

</template>

<script>
  import Vue from 'vue'
  export default {
    name: "Foods",
    data:function () {
      return {
        goods:{},
        sideItem:[],
        itemTop:[],
        scrollHeight:"",
        nowPageTop:""
      }
    },
    created:function () {
      var self=this;
      $.ajax({
        type:"get",
        url:"/api/goods",
        async:true,
        dataType:"json",
        success:function (res) {
          self.goods=res;
          for(var i=0;i<self.goods.length;i++){
            if(i==0){
              self.sideItem[i]=true;
            }else{
              self.sideItem[i]=false;
            }
          }
          console.log(self.goods)
        }
      });

    },
    mounted(){
      window.addEventListener('scroll',this.scrollItem,true)
    },
    updated(){
      var self=this;
      $(".foodtitle").each(function (index,obj) {
        self.itemTop[index]=$(obj).position().top;
      })
    },
    methods:{
      lightItem(k){
        for(var i=0;i<this.sideItem.length;i++){
          if(i==k){
            Vue.set(this.sideItem,i,true);
          }else{
            Vue.set(this.sideItem,i,false);
          }
        }
      },
      activeItem(k){
        this.scrollHeight=-this.itemTop[k]+"px";
        this.lightItem(k);
        console.log(this.sideItem[k])
      },
      scrollItem(){
        this.nowPageTop=$("#slidewrap").position().top;
        console.log(this.nowPageTop)
        // switch (true) {
        //   case (pageTop<this.itemTop[0])&&(pageTop>=-this.itemTop[1]):
        //     this.lightItem(0);
        //     break;
        //   case (pageTop<-this.itemTop[1])&&(pageTop>=-this.itemTop[2]):
        //     this.lightItem(1);
        //     break;
        //   case (pageTop<-this.itemTop[2])&&(pageTop>=-this.itemTop[3]):
        //     this.lightItem(2);
        //     break;
        // }

      }
    },
    computed:{
      currentIndex:function(){
        for(let i=0;i<this.itemTop.length;i++){
          if(!this.itemTop[i+1]||(this.nowPageTop<=this.itemTop[i]&&this.nowPageTop>-this.itemTop[i+1])){
            return i;
          }
        }
      }
    }

  }
</script>

<style scoped>
  .mybody{
    width: 750px;
    /*height: 986px;*/
    /*overflow: auto;*/
  }

  .sidebar{
    width: 160px;
    font-size: 24px;
    color:rgb(0,0,0);
    font-weight: 200;
    line-height: 28px;
    background: #f3f5f7;
    float:left;
    height: 986px;
    overflow: auto;
}
.sideitems{
  height: 108px;
  line-height: 108px;
  padding:0px 24px;
  text-align: left;
}
.sideitems p{
  display: inline-block;
  vertical-align: middle;
  line-height: 36px;
}
.activeitems{
  height: 108px;
  line-height: 108px;
  padding:0px 24px;
  text-align: left;
  background: white;
  font-weight: normal;
}
  .activeitems p{
    display: inline-block;
    vertical-align: middle;
    line-height: 36px;
  }
.line{
  width: 112px;
  background:rgba(7,17,27,0.1);
  margin: 0 auto;
  height: 2px;
}
.foodswrap{
  float:left;
  width: 590px;
  height: 986px;
  position: relative;
  overflow: auto;
}
.foodtitle{
  height: 52px;
  line-height: 52px;
  background:#f3f5f7;
  text-align: left;
  font-size: 24px;
  color:rgb(147,153,159);
}
.vline{
  width: 3px;
  height: 100%;
  background:#d9dde1;
  float:left;
  margin-right:28px;
}
.foodinfoitem{
  padding:36px;
  text-align: left;
  position: relative;
}
.foodinfoitem>img{
  width:128px;
  height:128px;
  margin-right: 20px;
  float:left;
}
.foodname{
  font-size: 28px;
  color:rgb(7,17,27);
  line-height: 28px;
  margin-top: 4px;

}
.foodtext{
  font-size: 20px;
  color:rgb(147,153,159);
  line-hight:20px;
  margin-top: 14px;
}
.addbtn{
  width:48px;
  height:48px;
  background:deepskyblue;
  color:white;
  border-radius:50%;
  line-height: 48px;
  text-align: center;
  font-size: 48px;
  position: absolute;
  right: 36px;
  bottom: 36px;
}
.foodprice{
  overflow: hidden;
}
.price{
  font-size: 28px;
  color:rgb(240,20,20);
  font-weight: 700;
  line-height: 48px;
  float: left;
  margin-right: 16px;
}
.price>span:first-child{
  font-size: 20px;
  font-weight: normal;
}
.oldprice{
  font-size:20px;
  color:rgb(147,153,159);
  font-weight: 700;
  line-height: 48px;
  float:left;
  text-decoration:line-through;
}
.oldprice>span:first-child{
  font-weight: normal;
}
#slidewrap{
  position: absolute;
  transition: all 0.5s ease;
}
  /*.slide-enter-active{*/
    /*transition: all 0.5s ease;*/
  /*}*/
  /*.slide-leave-active{*/
    /*transition: all 0.5s ease;*/
  /*}*/
</style>
