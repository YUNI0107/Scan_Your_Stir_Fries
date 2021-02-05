<script>
export default {
   data(){
       return{
           hot_check: null,
       }
   },
  methods: {
    soundPlay(playload) {
      playload.play();
    },
  },
};
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>
