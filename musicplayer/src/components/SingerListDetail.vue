<template>
  <div class="singer-song-list">
    <div class="singer-info">
      <div class="singer-info-name">
        <p>{{this.singerName}}</p>
      </div>
      <div class="singer-photo">
        <img :src="this.$route.params.picUrl" alt />
      </div>
    </div>
    <div class="music-list">
      <thead>
        <tr>
          <th id="id-song-index"></th>
          <th id="id-song-title">歌曲标题</th>
          <th id="id-song-album">专辑</th>
        </tr>
      </thead>
      <tbody music-table>
        <tr
          @dblclick="playMusic"
          v-for="(song,index) in songs"
          :key="index"
          :id="song.id"
          class="music-info"
        >
          <td class="song-index" :id="song.id">{{ index + 1}}</td>
          <td class="song-name" :id="song.id">{{ song.name }}</td>
          <td class="album-name" :id="song.id">{{ song.al.name }}</td>
        </tr>
      </tbody>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      songs: [],
      singerName: this.$route.params.listName
    };
  },
  beforeMount() {
    this.getSongs();
  },
  methods: {
    getSongs() {
      var id = this.$route.params.listId;
      console.log("id: ", id);
      var url = "http://localhost:3000/artist/top/song?id=" + id;
      console.log("url: ", url);
      Vue.axios
        .get(url)
        .then(response => {
          console.log("response: ", response.data);
          this.songs = response.data.songs;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    playMusic(event) {
      var id = event.target.id;
      var src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
      this.$store.commit("pushSrc", src);
    }
  }
};
</script>

<style>
.singer-song-list {
  max-width: 100%;
  margin: auto;
  margin-top: 80px;
  overflow: hidden;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.singer-info {
  max-width: 70%;
  margin: 0 auto;
  margin-bottom: 20px;
}
.singer-photo {
  max-width: 100%;
  overflow: hidden;
}
.singer-info img {
  min-width: 640px;
  max-height: 300px;
}
.music-list {
  max-width: 70%;
  margin: auto;
}
music-info {
  border: 1px, solid;
}
tbody tr:nth-child(even) {
  background-color: #f3f1f1;
}
tbody {
  user-select: none;
}
.song-index {
  width: 50px;
}
.song-name {
  width: 350px;
}
.album-name {
  width: 350px;
}
.singer-info-name {
  font-size: 24px;
  margin-bottom: 10px;
}
</style>