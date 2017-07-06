<template>
  <div class="wrap">
    <OkAlert v-show="show" v-on:type="ok"></OkAlert>
    <router-view></router-view>
    <FooterBar v-on:ok="toParams"></FooterBar>
  </div>
</template>

<script>
import FooterBar from "@/components/Footer"
import OkAlert from "@/components/Ok"
export default {
  name: 'index',
  data () {
    return {
      show:false
    }
  },
  methods : {
    toParams (s) {
      this.show=s
    },
    ok (s) {
      this.show=s
    }
  },
  components :{
    FooterBar,
    OkAlert
  }
}
</script>


<style scoped>

</style>
