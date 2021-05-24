<script>
import { mapState } from "vuex";
import axios from "axios";
import BackAnimation from "../../components/BackAnimation/BackAnimation";
import OrderSection from "../../components/OrderSection/OrderSection";
import IngredientBlock from "../../components/IngredientBlock/IngredientBlock";
import IngredientInfo from "../../components/IngredientInfo/IngredientInfo";
import Footer_section from "../../components/Footer/Footer";

export default {
  data() {
    return {
      dishes_id: this.$route.params.id,
      // 當下高度
      img_top: 300 + "px",
      // [大尺寸高度,小尺寸高度]
      img_top_data: [-20, -200],
      dishes_icon_info: ["hot", "salty", "fry"],
      ingredient: [],
      comic: false,
      article: false,
      ingredient_list: [],
      eng_name: "",
      // ball
      scrollTop: 0,
      ball_total_top: 0,
      ball_right: 0,
      ball_height: 0,
      cart_fix: 10,
    };
  },
  computed: {
    dishesIcon() {
      return [
        {
          class_name: "temp",
          type: this.dishes_icon_info[0],
          img: require(`../../assets/Dishes_element/${this.dishes_icon_info[0]}.png`),
        },
        {
          class_name: "flavor",
          type: this.dishes_icon_info[1],
          img: require(`../../assets/Dishes_element/${this.dishes_icon_info[1]}.png`),
        },
        {
          class_name: "cuisine",
          type: this.dishes_icon_info[2],
          img: require(`../../assets/Dishes_element/${this.dishes_icon_info[2]}.png`),
        },
      ];
    },
    metatitle(){
      return this.$i18n.t(`dishes.${this.dishes_id}.dishes_name`) +"-"+ this.$i18n.t('nav.name')
    },
    ...mapState(["lang"]),
  },
  components: {
    BackAnimation,
    OrderSection,
    IngredientBlock,
    IngredientInfo,
    Footer_section,
  },
  watch:{
    metatitle(){
      document.title = this.metatitle
    }
  },
  methods: {
    checkMatch() {
      let match = window.matchMedia("(max-width: 576px)");
      if (match.matches) {
        this.img_top = this.img_top_data[0] + "px";
        this.cart_fix = 10;
      } else {
        this.img_top = this.img_top_data[1] + "px";
        this.cart_fix = 25;
      }
    },
    replayGif() {
      this.$refs.food_gif.src = require(`../../assets/Dishes/${this.dishes_id}/food.gif`);
    },
    dishesSoundPlay() {
      this.$refs.dishes_name.play();
    },
    getBall() {
      this.ball_total_top =
        this.$refs.order.$refs.ball.offsetTop + this.$refs.order.$el.offsetTop;
      this.ball_height = this.ball_total_top - this.scrollTop;
      this.ball_right = this.$refs.order.$refs.ball.offsetLeft + this.$refs.order.$refs.orange.offsetLeft
      if (this.ball_height > 60) {
        this.$refs.order.$refs.ball.style.opacity = 1;
        this.$refs.order.$refs.ball.style.transform = `translate(${this.ball_right - (this.$refs.order.$el.offsetLeft + 25)}px , -${this.ball_height - this.cart_fix}px)`;
        this.$refs.order.$refs.ball.classList.add('ani');
        setTimeout(()=>{
          this.$refs.order.$refs.ball.style.opacity = 0;
          this.$refs.order.$refs.ball.style.transform= "translate(-50%,-50%)"
          this.$refs.order.$refs.ball.classList.remove('ani');
        },800)
      }
    },
    getScroll() {
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop || 0;
    },
  },
  mounted() {
    this.$store.commit("navColor", "cream");
    this.replayGif();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    //匯入菜色
    axios.get("dishes.json").then((res) => {
      let data = res.data[this.dishes_id];
      this.dishes_icon_info = data.dishes_icon_info;
      this.ingredient = data.ingredient;
      this.comic = data.comic;
      this.article = data.article;
      this.eng_name = data.dishes_name;
      this.checkMatch();
      // 判斷食材
      this.$nextTick(() => {
        axios.get("ingredient_test.json").then((res) => {
          this.ingredient.forEach((ingredient_name) => {
            this.ingredient_list.push(
              res.data.filter(
                (item) => ingredient_name == item.ingredient_name
              )[0]
            );
          });
        });
      });
    });

    window.addEventListener("resize", this.checkMatch);
    window.addEventListener("scroll", this.getScroll);
  },
  created(){
    document.title = this.metatitle
  },
  destroyed() {
    window.removeEventListener("resize", this.checkMatch);
    window.removeEventListener("scroll", this.getScroll);
  },
};
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>
