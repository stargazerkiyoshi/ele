<template>
  <div style="color:white">
    <!--<img v-for="v in starArr" :src="'../../assets/img/star24_'+v+'@2x.png'" alt="">-->
    <img :style="{width:starWidth}" v-for="v in starArr" :src="v" alt="">
  </div>
</template>

<script>
  // nodejs import 图片之后会转为base64
  //var on=requir("../../assets/img/star24_on@2x.png")
    import on from '../../assets/img/star24_on@2x.png'
    import half from '../../assets/img/star24_half@2x.png'
    import off from '../../assets/img/star24_off@2x.png'

    export default {
        name: "star",
        // props:['score','starWidth'],
        props:{
          score:{
            default:3.5
          },
          starWidth:{
            default:"20px"
          }
        },
        created(){
          for(var i=0;i<parseInt(this.score);i++){
            // this.starArr.push("on")
            this.starArr.push(on)

          }
          if(this.score%1>=0.5){
            // this.starArr.push("half");
            this.starArr.push(half);
          }
          while (this.starArr.length<5){
            // this.starArr.push("off");
            this.starArr.push(off);
          }
        },
        data:function () {
          return {
            starArr:[]
          }
        }
    }
</script>

<style scoped>

</style>
