<template>
  <div v-show="fullLoading" class="m-loading el-loading-mask is-fullscreen">
    <div class="el-loading-spinner">
      <svg viewBox="25 25 50 50" class="circular">
        <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fullLoading: true,
    };
  },
  created() {},
  methods: {
    start() {
      this.fullLoading = true;
    },
    finish() {
      this.fullLoading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.m-loading {
  position: absolute;
  z-index: 3010;
  background-color: rgb(91 91 91 / 50%);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s;
  &.is-fullscreen {
    .el-loading-spinner {
      .circular {
        width: 100px;
        height: 100px;
      }
    }
  }
  .path {
    stroke: #007dff;
  }
}
</style>
