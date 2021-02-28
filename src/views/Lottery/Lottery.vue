<script>
import LotteryAnimation from '../../components/LotteryAnimation/LotterAnimation'
export default {
    data(){
        return{
            start: false,
        }
    },
    components:{
        LotteryAnimation,
    },
    methods:{
        gameStart(){
            this.start = true;
        }
    },
    mounted() {
        this.$store.commit('navColor','green')
    },
}
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>