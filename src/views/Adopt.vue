<template>
  <div id="adopt" style="background-color:rgba(0,0,0,.1)">
    <div class="a-head" style="width:100%">
      <Nav></Nav>
      <img
        src="../assets/002.jpg"
        alt=""
        style="width:100%;height:300px"
      />
    </div>
    <div class="a-main" style="min-height:400px;width:80%;margin:20px auto">
      <div
        class="a-box"
        v-for="(v, i) in data"
        :key="i"
        @click="toACon(item.sid)"
        style="display:flex;padding:10px;box-shadow:0px 0px 10px 2px rgba(0,0,0,.3);position:relative"
      >
        <img :src="v.img" alt="" style="width:200px;height:200px" />
        <div
          class="a-box-main"
          style="margin-left:20px;display:flex;flex-direction:column;justify-content:space-evenly;"
        >
          <h3 class="a-box-title" style="text-align:left">{{ v.title }}</h3>
          <div style="text-align:left">
            来自：{{ v.user }}&nbsp;&nbsp;&nbsp;&nbsp;发布日期：{{ v.date }}
          </div>
          <div style="text-align:left">
            种类：{{ v.type }}&nbsp;&nbsp;&nbsp;&nbsp;性别：{{
              v.gender
            }}&nbsp;&nbsp;&nbsp;&nbsp;年龄：{{ v.age }}岁
          </div>
          <div style="text-align:left">简介：{{ v.intro }}</div>
        </div>
        <img :src="v.img2" alt="" style="width:100px;height:100px;border:none;position:absolute;right:30px;top:30px" />
        <p style="position:absolute;right:30px;bottom:40px">送养人信息码</p>
        <a :href="v.QQ" target="_blank" style="position:absolute;right:20px;bottom:20px">点此联系送养人</a>
      </div>
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
    return {
      data: []
    };
  },
  methods: {
    toACon() {},
    getData() {
      this.axios.get("http://localhost:3000/getAdopt").then(res => {
        res.data.data.forEach(el=>{
          el.QQ = `http://wpa.qq.com/msgrd?v=3&uin=${el.QQ}&site=qq&menu=yes`
        })
        this.data = res.data.data;
      });
    }
  },
  mounted() {},
  created() {
    this.getData();
  }
};
</script>

<style></style>
