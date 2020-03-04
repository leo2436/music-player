<template>
  <div class="song-list">
    <div class="list-info">
      <div class="list-info-cover">
        <img class="list-info-cover-img" :src="this.picUrl" alt />
      </div>
      <div class="list-info-title">
        <h4>{{this.$route.params.listName}}</h4>
        <div class="list-tag">
          <span>标签：</span>
          <el-tag type="info" class="etag" v-for="(tag,index) in tags" :key="index">{{ tag }}</el-tag>
        </div>
        <div class="list-desc">
          <p>介绍：{{ listDesc }}</p>
        </div>
      </div>
    </div>
    <div class="music-list">
      <table cellspacing="0">
        <thead class="table-head">
          <tr>
            <th id="id-song-title">歌曲标题</th>
            <th id="id-song-singer">歌手</th>
            <th id="id-song-album">专辑</th>
          </tr>
        </thead>
        <tbody music-table>
          <tr
            @dblclick="playListMusic"
            v-for="(track,index) in listSongTracks"
            :key="index"
            :id="track.id"
            class="music-info"
          >
            <td>
              <div :id="track.id" class="track-name">{{ track.name }}</div>
            </td>
            <td>
              <div :id="track.id" class="singer-name">{{ track.ar[0].name }}</div>
            </td>
            <td>
              <div :id="track.id" class="album-name">{{ track.al.name }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      listSongTracks: [],
      picUrl: "",
      tags: [],
      listDesc: ""
    };
  },
  beforeMount() {
    this.getListSongs();
  },
  methods: {
    getListSongs() {
      var id = this.$route.params.listId;
      var url = "http://localhost:3000/playlist/detail?id=" + id;
      console.log("url: ", url);
      Vue.axios
        .get(url)
        .then(response => {
          console.log("response: ", response.data);
          this.listSongTracks = response.data.playlist.tracks;
          this.picUrl = response.data.playlist.coverImgUrl;
          this.tags = response.data.playlist.tags;
          this.listDesc = response.data.playlist.description;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    playListMusic(event) {
      var id = event.target.id;
      console.log("id: ", id);
      var src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
      this.$store.commit("pushSrc", src);
    }
  }
};
</script>

<style>
.song-list {
  max-width: 80%;
  margin: 0 auto;
  margin-top: 80px;
  overflow: hidden;
  margin-bottom: 60px;
}
.list-info {
  max-width: 60%;
  max-height: 200px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.list-info-title {
  display: flex;
  flex-direction: column;
  max-width: 100%;
}
.list-tag {
  margin-top: 10px;
  margin-bottom: 10px;
}
.etag {
  margin-right: 5px;
}
.list-desc {
  max-width: 100%;
  word-break: break-all;
  overflow: auto;
}
.list-info-cover {
  max-width: 40%;
  min-width: 35%;
  border-radius: 5%;
  margin-right: 20px;
}
.list-info-cover-img {
  max-width: 100%;
  border-radius: 5%;
}
.music-list {
  max-width: 100%;
  margin-bottom: 30px;
}
tbody :hover {
  opacity: 0.6;
  cursor: pointer;
}
table {
  min-width: 60%;
  margin: auto;
}
thead {
  border-top: 1px solid #3d3d3d;
}
td {
  height: 30px;
}
.track-name {
  width: 250px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.singer-name {
  width: 150px;
}
.album-name {
  width: 250px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>