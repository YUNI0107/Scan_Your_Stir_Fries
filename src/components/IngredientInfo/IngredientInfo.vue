<script>
import { mapState } from 'vuex'
export default {
    props: ['item'],
    data(){
        return{
            ingredient_name: this.item.ingredient_name,
            plus_lang: this.item.info.plus_lang,
            color: this.item.info.color,
        }
    },
    computed:{
        ...mapState(['lang',])
    }
}
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>