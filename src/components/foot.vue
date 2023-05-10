<template>
  <div id="foot">
    <div class="fl" style="position:relative">
      <h5 style="float:left;margin-left:20px">友情链接</h5>
      <ul>
        <li v-for="(v, i) in fl" :key="i">
          <a :href="v.url">{{ v.name }}</a>
        </li>
      </ul>
      <div class="QRcode" style="position:absolute;right:0;top:50%;transform:translateY(-50%)">
          <img src="../assets/ewm.jpg" alt="" style="width:80px;height:80px">
      </div>
    </div>
    <p>分享更多宠物故事和养宠知识</p>
    <p>个人版权所有——未备案</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fl: null
    };
  },
  methods: {
    getfl() {
      let _this = this;
      this.axios.get("http://localhost:3000/getfl").then(function(res) {
        _this.fl = res.data.data;
      });
    }
  },
  created() {
    this.getfl();
  }
};
</script>

<style>
#foot {
  width: 100%;
  height: 200px;
  background-color: rgba(185, 182, 182, 0.719);
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
  margin:0 40px ;
}
.fl ul li a {
  color: #fff;
  font-size: 14px;
  text-decoration: none;
}
</style>
