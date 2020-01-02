<style lang="scss" scoped>
.notification {
  width: 250px;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  text-align: center;
  font-size: 14px;

  .close-btn {
    color: red;
    float: right;
    margin-right: 10px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
<template>
  <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
    <div class="notification" 
         :style="style" v-show="visible"
         @mouseenter="clearTimer"
         @mouseleave="createTimer">
      <span>{{ content }}</span>
      <a class="close-btn" @click="handleClose">{{ btn }}</a>
    </div>
  </transition>
</template>
<script>
export default {
  name: "notification",
  props: {
    content: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      default: "关闭"
    }
  },
  data() {
    return {
      visible: true
    };
  },
  computed: {
    style() {
      return {};
    }
  },
  methods: {
    handleClose(e) {
      e.preventDefault();
      this.$emit("close");
    },
    afterLeave () {
        this.$emit('closed')
    },
    afterEnter () {
        
    },
    clearTimer () {},
    createTimer () {}
  }
};
</script>