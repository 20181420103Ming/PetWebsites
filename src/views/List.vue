<template>
  <div id="list">
    <Nav></Nav>
    <img
      src="../../static/K2Q0J6AQBL745XB`6)({0(C.png"
      alt=""
      style="width:100%;height:300px"
      srcset=""
    />
    <div class="list-main">
      <router-view></router-view>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Foot from "../components/foot.vue";
import Nav from "../components/nav.vue";
export default {
  components: { Nav, Foot },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped>
.list-main {
  min-height: 700px;
  width: 90%;
  margin: 0 auto;
}
#foot {
  width: 100%;
  height: 200px;
  background-color: rgb(0, 0, 0);
  margin-top: 50px;
  color: #fff;
}
.fl {
  height: 120px;
  padding: 10px;
  width: 80%;
  margin: 0 auto 20px;
  border-bottom: 1px solid rgb(155, 155, 155);
}
.fl ul {
  width: 100px;
  height: 90px;
  margin-left: 100px;
  margin-top: 20px;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.fl ul li {
  width: 100px;
}
.fl ul li a {
  color: #fff;
  font-size: 12px;
}
</style>
