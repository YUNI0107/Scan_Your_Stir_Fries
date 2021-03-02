import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: 'en',
    info_message: "語言切換中",
    cart: [],
    cart_num: 0,
    navcolor: 'cream',
    trans: false,
  },
  mutations: {
    langChange(state,playload){
      state.lang = playload;
    },
    navColor(state,playload){
      state.navcolor = playload;
    },
    infoMessage(state,playload){
      state.info_message = playload;
    },
    cartNumTotal(state){
      let sum = 0;
      state.cart.forEach(item=>{
        sum += item.num;
      })
      state.cart_num = sum;
    },
    addCart(state,playload){
      let check = state.cart.findIndex( item => item.id == playload.id )
      if(check == -1){
        state.cart.push(playload)
      }else{
        state.cart.splice(check,1,playload)
      }
    },
    cartNumPlus(state,playload){
      let check_place = state.cart.findIndex( item => item.id == playload )
      let item = state.cart.filter( item => item.id == playload )
      item[0].num++
      state.cart.splice(check_place,1,item[0])
    },
    cartNumMinus(state,playload){
      let check_place = state.cart.findIndex( item => item.id == playload )
      let item = state.cart.filter( item => item.id == playload )
      item[0].num--
      state.cart.splice(check_place,1,item[0])
    },
    deleteCart(state,playload){
      let check_place = state.cart.findIndex( item => item.id == playload )
      state.cart.splice(check_place,1)
    },
    toogleTrans(state,playload){
      if(playload == 'add'){
        state.trans = true
      }else if(playload == 'remove'){
        state.trans = false
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
