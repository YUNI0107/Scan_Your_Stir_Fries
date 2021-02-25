<script>
import { mapState } from "vuex";
import { Modal } from "bootstrap";
export default {
  computed: {
    ...mapState(["info_message"]),
  },
  mounted() {
    let infomodal = this.$refs.infoModal;
    let infomodal_control = new Modal(infomodal);
    infomodal.addEventListener("shown.bs.modal", () => {
      setTimeout(() => {
          infomodal_control.hide();
      }, 300);
    });
  },
};
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>
