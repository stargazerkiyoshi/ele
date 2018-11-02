<template>
  <div>
    <div class="shopwrap">
      <router-link to="/foods" tag="span" class="goods">商品</router-link>
      <router-link to="/comment" tag="span" class="comment">评论</router-link>
      <router-link to="/shop" tag="span" class="seller">商家</router-link>
    </div>
    <div class="headline"></div>
    <router-view></router-view>

  </div>

</template>

<script>

  export default {
    name: "Shopbody",
    components:{      //少写了一个s让我找了半个小时的错

    }
  }
</script>

<style scoped>
  .shopwrap{
    line-height: 80px;
    display: flex;
    justify-content: space-around;
    font-size: 28px;
  }
  .goods{
    color:rgb(77,85,93);
  }
  .comment{
    color:rgb(77,85,93);
  }
  .seller{
    color:rgb(77,85,93);
  }
  .headline{
    height: 2px;
    background: rgba(7,17,27,0.1);
  }
  .router-link-active {
    color:rgb(240,20,20);
  }

</style>
