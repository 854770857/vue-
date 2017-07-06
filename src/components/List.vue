<template>
  <div class="list">
  	<div class="list-box" v-for="(item,index) in data">
  	<!-- <div> ng-click="toggleRadio()" ng-model="radio" </div> -->
  		<label class="toggle">
	        <input type="checkbox" v-model="radio">
	        <div class="mark-radius" @click="show"></div>
	    </label>
	    <dl>
	    	<dt><img :src="item.pic_url" alt="" /></dt>
	    	<dd>
	    		<p class="title">{{item.title}}</p>
	    		<p>{{item.text}}</p>
	    		<p>数量:{{item.num}}</p>
	    	</dd>
	    	<dd class="dd1">
	    		<p><i class="iconfont icon-bianji" @click="editor"></i></p>
	    		<p><i class="iconfont icon-icon4 i" @click="remove(index)"></i></p>
	    	</dd>
	    	<dd class="dd2">
	    		<p class="item-subtotal">小计：¥<span class="subtotal">{{price[index]}}</span></p>
	    	</dd>
	    </dl>
  	</div>
  	<div class="poss">
        <div class="pos-bg" v-show="bg"></div>
        <div class="pos-list" :class="clas">
          <span class="close iconfont icon-icon4" @click="close"></span>
          <dl>
            <dt><img :src="data[0].pic_url" alt="" /></dt>
            <dd>
              <p><strong>￥{{data[0].price}}</strong></p>
              <p>已选:{{data[0].text}}</p>
            </dd>
          </dl> <!-- v-on:child-text="addClass" -->
          <ComputeNum1 :data="data" ></ComputeNum1>
        </div>
      </div>
  </div>
</template>

<script>
import ComputeNum1 from "@/components/Compute1"
import {mapActions,mapState,mapMutations,mapGetters} from "vuex"
export default {
  name: 'List',
  props: ['data'],
  data () {
  	return {
  		bg:false,
  		clas:"down"
  	}
  },
  created () {
  	
  	
  },
  computed:{
  	price () {
  		var data=this.data
  		if(data.length==0) return 0;
		var arr=data.map(v=>(v.num*v.price).toFixed(2));
  		return arr;
  		//console.log(item.num)
  	},
  	...mapGetters(['radio'])
  },
  methods : {
  	close () {
  		this.bg=false;
      	this.clas="down";
  	},
  	editor () {
  		this.bg=true;
        this.clas="up";
  	},
  	show () {
  		console.log(this.radio)
  	},
    remove (i) {
    	let data=this.data;
    	data.splice(i,1);
    	if(data.length==0){
    		this.$emit("params",true);
    		window.localStorage.clear();
    		return false;
    	}
        window.localStorage["carList"]= JSON.stringify(data);
    }/*,
  	...mapActions(['show'])*/
  },
  components : {
  	ComputeNum1
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.poss{
	position: absolute;
	top: 44px;
	bottom: 0;
	height: 100%;
	width: 100%;
	z-index: -1;
}
  .pos-bg{
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 10;
 }
 .pos-list{
 }
.down{
	display: none;
}
.up{
}
.list{
	.list-box{
		border-bottom: 1px solid #ccc;
		padding-left: 15px;
		padding-right: 15px;
		padding-top: 5%;
		padding-bottom: 10%;
		display: flex;
		position: relative;
		dl{
			width: 80%;	
			display: flex;
			margin-left: 3%;
			dt{
				width: 30%;
				img{
					width: 100%;
				}
			}
			.dd1{
				position: absolute;
				right: 15px;
				top: 10%;
				width: auto;
				margin-left: 0;
				p{
					line-height: 2.2;
				}
			}
			.dd2{
				position: absolute;
				bottom: 10%;
				width: 80%;
				margin-left: 0;

				p{
					color: #ff3933;
					padding-right: 30px;
					text-align: right;	
				}
				
			}
			dd{
				width: 65%;
				margin-left: 5%;
				font-size: 12px;
				p{
					color: #a3a3a2;
					i{
						color: #f39800;
						font-size: 18px;
					}
					.i{
						font-size: 12px;
						color: #ff443e;
					}
				}
				.title{
				  display: -webkit-box;
				  white-space: normal;
				  -webkit-line-clamp: 2;
				  -webkit-box-orient: vertical;
				  overflow: hidden;
				  color: #595857;
				}
				
			}
		}
	}
}
.toggle{
	input:checked+.mark-radius:after{
		display: block;
	}
	.mark-radius{
		width: 18px;
        height: 18px;
        border-radius: 100%;
        border: 1px solid #ccc;
        background: #72ca3e;
        &:after{
        	content:"";
	        border-left: 1px solid #fff;
	        border-bottom: 1px solid #fff;
	        width: 10px;
	        height: 6px;
	        -webkit-transform: rotate(-45deg);
	        margin-left: 3px;
	        margin-top: 4px;
	        display: none;
        }
        
	}
}
</style>
