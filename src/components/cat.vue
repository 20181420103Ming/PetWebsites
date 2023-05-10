<template>
  <div id="cat" style="display:flex;margin-top:60px">
    <div class="cat-sidebar">
      <ul style="list-style:none">
        <li
          style="height:80px;line-height:80px;background-color:#CC00CC;font-size:26px;color:#fff;"
        >
          猫猫百科
        </li>
      </ul>
    </div>
    <div class="cat-list" style="width:97%">
      <ul style="list-style:none">
        <li
          v-for="(v, i) in cat"
          :key="i"
          @click="toContent(v.id)"
          style="transition: .5s;cursor:default;text-align:left;padding:10px 20px;border-bottom:1px solid rgba(0,0,0,.3);height:100px;display:flex;flex-direction:column;justify-content:space-evenly"
        >
          <h3 style="font-size:18px;color:#CC00CC">
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
      cat: null
    };
  },
  methods: {
    getcat() {
      let _this = this;
      this.axios.get("http://localhost:3000/getcats").then(function(res) {
        _this.cat = res.data.data;
      });
    },
    toContent(id) {
      this.$router.push(`/list/content?key=cat&id=${id}`);
    }
  },
  created() {
    this.getcat();
  }
};
</script>

<style>
.cat-sidebar {
  width: 300px;
  min-height: 500px;
}
.cat-list li:hover {
  background-color: rgba(0, 0, 0, 0.1);
  border: none !important;
}
</style>
