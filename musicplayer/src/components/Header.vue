<template>
  <div class="head">
    <el-menu
      background-color="#2e2b2b"
      text-color="#fff"
      active-text-color="#ffd04b"
      class="nav"
      mode="horizontal"
    >
      <el-menu-item class="nav-item" index="1">
        <router-link to="/songlist">推荐歌单</router-link>
      </el-menu-item>
      <el-menu-item class="nav-item" index="2">
        <router-link to="/singerlist">歌手列表</router-link>
      </el-menu-item>
    </el-menu>
    <!-- <ul class="nav">
      <li class="nav-item">
        <router-link to="/songlist">推荐歌单</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/singerlist">歌手</router-link>
      </li>
    </ul>-->
  </div>
</template>

<script>
export default {};
</script>

<style>
.head {
  margin: 0 auto;
  width: 100%;
  /* position: fixed; */
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  top: 0;
}
.nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style-type: none;
  color: #2e2b2b;
  /* position: fixed;
  overflow: hidden;
  z-index: 999; */
}
.nav-item {
  margin: 10px;
}
</style>