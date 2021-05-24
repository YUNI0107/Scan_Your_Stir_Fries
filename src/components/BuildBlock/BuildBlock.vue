<script>
import BuildDishesBlock from "../../components/BuildDishesBlock/BuildDishesBlock"
export default {
  props: ["level"],
  data() {
    return {
      all_dishesList: [
            [
              { id: "P01", name: "五更腸旺", number: 1, level: 1 },
              { id: "P02", name: "蒜泥白肉" ,number: 2, level: 1 },
              { id: "P03", name: "客家小炒" ,number: 3, level: 1 },
              { id: "P04", name: "麻油炒豬肝" ,number: 4, level: 1 },
              { id: "P05", name: "脆皮肥腸" ,number: 5, level: 1 },
            ],
            [
              { id: "L01", name: "空心菜炒羊肉", number: 1, level: 2 },
              { id: "L02", name: "麻油薑絲炒羊肉" ,number: 2, level: 2 },
              { id: "L03", name: "烤羊肉串" ,number: 3, level: 2 },
            ],
            [
              { id: "B01", name: "蔥爆牛", number: 1, level: 3 },
              { id: "B02", name: "鐵板牛柳" ,number: 2, level: 3 },
              { id: "B03", name: "香辣滷牛肚" ,number: 3, level: 3 },
            ],
            [
              { id: "B01", name: "宮保雞丁", number: 1, level: 4 },
              { id: "B02", name: "三杯雞" ,number: 2, level: 4 },
              { id: "B03", name: "白斬雞" ,number: 3, level: 4 },
            ],
            [
              { id: "V01", name: "魚香茄子", number: 1, level: 5 },
              { id: "V02", name: "金沙杏苞菇" ,number: 2, level: 5 },
              { id: "V03", name: "苦瓜鹹蛋" ,number: 3, level: 5 },
              { id: "V04", name: "清炒水蓮" ,number: 4, level: 5 },
              { id: "V05", name: "腐乳高麗菜" ,number: 5, level: 5 },
            ],
            [
              { id: "S01", name: "豆酥鱈魚", number: 1, level: 6 },
              { id: "S02", name: "生炒透抽" ,number: 2, level: 6 },
              { id: "S03", name: "炸龍珠" ,number: 3, level: 6 },
              { id: "S04", name: "糖醋魚" ,number: 4, level: 6 },
              { id: "S05", name: "炒海瓜子" ,number: 5, level: 6 },
              { id: "S06", name: "鹽酥蝦" ,number: 6, level: 6 },
            ],
            [
              { id: "MD01", name: "蝦仁蛋炒飯", number: 1, level: 7 },
              { id: "MD02", name: "肉絲炒麵" ,number: 2, level: 7 },
            ],
            [
              { id: "SD01", name: "麻婆豆腐", number: 1, level: 8 },
              { id: "SD02", name: "皮蛋豆腐" ,number: 2, level: 8 },
              { id: "SD03", name: "老皮嫩肉" ,number: 3, level: 8 },
            ],
          ],
          all_title: [
              { eng: "PORK", chi: "豬肉類" },
              { eng: "LAMB", chi: "羊肉類" },
              { eng: "BEEF", chi: "牛肉類" },
              { eng: "CHICKEN", chi: "雞肉類" },
              { eng: "VEGETABLE", chi: "蔬菜類" },
              { eng: "SEAFOOD", chi: "海鮮類" },
              { eng: "MAIN DISHES", chi: "主食類" },
              { eng: "SIDE DISHES", chi: "其他類" },
          ]
    };
  },
  computed:{
      each_dishesList(){
          return this.all_dishesList[this.level-1]
      },
      each_title(){
          return this.all_title[this.level-1]
      },
      back_color(){
        if(this.level % 2 == 1){
          return "yellow"
        }else{
          return "green"
        }
      }
  },
  components:{
    BuildDishesBlock,
  },
  methods:{
    userListPush(each_dishes){
      this.$emit("userListPush",each_dishes)
    },
    dishesDelete(id){
      this.$emit("dishesDelete",id)
    }
  }
};
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>
