<template>
  <div id="app">
      <Header></Header>
      <router-view></router-view>
      <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
      Header,
      Footer
  },
  mounted() {
    //   获取三级联动菜单的数据
      this.$store.dispatch("categoryList");
  },
}
</script>

<style>
</style>
