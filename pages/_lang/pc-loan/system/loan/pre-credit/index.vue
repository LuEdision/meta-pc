<template>
  <div class="sys-message">
    <div class="wait-apply message-wait">
      <div class="message-wait-main">
        <img src="@/assets/img/pre-credit/apply-waiting.svg" alt="Mib" />
        <h2>Solicitud en Proceso</h2>
        <p>
          Ya hemos recibido tu solicitud y estamos trabajando en analizar tu
          perfil crediticio. En un momento te haremos saber el resultado a
          través de nuestra app y por SMS.
        </p>
      </div>

      <div class="message-wait-footer">
        <div class="btn">
          <el-button type="primary" @click="goHome">OK</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goHome() {
      this.$router.push({ name: `SysIndex___${this.$i18n.locale}` });
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
