<template>
  <div id="show-pet" style="background-color: rgba(0, 0, 0, 0.1)">
    <div class="sh-head" style="width: 100%">
      <Nav></Nav>
      <img
        src="../../static/showpet_banner.png"
        alt=""
        style="width: 100%; height: 300px"
      />
    </div>
    <div
      class="sh-main"
      style="
        width: 80%;
        margin: 0 auto;
        min-height: 500px;
        background-color: #fff;
        padding-bottom: 30px;
      "
    >
      <div
        class="sh-main-p"
        style="border-bottom: 1px dashed #000; padding-bottom: 20px"
      >
        <div
          class="sh-main-p-upload"
          style="
            display: flex;
            flex-wrap: wrap;
            width: 80%;
            margin: 0 auto;
            justify-content: space-between;
          "
        >
          <Input
            v-model="input_txt"
            maxlength="400"
            show-word-limit
            type="textarea"
            placeholder="说点什么吧..."
            style="
              width: 100%;
              height: 120px;
              margin-top: 20px;
              margin-bottom: 10px;
            "
          />
          <input
            ref="upload_img"
            type="file"
            name=""
            id="upload-image"
            accept=".jpg,.png,.jpeg"
             mutiple="mutiple"
            multiple
          />
          <div
            class="submit-upload"
            style="
            background:aqua;
            cursor: pointer;
              width: 100px;
              height: 30px;
              border: 1px solid #333;
              line-height: 30px;
              border-radius: 13px;
              curosr: default;
              user-select: none;
            "
            @click="submit()"
          >
            发表
          </div>
        </div>
      </div>
      <div class="sh-main-container">
        <div class="card" v-for="(v, i) in cards" :key="i">
          <div
            class="c-top"
            style="
              width: 100%;
              height: 60px;
              border-bottom: 1px solid #333;
              position: relative;
            "
          >
            <div
              class="c-name"
              style="position: absolute; left: 10px; font-size: 25px"
            >
              {{ v.user }}
            </div>
            <div
              class="c-date"
              style="position: absolute; left: 10px; top: 35px; color: #333"
            >
              {{ v.date }}
            </div>
          </div>
          <div
            class="c-con"
            style="text-align: left; width: 100%; padding: 10px 10px"
          >
            {{ v.txt }}
          </div>
          <div
            v-show="v.have_img == 'true'"
            class="c-img"
            style="overflow: hidden; padding: 10px 10px 0"
          >
            <img
              :src="v.img"
              alt=""
              srcset=""
              style="width: 100px; height: 100px; float: left"
            />
          </div>
          <p
            v-show="v.pinlun_show"
            style="width: 80%; text-align: left"
            class="pinlun"
          >
            symm:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ v.pl }}
          </p>
          <div style="margin-top: 10px">
            <form role="form" style="width: 85%; display: inline-block">
              <div class="form-group">
                <input
                v-model="v.pl"
                  style="height: 30px"
                  type="text"
                  class="form-control"
                  placeholder="写下您的评论...."
                />
              </div>
            </form>
            <button
              style="border: none; border-radius: 5px; margin-left: 5px"
              @click="tosend(i)"
            >
              发送
            </button>
            <img
              v-show="v.whi_show"
              class="zan-img"
              style="
                width: 25px;
                height: 25px;
                float: right;
                margin-right: 10px;
                cursor: pointer;
                margin-top: 0px;
              "
              src="../assets/zan.png"
              alt=""
              @click="love(i)"
            />
            <img
              v-show="v.red_show"
              class="zan-img"
              style="
                width: 25px;
                height: 25px;
                float: right;
                margin-right: 10px;
                cursor: pointer;
              "
              src="../assets/zan2.png"
              alt=""
              @click="no_love(i)"
            />
          </div>
        </div>
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
      whi_show: true,
      red_show: false,
      pinlun_show: false,
      input_txt: "",
      filereader: new FileReader(),
      cards: [],
    };
  },
  methods: {
    tosend(i) {
       const params = {
        username: localStorage.getItem("username"),
      };
      if (!!localStorage.getItem("username")) {
         this.cards[i].pinlun_show = true;
      } else {
        this.$Message.error("请先登录");
      }
    },
    love(id) {
      this.cards[id].whi_show = false
      this.cards[id].red_show = true
    },
    no_love(id) {
      this.cards[id].whi_show = true
      this.cards[id].red_show = false
    },
    //将选择的图片转化为base64
    getBase64() {
      const up = this.$refs.upload_img;
      up.addEventListener("change", () => {
        this.filereader.readAsDataURL(up.files[0]);
      });
    },
    submit() {
      const params = {
        username: localStorage.getItem("username"),
        txt: this.input_txt,
        img: this.filereader.result,
        date: new Date(),
      };
      if (!!localStorage.getItem("username")) {
        this.axios
          .post("http://localhost:3000/addShowpet", params, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          })
          .then((res) => {
            if (res.data.status == -1) {
              this.$Message.error(res.data.msg);
            } else {
              this.input_txt = "";
              this.getCards();
            }
          });
      } else {
        this.$Message.error("请先登录");
      }
    },
    getCards() {
      this.axios.get("http://localhost:3000/getshowpetdata").then((res) => {
        res.data.data.forEach(el=>{
          el.red_show = false
          el.whi_show = true
          el.pl = ''
          el.pinlun_show = false
        })
        this.cards = res.data.data.reverse();
      });
    },
  },
  mounted() {
    this.getBase64();
  },
  created() {
    this.getCards();
  },
};
</script>

<style>
.ivu-input-wrapper textarea {
  height: 120px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
#upload-image {
  height: 30px;
  position: relative;
}
#upload-image::before {
  cursor: pointer;
  content: url(../assets/bendi.png);
  position: absolute;
  height: 40px;
  width: 80px;
  padding: 3px 20px;
  top: -8px;
  left: 0;
  background-color:rgb(255, 255, 255);
 
}
.submit-upload:hover {
  border-color: #57a3f3 !important;
}
.sh-main-container {
  padding-top: 20px;
  width: 80%;
  margin: 0 auto;
}
.sh-main-container .card {
  width: 90%;
  margin: 0 auto 40px;
  background-color: rgba(214, 214, 214, 0.418);
  padding-bottom: 10px;
}
</style>
