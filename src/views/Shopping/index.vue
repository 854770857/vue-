<template>
  <div class="all">
    <HeaderBar :data="obj"></HeaderBar>
    <section class="section">
      <p class="title">温馨提醒：货到付款满168包邮</p>
      <div class="cart-null" v-show="show">
        <i class="iconfont icon-gouwuche"></i>
        <p class="cart-empty-tips">购物车还是空的，赶紧去选几件吧~</p>
        <router-link to="/">去逛逛</router-link>
      </div>
      <ListBar :data="data" v-on:params="params"></ListBar>
    </section>
    <div class="bar-num" v-show="!show">
      <div class="left">
        <label class="toggle">
          <input type="checkbox" v-model="all">
          <div class="mark-radius" @click="radio(!all)"></div>
      </label>
      <em>全选</em>
      <p>合计：¥69.00</p>
      </div>
      <div class="right">
        <router-link to="iii">结算(1)</router-link>
      </div>
    </div>
    
  </div>
</template>

<script>
import HeaderBar from "@/components/Header"
import ListBar from "@/components/List"
import {mapActions,mapState,mapMutations,mapGetters} from "vuex"
export default {
  name: 'index',
  data () {
    return {
    	obj:{
        "text1":"购物车",
        "back":"iconfont icon-back",
        "icon1":"",
        "icon2":""
      },
      show:true,
      data:[],
      all:true
    }
  },
  created () {
    this.getLocal()
  },
  methods : {
    params (data) {
      this.show=data;
    },
    getLocal () {
      let list=window.localStorage["carList"];
      //let data=JSON.parse(list);
      let data=eval('('+list+')');
      /*for(let i=0,len=data.length;i<len;i++){

      }*/
      
      if(!data){
        this.show=true;
      }else{
        this.show=false;
        this.data=data;
      }
    },
    ...mapActions(['radio'])
  },
  components : {
  	HeaderBar,
    ListBar
  }
}
</script>


<style scoped lang="less">
.bar-num{
  background: #e6e5e7;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 44px;
  line-height: 44px;
  z-index: 100;
  width: 100%;
  padding-left: 15px;
  box-sizing:border-box;
  display: flex;
  justify-content:space-between;
}
.left{
  width: 60%;
  display: flex;
  em{
    margin: 0 5%;
    font-style: normal;
    color: #666;
  }
  p{
    color: #ff3933;
  }
}
.right{
  background: #ff3933;
  width: 25%;
  text-align: center;
  a{
    color: #fff;
  }
}
.toggle{
  margin-top: -18%;
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
.section{
  background: #fff;
  .title{
    line-height: 36px;
    background: #fff8e0;
    font-size: 12px;
    padding-left: 30px;
    border-bottom: 1px solid #ccc;
  }
  .cart-null{
    padding-top: 18%;
    padding-bottom: 10%;
    text-align: center;
    i{
      font-size: 1rem;
      color: #d9dcdd;
    }
    p{
      color: #a3a3a2;
      margin-bottom: 10%;
    }
    a{
      background: #ff9c46;
      padding: 12px 40px;
      font-size: 18px;
      color: #fff;
      border-radius: 5px;
    }
  }
}

</style>
