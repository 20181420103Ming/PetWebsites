<template>
  <div id="nav">
    <ul id="nav-items">
      <li @click="toRouter('/index')"><Icon type="ios-paper" />首页</li>
      <li @click="toRouter('/list/notice')">
        <Icon type="ios-book" /> 养宠须知
      </li>
      <li @click="toRouter('/list/active')">
        <Icon type="ios-cube" /> 宠物活动
      </li>
      <li @click="toRouter('/life')">
        <Icon type="ios-camera-outline" /> 晒宠生活
      </li>
      <li @click="toRouter('/list/news')">
        <Icon type="ios-paper-outline" /> 时事新闻
      </li>
      <li @click="toRouter('/adopt')">
        <Icon type="md-contacts" /> 宠物领养
      </li>
      <section style="position:absolute;right:0;line-height:50px;display:flex">
        <!-- <section style="margin-top:10px;">
          <Input
            search
            placeholder="输入关键字进行检索"
            v-model="search_txt"
            @on-search="search"
            style="width:300px;"
          />
          <div
            class="keywords"
            style="height:20px;line-height:20px;margin-top:-5px;font-size:12px;text-align:left;padding:0 2px;cursor:default;color:rgba(0,0,0,.5)"
          >
            热门关键字：
            <span
              v-for="(k, i) in keywords.slice(0, 4)"
              style="margin-right:5px;cursor:default"
              :key="i"
              :title="'次数：' + k.count"
              >{{ k.keyword }}</span
            >
          </div>
        </section> -->

        <li
          title="点击登录/注册"
          style="margin:0 20px"
          @click="toRouter('/login?login=true')"
          v-show="!isLogin"
        >
          <Icon size="30" style="margin-top:20px;" type="ios-contact" />
        </li>
        <li
          v-show="isLogin"
          class="username"
          style="line-height:80px;letter-spacing:2px;"
          @mouseover="isUserSubShow = true"
          @mouseleave="isUserSubShow = false"
        >
          {{ username }}
          <ul v-show="isUserSubShow">
            <li @click="logout">退出登录</li>
          </ul>
        </li>
      </section>
    </ul>
    <br />
  </div>
</template>
<script>
export default {
  data() {
    return {
      theme1: "primary", //导航主体颜色样式，{ type == string } 可选值：light dark primary
      search_txt: "",
      keywords: [],
      isLogin: !!localStorage.getItem("username"),
      username: localStorage.getItem("username"),
      isUserSubShow: false
    };
  },
  methods: {
    toRouter(router) {
      this.$router.push(router);
    },
    search() {
      if (!this.search_txt) {
        //未输入搜索关键字时
        this.$Message.warning("啥都没输，赶紧滚蛋");
      } else {
      }
    },
    getKeywords() {
      const _that = this;
      this.axios.get("http://localhost:3000/getKeyword").then(function(res) {
        _that.keywords = res.data.data;
        //冒泡排序
        for (let i = 0; i < _that.keywords.length - 1; i++) {
          for (let j = 0; j < _that.keywords.length - 1 - i; j++) {
            if (_that.keywords[j].count < _that.keywords[j + 1].count) {
              [_that.keywords[j], _that.keywords[j + 1]] = [
                _that.keywords[j + 1],
                _that.keywords[j]
              ];
            }
          }
        }
      });
    },
    logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("usermail");
      location.reload();
    }
  },
  created() {
    this.getKeywords();
  }
};
</script>
<style scoped>
.ivu-menu {
  padding: 0 5%;
}
#nav {
  width: 100%;
  height: 100px;
  position: absolute;
  z-index: 1;
  background-image: linear-gradient(#fff 0%, transparent);
}
#nav-items {
  width: 90%;
  margin: 0 auto;
  line-height: 80px;
  height: 80px;
  display: flex;
  z-index: 1;
  list-style-type: none;
  position: relative;
}
#nav-items li {
  cursor: default;
  font-size: 18px;
  user-select: none;
  padding: 0 20px;
  transition: 0.5s;
}
#nav-items > li:first-child{
color: rgb(168, 28, 28);
}
#nav-items > li:last-child {
  padding: 0 !important;
}
#nav-items li:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.username ul {
  list-style-type: none;
}
.username ul li {
  height: 30px;
  line-height: 30px;
  color: #000;
}
</style>
