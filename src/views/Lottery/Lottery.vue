<script>
import LotteryAnimation from "../../components/LotteryAnimation/LotterAnimation";
export default {
  data() {
    return {
      start: false,
    };
  },
  components: {
    LotteryAnimation,
  },
  computed: {
    metatitle() {
      return this.$i18n.t("nav.lottery") + "-" + this.$i18n.t("nav.name");
    },
  },
  watch:{
    metatitle(){
      document.title = this.metatitle
    }
  },
  methods: {
    gameStart() {
      this.start = true;
    },
  },
  mounted() {
    this.$store.commit("navColor", "green");
  },
  created(){
    document.title = this.metatitle
  },
};
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>
