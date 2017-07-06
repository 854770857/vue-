<template>
  <div class="content">
  	<Banner :data="img"></Banner>
  	<div class="list">
  		<div class="left">
  			<p>包邮专区</p>
  			<span>你敢买我敢包</span>
  		</div>
  		<div class="right">
  			<p>每周新品</p>
  			<span>大胆尝鲜</span>
  		</div>
  	</div>
  	<div class="pic">
  		<img src="../../../static/images/bg/download.jpg" alt="" />
  	</div>
  <p class="copyright">他趣 © 2017 All Copyright Reserve</p>
  </div>
</template>

<script>
import Banner from "@/components/Swiper"
export default {
  name: 'index',
  data () {
    return {
    	img:[]
    }
  },
  created (){
  	this.getBanner()
  },
  methods : {
  	getBanner () {
  		let that=this;
  		this.$axios.get("/api/bannerList",{})
  			.then(function(response){
  				let data=response.data.info.data
  				that.img=data;
  				console.log(that.img)
  			})
  			.catch(function (response) {
	        	console.log(response);
	      	});
  	}
  },
  components : {
  	Banner
  }
}
</script>


<style scoped lang="less">
.content{
	padding: 0 .05rem;
	.list{
		display: flex;
		height: .6rem;
		p{
			color: #3399db;
			padding-left: .1rem;
			margin-top: .05rem;
		}
		span{
			color: #b4b4b4;
			font-size: .12rem;
			padding-left: .1rem;
		}
		.left{
			width: 48%;
			background: url("../../../static/images/bg/freeship.jpg") no-repeat;
			background-size:cover;
		}
		.right{
			width: 48%;
			margin-left: 2%;
			background: url("../../../static/images/bg/newproduct.jpg") no-repeat;
			background-size:cover;
		}
	}
	.pic{
		margin-top: .6rem;
		img{
			width: 100%;
		}
	}
	.copyright{
		color: #a3a3a2;
		font-size: .12rem;
		text-align: center;
		margin-top: .4rem;
	}
	
}

</style>
