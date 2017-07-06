<template>
  <div class="num">
  	<AlertBar v-show="flag" :data="text"></AlertBar>
  	<div class="gg">
      <div class="gg-title">{{data[0].title}}</div>
      <span class="reds">{{data[0].text}}</span>
    </div>
    <div class="compute">
      <p>
        <span @click="del">-</span>
        <span>{{num}}</span>
        <span @click="add">+</span>
      </p>
      购买数量
    </div>
    <div class="btn">确定</div>
  </div>
</template>

<script>
import AlertBar from "@/components/Alert"
export default {
  name: 'compute',
  props:["data"],
  data () {
  	return {
      flag:false,
      num:1,
      text:"",
      obj:{
        text:"",
        num:1
      }
  	}
  },
  watch : {
    obj:{
       handler:function(val,oldval){
        //console.log(val.text,val.num)
          this.$emit('child-text',this.obj)
      },  
      deep:true//对象内部的属性监听，也叫深度监听  
    }
  },
  methods : {
    add () {
      let num=this.num;
      let that=this;
      if(num>=8){
        this.text="不要贪杯哦";
        this.flag=true;
        setTimeout(function(){
          that.flag=false;
        },1000)
        return
      }
      this.num++;
      this.obj.num=this.num;
      
    },
    del () {
      let num=this.num;
      let that=this;
      if(num<=1){
        this.text="客官买一件吧";
        this.flag=true;
        setTimeout(function(){
          that.flag=false;
        },1000)
        return
      };
      this.num--;
      this.obj.num=this.num;
    }
  },
  components : {
  	AlertBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
