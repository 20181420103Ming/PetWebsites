<template>
  <div id="news" style="display:flex;margin-top:60px">
    <div class="news-sidebar">
      <ul style="list-style:none">
        <li
          style="height:80px;line-height:80px;background-color:#E63F00;font-size:26px;color:#fff;font-weight: 600"
        >
          时事新闻
        </li>
      </ul>
    </div>
    <div class="news-list" style="width:97%">
      <ul style="list-style:none">
        <li
          v-for="(v, i) in news"
          :key="i"
          @click="toContent(v.id)"
          style="transition: .5s;cursor:default;text-align:left;padding:10px 20px;border-bottom:1px solid rgba(0,0,0,.3);height:100px;display:flex;flex-direction:column;justify-content:space-evenly"
        >
          <h3 style="font-size:18px;color:#E63F00">
            {{ v.title
            }}<span
              style="float:right;font-size:14px;position:relative;top:10px;color:black"
              >{{ v.date }}</span
            >
          </h3>
          <p style="text-indent:2em;">
            {{ v.content.substr(0, 100)
            }}<span v-show="v.content.length > 100">...</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      news: null
    };
  },
  methods: {
    getnews() {
      let _this = this;
      this.axios.get("http://localhost:3000/getNewinfo").then(function(res) {
        _this.news = res.data.data;
      });
    },
    toContent(id) {
      this.$router.push(`/list/content?key=news&id=${id}`);
    }
  },
  created() {
    this.getnews();
  }
};
</script>

<style>
.news-sidebar {
  width: 300px;
  min-height: 500px;
}
.news-list li:hover {
  background-color: rgba(0, 0, 0, 0.1);
  border: none !important;
}
</style>
