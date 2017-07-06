<template>
  <div class="all">
    <div class="poss">
      <div class="pos-bg" v-show="bg"></div>
      <div class="pos-list" :class="clas">
        <span class="close iconfont icon-icon4" @click="close"></span>
        <dl>
          <dt><img :src="data.pic_url" alt="" /></dt>
          <dd>
            <p><strong>￥{{data.price}}</strong></p>
            <p>已选:{{checked}}</p>
          </dd>
        </dl>
        <ComputeNum :data="data" v-on:child-text="addClass"></ComputeNum>
      </div>
    </div>
    <HeaderBar :data="obj"></HeaderBar>
    <section class="section">
      <Banner :data="img"></Banner>
      <div class="product-compute">
        <div class="title"><h3>{{obj.text}}</h3></div>
        <div class="price">
          <p>
            <i class="iconfont icon-gouwuche"></i>
            {{data.sales_volume}}人已购买
          </p>
          <span>￥{{data.price}}</span>
          <span>￥{{data.org_price}}</span>
        </div>
        <div class="baoyou">
          <span>{{data.tag}}</span>
          <p v-for="item in data.params">{{item}}</p>
        </div>
        <ComputeNum :data="data" v-on:child-text="addClass"></ComputeNum>
        <div class="pic"><img src="../../static/images/bg/details-trait.jpg" alt="" /></div>
        </div>
      <div class="img" v-html="html"></div>
    </section>
    <div class="bar-cart">
      <span class="buy" @click="bay">立即购买</span>
      <span class="join" @click="car">加入购物车</span>
      <!-- <div @click="fn(1111)">111 {{isB}}</div> -->
    </div>
  </div>
</template>

<script>
import HeaderBar from "@/components/Header"
import Banner from "@/components/Swiper"
import ComputeNum from "@/components/Compute"
import {mapActions,mapState,mapMutations,mapGetters} from "vuex"
export default {
  name: 'ShopSetail',
  data () {
    return {
      obj:{
        "text":"",
        "back":"iconfont icon-back",
        "icon1":"iconfont icon-daifahuo",
        "icon2":"iconfont icon-gouwuche"
      },
      img:[],
      data:{},
      html:"",
      bg:false,
      clas:"down",
      checked:"",
      object:{},
      carList:[]
    }
  },
  computed:{...mapGetters(['isB'])},
  created () {
    let ProductID = this.$route.params.ProductID;
    this.getData(ProductID)
  },
  methods: {
    addClass (obj) {
      this.object.num=obj.num;
      this.object.text=obj.text;
      this.checked=obj.text;
    },
    bay () {
      if(this.checked){
        
      }else{
        this.bg=true;
        this.clas="up";
      }
      
    },
    car () {
      if(this.checked){
       // console.log(this.object)
       let list=window.localStorage["carList"];
       let data=eval('('+list+')');
       if(!data){
        data = []
       }
       // 向localStorage中添加的数据
       // var data=this.carList;
       //data.unshift(this.object);
       // 判断重复的产品
       if(data){
        for(var i=0;i<data.length;i++){
          if(data[i].text==this.object.text){
            data[i].num+=this.object.num;
            window.localStorage["carList"]= JSON.stringify(data);
           this.$router.push({name:"shopping"})
            return false;
          }
        }
       }
       data.unshift(this.object); 
        
        window.localStorage["carList"]= JSON.stringify(data);
        //this.$store.commit("addCarList",this.object);
         // window.localStorage['list']=JSON.stringify(this.arr);
         this.$router.push({name:"shopping"})
      }else{
        this.bg=true;
        this.clas="up";
      }
    },
    close () {
      this.bg=false;
      this.clas="down";
    },
    getData (id) {
      let that=this;
      this.$axios.get("/api/allProduct?id="+id, {})
      .then(function(response){
        let data=response.data;
        that.data=data;
        that.obj.text=data.title;
        that.object.title=data.title;
        that.object.pic_url=data.pic_url;
        that.object.price=data.price;
        that.img=data.pic_gallery;
        that.html=data.content;
      })
      .catch(function(response){
        console.log(response)
      })
    }/*,
    ...mapActions(['car'])*/
  },
  components : {
    HeaderBar,
    Banner,
    ComputeNum
  }
}
</script>

