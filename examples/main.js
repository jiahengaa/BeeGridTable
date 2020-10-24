/**
 * Created by jiahengaa on 20/8/20.
 */
import "babel-polyfill";
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./app.vue";
// import beeGridTable from "../dist/beegridtable";
// import locale from "../dist/locale/zh-CN";

import beeGridTable from "../src/index";
import locale from "../src/locale/lang/en-US";

Vue.use(VueRouter);
Vue.use(beeGridTable, {
    locale,
    capture: true
});

import Highlight from "./utils/highlight"; // from 路径是highlight.js的路径，纯属自定义
Vue.use(Highlight);

// 开启debug模式
Vue.config.debug = true;

// 路由配置
const router = new VueRouter({
    esModule: false,
    mode: "history",
    routes: [
        {
            path: "/index",
            component: resolve => require(["./routers/index.vue"], resolve)
        },
        {
            path: "/basic",
            component: resolve => require(["./routers/basic.vue"], resolve)
        },
        {
            path: "/zebra-stripe",
            component: resolve =>
                require(["./routers/zebra-stripe.vue"], resolve)
        },
        {
            path: "/border",
            component: resolve => require(["./routers/border.vue"], resolve)
        },
        {
            path: "/custom-style",
            component: resolve =>
                require(["./routers/custom-style.vue"], resolve)
        },
        {
            path: "/fixedHeader",
            component: resolve =>
                require(["./routers/fixedHeader.vue"], resolve)
        },
        {
            path: "/fixedHeaderL",
            component: resolve =>
                require(["./routers/fixedHeaderL.vue"], resolve)
        },
        {
            path: "/fixedHeaderR",
            component: resolve =>
                require(["./routers/fixedHeaderR.vue"], resolve)
        },
        {
            path: "/fixedHeaderLR",
            component: resolve =>
                require(["./routers/fixedHeaderLR.vue"], resolve)
        },
        {
            path: "/highLight",
            component: resolve => require(["./routers/highLight.vue"], resolve)
        },
        {
            path: "/selection",
            component: resolve => require(["./routers/selection.vue"], resolve)
        },
        {
            path: "/sort",
            component: resolve => require(["./routers/sort.vue"], resolve)
        },
        {
            path: "/filter",
            component: resolve => require(["./routers/filter.vue"], resolve)
        },
        {
            path: "/custom-filter",
            component: resolve =>
                require(["./routers/custom-filter.vue"], resolve)
        },
        {
            path: "/custom-filter-show",
            component: resolve =>
                require(["./routers/custom-filter-show.vue"], resolve)
        },
        {
            path: "/custom-filter-hidesome",
            component: resolve =>
                require(["./routers/custom-filter-hidesome.vue"], resolve)
        },
        {
            path: "/custom-filter-ui",
            component: resolve =>
                require(["./routers/custom-filter-ui.vue"], resolve)
        },
        {
            path: "/custom-header",
            component: resolve =>
                require(["./routers/custom-header.vue"], resolve)
        },
        {
            path: "/custom-header-render",
            component: resolve =>
                require(["./routers/custom-header-render.vue"], resolve)
        },
        {
            path: "/custom-column",
            component: resolve =>
                require(["./routers/custom-column.vue"], resolve)
        },
        {
            path: "/custom-column-render",
            component: resolve =>
                require(["./routers/custom-column-render.vue"], resolve)
        },
        {
            path: "/resizable",
            component: resolve => require(["./routers/resizable.vue"], resolve)
        },
        {
            path: "/span-column",
            component: resolve =>
                require(["./routers/span-column.vue"], resolve)
        },
        {
            path: "/summary",
            component: resolve => require(["./routers/summary.vue"], resolve)
        },
        {
            path: "/group-header",
            component: resolve =>
                require(["./routers/group-header.vue"], resolve)
        },
        {
            path: "/loading",
            component: resolve => require(["./routers/loading.vue"], resolve)
        },
        {
            path: "/exportcsv",
            component: resolve => require(["./routers/exportcsv.vue"], resolve)
        },
        {
            path: "/expand",
            component: resolve => require(["./routers/expand.vue"], resolve)
        }
    ]
});

const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount("#app");
