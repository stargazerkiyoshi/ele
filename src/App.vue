<template>
  <div id="app">
    <transition name="fade">
      <div v-show="myjudge" class="showFloat">
        <div class="title1">粥品香坊(大运和)</div>
        <Star score="2.0"></Star>
        <div @click="closeFloat" class="closeFloat">X</div>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="$store.state.isShowCart" class="showFloat">
      </div>
    </transition>
      <Shopheader @showFloat="myjudge=true"></Shopheader>
      <Shopbody></Shopbody>
    <Cart class="bottomCart"></Cart>
  </div>
</template>

<script>

import Shopheader from './components/header/Shopheader'
import Shopbody from './components/body/Shopbody'
import Cart from "./components/Cart/Cart"
import Star from './components/star/Star'

export default {
  name: 'App',
  components: {
    Shopheader,
    Shopbody,
    Star,
    Cart
  },
  data:function () {
    return {
      myjudge:false
    }
  },
  methods:{
    closeFloat(){
      this.myjudge=false;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.showFloat{
  width:100vw;
  height: 100vh;
  background: rgba(7,17,28,.8);
  /*filter:blur(20px);*/
  position: absolute;
  top: 0;
  z-index: 2;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}
  .title1{
    font-size: 32px;
    font-weight: 700;
    line-height: 32px;
    margin-top:128px;
    margin-bottom: 32px;
  }
  .closeFloat{
    margin-top:900px;
    font-size: 64px;
    color:rgba(255,255,255,.5);
  }
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.bottomCart{
  position: absolute;
  bottom: 0px;
  z-index: 4;
}
</style>
