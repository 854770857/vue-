<template>
	<div class="content">
		<positionBg v-show="!selected" :data="tabList" v-on:child-say="toparams"></positionBg>
		<positionBg v-show="!selected1" :data="tabList1" v-on:child-say="toparams"></positionBg>
		<nav class="tab">
			<span @click="tab" :class="{'active':!selected}">	{{title}}
				<i :class="icon"></i>
			</span>
			<span @click="tab1" :class="{'active':!selected1}">销量
				<i :class="icon1"></i>
			</span>
		</nav>
		<div class="product-list">
			<dl v-for="item in product">
				<router-link :to="{name:'shopdetail',params:{ProductID:item.goods_id}}">
					<dt><img :src="item.pic_url" /></dt>
					<dd>
						<p>{{item.title}}</p>
						<p><span>总销量{{item.volume}}</span>￥{{item.price}}</p>
					</dd>
				</router-link>
			</dl>
		</div>
		<div class="page-box">
            <span :class="{'disable':disable}" @click="prev">上一页</span>
            <span>第{{init}}页</span>
            <span :class="{'disable':disable1}" @click="next">下一页</span>
        </div>
	</div>
</template>

<script>
import positionBg from "@/components/Position"
export default {
  name: 'index',
  data () {
    return {
    	product:[],
    	data:[],
    	title:"",
    	icon:"iconfont icon-xiajiantou",
    	icon1:"iconfont icon-xiajiantou",
    	selected:true,
    	selected1:true,
    	tabList:[],
    	num:10,
    	len:"",
    	init:1,
    	pageSize:"",
    	disable:true,
    	disable1:false,
    	tabList1:[
    		{
    			"cname":"销量"
    		},
    		{
    			"cname":"综合"
    		},
    		{
    			"cname":"时间"
    		},
    		{
    			"cname":"价格"
    		}
    	],
    	show:null
    }
  },
  created () {
  	this.getPageId();
  },
  methods : {
  	toparams(data){
  		console.log(data)
      this.selected = data
      this.selected1 = data
    },
  	/*close () {
  		this.selected=false;
  		this.selected1=false;
  	},*/
  	tab (){
  		this.selected=!this.selected;
  		this.selected1=true;
  	},
  	tab1 (){
  		this.selected1=!this.selected1;
  		this.selected=true;
  	},
	getPageId () {
		let pageId=this.$route.params.id;
		let that=this;
		this.$axios.get("/api/productList/"+pageId,{})
			.then(function(response){
				let data=response.data.info.data;
				let len=data.length;
                that.len=len;
                that.data=data;
                that.pageSize = Math.ceil( len / that.num);
                that.go(1);
				//console.log(data)
			})
			.catch(function(response){
				console.log(response)
			})
		this.$axios.get("/api/productTitle/"+pageId,{})
			.then(function(response){
				let data=response.data.info.data;
				that.title=data[0].cname;
				that.tabList=data;
			})
			.catch(function(response){
				console.log(response)
			})
	},
	go (ind) {
		let times = (ind-1)*this.num;
	    let data = this.data.slice(times,this.num*ind);
	    this.product = data;
	},
	prev () {
		if(this.init<=2){
			this.disable=true;
			if(this.init==1) return;
			
		}
		this.disable1=false; 
		this.go(--this.init);
	},
	next () {
		if(this.init>=this.pageSize-1){
			this.disable1=true; 
			if(this.init==this.pageSize-1){
				this.go(++this.init);
			}
			return;
		}
		this.disable=false;
		this.go(++this.init);
	}
  },
  watch:{
    '$route':"getPageId",
    selected () {
    	this.icon = this.selected ? 'iconfont icon-xiajiantou' : 'iconfont icon-shangxiajiantou-copy'
    },
    selected1 () {
    	this.icon1 = this.selected1 ? 'iconfont icon-xiajiantou' : 'iconfont icon-shangxiajiantou-copy'
    }
   },
  components : {
  	positionBg
  }
}
</script>


<style scoped lang="less">
.content{
	position: relative;
}

.tab{
	display: flex;
	border-bottom: 1px solid #ccc;
	background: #fff;
	margin-bottom: .1rem;
	.active{
		background: #f3f3f2;
	}
	span{
		width: 50%;
		text-align: center;
		line-height: 36px;
		i{
			font-size: .2rem;
		}
	}
	span:nth-child(1){
		border-right: 1px solid #ccc;
	}
}
.product-list{
	display: flex;
	flex-wrap:wrap;
	background: #fff;
	dl{
		border-bottom: 1px solid #e5e5eb;
		width: 50%;
		box-sizing: border-box;
		padding:.1rem;
		dt{
			img{
				width: 100%;
			}
		}
		dd{
			p{
				font-size: .12rem;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
			p:nth-child(2){
				color: #ff3933;
				font-size: .14rem;
				span{
					float: right;
					color: #a3a3a2;
					font-size: .12rem;
				}
			}
		}
	}
	dl:nth-child(2n){
		border-left: 1px solid #e5e5eb;
	}
}
.page-box {
   display: flex;
   justify-content:space-around;
   line-height: 45px;
   .disable{
   	color: #ccc;
   }
}
</style>
