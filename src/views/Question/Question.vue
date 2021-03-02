<script>
import axios from "axios";
import { Modal } from "bootstrap";
import AnsInfo from "../../components/AnsInfo/AnsInfo";
export default {
  data() {
    return {
      counting: 10,
      boxheight: 0 + "px",
      q_id: this.$route.params.id,
      ans: "a1",
      text_fade: "false",
      timer: null,
      modalState: "hide",
      myModal: null,
      dishes_id: "P01",
    };
  },
  components: {
    AnsInfo,
  },
  computed: {
    q_number() {
      if (this.q_id < 10) {
        return "0" + this.q_id;
      } else {
        return this.q_id;
      }
    },
    metatitle() {
      return this.$i18n.t("nav.question") + this.q_number + "-" + this.$i18n.t("nav.name");
    },
  },
  watch:{
    metatitle(){
      document.title = this.metatitle
    }
  },
  methods: {
    changeQuestion() {
      let q_id = Math.floor(Math.random() * 10 + 1);
      if (q_id !== this.$route.params.id) {
        this.$router.push({ name: "question", params: { id: q_id } });
        this.$router.go(0)
      } else {
        this.changeQuestion();
      }
    },
    goGame() {
      this.changeQuestion();
      this.getQuestion();
    },
    getQuestion() {
      // 獲得題目
      axios.get("/question.json").then((res) => {
        let item = res.data.filter((item) => item.q_id == this.q_id);
        this.ans = item[0].ans;
        this.text_fade = item[0].fade;
        this.dishes_id = item[0].dishes;
      });
    },
    boxHeightSize() {
      this.$nextTick(() => {
        this.boxheight = this.$refs.box.clientWidth + "px";
      });
    },
    checkAns(click_ans) {
      if (click_ans == this.ans && this.modalState == "hide") {
        this.modalState = "yes";
        clearTimeout(this.timer);
      } else if (this.modalState == "hide") {
        this.modalState = "no";
        clearTimeout(this.timer);
      }
    },
    changeState() {
      this.modalState = "hide";
    },
  },
  mounted() {
    // 倒數SVG
    let circle = document.querySelector(".path"),
      len = 2 * Math.PI * circle.getAttribute("r");
    circle.style.strokeDasharray = circle.style.strokeDashoffset = len;
    // 倒數
    let timer = setInterval(() => {
      if (this.counting > 0) {
        this.counting--;
      } else {
        clearInterval(timer);
      }
    }, 1000);

    // 倒數結束提示
    this.$nextTick(() => {
      this.myModal = new Modal(this.$refs.timeoutModal, {
        keyboard: false,
      });
    });
    this.timer = setTimeout(() => {
      this.myModal.show();
    }, 10000);

    // 高度探測
    this.boxHeightSize();
    window.addEventListener("resize", this.boxHeightSize);

    this.getQuestion();
    this.$store.commit("navColor", "yellow");
  },
  created(){
    document.title = this.metatitle
  },
  destroyed() {
    removeEventListener("resize", this.boxHeightSize);
    clearTimeout(this.timer)
  },
};
</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>
