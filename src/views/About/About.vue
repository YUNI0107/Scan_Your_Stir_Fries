<script>
import { mapState } from 'vuex'
import FooterSection from "../../components/Footer/Footer"
export default {
    data(){
        return{
            runindex: 1,
            imgtimer: null,
        }
    },
    components:{
        FooterSection,
    },
    computed:{
        metatitle(){
            return this.$i18n.t('nav.about') +"-"+ this.$i18n.t('nav.name') 
        },
        ...mapState(["lang"])
    },
    watch:{
        metatitle(){
            document.title = this.metatitle
        }
    },
    mounted() {
        this.imgtimer = setInterval(()=>{
            if(this.runindex < 2){
                this.runindex++
            }else{
                this.runindex = 0
            }
        },1500)
        this.$store.commit("navColor","cream")
    },
    created(){
        document.title = this.metatitle
    },
    destroyed(){
        clearInterval(this.imgtimer)
    }
}
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>