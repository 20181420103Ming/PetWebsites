<template>
  <div id="active" style="display:flex;margin-top:60px">
    <div class="active-sidebar">
      <ul style="list-style:none">
        <li
          style="height:80px;line-height:80px;background-color:#FF3333;font-size:26px;color:white;font-weight: 600"
        >
          宠物活动
        </li>
      </ul>
    </div>
    <div class="active-list" style="width:97%">
      <ul style="list-style:none">
        <li
          v-for="(v, i) in actives"
          :key="i"
          style="transition: .5s;cursor:default;text-align:left;padding:10px 20px;border-bottom:1px solid rgba(0,0,0,.3);height:100px;display:flex;flex-direction:column;justify-content:space-evenly"
        >
          <h3  @click="toContent(v.id)" style="font-size:18px;color:#FF3333">
            {{ v.title
            }}<span
              style="float:right;font-size:14px;position:relative;top:10px;color:black"
              >{{ v.date }}</span
            >
          </h3>
          <p style="text-indent:2em;">
            {{ v.content.substr(0, 100)
            }}<span v-show="v.content.length > 100">...</span>
            <button style="width:80px;color:white;background:#FF3333;float:right;z-index:100; border:none;border-radius:10px;font-size:14px;" @click="bao_show">我要报名</button>
          </p>
        </li>
      </ul>
    </div>
     <div v-show="to_show" class="bao-content">
     <div class="close" style="float:right;width:30px;height:20px;background:red" @click="close_bao">X</div>
     <form class="form-horizontal" role="form">
     <div class="form-group">
      <span for="lastname" class="col-sm-2 control-label">选择活动名称：</span>
  <select style="width:60%;height:30px" name="activities" id="act">
  <option v-for="(v, i) in actives"
          :key="i" value="1" >{{v.title}}</option></select>
     </div>
  <div class="form-group">
    <span for="lastname" class="col-sm-2 control-label">报名人：</span>
    <div style="display:inline-block" class="col-sm-6">
      <input type="text" class="form-control"  v-model="value1" id="lastname" placeholder="请输入姓名" >
    </div>
     <div class="form-group">
    <span for="firstname" class="col-sm-2 control-label">电话：</span>
    <div style="display:inline-block" class="col-sm-6">
      <input type="text" class="form-control" v-model="value2" id="firstname" placeholder="请输入电话">
    </div>
  </div>
  </div>
  <div class="form-group">
    <div style="margin-left:8%" class="col-sm-offset-2 col-sm-10">
      <button style="background:#FF3333;width:30%;color:white;margin-bottom:20px" type="submit" class="btn btn-default" @click="bao_min">报名</button>
    </div>
  </div>
</form>
     </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      actives: null,
      to_show:false,
      value1:'',
        value2:'',
      user:localStorage.getItem("username")
    };
  },
  methods: {
    getactive() {
      let _this = this;
      this.axios.get("http://localhost:3000/getactive").then(function(res) {
        _this.actives = res.data.data;
      });
    },
    toContent(id) {
      this.$router.push(`/list/content?key=active&id=${id}`);
    },
    bao_show(){
      this.to_show=true
    },
    close_bao(){
 this.to_show=false
    },
    bao_min(){
      //var select_text=document.querySelector('select').text();
       const params = {
        title:"",
        bao_name: this.value1,
        date: this.value2,
      };
      if (!!localStorage.getItem("username")) {
        if(this.value1!=""&&this.value2!=""){
           this.axios
          .get("http://localhost:3000/baomin", params, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          })
          .then((res) => {
            if (res.data.status == -1) {
              this.$Message.error(res.data.msg);
            } else {
               this.$Message.info('报名成功！')
            }
          });
       
        setTimeout(() => {
                  this.to_show=false
                }, 1500);
      }else{
       this.$Message.info('报名失败！请完善信息')
      }
      } else {
        this.$Message.error("请先登录");
      }
     //console.log(this.value2)
     
      
    }
  },
  created() {
    this.getactive();
  }
};
</script>

<style>
.active-sidebar {
  width: 300px;
  min-height: 500px;
}
.active-list li:hover {
  background-color: rgba(0, 0, 0, 0.1);
  border: none!important;
}
.form-group{
  margin-top: 20px;
  justify-content: left;
  align-items: center;
}
.bao-content{
  width:35%;
  background:#c5c1c1;
  position: fixed;
  z-index:100;
  top: 20%;
  left: 35%;
}
.close:hover{
  color: white;
  cursor: pointer;
}

</style>
