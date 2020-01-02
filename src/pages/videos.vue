<template>
  <div class="video">
    <div class="page-name">模特视屏</div>
    <div class="name">阿玛尼SALON</div>
    <div v-for="(item, index) in videolist" :key="index" class="videolist">
      <video-player
        class="video-player vjs-custom-skin"
        :ref="`videoPlayer${item.id}`"
        :playsinline="true"
        :src="item.video_url"
        :options="item.playerOptions"
        @play="onPlayerPlay(index)"
        @pause="onPlayerPause(index)"
        >
      </video-player>
      <div class="video-title">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
require("vue-video-player/src/custom-theme.css");
import "video.js/dist/video-js.css";
export default {
  name: "page_video_index",
  components: {
    videoPlayer
  },
  data() {
    return {
      currentPlayerIndex: null,
      title: "模特视屏",
      videolist: [],
      options: {},
      playerOptions_temp: {
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [],
        // techOrder: ["flash"],
        poster:
          "https://commamall-prod.oss-cn-shanghai.aliyuncs.com/mallupload/201908/201908230931488201.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  methods: {
    onPlayerPlay (index) {
      let Index = this.videolist.findIndex((item) => item.isPlaying)
      if (Index === index) return
      if (Index < 0) {
        this.videolist[index].isPlaying = true
        return
      }
      this.videolist[index].isPlaying = true
      let playing = this.videolist[Index]
      let anotherPlayer = this.$refs[`videoPlayer${playing.id}`][0].player;
      anotherPlayer.pause()
      this.videolist[Index].isPlaying = false
    },
    onPlayerPause (index) {
      this.videolist[index].isPlaying = false
    }
  },
  mounted() {
    this.videolist = [
      {
        id: 1,
        video_url: "https://upyun.chinamani.com/modelvideo/1.1.mp4",
        name: "视频1"
      },
      {
        id: 2,
        name: "视频2",
        video_url: "https://upyun.chinamani.com/modelvideo/2.1.mp4"
      },
      {
        id: 3,
        name: "视频3",
        video_url: "https://upyun.chinamani.com/modelvideo/3.1.mp4"
      }
    ]
    this.videolist.forEach(val => {
      val.playerOptions = this.playerOptions_temp;
      (val.playerOptions.sources = [
        {
          type: "video/mp4",
          src: val.video_url
        }
      ]),
      (val.isPlaying = false);
    });
  }
};
</script>

<style lang="scss">
.video-js .vjs-big-play-button {
  /*
      播放按钮换成圆形
     */
  height: 2em !important;
  width: 2em !important;
  line-height: 2em !important;
  border-radius: 1em !important;
}
</style>
<style lang="scss" scoped>
// .video-js .vjs-big-play-button {
//   /*
//       播放按钮换成圆形
//      */
//   height: 2em !important;
//   width: 2em !important;
//   line-height: 2em !important;
//   border-radius: 1em !important;
// }
.videolist {
  position: relative;
}
.layout {
  width: 100%;
  height: 420px;
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  top: 0;
  left: 0;
}

.video {
  .cube-scroll-wrapper {
    height: 100vh;
    font-size: 0.9rem;
  }
  .page-name {
    padding: 1rem;
    font-size: 1.2rem;
  }
  .name {
    padding: 1rem;
    font-size: 1.2rem;
    color: #596cad;
  }
  .video-title {
    padding: 1rem;
    font-size: 1.2rem;
  }
}
</style>
