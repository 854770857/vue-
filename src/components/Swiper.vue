<template>
  <div class="banner swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in data">
                <img v-if="item.pic_url"  :src="item.pic_url" alt="">
                <img v-else  :src="item" alt="">
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
import '@/static/css/swiper.min.css';
import '@/static/js/swiper.min.js';
export default {
  name: 'Swiper',
  props: ["data"],
  data () {
    return {
    	SwiperObj:""
    }
  },
  mounted () {
  	this.SwiperObj=new Swiper(".banner",{
  		autoplay:1000,
	    loop: true,
	    pagination: '.swiper-pagination',
	    paginationClickable: true,
	    observer: true,//修改swiper自己或子元素时，自动初始化swiper
	    observeParents: true,//修改swiper的父元素时，自动初始化swiper
	    autoplayDisableOnInteraction : false
  	})
  },
  updated () {
  	this.SwiperObj.update();
  },
  components : {
  }
}
</script>


<style  lang="less">
.banner img{
	width: 100%;
}
.swiper-pagination{
	
	.swiper-pagination-bullet-active{
	    background:#fff
	  }
}
</style>
