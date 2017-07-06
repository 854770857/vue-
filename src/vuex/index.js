import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        //loadingShow:false,
        carList:[],
        isB:0,
        all:true,
        show:true,
        dio:true,
        obj:{}
      },
    getters:{
      isB (state) {
        return state.isB;
      },
      all (state) {//全选
        return state.all;
      },
      show (state){
        return state.show
      },
      radio (state){// 单选
        return state.dio
      },
      root (state) {
        
      }
    },  
    mutations: {
      // getDatas (state,data) {
      //     state.loadingShow=data
      // },
      addCarList (state,data){
        state.carList.unshift(data);
        window.localStorage["carList"]= JSON.stringify(state.carList);
      },
      setCarList (state,data){
        state.carList=data;
      },
      removeGood (state,data){
        state.carList.splice(data,1);
        window.localStorage["carList"]= JSON.stringify(state.carList);
      },
      radio (state,all) {
        console.log(state)
        state.dio = all;
      },
      all (state,all) {
        state.all = all;
      },
      tab (state,all) {
        state.all = !all;
      }
      /*
      fn1 (state,num) {
        console.log(num)
      	state.isB++;
      }*/
    },
    actions :{
      getCarList (context){
        var data = JSON.parse(window.localStorage["carList"]);
        if(data){
          context.commit("setCarList",data)
        }
      },
      radio ({commit},all) {
        commit("all",all);
        commit("radio",all);
      },
      tab ({commit},all) {
        commit("tab",all)
      },
      show ({commit}){
        console.log(111)
      }
      /*
      fn ({commit},num) {
      		commit("fn1",num);
      }*/
    }
})