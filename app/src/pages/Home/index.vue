<!--  -->
<template>
  <div>
    <!-- 三级联动组件，因为已经注册为全局组件，所以不需要再引入 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState } from 'vuex';
export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  data() {
    return {};
  },
  mounted() {
      this.$store.dispatch("getFloorList");
      this.$store.dispatch('getUserInfo')
  },
  computed:{
      ...mapState({
          floorList:(state) => state.home.floorList
      })
  }
};
</script>
<style>
</style>