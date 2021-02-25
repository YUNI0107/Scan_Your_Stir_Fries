<script>
import { mapState } from 'vuex';

export default {
    props:['cate_id',"dishesList"],
    computed:{
        correct_cate_id(){
            let cate = ['pork','lamb','beef','chicken','veg','sea','main','side'];
            let check = cate.findIndex( (element) => element == this.cate_id);
            return check == -1 ? false : true
        },
        ...mapState(["cart",])
    },
    methods:{
        openInfo(dishes_id){
            this.$emit('openInfoID', dishes_id)
        }
    }
}
</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>