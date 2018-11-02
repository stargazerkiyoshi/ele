import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var store=new Vuex.Store({
  state:{
    goods:[{foods:[{name:"",count:0}]}],
    isInitalGoods:false,
    seller:{supports:[{description:""}],},
    isInitalSeller:false,
    ratings:{},
    isInitalRatings:false,
    isShowCart:false,
    totalPrice:0,
    num:0
  },
  mutations: {

    initalGoodsData(state, arg) {
      if(!state.isInitalGoods){
        state.goods = arg;
        for (var i = 0; i < state.goods.length; i++) {
          for (var j = 0; j < state.goods[i].foods.length; j++) {
            state.goods[i].foods[j].count = 0;
          }
        }
        state.isInitalGoods=true;
      }
    },
    initalSellerData(state,arg){
      if(!state.isInitalSeller){
        state.seller=arg;
        console.log(state.seller)
        state.isInitalSeller=true;
      }
    },
    initalRatingsData(state,arg){
      if(!state.isInitalRatings){
        state.ratings=arg;
        state.isInitalRatings=true;
      }
    },
    showCart(state, arg) {
      state.isShowCart = arg;
    },
    addCart(state, arg) {
      console.log(arg.myCate, arg.myFoods)
      state.goods[arg.myCate].foods[arg.myFoods].count += 1;
      console.log(state.goods[arg.myCate].foods[arg.myFoods].count);
      state.totalPrice=0;
      for(let i=0;i<state.goods.length;i++){
        for(let j=0;j<state.goods[i].foods.length;j++){
          state.totalPrice+=state.goods[i].foods[j].price*state.goods[i].foods[j].count;
        }
      }
      state.num++;
    },
    minusCart(state, arg) {
      state.goods[arg.myCate].foods[arg.myFoods].count -= 1;
      if (state.goods[arg.myCate].foods[arg.myFoods].count <= 0) {
        state.goods[arg.myCate].foods[arg.myFoods].count = 0;
      }
      console.log(state.goods[arg.myCate].foods[arg.myFoods].count);
      state.totalPrice=0;
      for(let i=0;i<state.goods.length;i++){
        for(let j=0;j<state.goods[i].foods.length;j++){
          state.totalPrice+=state.goods[i].foods[j].price*state.goods[i].foods[j].count;
        }
      }
      state.num--;
    },
  },
  actions:{
    initalGoodsData(context,arg){
        context.commit("initalGoodsData",arg);
    },
    initalSellerData(context,arg){
      context.commit("initalSellerData",arg);
    },
    initalRatingsData(context,arg){
      context.commit("initalRatingsData",arg);
    }
  }
});
export default store;
