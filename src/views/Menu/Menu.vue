<script>
import { mapState } from "vuex";
export default {
  computed: {
    metatitle() {
      return this.$i18n.t("nav.dishes") + "-" + this.$i18n.t("nav.name");
    },
    ...mapState(["lang"]),
  },
  watch: {
    metatitle() {
      document.title = this.metatitle;
    },
  },
  mounted() {
    this.$store.commit("navColor", "cream");
  },
  created(){
    document.title = this.metatitle
  },
};
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>
