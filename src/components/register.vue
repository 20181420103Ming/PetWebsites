<template>
  <div id="register-container">
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="80"
    >
      <FormItem label="用户名" prop="name">
        <Input
          v-model="formValidate.name"
          placeholder="请输入您的用户名"
        ></Input>
      </FormItem>

      <FormItem label="邮箱" prop="mail">
        <Input v-model="formValidate.mail" placeholder="请输入您的邮箱"></Input>
      </FormItem>

      <FormItem label="验证码" prop="code">
        <Input
          v-model="formValidate.code"
          placeholder="请输入验证码"
          style="width:80%"
        ></Input>
        <Button
          type="primary"
          @click="sendCode(formValidate.mail)"
          style="width:18%;height:38px"
          :disabled="isSend"
          >发送验证码</Button
        >
      </FormItem>

      <FormItem label="密码" prop="passwd">
        <Input
          type="password"
          v-model="formValidate.passwd"
          placeholder="请输入密码"
        ></Input>
      </FormItem>

      <FormItem label="确认密码" prop="passwdCheck">
        <Input
          type="password"
          v-model="formValidate.passwdCheck"
          placeholder="请再次输入密码"
        ></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')"
          >注册</Button
        >
        <Button @click="handleReset('formValidate')" style="margin-left: 8px"
          >重置</Button
        >
        <Button @click="toLogin" style="margin-left: 8px">返回登录</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      } else {
        const reg = /^[a-zA-Z0-9]{4,16}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(
            new Error("请输入正确的用户名格式（4-16位大小写字母或数字）")
          );
        }
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("邮箱不能为空"));
      } else {
        if (this.formValidate.mail !== "") {
          const reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
          if (reg.test(value)) {
            this.isEmailTrue = true;
            callback();
          } else {
            this.isEmailTrue = false;
            callback(new Error("请输入正确的邮箱 "));
          }
        }
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        if (this.formValidate.passwd !== "") {
          const reg = /^[a-zA-Z0-9]{6,16}$/;
          if (reg.test(value)) {
            callback();
          } else {
            callback(
              new Error("请输入正确的密码格式(6-16位大小写字母或数字)")
            );
          }
        }
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formValidate.passwd) {
        callback(new Error("两次输入密码不匹配！"));
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
      if (!Number(value)) {
        callback(new Error("验证码必须为数字"));
      } else {
        if (value.toString().length != 6) {
          callback(new Error("验证码为六位数字"));
        } else {
          if (value != this.vcode) {
            callback(new Error("验证码错误"));
          } else {
            callback();
          }
        }
      }
    };
    return {
      isEmailTrue: false,
      isSend: false,
      vcode: null,
      formValidate: {
        name: "",
        mail: "",
        code: "",
        passwd: "",
        passwdCheck: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            validator: validateUsername,
            trigger: "blur"
          }
        ],
        mail: [{ required: true, validator: validateEmail, trigger: "blur" }],
        code: [{ required: true, validator: validateCode, trigger: "blur" }],
        passwd: [{ required: true, validator: validatePass, trigger: "blur" }],
        passwdCheck: [
          { required: true, validator: validatePassCheck, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const params = {
            username: this.formValidate.name,
            email: this.formValidate.mail,
            password: this.formValidate.passwd,
            registertime: Date.now()
          };
          this.axios
            .get("http://localhost:3000/register", { params })
            .then(res => {
              console.log(res);
              if (res.data.status == -1) {
                this.$Message.error(res.data.msg);
              } else {
                this.$Message.success("注册成功，即将前往登录页面");
                setTimeout(() => {
                  this.$router.push(`/login?login=true`);
                  location.reload();
                }, 1500);
              }
            });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    sendCode(mail) {
      if (this.isEmailTrue) {
        this.isSend = true;
        this.axios
          .get(`http://localhost:3000/mailcode?email=${mail}`)
          .then(res => {
            if (res.data.status == -1) {
              this.$Message.error(res.data.msg);
              this.isSend = false;
            } else {
              this.vcode = res.data;
            }
          });
      }
    },
    toLogin() {
      this.$router.push(`/login?login=true`);
      location.reload();
    }
  }
};
</script>
<style scoped>
.ivu-form-item {
  margin-bottom: 44px;
}
.ivu-input-wrapper {
  margin-bottom: 0;
}
#register-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50vw;
  height: 60vh;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
#register-container form {
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 30%;
}
</style>
