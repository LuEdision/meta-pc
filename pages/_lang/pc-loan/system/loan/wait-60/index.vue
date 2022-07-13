<template>
  <nut-row class="loan-wait auto-100">
    <div class="sys-loan-main">
      <img src="@/assets/img/wait-60.png" alt="mib" />
      <h2>Se han recibido solicitudes</h2>
      <p>
        Su solicitud ha sido recibida, procesaremos su solicitud después de 60
        días, por favor sea paciente
      </p>
    </div>

    <div class="sys-loan-footer">
      <nut-row>
        <nut-button type="primary" @click="goHome">OK</nut-button>
      </nut-row>
    </div>
  </nut-row>
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
<style lang="scss" scoped></style>
