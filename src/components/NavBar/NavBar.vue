<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
    };
  },
  computed: {
    check_menubuild(){
      if(this.$route.name == "menubuilder"){
        return false
      }else{
        return true
      }
      
    },
    ...mapState(["lang", "navcolor", "cart_num","trans"]),
  },
  methods: {
    langToogle(new_lang, lang_message) {
      this.$store.commit("langChange", new_lang);
      this.$root.$i18n.locale = new_lang;
      this.$store.commit("infoMessage", lang_message);
    },
    
  },
  watch: {
    cart_num() {
      this.$nextTick(() => {
        if (this.cart_num !== 1 && this.cart_num !== 0) {
          this.$refs.num.classList.add("ani");
          setTimeout(() => {
            this.$refs.num.classList.remove("ani");
          }, 500);
        }
      });
    },
  },
};
</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>
