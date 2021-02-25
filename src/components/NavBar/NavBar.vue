<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState(['lang','navcolor','cart_num'])
    },
    methods:{
        langToogle(new_lang, lang_message){
            this.$store.commit('langChange', new_lang)
            this.$i18n.locale = new_lang
            this.$store.commit('infoMessage', lang_message)
        }
    }
}
</script>
<template src="./template.html"></template>
<style  src="./style.css" scoped ></style>
