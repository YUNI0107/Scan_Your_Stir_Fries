<script>
import gsap from 'gsap'
export default {
  props:["dishes_id"],
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
  mounted() {
    let tl = gsap.timeline();
    tl.set('#orange_order',{
      opacity: 0,
    })
    .set('#green_order',{
      opacity: 0,
    })
    .from('#yellow_order',{
      scale: 0,
      duration: '1.5',
      ease: "bounce.in",
      transformOrigin: 'center center',
    })
    .to('#hand',{
      scale: 1.1,
      duration: .2,
      repeat: 1,
      yoyo: 2,
      transformOrigin: 'center center',
    },'-=1.2')
    .set('#green_order',{
      opacity: 1,
    })
    .from('#green_order',{
      scale: 0,
      duration: '1.5',
      ease: "bounce.in",
      transformOrigin: 'center center',
    })
    .to('#hand',{
      scale: 1.1,
      duration: .2,
      repeat: 1,
      yoyo: 2,
      transformOrigin: 'center center',
    },'-=1.2')
    .set('#orange_order',{
      opacity: 1,
    })
    .from('#orange_order',{
      scale: 0,
      duration: '1.5',
      ease: "bounce.in",
      transformOrigin: 'center center',
      onComplete(){
        tl.restart();
      }
    })
    .to('#hand',{
      scale: 1.1,
      duration: .2,
      repeat: 1,
      yoyo: 2,
      transformOrigin: 'center center',
    },'-=1.2')


    

  },
};
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>
