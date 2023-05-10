<template>
  <div id="login">
    <Nav></Nav>
    <div id="login-main">
      <Login v-show="isLogin" />
      <Register v-show="isRegister" />
    </div>
  </div>
</template>

<script>
import Nav from "../components/nav.vue";
import Login from "../components/login.vue";
import Register from "../components/register.vue";
export default {
  data() {
    return {
      isLogin: true,
      isRegister: false
    };
  },
  methods: {
    checkView() {
      if (location.hash.indexOf("register") > -1) {
        this.isLogin = false;
        this.isRegister = true;
      } else {
        this.isLogin = true;
        this.isRegister = false;
      }
    }
  },
  mounted() {
    this.checkView();
    window.onhashchange = this.checkView();
  },
  components: { Login, Register, Nav }
};
</script>

<style></style>
