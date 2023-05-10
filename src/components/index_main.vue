<template>
  <div id="main">
    <!-- 时事新闻 -->
    <div style="height:600px;overflow:hidden" class="newinfo">
      <h3 style="color:white;font-weight:600;cursor: pointer;" @click="toRouter('/list/news')">时事新闻</h3>
      <ul class="newinfo-con">
        <li
          v-for="(v, i) in newInfoData"
          :key="i"
          :data-id="v.id"
          @click="toContent('news', v.id)"
        >
          <h4>
            {{ v.date }}—
            <a>{{ v.title }}</a>
          </h4>
          <p>{{ v.content.substr(0, 100) }}...</p>
        </li>
      </ul>
    </div>
    <!-- 趣图 -->
    <div class="photos">
      <h3>趣图</h3>
      <div class="photos-con" style="overflow:hidden">
        <Icon
          type="ios-arrow-back"
          size="40"
          style="float:left;height:300px;line-height:300px;"
          @click="prevPhoto"
        />
        <div class="photo-views">
          <div class="photo-view" v-for="(v, i) in photos" :key="i">
            <img :src="v.photo" alt="" srcset="" />
            <h4>{{ v.title }}</h4>
          </div>
        </div>
        <Icon
          type="ios-arrow-forward"
          size="40"
          style="float:right;height:300px;line-height:300px;"
          @click="nextPhoto"
        />
      </div>
    </div>
    <!-- 百科 -->
    <!-- 狗狗百科 -->
    <section
      style="width:100%;min-height:280px;display:flex;justify-content:space-around;margin-top:40px"
    >
      <div
        class="dog"
        style="width:48%;min-height:250px;max-height:400px;border:1px solid #fff;color:#fff;text-align:left;padding:20px 0"
      >
        <h4 style="padding:0 20px">狗狗百科</h4>
        <router-link
          to="/list/dog"
          style="color:#fff;float:right;margin-top:-15px;margin-right:20px;font-size:12px"
          >更多>></router-link
        >
        <hr style="margin-top:10px" />
        <ul>
          <li v-for="(v, i) in dogs" :key="i" @click="toContent('dog',v.id)">
            <a
              >{{ v.title }}
              <span style="float:right;font-size:12px">{{ v.date }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div
        class="cat"
        style="width:48%;min-height:250px;max-height:400px;border:1px solid #fff;color:#fff;text-align:left;padding:20px 0"
      >
        <h4 style="padding:0 20px">猫猫百科</h4>
        <router-link
          to="/list/cat"
          style="color:#fff;float:right;margin-top:-15px;margin-right:20px;font-size:12px"
          >更多>></router-link
        >
        <hr style="margin-top:10px" />
        <ul>
          <li v-for="(v, i) in cats" :key="i" @click="toContent('cat',v.id)">
            <a
              >{{ v.title }}
              <span style="float:right;font-size:12px">{{ v.date }}</span>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- 宠物大全 -->
    <section class="pets">
      <h3><a href="https://www.ichong123.com/gougou" style="text-decoration: none;color:white">宠物大全</a>
      <Select
        placeholder="请选择宠物种类"
        v-model="type"
        @on-change="getpets()"
        style="width:300px;"
      >
      <Option value="">全部</Option>
        <Option v-for="item in types" :value="item" :key="item">{{
          item
        }}</Option>
      </Select>
      </h3>
      
      <!-- <router-link to="/">更多>></router-link> -->
      <div class="pets-con">
      <div class="demo-scroll-top" ref="scroll">
        <div  class="pet-container">
          <div  class="pet" v-for="(v, i) in pets" :key="i">
            <img :src="v.img" alt="" srcset="" />
            <h4>{{ v.name }}</h4>
            <p>
              {{ v.info.substr(0, 100)
              }}<span v-show="v.info.length > 100">...</span>
            </p>
          </div>
        </div>
         </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newInfoData: null,
      photos: null,
      pets: null,
      dogs: null,
      cats: null,
       type: "",
      types: []
    };
  },
  methods: {
    toContent(router, id) {
      this.$router.push(`/list/content?key=${router}&id=${id}`);
      window.scrollTo(0,0)
    },
    getNewInfo() {
      let _this = this;
      this.axios.get("http://localhost:3000/getNewinfo").then(function(res) {
        _this.newInfoData = res.data.data;
      });
    },
 toRouter(router) {
      this.$router.push(router);
    },
    getphotos() {
      let _this = this;
      this.axios.get("http://localhost:3000/getphotos").then(function(res) {
        _this.photos = res.data.data;
      });
    },
    //切换图片逻辑：
    //切换下一张时把第一张添加到数组末尾，并移除第一张，切换上一张则反之
    nextPhoto() {
      this.photos.push(this.photos[0]);
      this.photos.shift();
    },
    prevPhoto() {
      this.photos.unshift(this.photos[this.photos.length - 1]);
      this.photos.pop();
    },
   getpets() {
      let _this = this;
      this.axios
        .get("http://localhost:3000/getpets?type=" + this.type)
        .then(res => {
          this.pets = res.data.data;
          this.pets.forEach(el => {
            console.log(el);
            this.types.push(el.type);
          });
          this.types = Array.from(new Set(_this.types));
          console.log(this.types);
        });
    },
    getdogs() {
      let _this = this;
      this.axios.get("http://localhost:3000/getdogs").then(function(res) {
        _this.dogs = res.data.data.slice(0, 4);
      });
    },
    getcats() {
      let _this = this;
      this.axios.get("http://localhost:3000/getcats").then(function(res) {
        _this.cats = res.data.data.slice(0, 4);
      });
    }
  },
  created() {
    this.getNewInfo();
    this.getphotos();
    this.getpets();
    this.getdogs();
    this.getcats();
  }
};
</script>

