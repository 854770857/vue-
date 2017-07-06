<template>
  <footer class="footer">
    	<router-link v-for="item in list" :to="item.Link" active-class="active">{{item.text}}</router-link>
        <a @click="toParams">联系我们</a>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
    	"list":[
    		{
    			text:'首页',
    			Link:'/home'
    		},
    		{
    			text:'购物车',
    			Link:'/shopping'
    		},
    		{
    			text:'客户端',
    			Link:'/client'
    		}
    	]
    }
  },
  methods : {
    toParams () {
        this.$emit("ok",1);
    }
  }
}
</script>


<style scoped lang="less">
	.footer{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 44px;
		background:#fff;
		display: flex;
		border-top: 1px solid #ccc;
		a{
			flex: 1;
			text-align: center;
			line-height: 55px;
			font-size: 12px;
			&.active{
				color: #4f55e9;
			};
		}
	}
</style>
