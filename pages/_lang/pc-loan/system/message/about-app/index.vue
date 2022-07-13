<template>
  <!-- app 设置页面 -->
  <section class="pc-sys">
    <div class="pc-sys-wrapper pc-sys-modify">
      <div class="pc-sys-container sys-modify">
        <div class="pc-sys-left">
          <section class="account-usable">
            <div class="account-title">Ajustes del teléfono</div>
            <div class="app-header">
              <div class="app-header-img">
                <img src="@/assets/img/website.png" alt="" />
              </div>
              <div class="app-desc">
                <p class="app-version">V 1.0.1</p>

                <div class="app-header-more">
                  <!-- <p v-if="!active">
                    Metate facilita el acceso a sus préstamos desde
                    cualquier lugar y en cualquier momento. Completa tu
                    solicitud
                  </p> -->
                  <p :class="{ active: active }">
                    Metate facilita el acceso a sus préstamos desde
                    cualquier lugar y en cualquier momento. Completa tu
                    solicitud{{
                      active
                        ? ` en tan solo unos minutos y recibirás el importe de
                    tu préstamos directamente en tu cuenta bancaria. Meta
                    es tu préstamo inteligente, de confianza y siempre
                    disponible.`
                        : ''
                    }}
                  </p>

                  <span class="more-link">
                    <!-- <a :href="webUrl" target="_blank"> Saber mas</a> -->
                    <span class="more" @click="active = !active">
                      {{ !active ? 'Saber mas' : 'Colapsar' }}</span
                    >
                  </span>
                </div>
              </div>
            </div>
            <div class="account-list">
              <div
                v-for="(item, index) in config"
                :key="index"
                class="account-list-item"
                @click="onClick(item)"
              >
                <div v-if="item.notLink" class="account-custom">
                  <i v-if="item.icon" :class="item.icon"></i>
                  <div class="account-item_title">
                    <span class="m-collapse-title_text">
                      {{ item.title }}
                    </span>
                  </div>

                  <div class="account-item_content">
                    <span v-if="true" class="m-collapse-title_url">
                      {{ item.formatUrl }}
                    </span>
                  </div>
                  <div class="account-footer">
                    <i class="el-icon-arrow-right"></i>
                  </div>
                </div>
                <a
                  v-else
                  class="account-custom"
                  :href="item.url"
                  :target="item.target"
                >
                  <i v-if="item.icon" :class="item.icon"></i>
                  <div class="m-collapse-title">
                    <span class="m-collapse-title_text">
                      {{ item.title }}
                    </span>

                    <div class="account-item_content">
                      <span v-if="true" class="m-collapse-title_url">
                        {{ item.formatUrl }}
                      </span>
                    </div>
                    <div class="account-footer">
                      <i class="el-icon-arrow-right"></i>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </section>
        </div>
        <div class="pc-sys-right">
          <pc-mail :mail-info="facebookUrl"></pc-mail>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
import PcMail from '@/components/pc-loan/mailContainer.vue';

export default {
  components: { PcMail },
  data() {
    return {
      active: false,
    };
  },
  computed: {
    ...mapGetters(['setting']),
    facebookUrl() {
      const o = this.setting.appConfig;
      return (o && o.facebookUrl) || '';
    },
    appData() {
      const o = this.setting;
      return o.appConfig || null;
    },
    webUrl() {
      return this.getObj(this.appData, 'webUrl');
    },
    config() {
      return [
        {
          name: 'facebook账号',
          title: 'Meta Facebook',
          url: this.getObj(this.appData, 'facebookUrl'),
          formatUrl: this.getObj(this.appData, 'facebookUrl'),
          target: '_blank',
        },
        {
          name: '官网地址',
          title: 'Sitio Web',
          url: this.webUrl,
          formatUrl: this.webUrl,
          target: '_blank',
        },
        {
          name: '技术支持 - 邮箱',
          title: 'Correo de soporte',
          url: `mailto:${this.getObj(this.appData, 'contactEmail')}`,
          formatUrl: this.getObj(this.appData, 'contactEmail'), // 显示的值 跳转链接会加上对应值
          target: '_blank',
        },
        {
          name: '电话联系',
          title: 'Línea de soporte',
          url: `tel:${this.getObj(this.appData, 'contactNumber')}`,
          formatUrl: this.getObj(this.appData, 'contactNumber'),
          target: '_blank',
        },
        // {
        //   name: 'whatApp',
        //   title: 'whatApp',
        //   url: `https://wa.me/${this.getObj(
        //     this.appData,
        //     'whatApp'
        //   )}?text=Hola`,
        //   formatUrl: this.getObj(this.appData, 'whatApp'),
        //   target: '_blank',
        // },
        {
          name: 'messenger',
          title: `${this.getObj(this.appData, 'contactDesc')}`,
          url: `${this.getObj(this.appData, 'contactUrl')}`,
          formatUrl: `${this.getObj(this.appData, 'contactUrl')}`,
          target: '_blank',
        },
        // {
        //   name: '应用更新',
        //   title: 'Actualización de la aplicación',
        //   url: this.getObj(this.appData, 'facebookUrl'),
        // },
      ];
    },
  },
  methods: {
    goHome() {
      this.$router.push({ name: `SysIndex___${this.$i18n.locale}` });
    },
    getObj(o, k) {
      return (o && o[k]) || '';
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
