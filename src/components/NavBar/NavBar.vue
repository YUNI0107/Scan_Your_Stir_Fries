<script>
import {mapState} from 'vuex'
export default {
    computed:{
        totalNum(){
            return 2;
        },
        ...mapState(['lang',])
    },
    methods:{
        langToogle(new_lang){
            console.log(new_lang);
            this.$store.commit('langChange', new_lang)
        }
    }
}
</script>
<template src="./template.html"></template>
<style  src="./style.css" scoped ></style>
