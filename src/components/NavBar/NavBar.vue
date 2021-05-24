<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      mobile: false,
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
    changePage(){
      if(this.mobile) this.$refs.nav_btn.click();
    },
    screenChange(e){
      this.mobile = e.matches;
    }
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
  mounted(){
    let mql = window.matchMedia('(max-width: 992px)');
    mql.addEventListener('change', this.screenChange);
    this.mobile = window.matchMedia('(max-width: 992px)').matches;
  }
};
</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>
