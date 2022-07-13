<template>
  <div class="cust-cd-timer">
    <template v-if="$slots.default">
      <slot></slot>
    </template>
    <template v-else-if="showPlainText">
      <span class="cust-cd-block">{{ plainText }}</span>
    </template>
    <template v-else>
      <template v-if="resttime.d >= 0 && showDays">
        <span class="cust-cd-block">{{ resttime.d }}</span>
        <span class="cust-cd-dot">天</span>
      </template>
      <span class="cust-cd-block">{{ resttime.h }}</span
      ><span class="cust-cd-dot">:</span
      ><span class="cust-cd-block">{{ resttime.m }}</span
      ><span class="cust-cd-dot">:</span
      ><span class="cust-cd-block">{{ resttime.s }}</span>
      <span v-if="millisecond" class="cust-cd-dot">:</span>
      <span v-if="millisecond" class="cust-cd-block">{{ resttime.ms }}</span>
    </template>
  </div>
</template>

<script>
function fill2(v) {
  v += '';
  while (v.length < 2) {
    v = '0' + v;
  }
  return v;
}
function restTime(t) {
  const ts = t;
  let rest = {
    d: '-',
    h: '--',
    m: '--',
    s: '--',
    ms: '--',
  };
  if (ts === 0) {
    rest = {
      d: '0',
      h: '00',
      m: '00',
      s: '00',
      ms: '00',
    };
  }

  if (ts) {
    const ds = 24 * 60 * 60 * 1000;
    const hs = 60 * 60 * 1000;
    const ms = 60 * 1000;
    const us = 1000;
    const d = ts >= ds ? parseInt(ts / ds) : 0;
    const h = ts - d * ds >= hs ? parseInt((ts - d * ds) / hs) : 0;
    const m =
      ts - d * ds - h * hs >= ms ? parseInt((ts - d * ds - h * hs) / ms) : 0;
    const s = Math.round((ts - d * ds - h * hs - m * ms) / 1000);
    const _ms = Math.round(ts % 1000);
    if (d >= 0) rest.d = d + '';
    if (h >= 0) rest.h = fill2(h);
    if (m >= 0) rest.m = fill2(m);
    if (s >= 0) rest.s = fill2(s);
    if (_ms >= 0) rest.ms = fill2(_ms);
  }
  return rest;
}
const countdownTimer = {
  name: 'custom-countdown',
  data() {
    return {
      restTime: 0,
      p: 0,
      _curr: 0,
    };
  },
  props: {
    millisecond: {
      default: false,
      type: Boolean,
    },
    value: {
      type: Object,
      default: () => ({}),
    },
    paused: {
      default: false,
      type: Boolean,
    },
    showDays: {
      default: false,
      type: Boolean,
    },
    showPlainText: {
      default: false,
      type: Boolean,
    },
    startTime: {
      // 可以是服务器当前时间
      type: [Number, String],
      validator(v) {
        const dateStr = new Date(v).toString().toLowerCase();
        return dateStr !== 'invalid date';
      },
    },
    endTime: {
      type: [Number, String],
      validator(v) {
        const dateStr = new Date(v).toString().toLowerCase();
        return dateStr !== 'invalid date';
      },
    },
  },
  computed: {
    resttime() {
      const rest = restTime(this.restTime);
      const { d, h, m, s, ms } = rest;
      if (!this.showDays && d > 0) {
        rest.h = fill2(Number(rest.h) + d * 24);
        rest.d = 0;
      }
      return rest;
    },
    plainText() {
      const { d, h, m, s, ms } = this.resttime;
      return `${
        d > 0 && this.showDays ? d + '天' + h : h
      }小时${m}分${s}秒${ms}毫秒`;
    },
  },
  watch: {
    value(newVal, oldVal) {},
    restTime(n, o) {
      let tranTime = restTime(n);
      this.$emit('input', tranTime);
    },
    paused(v, ov) {
      if (!ov) {
        this._curr = this.getTimeStamp();
        this.$emit('on-paused', this.restTime);
      } else {
        this.p += this.getTimeStamp() - this._curr;
        this.$emit('on-restart', this.restTime);
      }
    },
    endTime() {
      this.initTimer();
    },
    startTime() {
      this.initTimer();
    },
  },
  methods: {
    getTimeStamp(timeStr) {
      if (!timeStr) return Date.now();
      let t = timeStr;
      t = t > 0 ? +t : t.toString().replace(/-/g, '/');
      return new Date(t).getTime();
    },
    initTimer() {
      const delay = 1;
      const curr = Date.now();
      const start = this.getTimeStamp(this.startTime || curr);
      const end = this.getTimeStamp(this.endTime || curr);
      const diffTime = curr - start;
      this.restTime = end - (start + diffTime);
      this.timer = setInterval(() => {
        if (!this.paused) {
          let restTime = end - (Date.now() - this.p + diffTime);
          this.restTime = restTime;
          if (restTime < delay) {
            this.restTime = 0;
            this.$emit('on-end');
            clearInterval(this.timer);
          }
        } else {
          // 暂停
        }
      }, delay);
    },
  },
  created() {
    this.initTimer();
  },
  destroyed() {
    this.timer && clearInterval(this.timer);
  },
};
countdownTimer.restTime = restTime;
// export fill2 for test
export { restTime, fill2 };
export default countdownTimer;
</script>

<style lang="scss">
.cust-cd-timer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}
.cust-countdown {
  display: flex;
}
</style>
