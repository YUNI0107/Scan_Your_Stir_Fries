<script>
import gsap from "gsap";
export default {
  props: ["dishes_id", "eng_name"],
  data() {
    return {
      hot_check: null,
      hot_check_warn: false,
    };
  },
  computed:{
 
  },
  methods: {
    soundPlay(playload) {
      if (this.hot_check_warn == true && playload == this.$refs.odersound) {
        return;
      } else {
        playload.play();
      }
    },
    addCart() {
      let dishes = {
        id: this.dishes_id,
        eng_name: this.eng_name,
        num: 1,
        hot: this.hot_check,
      };
      if (this.hot_check !== null) {
        this.$store.commit("addCart", dishes);
        this.$store.commit("cartNumTotal");
        this.hot_check_warn = false;
        this.$emit('getBall')
      } else {
        this.hot_check_warn = true;
      }
    },
  },
  mounted() {
    let tl = gsap.timeline();
    tl.set("#orange_order", {
      opacity: 0,
    })
      .set("#green_order", {
        opacity: 0,
      })
      .from("#yellow_order", {
        scale: 0,
        duration: "1.5",
        ease: "bounce.in",
        transformOrigin: "center center",
      })
      .to(
        "#hand",
        {
          scale: 1.1,
          duration: 0.2,
          repeat: 1,
          yoyo: 2,
          transformOrigin: "center center",
        },
        "-=1.2"
      )
      .set("#green_order", {
        opacity: 1,
      })
      .from("#green_order", {
        scale: 0,
        duration: "1.5",
        ease: "bounce.in",
        transformOrigin: "center center",
      })
      .to(
        "#hand",
        {
          scale: 1.1,
          duration: 0.2,
          repeat: 1,
          yoyo: 2,
          transformOrigin: "center center",
        },
        "-=1.2"
      )
      .set("#orange_order", {
        opacity: 1,
      })
      .from("#orange_order", {
        scale: 0,
        duration: "1.5",
        ease: "bounce.in",
        transformOrigin: "center center",
        onComplete() {
          tl.restart();
        },
      })
      .to(
        "#hand",
        {
          scale: 1.1,
          duration: 0.2,
          repeat: 1,
          yoyo: 2,
          transformOrigin: "center center",
        },
        "-=1.2"
      );
  },
};
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>
