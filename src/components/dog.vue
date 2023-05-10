<template>
  <div id="dog" style="display:flex;margin-top:60px">
    <div class="dog-sidebar">
      <ul style="list-style:none">
        <li
          style="height:80px;line-height:80px;background-color:#5555FF;font-size:26px;color:#fff;"
        >
          狗狗百科
        </li>
      </ul>
    </div>
    <div class="dog-list" style="width:97%">
      <ul style="list-style:none">
        <li
          v-for="(v, i) in dog"
          :key="i"
          @click="toContent(v.id)"
          style="transition: .5s;cursor:default;text-align:left;padding:10px 20px;border-bottom:1px solid rgba(0,0,0,.3);height:100px;display:flex;flex-direction:column;justify-content:space-evenly"
        >
          <h3 style="font-size:18px;color:#5555FF">
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
      dog: null
    };
  },
  methods: {
    getdog() {
      let _this = this;
      this.axios.get("http://localhost:3000/getdogs").then(function(res) {
        _this.dog = res.data.data;
      });
    },
    toContent(id) {
      this.$router.push(`/list/content?key=dog&id=${id}`);
    }
  },
  created() {
    this.getdog();
  }
};
</script>

<style>
.dog-sidebar {
  width: 300px;
  min-height: 500px;
}
.dog-list li:hover {
  background-color: rgba(0, 0, 0, 0.1);
  border: none !important;
}
</style>
