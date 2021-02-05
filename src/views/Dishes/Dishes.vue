<script>
import { mapState } from 'vuex'
import BackAnimation from '../../components/BackAnimation/BackAnimation'
import OrderSection from '../../components/OrderSection/OrderSection'
import IngredientBlock from '../../components/IngredientBlock/IngredientBlock'

export default {
  data() {
    return {
      dishes_id: this.$route.params.id,
      img_top: 300 + "px",
      img_top_data: [-20 , -200],
      ingredient_list:[],
    };
  },
  computed: {
    dishesIcon(){
      return[
        {
          class: 'Temp',
          type: 'Hot',
          img: require(`../../assets/Dishes_element/${'hot'}.png`)
        },
        {
          class: 'Flavor',
          type: 'Salty',
          img: require(`../../assets/Dishes_element/${'salt'}.png`)
        },
        {
          class: 'Cuisine',
          type: 'Stir-fry',
          img: require(`../../assets/Dishes_element/${'fry'}.png`)
        },
      ]
    },
    ...mapState(['lang',])
  },
  components:{
    BackAnimation,
    OrderSection,
    IngredientBlock,
  },
  methods: {
    checkMatch() {
        let match = window.matchMedia("(max-width: 576px)");
        if(match.matches){
            this.img_top = this.img_top_data[0] + "px"
        }else{
            this.img_top = this.img_top_data[1] + "px"
        }
    },
    replayGif(){
      this.$refs.food_gif.src = require(`../../assets/Dishes/${this.dishes_id}/food.gif`)
    },
    dishesSoundPlay(){
      this.$refs.dishes_name.play();
    }
  },
  mounted() {
    this.checkMatch();
    window.addEventListener("resize", this.checkMatch);

    // 判斷食材
    this.ingredient_list = [
      {
        ingredient_name: 'chicken',
        ingredient_showname: 'Chicken',
        plus_info: true,
        info: {
          plus_lang: true,
          color: 'green',
          info_text: "Chicken breast is known for being low-fat and relatively dry texture. The chicken tenderloin is also a part of the chicken breast.",
        }
      },
      {
        ingredient_name: 'ginger',
        ingredient_showname: 'Ginger',
        plus_info: false,
      },
      {
        ingredient_name: 'garlic',
        ingredient_showname: 'Garlic',
        plus_info: false,
      },
      {
        ingredient_name: 'basil',
        ingredient_showname: 'Basil leaves',
        plus_info: true,
        info: {
          plus_lang: false,
          color: 'yellow',
          info_text: "The name “jiou-ceng-ta” originates from FuKien Dialect. It is a kind of basil that has a strong scent; it adds extra layer of taste to different dishes.",
        }
      },
      {
        ingredient_name: 'rice_wine',
        ingredient_showname: 'Rice Wine',
        plus_info: false,
      },
      {
        ingredient_name: 'sesame_oil',
        ingredient_showname: 'Sesame Oil',
        plus_info: true,
        info: {
          plus_lang: false,
          color: 'green',
          info_text: "Sesame oil is abstracted from either white sesame or black sesame. The common sesame oil (“Ma yo”) widely used in making various dishes is made from black sesame, while “Hsiang yo” is made with white sesame oil and salad oil.",
        }
      },
      {
        ingredient_name: 'soy_sauce',
        ingredient_showname: 'Soy sauce',
        plus_info: false,
      },
    ]
  },
  destroyed() {
    window.removeEventListener("resize", this.checkMatch);
  },
};
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>