<style lang="less">
.all{
  overflow: hidden;
}
.poss{
  .pos-bg{
    z-index: 10;
    position: absolute;
    top: 44px;
    bottom: 44px;
    width: 100%;
    background: rgba(0,0,0,.6);
  }
  .pos-list.up{
    -webkit-transition: all 1s ease;
      -webkit-transform: translateY(0%);  
  }
  .pos-list.down{
    -webkit-transition: all 1s ease;
      -webkit-transform: translateY(100%); 
  }
  .pos-list{
    position: absolute;
    z-index: 11;
    bottom: 44px;
    left: 0;
    width: 100%;
    padding-top:20px;
    background: #eee;
    height: auto;
    dl{
      padding-left: 15px;
      padding-right: 15px;
      display: flex;
      dt{
        width: 20%;
        img{
          width: 100%;
        }
      }
      dd{
        line-height: 24px;
        margin-left: 5%;
        strong{
          color: #ff3933;
          font-size: 16px;
        }
      }
    }
    .close{
      color: #b0b0af;
      position: absolute;
      right: 12px;
      top: 12px;
      font-size: 24px;
      width: 30px;
      height: 30px;
    }
  }
}
.bar-cart{
  position: absolute;
  bottom: 0;
  left: 0;
  height: 44px;
  z-index: 100;
  width: 100%;
  background: #fff;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing:border-box;
  span{
    width: 49%;
    text-align: center;
    padding-left: 15px;
    padding-right: 15px;
    color: #fff;
    box-sizing:border-box;
    border-radius: 8px;
    height: 34px;
    line-height: 34px;
    margin-top: 5px;
  }
  .buy{
    float: left;
    background: #ff9c46;
  }
  .join{
    float: right;
    background: #ff3933;
  }
}
.product-compute{
  position: relative;
.title{
  background: #fff;
  padding-left: 15px;
  padding-right: 15px;
}
.price{
  background: #fff;
  font-size: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-left: 15px;
  padding-right: 15px;
  p{
    float: right;
    color: #a3a3a2;
  }
  span:nth-child(2){
    color: #ff3933;
    padding-right: 4px;
    font-size: 16px;
  }
  span:nth-child(3){
    color: #a3a3a2;
    font-size: 12px;
    text-decoration: line-through;
  }
}
.baoyou{
  padding-left: 15px;
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
  background: #fff;
  span{
    background: #72ca3e;
    color: #fff;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 12px;
    margin-right: 15px;
  }
  p{
    color: #a3a3a2;
    font-size: 12px;
  }
}
.pic img{
  width: 100%;
}
}
.compute{
  clear: both;
  line-height: 60px;
  padding-left: 15px;
  font-size: 16px;
  padding: 10px 15px;
  p{
    float: right;
    margin-top: 10px;
    border: 1px solid #a3a3a2;
    span{
      width: 40px;
      height: 40px;
      display: block;
      float: left;
      text-align: center;
      line-height: 40px;
      border-right: 1px solid #ccc;
      background:#f3f3f2;
      color: #a3a3a2;

    }
    span:nth-child(2){
      background: #fff;
    }
    
  }
}
.gg{
  padding-left: 15px;
  padding-right: 15px;
  .gg-title{
    padding-top: 10px;
    font-size: 14px;
    padding-bottom: 10px;
  }
  span{
    border: 1px solid #c0c6c9;
    padding: 8px 14px;
    background: #fff;
    float: left;
    margin-top: 10px;
    margin-right: 20px;
  }
  .reds{
      border-color:red;
      position: relative;
  }
  .reds::after{
    content:"";
    position: absolute;
    right: -8px;
    top: -8px;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-bottom-color:red;
    -webkit-transform: rotate(45deg);
  }
}

</style>
