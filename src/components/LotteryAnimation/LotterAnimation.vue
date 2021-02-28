<script>
import gsap from "gsap";
let tl = gsap.timeline();
export default {
  props: ["start"],
  methods: {
    aniStart() {
      let router = this.$router;
      tl.to("#hand", {
        rotate: 15,
        duration: 0.3,
        transformOrigin: "bottom left",
        yoyo: 2,
        repeat: 1,
      })
        // oball_6
        .to("#oball_6", {
          x: -180,
          y: -180,
          transformOrigin: "center center",
          duration: 0.3,
          ease: "none",
        })
        .to("#oball_6", {
          x: 120,
          y: -100,
          transformOrigin: "center center",
          duration: 0.3,
          ease: "none",
        })
        .to("#oball_6", {
          x: 120,
          y: -100,
          transformOrigin: "center center",
          duration: 0.3,
          ease: "none",
        })
        .to("#oball_6", {
          x: -150,
          y: 120,
          transformOrigin: "center center",
          duration: 0.3,
          ease: "none",
        })
        .to("#oball_6", {
          x: 100,
          y: 100,
          transformOrigin: "center center",
          duration: 0.3,
          ease: "none",
        })
        .to("#oball_6", {
          x: -230,
          y: 50,
          transformOrigin: "center center",
          duration: 0.3,
          ease: "none",
        })
        .to(
          "#oball_6",
          {
            rotation: 1200,
            transformOrigin: "center center",
            duration: 1.5,
            ease: "none",
          },
          "-=1.5"
        )
        // yball_4
        .to(
          "#yball_4",
          {
            y: -350,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=1.5"
        )
        .to(
          "#yball_4",
          {
            x: -120,
            y: -350,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=1.4"
        )
        .to(
          "#yball_4",
          {
            x: -150,
            y: 20,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=1"
        )
        .to(
          "#yball_4",
          {
            x: -100,
            y: -400,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=0.5"
        )
        .to(
          "#yball_4",
          {
            x: -150,
            y: -150,
            transformOrigin: "center center",
            duration: 0.2,
            ease: "none",
          },
          "-=0.2"
        )
        .to(
          "#yball_4",
          {
            rotation: -1500,
            transformOrigin: "center center",
            duration: 1.5,
            ease: "none",
          },
          "-=1.5"
        )
        // yball_5
        .to(
          "#yball_5",
          {
            x: 200,
            y: 150,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=1.5"
        )
        .to(
          "#yball_5",
          {
            x: -50,
            y: 100,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=1.2"
        )
        .to(
          "#yball_5",
          {
            x: 0,
            y: -170,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=0.9"
        )
        .to(
          "#yball_5",
          {
            x: -50,
            y: 100,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=0.6"
        )
        .to(
          "#yball_5",
          {
            x: 140,
            y: 200,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=0.3"
        )
        .to(
          "#yball_5",
          {
            rotation: 800,
            transformOrigin: "center center",
            duration: 1.5,
            ease: "none",
          },
          "-=1.5"
        )
        // gball_1
        .to(
          "#gball_1",
          {
            x: -150,
            y: -100,
            transformOrigin: "center center",
            duration: 0.2,
            ease: "none",
          },
          "-=1.5"
        )
        .to(
          "#gball_1",
          {
            x: -100,
            y: -350,
            transformOrigin: "center center",
            duration: 0.4,
            ease: "none",
          },
          "-=1.3"
        )
        .to(
          "#gball_1",
          {
            x: 200,
            y: -100,
            transformOrigin: "center center",
            duration: 0.4,
            ease: "none",
          },
          "-=0.9"
        )
        .to(
          "#gball_1",
          {
            x: -100,
            y: -350,
            transformOrigin: "center center",
            duration: 0.4,
            ease: "none",
          },
          "-=0.5"
        )
        .to(
          "#gball_1",
          {
            x: -100,
            y: -50,
            transformOrigin: "center center",
            duration: 0.4,
            ease: "none",
          },
          "-=0"
        )
        .to(
          "#gball_1",
          {
            rotation: -1800,
            transformOrigin: "center center",
            duration: 1.5,
            ease: "none",
          },
          "-=1.5"
        )
        // oball_3
        .to(
          "#oball_3",
          {
            x: -50,
            y: -100,
            transformOrigin: "center center",
            duration: 0.2,
            ease: "none",
          },
          "-=2"
        )
        .to(
          "#oball_3",
          {
            x: 320,
            y: -200,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=1.8"
        )
        .to(
          "#oball_3",
          {
            x: 100,
            y: 100,
            transformOrigin: "center center",
            duration: 0.5,
            ease: "none",
          },
          "-=1.5"
        )
        .to(
          "#oball_3",
          {
            x: 100,
            y: -250,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=1"
        )
        .to(
          "#oball_3",
          {
            x: 200,
            y: 0,
            transformOrigin: "center center",
            duration: 0.4,
            ease: "none",
          },
          "-=0.7"
        )
        .to(
          "#oball_3",
          {
            rotation: 1000,
            transformOrigin: "center center",
            duration: 1.5,
            ease: "none",
          },
          "-=1.5"
        )
        // gball
        .to(
          "#gball",
          {
            x: -350,
            y: -100,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=1.5"
        )
        .to(
          "#gball",
          {
            x: -100,
            y: -320,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=1.3"
        )
        .to(
          "#gball",
          {
            x: 0,
            y: 0,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=1"
        )
        .to(
          "#gball",
          {
            x: -250,
            y: -300,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=0.7"
        )
        .to(
          "#gball",
          {
            x: 0,
            y: 0,
            transformOrigin: "center center",
            duration: 0.4,
            ease: "none",
          },
          "-=0.4"
        )
        // yball_n1
        .to(
          "#yball_n1",
          {
            x: -350,
            y: -100,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=1.5"
        )
        .to(
          "#yball_n1",
          {
            x: 30,
            y: 0,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=1.2"
        )
        .to(
          "#yball_n1",
          {
            x: -350,
            y: 0,
            transformOrigin: "center center",
            duration: 0.4,
            ease: "none",
          },
          "-=0.9"
        )
        .to(
          "#yball_n1",
          {
            x: -250,
            y: -220,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=0.5"
        )
        .to(
          "#yball_n1",
          {
            x: 10,
            y: -10,
            transformOrigin: "center center",
            duration: 0.2,
            ease: "none",
          },
          "-=0.2"
        )
        // yball_n2
        .to(
          "#yball_n2",
          {
            x: 200,
            y: 50,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=2"
        )
        .to(
          "#yball_n2",
          {
            x: 150,
            y: -350,
            transformOrigin: "center center",
            duration: 0.5,
            ease: "none",
          },
          "-=1.7"
        )
        .to(
          "#yball_n2",
          {
            x: 0,
            y: 0,
            transformOrigin: "center center",
            duration: 0.4,
            ease: "none",
          },
          "-=1.3"
        )
        .to(
          "#yball_n2",
          {
            x: -80,
            y: -200,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=0.9"
        )
        .to(
          "#yball_n2",
          {
            x: 100,
            y: 50,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=0.6"
        )
        // oball
        .to(
          "#oball",
          {
            x: 200,
            y: -200,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=2"
        )
        .to(
          "#oball",
          {
            x: -150,
            y: -150,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=1.7"
        )
        .to(
          "#oball",
          {
            x: 50,
            y: -280,
            transformOrigin: "center center",
            duration: 0.4,
            ease: "none",
          },
          "-=1.4"
        )
        .to(
          "#oball",
          {
            x: 50,
            y: 50,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=1"
        )
        .to(
          "#oball",
          {
            x: 200,
            y: -200,
            transformOrigin: "center center",
            duration: 0.3,
            ease: "none",
          },
          "-=0.7"
        )
        .to(
          "#oball",
          {
            x: 0,
            y: 0,
            transformOrigin: "center center",
            duration: 0.4,
            ease: "none",
            onComplete() {
              let id = Math.floor(Math.random() * 5);
              router.push({name: 'question', params: { id: id }})
            },
          },
          "-=0.4"
        );
    },
  },
  watch: {
    start() {
      this.aniStart();
    },
  },
  mounted() {},
};
</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>
