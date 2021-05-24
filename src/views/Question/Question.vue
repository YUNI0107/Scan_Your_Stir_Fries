<script>
import axios from "axios";
import { Modal } from "bootstrap";
import AnsInfo from "../../components/AnsInfo/AnsInfo";
export default {
  data() {
    return {
      counting: 10,
      boxheight: 0 + "px",
      ans: "a1",
      text_fade: "false",
      modal_timer: null,
      count_timer: null,
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
      return (
        this.$i18n.t("nav.question") +
        this.q_number +
        "-" +
        this.$i18n.t("nav.name")
      );
    },
    q_id() {
      return this.$route.params.id || 1;
    },
  },
  watch: {
    metatitle() {
      document.title = this.metatitle;
    },
    q_id() {
      this.$forceUpdate();
    },
  },
  methods: {
    changeQuestion() {
      let q_id = Math.floor(Math.random() * 10 + 1);
      if (q_id !== this.$route.params.id) {
        this.$router.push({ name: "question", params: { id: q_id } });
        document.querySelector("#svg_path").remove();
        let new_svg = document.createElement("div");
        new_svg.id = "svg_path";
        new_svg.classList.add("count_img");
        new_svg.innerHTML = `
          <svg x="0px" y="0px" viewBox="0 0 200 200" class="w-100">
                    <circle class="" stroke="#00c7a4" fill="none" stroke-width="20" cx="100" cy="100" r="50"/>
                    <circle ref="path" class="path" stroke="#f97700" fill="none" stroke-width="20" cx="100" cy="100" r="50" style="stroke-dashoffset: 314.159; stroke-dasharray: 314.159;"/>
          </svg>
          <style>
            .count_img{
                width: 180px;
            }

            svg {
                transform: rotate(-90deg);
            }

            .count_img .path {
                transition: stroke-dashoffset .5s;
            }
            
            .ani{
                animation: run 10s linear forwards;
            }

            @keyframes run {
                to {
                  stroke-dashoffset: 0;
                  }
            }          
          </style>
        `;
        this.$refs.count_img.append(new_svg);
        document.querySelector(".path").classList.add("ani");

        this.countTime();
        // this.$router.go(0)
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
        clearTimeout(this.modal_timer);
        clearTimeout(this.count_timer);
        document.querySelector(".path").style.animationPlayState = "paused";
      } else if (this.modalState == "hide") {
        this.modalState = "no";
        clearTimeout(this.modal_timer);
      }
    },
    changeState() {
      this.modalState = "hide";
    },
    countTime() {
      this.clearTime();
      // 倒數
      this.counting = 10;
      this.$refs.path.classList.add("ani");
      this.count_timer = setInterval(() => {
        if (this.counting > 0) {
          this.counting--;
        } else {
          clearInterval(this.count_timer);
        }
      }, 1000);
      // 倒數結束提示
      this.$nextTick(() => {
        this.myModal = new Modal(this.$refs.timeoutModal, {
          keyboard: false,
        });
      });
      this.modal_timer = setTimeout(() => {
        this.myModal.show();
      }, 10000);
    },
    clearTime() {
      clearInterval(this.count_timer);
      clearTimeout(this.modal_timer);
    },
  },
  mounted() {
    // 倒數SVG
    let circle = document.querySelector(".path"),
      len = 2 * Math.PI * circle.getAttribute("r");
    circle.style.strokeDasharray = circle.style.strokeDashoffset = len;
    this.countTime();
    // 高度探測
    this.boxHeightSize();
    window.addEventListener("resize", this.boxHeightSize);

    this.getQuestion();
    this.$store.commit("navColor", "yellow");
  },
  created() {
    document.title = this.metatitle;
  },
  destroyed() {
    removeEventListener("resize", this.boxHeightSize);
    this.clearTime();
  },
  // beforeRouteLeave() {
  //   this.$forceUpdate();
  // },
};
</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>
