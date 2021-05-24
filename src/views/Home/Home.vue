<script>
import FooterSection from "../../components/Footer/Footer";
import gsap from "gsap";
import smoothscroll from 'smoothscroll-polyfill';
import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      people_rotete: 0,
      orange: false,
    };
  },
  components: {
    FooterSection,
  },
  computed: {
    metatitle() {
      return this.$i18n.t("nav.home") + "-" + this.$i18n.t("nav.name");
    },
    ...mapState(["lang"]),
  },
  watch: {
    metatitle() {
      document.title = this.metatitle;
    },
    lang() {
      this.$nextTick(() => {
        this.navColorChange();
      });
    },
  },
  methods: {
    peopleRotate(count) {
      let people = this.$refs.people_img;
      if (count == "+") {
        people.style.transform = `rotate(${(this.people_rotete -= 90)}deg)`;
      } else if (count == "-") {
        people.style.transform = `rotate(${(this.people_rotete += 90)}deg)`;
      }
      this.orange = !this.orange;
    },
    navColorChange() {
      let scroll_top =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scroll_top < this.$refs.link_section.offsetTop - 60) {
        this.$store.commit("navColor", "yellow");
      } else if (scroll_top < this.$refs.visitors_section.offsetTop - 60) {
        this.$store.commit("navColor", "cream");
      } else if (scroll_top < this.$refs.boss_section.offsetTop - 60) {
        this.$store.commit("navColor", "yellow");
      } else if (scroll_top > this.$refs.boss_section.offsetTop - 60 && scroll_top < this.$refs.foot_section.$el.offsetTop &&  this.lang !== "ch") {
        this.$store.commit("navColor", "orange");
      } 
      else if (this.lang == "ch") {
        if (scroll_top < this.$refs.menu_section.offsetTop - 60) {
          this.$store.commit("navColor", "orange");
        }else{
          this.$store.commit("navColor", "green");
        }
      } else {
        console.log("g");
        this.$store.commit("navColor", "green");
      }
    },
    sectionMove(section) {
      let top;
      if (section == "vistors") {
        top = this.$refs.visitors_section.offsetTop;
        document.body.scrollTop = top - 50;
        document.documentElement.scrollTop = top - 50;
      } else if (section == "boss") {
        top = this.$refs.boss_section.offsetTop;
        document.body.scrollTop = top - 50;
        document.documentElement.scrollTop = top - 50;
      }
    },
  },
  mounted() {
    // 換nav顏色
    this.$store.commit("toogleTrans", "add");
    this.$store.commit("navColor", "yellow");
    this.$nextTick(() => {
      window.addEventListener("scroll", this.navColorChange);
    });

    let tl = gsap.timeline();
    tl.from(".top_section .green", {
      duration: 1.5,
      x: 1000,
      scale: 0,
      ease: "back.out(1.7)",
    })
      .from(
        ".boss-img",
        {
          duration: 1,
          x: -500,
          opacity: 0,
        },
        "-=1"
      )
      .from(
        ".top_text , .top_button_section",
        {
          duration: 1.5,
          opacity: 0,
        },
        "-=1"
      );
      smoothscroll.polyfill();
  },
  created() {
    document.title = this.metatitle;
  },
  destroyed() {
    window.removeEventListener("scroll", this.navColorChange);
    this.$store.commit("toogleTrans", "remove");
  },
};
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>
