<template>
	<!-- v-show="!selected" -->
  <div class="pos">
	<div class="bg"  @click="toParams"></div>
	<div class="pos-list">
		<span v-for="item in data">{{item.cname}}</span>
	</div>
</div>
</template>

<script>
export default {
  name: 'Position',
  props: ['data'],
  data () {
  	return {}
  },
  methods : {
  	toParams () {
        this.$emit('child-say',1);
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.pos{
	position: absolute;
	top: 39px;
	bottom: 0;
	width: 100%;
	.bg{
		background: rgba(0,0,0,.6);
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
	}
	.pos-list{
		position: absolute;
		width: 100%;
		box-sizing:border-box;
		background: #fff;
		display: flex;
		flex-wrap:wrap;
		text-align: center;
		padding: 15px;
		span{
			padding: 3px 0;
			width: 30%;
			margin-right: 3%;
			margin-bottom: 3%;
			border: 1px solid #ccc;
			box-sizing:border-box;
		}
	}
}
</style>
