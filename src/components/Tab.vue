<template>
  <nav class="nav">
    <div class="list">
      <router-link class="tab" v-for="item in list" :to="item.Link+'/'+ item.NavID"active-class="on">{{item.Title}}</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Tab',
  data () {
    return {
      list:[]
    }
  },
  components : {
  },
  created () {
    this.getTab();
  },
  methods : {
    getTab () {
      let that=this;
      this.$axios.get('/api/navList',{})
      .then(function (response) {
        var data = response.data.data;
        that.list=data;
      })
      .catch(function (response) {
        console.log(response);
      });
    }
  }
}
</script>


<style scoped lang="less">
  .nav{
    border-bottom: 1px solid #ccc;
    background: #fff;
    line-height: 44px;
    overflow-x: auto;
    .list{
      display: -webkit-box;
    }
    .tab{
      padding-left: 10px;
      padding-right: 10px;
      display: block;
      position: relative;
      color: #a3a3a2;
      &.on{
        color:#c864f0;
      }
        &.on:after{
          display: block;
          width: 80%;
          content:"";
          height:2px;
          background:#c864f0;
          position: absolute;
          left: 10%;
          bottom: 10%;
        }
    }
  }
</style>
