<template>
  <header class="header">
    <h4 v-if="data.text1">{{data.text1}}</h4>
    <h3 v-else>{{data.text}}</h3>
    <a v-if="data.back" class="back" @click="back"><i :class="data.back"></i></a>
    <router-link to="/" class="search"><i :class="data.icon1"></i></router-link>
    <router-link to="/shopping" class="shopcar"><i :class="data.icon2"></i></router-link>
  </header>
</template>

<script>
export default {
  name: 'header',
  props:["data"],
  data () {
    return {}
  },
  methods : {
    back () {
      window.history.go(-1);
    }
  }
}
</script>

<style scoped lang="less">
.header{
    background: #c864f0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    color: #fff;
    padding-left: 40px;
    padding-right: 15px;
    box-sizing:border-box;
    h3{
      line-height: 44px;
      width: 60%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow:ellipsis;
      font-size: .16rem;
      font-weight: normal;
    }
    h4{
        text-align: center;
        line-height: 44px;
        font-size: 14px;
    }
    a{
      position: absolute;
      color: #fff;
    }
    .back{
      top: 10px;
      left: 15px;
    }
    .search{
      right: 45px;
      top: 12px; 
    }
    .shopcar{
      right: 15px;
      top: 12px; 
    }
}
</style>
