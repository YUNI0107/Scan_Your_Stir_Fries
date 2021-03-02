<script>

export default {
  name: 'Home',
  mounted() {
    this.$store.commit("navColor", 'yellow')
  },
}
</script>

<template src="./template.html"></template>
<style src="./style.css" scoped></style>