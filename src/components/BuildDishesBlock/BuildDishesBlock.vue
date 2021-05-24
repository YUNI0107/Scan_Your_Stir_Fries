<script>
export default {
  props: ["item"],
  data() {
    return {
      check: false,
      price: "",
      recommend: false,
      no_price: false,
    };
  },
  watch: {
    check() {
      if (this.check && this.price !== "") {
        this.dishesPush();
        this.no_price = false;
      } else {
        if (this.check) {
          this.$refs.price.focus();
        } else if (this.check == false) {
          this.$refs.price.blur();
          this.no_price = false;
          this.dishesDelete()
        }
      }
    },
    recommend(){
        if(this.check && this.price !== "" ){
            this.dishesPush();
        }
    }

  },
  methods: {
    checkBlur() {
      if( this.price !== "" && this.check ){
          this.dishesPush()
          this.no_price = false;
      }else{
          if (this.price == "" && this.check) {
            this.$refs.price.focus();
            this.no_price = true;
          } else {
            this.no_price = false;
          }
      }
    },
    dishesPush() {
        this.$emit('userListPush',{
            id: this.item.id,
            number: this.item.number,
            level: this.item.level,
            recommend: this.recommend,
            price: this.price
        })
    },
    dishesDelete(){
        this.$emit("dishesDelete", this.item.id)
    }
  },
};
</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>


