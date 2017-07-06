<template>
  <div class="ok">
  	<div class="box">
  		<h4>联系我们</h4>
  		<div class="content">
  			<p>客服热线：<span><a href="tel:4000-975-976">4000-975-976</a></span></p>
  			<p>官方微信：<span>taquapp123</span></p>
  		</div>
  		<h4 @click="ok">OK</h4>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'OK',
  data () {
  	return {
  	}
  },
  methods : {
  	ok () {
		this.$emit("type",0)
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.ok{
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
	background: rgba(0,0,0,.8);
	z-index: 10;
	padding-left: 8%;
	padding-right: 8%;
	box-sizing: border-box;
	display: flex;
	justify-content:center;
	align-items: center;

	/*  */
	.box{
		width: 100%;
		background: #fff;
		border-radius: 10px;
		text-align: center;
		/*  */

		h4{
			line-height: 3;
			color: #afafbc;
		}
		.content{
			border-top: 1px solid #ccc;
			border-bottom: 1px solid #ccc;
			padding-top: 10%;
			padding-bottom: 10%;
			p{
				color: #a3a3a2;
				font-size: 10px;
				line-height: .24rem;
			}
		}
		span{
			color: #c864f0;
			a{
				color: #c864f0;
			}
		}
	}
}
</style>
