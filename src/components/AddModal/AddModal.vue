<script>
import { Modal } from "bootstrap";
export default {
  props: ["id","dishesList"],
  data() {
    return {
      hot_check: null,
      dishes_num: 1,
      warn: false,
      hot_check_warn: false,
      myModal: null,
    };
  },
  computed:{
    eng_name(){
      let item = this.dishesList.filter(item=> item.dishes_id == this.id)
      return item[0].dishes_name
    }
  },
  methods: {
    toggleNum(click) {
      if (this.dishes_num < 3 && click == "plus") {
        this.warn = false;
        this.dishes_num++;
      } else if (this.dishes_num > 1 && click == "minus") {
        this.warn = false;
        this.dishes_num--;
      } else if (this.dishes_num == 3) {
        this.warn = true;
      }
    },
    addCart() {
      let dishes = {
        id: this.id,
        eng_name: this.eng_name,
        num: this.dishes_num,
        hot: this.hot_check,
      };
      if (this.hot_check !== null) {
        this.$store.commit("addCart", dishes);
        this.$store.commit('cartNumTotal');
        this.myModal.hide();
        this.clearInfo()
      }else{
          this.hot_check_warn = true
      }
    },
    clearInfo(){
        this.hot_check = null;
        this.dishes_num = 1;
        this.hot_check_warn = false;
        this.warn = false;
    }
  },
  mounted() {
    this.myModal = new Modal(document.getElementById("plusModal"), {
      keyboard: false,
    });
  },
};
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>
