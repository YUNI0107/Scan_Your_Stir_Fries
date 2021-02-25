<script>
export default {
  props: ['item',],
  data() {
    return {
      ingredient_name: this.item.ingredient_name,
      plus_info: this.item.plus_info,
    }
  },
  components:{
    
  }
};
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>
