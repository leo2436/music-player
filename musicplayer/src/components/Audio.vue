<template>
  <div class="my-player">
    <div>
      <!-- 此处的ref属性，可以很方便的在vue组件中通过 this.$refs.audio获取该dom元素 -->
      <audio
        ref="audio"
        @pause="onPause"
        @play="onPlay"
        @timeupdate="onTimeupdate"
        @loadedmetadata="onLoadedmetadata"
        @playing="ready"
        :src="src"
        preload="auto"
      ></audio>

      <!-- 音频播放控件 -->
      <div class="control">
        <el-button
          size="small"
          circle
          class="play-button"
          icon="el-icon-caret-right"
          @click="startPlayOrPause"
        ></el-button>
        <el-button
          size="small"
          circle
          icon="el-icon-d-arrow-right"
          class="speed-button"
          @click="changePlayRate"
        ></el-button>
        <!-- <el-tag class="begin" type="info">{{ audio.currentTime | formatSecond}}</el-tag> -->
        <vueSlider
          v-model="sliderTime"
          @drag-end="processDragEnd"
          class="time-slider"
          width="100px"
          :max="100"
          ref="processSlider"
          :tooltip-formatter="formatProcessToolTip"
        ></vueSlider>
        <el-tag
          class="time-show"
          type="info"
        >{{ audio.currentTime | formatSecond}} / {{ audio.maxTime | formatSecond}}</el-tag>
        <el-button
          size="small"
          circle
          icon="el-icon-bell"
          class="mute-button"
          @click="startMuteOrNot"
        ></el-button>
        <vueSlider
          v-model="volume"
          @dragging="volumeDragging"
          @change="changeEvent"
          class="sound-slider"
          width="100px"
          :max="100"
          ref="volumeSlider"
          :tooltip-formatter="val => '音量:' + val"
        ></vueSlider>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
function realFormatSecond(second) {
  var secondType = typeof second;

  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);

    var hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    var mimute = Math.floor(second / 60);
    second = second - mimute * 60;

    return (
      hours + ":" + ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2)
    );
  } else {
    return "0:00:00";
  }
}
import vueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
export default {
  name: "Audio",
  components: { vueSlider },
  props: {
    // theUrl: {
    //   type: String,
    //   required: true
    // },
    theRates: {
      type: Array,
      default() {
        return [0.5, 0.75, 1, 1.5, 2];
      }
    }
  },
  data() {
    return {
      audio: {
        // 该字段是音频是否处于播放状态的属性
        playing: false,
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0,
        muted: false,
        playrate: 1
      },
      sliderTime: 0,
      volume: 50,
      rate: this.theRates
    };
  },
  computed: {
    src() {
      return this.$store.state.src;
    }
  },
  watch: {
    src() {
      if (this.$store.state.src) {
        console.log("change", this.$store.state.src);
        console.log("audio", this.$refs.audio);
        //hack方法解决
        setTimeout(() => this.play());
      }
    }
  },
  methods: {
    ready(e) {
      console.log("e", e);
    },
    // 控制音频的播放与暂停
    startPlayOrPause() {
      return this.audio.playing ? this.pause() : this.play();
    },
    //静音控制
    startMuteOrNot() {
      this.$refs.audio.muted = !this.$refs.audio.muted;
      this.audio.muted = this.$refs.audio.muted;
    },
    // 播放音频
    play() {
      this.$refs.audio.play();
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause();
    },
    // 当音频播放
    onPlay() {
      this.audio.playing = true;
    },
    // 当音频暂停
    onPause(e) {
      this.audio.playing = false;
      console.log("e1", e);
    },
    //控制播放速度
    changePlayRate() {
      let index = this.rate.indexOf(this.audio.playrate) + 1;
      console.log("this.rates: ", this.rate);
      console.log("this.audio.playrate: ", this.audio.playrate);
      this.audio.playrate = this.rate[index % this.rate.length];
      this.$refs.audio.playbackRate = this.audio.playrate;
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      // console.log("timeupdate");
      // console.log(res);
      this.audio.currentTime = res.target.currentTime;
      this.sliderTime = parseInt(
        (this.audio.currentTime / this.audio.maxTime) * 100
      );
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      // console.log("loadedmetadata");
      // console.log("res ", res);
      this.audio.maxTime = parseInt(res.target.duration);
    },
    processDragEnd() {
      var sliderTime = this.sliderTime;
      console.log("sliderTime: ", sliderTime);
      //原生属性，跳到指定时间点
      this.$refs.audio.currentTime = parseInt(
        (sliderTime / 100) * this.audio.maxTime
      );
    },
    volumeDragging(value) {
      // console.log("value: ", value);
      // this.$refs.audio.volume = parseInt((value / 100) * this.audio.maxVolume);
      // console.log("this.$refs.audio: ", this.$refs.audio.volume);
      this.$refs.audio.volume = parseFloat(value / 100);
    },
    changeEvent(e) {
      this.$refs.audio.volume = parseFloat(e / 100);
    },
    formatProcessToolTip(sliderTime) {
      sliderTime = parseInt((this.audio.maxTime / 100) * sliderTime);
      return "进度条: " + realFormatSecond(sliderTime);
    },
    gerUrl() {
      console.log(this.$store.state.url);
    }
  },
  filters: {
    // 使用组件过滤器来动态改变按钮的显示
    transPlayPause(value) {
      return value ? "暂停" : "播放";
    },
    formatSecond(second = 0) {
      return realFormatSecond(second);
    },
    transMute(value) {
      return value ? "放音" : "静音";
    },
    transPlayrate(value) {
      return "快进: x" + value;
    }
  },
  created() {}
};
</script>

<style>
.time-slider {
  display: inline-block;
  margin-right: 10px;
  margin-left: 20px;
  line-height: 50%;
  top: 4px;
}
.sound-slider {
  display: inline-block;
  margin-right: 10px;
  margin-left: 20px;
  top: 4px;
}
.control {
  max-width: 100%;
  margin: 0 auto;
  padding: 5px;
}
.my-player {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  background-color: #3b3333;
  position: fixed;
  bottom: 0;
}
.time-show {
  margin-right: 10px;
  margin-left: 10px;
}
</style>