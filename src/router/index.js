import Vue from "vue";
import Router from "vue-router";
// 这里定义的是路由
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "default",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "index",
      meta: { title: "首页" },
      component: () => import("@/views/Index.vue"),
      children: [
        {
          path: "",
          name: "index-default"
        }
      ]
    },
    {
      path: "/list",
      name: "List",
      meta: { title: "列表页" },
      component: () => import("@/views/List.vue"),
      children: [
        {
          path: "content",
          name: "content",
          component: () => import("@/components/list-content.vue")
        },
        {
          path: "active",
          name: "Active",
          component: () => import("@/components/active.vue")
        },
        {
          path: "notice",
          name: "notice",
          component: () => import("@/components/notice.vue")
        },
        {
          path: "news",
          name: "news",
          component: () => import("@/components/news.vue")
        },
        {
          path: "dog",
          name: "dog",
          component: () => import("@/components/dog.vue")
        },
        {
          path: "cat",
          name: "cat",
          component: () => import("@/components/cat.vue")
        }
      ]
    },
    {
      path: "/life",
      name: "show_pet",
      component: () => import("@/views/ShowPet.vue")
    },
    {
      path: "/login",
      component: () => import("@/views/Login.vue")
    },
    {
      path: "/adopt",
      component: () => import("@/views/Adopt.vue")
    }
  ]
});

export default router;
