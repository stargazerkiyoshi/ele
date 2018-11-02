<template>
  <div class="chartAdd">
    <div class="icon-add_circle numadd " @click="addNum"></div>
    <div class="shownum">{{count}}</div>
    <div class="icon-remove_circle_outline numminus" @click="minusNum"></div>
  </div>
</template>

<script>
    export default {
        name: "Addcart",
        // props:["count"],
        props:["whichCate","whichFoods",'count'],
        data:function () {
          return {
            mydata:{}
          }
        },

        methods:{
          addNum(event){
            this.mydata.myCate=this.whichCate;
            this.mydata.myFoods=this.whichFoods;
            // console.log(this.whichCate,this.whichFoods);
            this.$emit("addNum",event.target);
            this.$store.commit("addCart",this.mydata);
          },
          minusNum(event){
            this.mydata.myCate=this.whichCate;
            this.mydata.myFoods=this.whichFoods;
            // console.log(this.whichCate,this.whichFoods);
            // this.$emit("addNum",event.target)
            // this.$emit('minusNum');

            this.$store.commit("minusCart",this.mydata);
          }
        }
    }
</script>

<style scoped>
  @import "../../assets/css/style.css";
  .chartAdd{
    width: 140px;

    font-size: 30px;
    line-height: 30px;
  }
  .numminus{
    /*position: absolute;*/
    /*right: 90px;*/
    float: right;
    margin-right: 20px;
    color:rgb(0,160,220);
  }
  .numadd{
    /*position: absolute;*/
    /*right: 10px;*/
    float:right;
    color:rgb(0,160,220);
  }
  .shownum {
    /*position:absolute;*/
    /*right: 50px;*/
    float: right;
    margin-right: 20px;
  }
</style>
