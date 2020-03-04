<template>
  <div class="list">
    <div class="list-title">
      <h3>热门歌单推荐</h3>
    </div>
    <div class="list-items">
      <ul>
        <li v-for="(list, index) in songLists" :key="index" class="item">
          <router-link
            :to="{ name: 'listdetail', params: { listId: listId[index], listName:list.name }}"
          >
            <div class="list-cover">
              <img class="cover-img" :src="list.coverImgUrl" alt />
            </div>
            <div class="text">
              <p class="name" v-html="list.name"></p>
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
      songLists: [],
      listId: []
    };
  },
  created() {},
  mounted() {
    this.getSongList();
  },
  methods: {
    getSongList() {
      Vue.axios
        .get(
          "http://localhost:3000/top/playlist/highquality?before=1503639064232&limit=20"
        )
        .then(response => {
          this.songLists = response.data.playlists;
          for (let i = 0; i < this.songLists.length; i++) {
            var list = this.songLists[i];
            var id = list.id;
            this.listId.push(id);
          }
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
.list {
  margin-top: 80px;
  overflow: hidden;
  margin-bottom: 60px;
}
ul {
  margin: 0 auto;
  padding: 0px;
}
.list-title {
  height: 65px;
  line-height: 65px;
  text-align: center;
  font-size: 20px;
  color: #4e4e4e;
  border-bottom: 2px solid #e5e5e6;
  margin-bottom: 20px;
}
.list-items {
  max-width: 80%;
  margin: auto;
}
.item {
  width: 150px;
  height: auto;
  float: left;
  list-style-type: none;
  padding-left: 50px;
  margin-bottom: 20px;
}
.list-cover {
  width: 150px;
  height: 150px;
  margin-bottom: 5px;
}
.cover-img {
  max-width: 100%;
}
.name {
  margin-bottom: 10px;
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
.list-cover :hover {
  opacity: 0.6;
}
</style>