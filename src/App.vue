<template>
  <div id="app">
    <NavBar />
    <InfoModal />
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar/NavBar";
import InfoModal from "./components/InfoModal/InfoModal";
import smoothscroll from "smoothscroll-polyfill";

smoothscroll.polyfill();

export default {
  components: {
    NavBar,
    InfoModal,
  },
};
</script>

<style>

html,
body {
  scroll-behavior: smooth;
}

</style>
