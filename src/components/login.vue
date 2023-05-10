<template>
  <div id="login-container">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="mail">
        <Input type="email" v-model="formInline.mail" placeholder="Email"
          ><Icon type="ios-mail-outline" slot="prepend"></Icon
        ></Input>
      </FormItem>
      <FormItem prop="password">
        <Input
          type="password"
          v-model="formInline.password"
          placeholder="Password"
        >
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">登录</Button
        ><span style="cursor:default;" @click="toRegister">点击注册</span>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        mail: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "请输入邮箱！",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
          },
          { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码最少为六位字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const params = {
            email: this.formInline.mail,
            password: this.formInline.password
          };
          this.axios
            .get("http://localhost:3000/login", { params })
            .then(res => {
              if (res.data.status == -1) {
                this.$Message.error(res.data.msg);
              } else {
                localStorage.setItem("username", res.data.userInfo.name);
                localStorage.setItem("usermail", res.data.userInfo.mail);
                this.$Message.success("登录成功！");
                setTimeout(() => {
                  this.$router.push("/index");
                }, 1500);
              }
            });
        } else {
          this.$Message.error("请确保输入了正确的邮箱和密码");
        }
      });
    },
    toRegister() {
      this.$router.push("login?register=true");
      location.reload();
    }
  }
};
</script>
<style>
#login-container {
  position: absolute;
  top: 60%;
  left: 50%;
  width: 50vw;
  height: 60vh;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
#login-container form {
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 30%;
}
.ivu-input-wrapper,
.ivu-input-wrapper input {
  height: 40px;
  margin-bottom: 40px;
}
#login-container .ivu-btn {
  width: 100%;
  height: 40px;
}
</style>
