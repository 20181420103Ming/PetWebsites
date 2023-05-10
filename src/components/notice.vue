<template>
  <div id="notice" style="display:flex;margin-top:60px">
    <div class="notice-sidebar">
      <ul style="list-style:none">
        <li
          style="height:80px;line-height:80px;background-color:#FFBB00;font-size:26px;color:white;font-weight: 600"
        >
          养宠须知
        </li>
      </ul>
    </div>
    <div class="notice-list" style="width:97%">
      <ul style="list-style:none">
        <li
          v-for="(v, i) in notices"
          :key="i"
          @click="toContent(v.id)"
          style="transition: .5s;cursor:default;text-align:left;padding:10px 20px;border-bottom:1px solid rgba(0,0,0,.3);height:100px;display:flex;flex-direction:column;justify-content:space-evenly"
        >
          <h3 style="font-size:18px;color:#FFBB00">
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
      notices: null
    };
  },
  methods: {
    getnotice() {
      let _this = this;
      this.axios.get("http://localhost:3000/getnotice").then(function(res) {
        _this.notices = res.data.data;
      });
    },
    toContent(id) {
      this.$router.push(`/list/content?key=notice&id=${id}`);
    }
  },
  created() {
    this.getnotice();
  }
};
</script>

<style>
.notice-sidebar {
  width: 300px;
  min-height: 500px;
}
.notice-list li:hover {
  background-color: rgba(0, 0, 0, 0.1);
  border: none!important;
}
</style>