<style scoped>
#main {
  width: 90%;
  min-height: 500px;
  margin: 0 auto;
}
#main > div {
  width: 100%;
  min-height: 300px;
  color: #fff;
  text-align: left;
  margin-top: 30px;
}
.newinfo h3,
.photos h3,
.pets h3 {
  text-align: left;
  font-size: 20px;
  padding-left: 10px;
  user-select: none;
}
.newinfo-con,
.photos-con,
.pets-con {
  width: 100%;
  list-style-type: none;
  border-top: 1px solid #fff;
}
.newinfo-con {
  padding-top: 20px;
}
 .demo-scroll-top{
        height: 800px;
        width: 100%;
        overflow-x: hidden;
    }
.newinfo-con li {
  margin-bottom: 10px;
}
.newinfo-con a {
  text-decoration: none;
}
.newinfo-con h4 {
  padding: 0 20px;
  font-size: 18px;
  font-weight: 800;
   color: rgb(254, 250, 250);
}
.newinfo-con p {
  padding: 0 40px;
  line-height: 26px;
  text-indent: 2em;
}
.photos i:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
.photos-con {
  display: flex;
  justify-content: space-between;
}
.photo-views {
  display: flex;
  width: 1200px;
  overflow: hidden;
}
.photo-view {
  margin: 0 20px;
  position: relative;
}
.photo-view,
.photo-view img {
  width: 360px;
  height: 300px;
  transition: 0.5s;
}

.photo-view h4 {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  letter-spacing: 3px;
  user-select: none;
  transition: 0.5s;
}
.photo-view h4:hover {
  font-size: 16px;
}
.pet {
  width: 230px;
  margin: 0 12px 20px;
}
.pets {
  color: #fff;
  margin-top: 50px;
}
.pets-con {
  width: 100%;
}
.pet-container {
  width: 1300px;
  margin: 0 auto;
  margin-left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 20px;
}
.pet img {
  width: 230px;
  height: 230px;
}
.pet p {
  text-indent: 2em;
}
.pets > a {
  float: right;
  color: rgba(255, 255, 255, 0.685);
  position: relative;
  top: -20px;
}
.pets > a:hover {
  color: #fff;
}
.dog ul,
.cat ul {
  list-style-type: disc;
  width: 90%;
  margin: 0 auto;
  padding: 20px 0;
}
.dog li,
.cat li {
  line-height: 3;
}
.dog a,
.cat a {
  color: #fff;
}
</style>
