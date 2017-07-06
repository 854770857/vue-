<template>
  <div class="all">
    <HeaderBar :data="obj"></HeaderBar>
    <section class="section">
      <TabToggle></TabToggle>
      <router-view></router-view>
    </section>
    
  </div>
</template>

<script>
import HeaderBar from "@/components/Header"
import TabToggle from "@/components/Tab"
export default {
  name: 'index',
  data () {
    return {
      obj:{
        "text":"他趣",
        "icon1":"iconfont icon-sousuo_sousuo",
        "icon2":"iconfont icon-gouwuche"
      }
    }
  },
  components : {
    HeaderBar,
    TabToggle
  }
}
</script>


<style scoped lang="less">
  
</style>
