<template>
  <div class="mybody">
    <div  class="sidebar">
      <ul v-for="(v,k) in goods">
        <li @click="activeItem(k)" :class="currentIndex==k?'activeitems':'sideitems'"><p>{{v.name}}</p></li>
        <div class="line"></div>
      </ul>
    </div>
    <div ref="rightWrapper" @scroll="scrollItem" class="foodswrap">
      <!--<transition name="slide">-->
        <ul ref="foodCate" v-for="(v,k) in goods">
          <li>
          <div  class="foodtitle">
            <div class="vline"></div>
            {{v.name}}
          </div>
          <div v-for="(i,index) in v.foods" class="foodinfoitem">
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
            <Addcart :which-cate="k" :count="i.count"  :which-foods="index" class="bottomAddcart" :index="index" @addNum="addNum"></Addcart>
          </div>
          </li>
        </ul>
      <!--</transition>-->
    </div>

    <!--做动画的小球-->
    <div v-for="v in balls">
      <transition
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
        <div  v-show="v.judge" class="ball1">
          <div class="ball2"></div>
        </div>
      </transition>
    </div>
    <div v-show="false">{{$store.state.num}}</div>
  </div>

</template>

<script>
  import Addcart from "../Addcart/Addcart"
  import Cart from "../Cart/Cart"
  import { mapState } from "vuex"

  export default {
    name: "Foods",
    components:{
      Addcart
    },
    data:function () {
      return {
        heightArr:[],
        nowScrollTop:0,
        balls:[{rect:{},judge:false},{rect:{},judge:false},{rect:{},judge:false},{rect:{},judge:false},{rect:{},judge:false}],
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
          // self.goods=res;
          // self.$store.state.mygoods=self.goods;
          self.$store.dispatch("initalGoodsData",res);
          // self.$nextTick(()=>{
          // });
        }
      })
    },
    watch:{
        goods:function () {
            this.$nextTick(()=>{
              var heights=0;
              for(var i=0;i<this.$refs.foodCate.length;i++) {
                this.heightArr.push(heights)
                heights += this.$refs.foodCate[i].scrollHeight;
              }
            })
        }
    },

    methods: {

      addNum(el) {
        // this.rect = el.getBoundingClientRect();
        // this.judge = true;
        for(var i=0;i<this.balls.length;i++) {
          if(!this.balls[i].judge) {
            this.balls[i].rect=el.getBoundingClientRect();
            this.balls[i].judge=true;
            break;
          }
        }
      },
      //小球动画相关
      beforeEnter(el) {
        for(var i=0;i<this.balls.length;i++) {
          if(this.balls[i].judge) {
            var x = this.balls[i].rect.left - 30;
            var y = window.innerHeight - this.balls[i].rect.top - 24;
          }
        }

        // console.log(window.innerHeight)
        el.style.transform = `translateY(-${y}px)`;
        el.getElementsByClassName("ball2")[0].style.transform = `translateX(${x}px)`;
      },
      enter(el, done) {
        //重新绘制
        //clearRect canvas.width=canvas.width;
        el.offsetHeight;
        el.style.transform = `translateY(0px)`;
        el.getElementsByClassName("ball2")[0].style.transform = `translateX(0px)`;
        window.addEventListener("transitionend", done);
      },
      afterEnter(el) {
        for(var i=0;i<this.balls.length;i++) {
          if(this.balls[i].judge) {
            this.balls[i].judge = false;
          }
        }
      },
      scrollItem(){

        this.nowScrollTop = this.$refs.rightWrapper.scrollTop;
        console.log(this.nowScrollTop)
      },
      activeItem(k){
        console.log(k)
        console.log(this.heightArr[k]);
        // this.$refs.rightWrapper.scrollTop=this.heightArr[k];
        //首先获取当前滚动位置
        var oldScroll = this.$refs.rightWrapper.scrollTop;
        //目标滚动位置
        var newScroll = this.heightArr[k];
        var timer = setInterval(() => {
          console.log("?", oldScroll == newScroll)
          if (oldScroll < newScroll) {
            oldScroll += 15;
            if (oldScroll > newScroll) {

              oldScroll = newScroll;
            }
            console.log("----")

            this.$refs.rightWrapper.scrollTop = oldScroll;
          } else if (oldScroll > newScroll) {
            oldScroll -= 15;
            if (oldScroll < newScroll) {
              oldScroll = newScroll;
            }
            console.log(oldScroll)
            this.$refs.rightWrapper.scrollTop = oldScroll;
          } else {
            clearInterval(timer)
          }
        }, 10)
      }
    },
      computed: {
        ...mapState(['goods']),
        currentIndex() {
          for (var i = 0; i < this.heightArr.length; i++) {
            if (!this.heightArr[i + 1] || (this.nowScrollTop >= this.heightArr[i] && this.nowScrollTop < this.heightArr[i + 1])) {
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
    overflow: hidden;
  }
  .sidebar{
    width: 160px;
    font-size: 24px;
    color:rgb(0,0,0);
    font-weight: 200;
    line-height: 28px;
    background: #f3f5f7;
    float:left;
    height:986px;

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
  height:986px;

  /*position: relative;*/
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
  .ball1{
    transition: all cubic-bezier(.32,-0.56,.87,.35) 0.7s;
    position: absolute;
    left: 30px;
    bottom: 20px;
    z-index: 5;
  }
  .ball2{
    transition: all linear 0.7s;
    background:rgb(0,160,220);
    width:48px;
    height: 48px;
    border-radius: 50%;
  }
  .bottomAddcart{
    position: absolute;
    right: 36px;
    bottom: 36px;
  }

</style>
