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
        ...mapState(["lang"])
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
    destroyed(){
        clearInterval(this.imgtimer)
    }
}
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>