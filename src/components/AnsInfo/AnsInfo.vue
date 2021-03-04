<script>
import { Modal } from "bootstrap";
export default {
  props: ["state", "ans", "q_id", "dishes_id"],
  data() {
    return {
      myModal: null,
    };
  },
  computed: {
    right_ans() {
      let ans_arr = ["A.", "B.", "C.", "D."];
      return ans_arr[this.ans[1] - 1];
    },
  },
  watch: {
    state() {
      if (this.state == "yes") {
        this.myModal.show();
      } else if (this.state == "no") {
        this.myModal.show();
      }
    },
  },
  methods: {
    goDishes() {
      this.myModal.hide();
      this.$router.push({ name: "dishes", params: { id: this.dishes_id } });
    },
    goGame() {
      this.myModal.hide();
      this.$emit('goGame')
    },
    changeQuestion() {
      let q_id = Math.floor(Math.random() * 10 + 1);
      if (q_id !== this.q_id) {
        this.$router.push({ name: "question", params: { id: q_id } });
      } else {
        this.changeQuestion();
      }
    },
  },
  mounted() {
    this.myModal = new Modal(this.$refs.ansinfo, {
      keyboard: false,
    });
    this.$refs.ansinfo.addEventListener("hidden.bs.modal", () => {
      this.$emit("changeState");
    });
    this.$refs.ansinfo.addEventListener("show.bs.modal", () => {
      if(this.state == "yes"){
          this.$refs.audio_yes.play();
      }else if(this.state == "no"){
          this.$refs.audio_no.play();
      }
    });
  },
  destroyed() {},
};
</script>
<template src="./template.html"></template>
<style src="./style.css" scoped></style>
