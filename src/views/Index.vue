<template>
<!-- 这是首页  -->
  <div id="index">
    <img src="../assets/004.jpg" id="background-img" alt="" srcset="" />
    <!--头部区域-->
    <div id="head">
    <!--导航栏区域-->
      <Nav></Nav>
      <!--轮播图-->
      <Banner></Banner>
    </div>
    <IMain></IMain>
    <BackTop></BackTop>
    <!--首页尾部-->
    <Foot></Foot>
  </div>
</template>

<script>
import Banner from "../components/banner.vue";
import Foot from "../components/foot.vue";
import IMain from "../components/index_main.vue";
import Nav from "../components/nav.vue";
export default {
  components: { Nav, Banner, IMain,Foot }
};
</script>

<style>
#index {
  width: 100%;
  min-height: 100%;
}
#background-img {
  background-color: white;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  filter: brightness(0.6);
  z-index: -10000;
}
</style>
