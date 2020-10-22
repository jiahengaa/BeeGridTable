<template>
  <div class="container" id="main">
    <div class="row-fluid" style="margin-bottom: 10px">
      <p class="span12">
        <a
          href="#menu"
          class="side-menu-link btn btn-mini"
          title="Click for sub-menu"
        >
          <i class="icon-th"></i>
        </a>
      </p>
    </div>
    <div style="display: flex; width: 100%">
      <!--Sidebar content-->
      <aside class="well menu" id="side-menu" role="navigation">
        <h2>BeeGridTable</h2>
        <br />
        <ul class="nav nav-list">
          <li class="nav-header">
            <router-link to="/index">总览</router-link>
          </li>
          <li class="nav-header">
            <router-link to="/basic">基础用法</router-link>
          </li>
          <li class="nav-header">
            <router-link to="/zebra-stripe">斑马纹</router-link>
          </li>

          <li class="nav-header">
            <router-link to="/border">带边框</router-link>
          </li>
          <li class="nav-header">
            <router-link to="/custom-style">特定样式</router-link>
          </li>
          <li class="nav-header">
            <router-link to="/highLight">高亮行</router-link>
          </li>
          <li class="nav-header">
            <router-link to="/selection">可选择</router-link>
          </li>
          <li class="nav-header">
            <router-link to="/sort">排序</router-link>
          </li>
          <li class="nav-header">
            <router-link to="/resizable">拖拽调整列宽</router-link>
          </li>
          <li class="nav-header">
            <router-link to="/span-column">行列合并</router-link>
          </li>
          <li class="nav-header">
            <router-link to="/summary">合计</router-link>
          </li>
          <li class="nav-header">
            <router-link to="/group-header">表头分组</router-link>
          </li>
          <li class="nav-header">
            <router-link to="/loading">加载中</router-link>
          </li>
          <li class="nav-header">
            <router-link to="/exportcsv">导出csv</router-link>
          </li>
          <li class="nav-header">
            <router-link to="/expand">可展开</router-link>
          </li>
          <li>Fixed</li>
          <li class="nav-header">
            <router-link to="/fixedHeader">固定表头</router-link>
          </li>
          <li class="nav-header">
            <router-link to="/fixedHeaderL">固定表头左侧列</router-link>
          </li>
          <li class="nav-header">
            <router-link to="/fixedHeaderR">固定表头右侧列</router-link>
          </li>
          <li class="nav-header">
            <router-link to="/fixedHeaderLR">固定表头左侧右侧列</router-link>
          </li>

          <li>筛选</li>
          <li class="nav-header">
            <router-link to="/filter">默认筛选</router-link>
          </li>
          <li class="nav-header">
            <router-link to="/custom-filter-show">隐藏筛选行</router-link>
          </li>
          <li class="nav-header">
            <router-link to="/custom-filter-hidesome">隐藏列筛选项</router-link>
          </li>

          <li class="nav-header">
            <router-link to="/custom-filter">自定义筛选回调</router-link>
          </li>
          <li class="nav-header">
            <router-link to="/custom-filter-ui">自定义筛选UI</router-link>
          </li>

          <li>自定义</li>
          <li class="nav-header">
            <router-link to="/custom-header">自定义表头--模板</router-link>
          </li>
          <li class="nav-header">
            <router-link to="/custom-header-render"
              >自定义表头--render</router-link
            >
          </li>
          <li class="nav-header">
            <router-link to="/custom-column">自定义列--模板</router-link>
          </li>
          <li class="nav-header">
            <router-link to="/custom-column-render"
              >自定义列--render</router-link
            >
          </li>
        </ul>
      </aside>

      <!--Body content-->
      <section class="well content">
        <router-view></router-view>
      </section>
    </div>
  </div>
</template>
<script>
module.exports = {
  data: function () {
    return {};
  },
  mounted: function () {},
  beforeDestroy: function () {},
  methods: {},
};
</script>

<style lang="css">
@import "./routers/tomorrow-night.css";
</style>
<style lang="less">
@import "../src/styles/index.less";
</style>
<style lang="less" scoped>
.container {
  width: 100%;
  display: flex;
  height: 100vh;
  background-color: white;
  .menu {
    width: 200px;
    margin-top: 50px;
    margin-left: 50px;
  }
  .content {
    width: ~"calc(100% - 200px)";
  }
}

.wrap {
  position: relative;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
}
.wrap.active {
  left: 14em;
}

.nav {
  margin-left: 0;
  margin-bottom: 20px;
  list-style: none;
}

.nav-list > li > a,
.nav-list .nav-header {
  margin-right: -15px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
}
.nav-header {
  display: block;
  padding: 3px 15px;
  font-size: 11px;
  font-weight: bold;
  line-height: 20px;
  color: #999999;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
}
</style>