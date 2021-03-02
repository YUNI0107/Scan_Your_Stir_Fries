<script>
import { mapState } from "vuex";
import CartBlock from "../../components/CartBlock/CartBlock";
export default {
  data() {
    return {
      sound_num: 1,
      sound_hot: "n",
      sound_id: "P01",
      playing_count: 0,
      playing: false,
    };
  },
  components: {
    CartBlock,
  },
  computed: {
    metatitle(){
      return this.$i18n.t('nav.cart') +"-"+ this.$i18n.t('nav.name')
    },
    ...mapState(["cart", "cart_num"]),
  },
  methods: {
    soudPlay: async function() {
    //   console.log("target");
    if(this.cart.length !== 0 && this.playing == false){
        this.playing = true;
        await this.resetSound();
        await this.soundPlaying();
    }
    },
    resetSound: async function() {
      this.sound_num = this.cart[this.playing_count].num;
      this.sound_hot = this.cart[this.playing_count].hot;
      this.sound_id = this.cart[this.playing_count].id;
    },
    soundPlaying: async function() {
      this.$refs.num.play();
    //   console.log(1, this.playing_count);
    },
  },
  watch:{
    metatitle(){
      document.title = this.metatitle
    }
  },
  mounted() {
    this.$refs.num.addEventListener("ended", () => {
      this.$refs.id.play();
    //   console.log(2, this.playing_count);
    });
    this.$refs.id.addEventListener("ended", () => {
      this.$refs.hot.play();
    //   console.log(3, this.playing_count);
    });
    this.$refs.hot.addEventListener("ended", () => {
      if (this.playing_count < this.cart.length - 1) {
        this.playing_count++;
        // console.log("keepgo");
        this.playing = false;
        this.soudPlay();
      } else {
        this.playing_count = 0;
        this.playing = false;
        // console.log("stop");
      }
    });

    this.$store.commit("navColor", "yellow");
    this.$store.commit("cartNumTotal");
  },
  created(){
    document.title = this.metatitle
  },
};
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>
