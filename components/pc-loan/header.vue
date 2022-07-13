<template>
  <section class="pc-header">
    <el-button
      type="primary"
      class="pc-header-icon"
      icon="el-icon-back"
      circle
      :data-option="$route.meta.gaBackName"
      @click="onGoBack"
    ></el-button>
    <!-- <i class="pc-header-icon el-icon-back" @click="onGoBack"></i> -->
    <slot name="header">
      <div class="pc-header_up">
        <div class="pc-header_up__left" @click="onGoHome">
          <img :src="logo" alt="Mib" />
        </div>
        <div :class="['pc-header_up__right', rightClass]">
          <slot name="right">
            <!-- <el-button
              v-if="!notShowBtn"
              @click="showCustomerArea"
              type="primary"
              >{{ $t('customerArea') }}</el-button
            > -->
          </slot>
        </div>
      </div>
    </slot>
    <slot name="footer"></slot>
  </section>
</template>

<script>
import Cookies from 'js-cookie';
import logo from '@/assets/img/common/logo@2x.png';
export default {
  name: 'PcHeader',
  props: {
    rightClass: {
      type: [String, Object],
      default: () => null,
    },
    notShowBtn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      logo: logo,
    };
  },
  methods: {
    onGoBack() {
      this.$router.back();
    },
    onGoHome() {
      const token = Cookies.get('loan_app_token');
      if (token) {
        const routeList = ['/sys/user/modify', '/sys/loan/presale'];
        if (routeList.includes(this.$route.path)) {
          this.$router.back();
        } else {
          this.$router.push({
            name: `SysIndex___${this.$i18n.locale}`,
          });
        }
      } else {
        this.$router.push({
          name: `OutsideNext___${this.$i18n.locale}`,
        });
      }
    },
    showCustomerArea(e) {
      this.$emit('handle-custome-event', e);
    },
  },
};
</script>
