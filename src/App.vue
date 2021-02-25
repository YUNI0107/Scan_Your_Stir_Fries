<template>
  <div id="app">
    <NavBar/>
    <InfoModal/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar/NavBar'
import InfoModal from './components/InfoModal/InfoModal'
export default {
  components:{
    NavBar,
    InfoModal,
  },
  mounted() {
  },
}
</script>

