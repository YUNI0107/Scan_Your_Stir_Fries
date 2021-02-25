<script>
import { mapState } from "vuex";
export default {
  props: ["item","sound_id","playing"],
  data(){
      return{
          dishes_item:{}
      }
  },
  computed: {
    hot() {
      return this.dishes_item.hot == "n" ? 0 : this.dishes_item.hot == "m" ? 1 : 2;
    },
    light(){
      if(this.sound_id !== this.dishes_item.id && this.playing){
        return true
      }else{
        return false
      }
    },
    ...mapState(["lang"]),
  },
  methods: {
    toggleNum(click) {
      if (this.item.num < 3 && click == "plus") {
          this.$store.commit('cartNumPlus', this.dishes_item.id)
          this.$store.commit('cartNumTotal')
      } else if(this.item.num > 1 && click == "minus"){
          this.$store.commit('cartNumMinus', this.dishes_item.id)
          this.$store.commit('cartNumTotal')
      }
    },
    deleteCart(){
        this.$store.commit('deleteCart', this.dishes_item.id)
        this.$store.commit('cartNumTotal')
    }
  },
  mounted() {

  },
  created(){
      this.dishes_item = this.item;
  },
};
</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>
