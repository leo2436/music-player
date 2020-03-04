<template>
  <div class="singer-list">
    <div class="singer-title">
      <h3>歌手列表</h3>
    </div>
    <div class="singer-items">
      <ul>
        <li @click="sendDetail" v-for="(singer, index) in singers" :key="index" class="list-singer">
          <router-link
            :to="{ name: 'singerdetail', params: {listName:singer.name, listId: singer.id, picUrl: singer.picUrl} }"
          >
            <div :id="index" class="cover">
              <img class="cover-img" :src="singer.picUrl" alt />
            </div>
            <div :id="index" class="singer-text">
              <p class="singer-name">{{ singer.name }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      singers: []
    };
  },
  created() {
    this.getSongList();
  },
  methods: {
    sendDetail() {
      console.log("id", event.target.id);
    },
    getSongList() {
      Vue.axios
        .get("http://localhost:3000/artist/list?cat=1001")
        .then(response => {
          this.singers = response.data.artists;
          console.log("this.singers: ", this.singers);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
* {
  margin: 0;
  border: 0;
}
.singer-list {
  max-width: 100%;
  height: auto;
  margin-top: 80px;
  overflow: hidden;
  margin-bottom: 60px;
}
.singer-title {
  height: 65px;
  line-height: 65px;
  text-align: center;
  font-size: 20px;
  color: #4e4e4e;
  border-bottom: 2px solid #e5e5e6;
  margin-bottom: 20px;
}
.singer-items {
  max-width: 75%;
  height: auto;
  margin: 0 auto;
  border-left: 1px solid;
}
.list-singer {
  width: 150px;
  height: auto;
  float: left;
  list-style-type: none;
  margin-left: 50px;
  margin-bottom: 20px;
}
.singer-name {
  color: black;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
.cover {
  height: 120px;
  margin-bottom: 5px;
}
.cover-img {
  max-width: 100%;
}
.cover :hover {
  opacity: 0.6;
}
</style>