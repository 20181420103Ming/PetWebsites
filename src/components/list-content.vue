<template>
  <div class="list-content">
    <h2 style="color:brown;margin-top:1%">{{ data.title }}</h2>
    <h4
      style="width:400px;margin:0 auto;display:flex;justify-content:space-between;margin-top:10px;"
    >
      <span>作者：{{ data.author }}</span
      ><span>日期：{{ data.date }}</span>
    </h4>
    <p
      style="text-align:left;text-indent:2em;width:80%;margin:0 auto;margin-top:30px;line-height:25px;letter-spacing:1px;"
    >
      {{ data.content }}
    </p>
      <img :src="data.img" alt="" style="width:60%;height:40%" />
      <p
      style="text-align:left;text-indent:2em;width:80%;margin:0 auto;margin-top:30px;line-height:25px;letter-spacing:1px;"
    >
      {{ data.content2 }}
    </p>
    <div style="margin-top:40px">
    <h5 style="padding-right:10%;display:inline-block"><span style="color:brown;padding-left:20px">{{data.adress}}</span></h5>
    <h5 style="padding-left:10%;display:inline-block"><span style="color:brown;padding-left:20px">{{data.tel}}</span></h5>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      key: "",
      id: -1,
      api: ""
    };
  },
  methods: {
    getData() {
      let urlSearch = location.hash.substr(1, location.hash.length);
      const searchParams = new URLSearchParams(urlSearch);
      let search_values = [];
      for (let k of searchParams.values()) {
        search_values.push(k);
      }
      [this.key, this.id] = search_values;
      switch (this.key) {
        case "active":
          this.api = "http://localhost:3000/getactive";
          break;
        case "notice":
          this.api = "http://localhost:3000/getnotice";
          break;
        case "news":
          this.api = "http://localhost:3000/getNewInfo";
          break;
        case "dog":
          this.api = "http://localhost:3000/getdogs";
          break;
        case "cat":
          this.api = "http://localhost:3000/getcats";
          break;
      }
      let _that = this;
      this.axios.get(this.api).then(function(res) {
        _that.data = res.data.data[_that.id - 1];
      });
    }
  },
  created() {},
  mounted() {
    this.getData();
  }
};
</script>

<style></style>
