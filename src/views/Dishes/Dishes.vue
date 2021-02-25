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
    ...mapState(["lang"]),
  },
  components: {
    BackAnimation,
    OrderSection,
    IngredientBlock,
    IngredientInfo,
    Footer_section,
  },
  methods: {
    checkMatch() {
      let match = window.matchMedia("(max-width: 576px)");
      if (match.matches) {
        this.img_top = this.img_top_data[0] + "px";
      } else {
        this.img_top = this.img_top_data[1] + "px";
      }
    },
    replayGif() {
      this.$refs.food_gif.src = require(`../../assets/Dishes/${this.dishes_id}/food.gif`);
    },
    dishesSoundPlay() {
      this.$refs.dishes_name.play();
    },
  },
  mounted() {
    this.$store.commit('navColor', 'cream')
    this.replayGif();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    //匯入菜色
    axios.get("../dishes.json").then((res) => {
      let data = res.data[this.dishes_id];
      this.dishes_icon_info = data.dishes_icon_info;
      this.ingredient = data.ingredient;
      this.comic = data.comic;
      this.article = data.article;
      this.checkMatch();
      // 判斷食材
      this.$nextTick(() => {
        axios.get("../ingredient_test.json").then((res) => {
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
    
  },
  destroyed() {
    window.removeEventListener("resize", this.checkMatch);
  },
};
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>
