<template>
  <!-- h5 等待信审结果返回 -->
  <div class="sys-message">
    <div class="wait-pay message-wait">
      <div class="message-wait-main">
        <img src="@/assets/img/pre-credit/logout-wait.png" alt="mib" />
        <h2>Se han recibido solicitudes</h2>
        <p>
          Para continuar, hemos recibido su solicitud de supresión de cuentas,
          que puede tardar unos 30 días en prepararse. Su cuenta será cancelada
          el {{ logoutDay }}. Si inicia sesión en 30 días, su cancelación será
          cancelada y tendrá que solicitar de nuevo.
        </p>
      </div>

      <div class="message-wait-footer">
        <div class="btn">
          <el-button type="primary" @click="onDonotLogout"
            >Mantener mi cuenta</el-button
          >
          <el-button type="primary" plain @click="onLogout"
            >Siguiente</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import { login } from '@/api/index';
const { apiLogout } = login;
export default {
  data() {
    return {
      logoutDay: dayjs().add(30, 'day').format('DD-MM-YYYY'),
    };
  },
  computed: {
    ...mapGetters(['loan']),
  },
  methods: {
    onDonotLogout() {
      this.$router.go(-2);
    },
    onLogout() {
      apiLogout().then((res) => {
        this.$message({
          type: 'success',
          message: res?.msg,
          duration: 2000,
        });
        const cookies = Cookies.get();
        const keys = Object.keys(cookies);
        for (const key of keys) {
          Cookies.remove(key);
        }
        sessionStorage.clear();
        localStorage.clear();
        this.$router.push({ name: `OutsideNext___${this.$i18n.locale}` });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
