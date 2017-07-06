<template>
  <div class="error">{{data}}</div>
</template>

<script>
export default {
  name: 'Pos',
  props:["data"],
  data () {
  	return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.error{
  background: rgba(0,0,0,.6);
  font-size: 16px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 150px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  margin: auto;
  z-index: 11;
  color: #fff;
}
</style>
