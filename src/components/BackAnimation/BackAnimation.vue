<script>
import { gsap } from "gsap";
export default {
  mounted() {
    let tl = gsap.timeline();
    tl
    .set('#orange_ball',{
        opacity: 0,
    })
    .to("#yellow_ball", {
      x: 738,
      duration: 1.5,
      delay: 1.5,
      ease: "power3.out",
    })
    .to("#green_ball", {
      x: 738,
      duration: 1.5,
      ease: "power3.out",
    }, '-=1.5')
    .set('#orange_ball',{
        opacity: 1,
    })
    .to("#yellow_ball", {
      x: 987,
      duration: 1,
      ease: "power3",
    })
    .to("#green_ball", {
      x: -312,
      duration: 2,
      ease: "power3",
    },'-=1')
    .from('#green',{
        scaleX: 0,
        duration: 2,
        ease: "power3",
        transformOrigin: 'center right'
    },'-=2')


  },
};
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>
