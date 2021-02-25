<script>
import { mapState } from 'vuex'
export default {
    computed:{
        ...mapState(["lang"])
    },
    mounted() {
        this.$store.commit('navColor', 'cream')
    },
}
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>