<template>
  <!-- 关于app 一些信息 -->
  <section class="pc-sys">
    <div class="pc-sys-wrapper pc-sys-modify">
      <div class="pc-sys-container sys-modify">
        <div class="pc-sys-left">
          <section class="account-usable">
            <div class="account-title">Configuración</div>
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
                    <div class="account-item_content">
                      <span v-if="true" class="m-collapse-title_url">
                        {{ item.formatUrl }}
                      </span>
                    </div>
                    <div class="account-footer">
                      <i class="el-icon-arrow-right"></i>
                    </div>
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
    <el-dialog
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false"
      :visible.sync="delVisible"
      title="Confirmar la eliminación de datos personales"
      center
      custom-class="cust-dialog"
    >
      <div class="del-dialog">
        <p>
          * Toda tu información personal será eliminada, incluyendo tu nombre y
          apellidos, DNI, fecha de nacimiento, información laboral, familiar,
          información bancaria, etc.
        </p>
        <p>
          * Antes de intentar eliminar tu inforación personal, por favor esté
          seguro que todos sus préstamos están al correitne de pago y que hayan
          pasado más de 5 años desde que pagó su último préstamo.
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">{{ $t('cancel') }}</el-button>
        <el-button type="primary" @click="onDelOk">Siguiente</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
import { loan } from '@/api/index';
import Cookies from 'js-cookie';
import PcMail from '@/components/pc-loan/mailContainer.vue';
const { apiGetLastUnpayLoan } = loan;

export default {
  components: { PcMail },
  data() {
    return {
      delVisible: false,
      delType: 1,
      tmpKey: '',
    };
  },
  computed: {
    ...mapGetters(['login', 'setting']),
    facebookUrl() {
      const o = this.setting.appConfig;
      return (o && o.facebookUrl) || '';
    },
    userData() {
      const o = this.login;
      return (o && o.loginData) || null;
    },
    userMobile() {
      const o = this.userData;
      return (o && o.mobile) || '';
    },
    BASE_URL() {
      return process.env.BASE_URL + '/pc/' || '/pc/';
    },
    config() {
      return [
        {
          name: '订阅',
          key: 'subscribe',
          title: 'Suscripción',
          notLink: true,
          url: 'subscribe',
        },
        {
          name: '修改密码',
          title: 'Cambiar contraseña',
          key: 'modify',
          formatUrl: '',
          notLink: true,
          url: `/outside/sms?phone=${this.userMobile}&scenes=resetPassword`,
        },
        // {
        //   name: '删除个人资料',
        //   key: 'DelInfo',
        //   title: 'Borrar datos personales',
        //   url: 'delete-user?type=1',
        //   formatUrl: '',
        //   notLink: true,
        //   customEvent: true,
        // },
        {
          name: '注销',
          key: 'OutInfo',
          title: 'Cancelar la cuenta',
          url: '',
          formatUrl: '',
          notLink: true,
        },
        {
          name: '退出登录',
          key: 'logout',
          title: 'Cerrar la sesión',
          url: '',
          notLink: true,
          formatUrl: '',
        },
      ];
    },
  },
  methods: {
    getObj(o, k) {
      return (o && o[k]) || '';
    },
    onLogout() {
      this.$confirm(this.$t('sureLogout'), this.$t('wellTip'), {
        confirmButtonText: this.$t('sure'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning',
      }).then((_) => {
        const cookies = Cookies.get();
        const keys = Object.keys(cookies);
        for (const key of keys) {
          Cookies.remove(key);
        }
        sessionStorage.clear();
        localStorage.clear();
        this.$router.push({
          name: `OutsideNext___${this.$i18n.locale}`,
          query: { phone: this.userMobile },
        });
      });
    },
    onClick(item) {
      // 回调到对应的key 通过key区分不同的click事件

      const keyValue = this.getObj(item, 'key');
      if (keyValue === 'logout') {
        this.onLogout();
      }
      if (keyValue === 'DelInfo' || keyValue === 'OutInfo') {
        this.delVisible = true;

        this.tmpKey = (keyValue === 'DelInfo' && 1) || 2; // modify
      }
      // if (keyValue === 'modify') {
      //   Cookies.remove('loan_app_token');
      // }
      if (item.notLink && !this.getObj(item, 'customEvent')) {
        let queryMap = {};
        const queryArr = item.url.split('?');
        const queryList = queryArr.length > 1 ? queryArr[1].split('&') : null;
        if (queryList) {
          for (let i of queryList) {
            const keyValue = i.split('=');
            queryMap[keyValue[0]] = keyValue[1];
          }
        }
        this.$router.push({
          path: item.url,
          query: {
            ...queryMap,
          },
        });
      }
    },
    onDelOk() {
      this.getLastLoan(this.tmpKey);
      this.delVisible = false;
    },
    getLastLoan(type) {
      this.delType = type;
      apiGetLastUnpayLoan()
        .then((res) => {
          if (res) {
            if (res.status === 4001 || res.status === -1 || res.status === -2) {
              // this.$router.push({
              //   name: `SysMessageDeleteUser___${this.$i18n.locale}`,
              //   query: { type },
              // });
              this.$router.push({
                path: '/outside/sms',
                query: {
                  phone: this.userMobile,
                  scenes: 'logout',
                },
              });
            } else {
              this.$message({
                type: 'error',
                message: this.$t('hasUnpaid'),
                duration: 2000,
              });
            }
          }
        })
        .catch((err) => {
          // 5003 已经结清 无未结清借据
          // this.$router.push({
          //   name: `SysMessageDeleteUser___${this.$i18n.locale}`,
          //   query: { type },
          // });
          this.$router.push({
            path: '/outside/sms',
            query: {
              phone: this.userMobile,
              scenes: 'logout',
            },
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
<style lang="scss">
.cust-dialog {
  border-radius: 5px;
  .el-dialog__header {
    background: #f8f8f8;
    text-align: left;
    border-radius: 5px 5px 0 0;
    .el-dialog__title {
      font-size: 37px;
      font-family: Poppins-Medium, Poppins;
      font-weight: 500;
      color: #28293e;
      line-height: 56px;
    }
  }
  .el-dialog__body {
    background: #f8f8f8;
    padding-top: 0;
  }
  .el-dialog__footer {
    padding-top: 53px;
    padding-bottom: 48px;
  }
  .el-dialog__headerbtn {
    .el-dialog__close {
      font-size: 21px;
    }
  }
}
</style>
