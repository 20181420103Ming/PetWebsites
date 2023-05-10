<template>
  <div id="banner">
    <Carousel
      v-model="value3"
      :autoplay="setting.autoplay"
      :autoplay-speed="setting.autoplaySpeed"
      :dots="setting.dots"
      :radius-dot="setting.radiusDot"
      :trigger="setting.trigger"
      :arrow="setting.arrow"
    >
      <CarouselItem>
        <div class="demo-carousel">
          <img src="../assets/banner01.jpg" alt="" srcset="" />
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">
          <img src="../assets/bannnr02.jpg" alt="" srcset="" />
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">
          <img src="../assets/banner05.jpg" alt="" srcset="" />
        </div>
      </CarouselItem>
    </Carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value3: 0,
      setting: {
        autoplay: true,
        autoplaySpeed: 3000,
        dots: "inside",
        radiusDot: false,
        trigger: "hover",
        arrow: "hover"
      }
    };
  }
};
</script>
<style scoped>
#banner img {
  width: 100%;
  height: 600px;
}
.ivu-carousel-dots li{
  margin-right: 10px;
}
</style>
