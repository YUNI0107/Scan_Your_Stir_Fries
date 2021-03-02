<script>
import MenuDishesList from "../../components/MenuDishesList/MenuDishesList";
import AddModal from "../../components/AddModal/AddModal";
import Footer_section from "../../components/Footer/Footer";
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      catelist: [
        { name: "pork" },
        { name: "lamb" },
        { name: "beef" },
        { name: "chicken" },
        { name: "veg" },
        { name: "sea" },
        { name: "main" },
        { name: "side" },
      ],
      dishesList: [],
      loading: true,
      infoOpenID: "P01",
    };
  },
  computed: {
    metatitle() {
      return this.$i18n.t("nav.dishes") + "-" + this.$i18n.t("nav.name");
    },
  },
  watch: {
    id() {
      this.getDishesList();
    },
    metatitle(){
      document.title = this.metatitle
    }
  },
  methods: {
    getDishesList() {
      this.dishesList = [];
      this.loading = true;
      axios.get("../dishes.json").then((res) => {
        for (let i in res.data) {
          if (res.data[i].cate == this.id) {
            this.dishesList.push(res.data[i]);
          }
        }
        this.loading = false;
      });
    },
    openInfoID(id) {
      this.infoOpenID = id;
    },
  },
  components: {
    MenuDishesList,
    Footer_section,
    AddModal,
  },
  mounted() {
    this.$store.commit("navColor", "cream");
    this.getDishesList();
  },
  created(){
    document.title = this.metatitle
  },
};
</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>
