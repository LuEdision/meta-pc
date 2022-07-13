<template>
  <section class="pc-sys">
    <div class="pc-sys-wrapper pc-sys-modify">
      <div class="pc-sys-container sys-modify">
        <div class="pc-sys-left">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="Personal" name="first">
              <el-descriptions
                v-for="item in infoData"
                :key="item.id"
                class="margin-top"
                :title="item.title"
                :column="1"
                :size="size"
              >
                <el-descriptions-item
                  v-for="it in item.item"
                  :key="it.label"
                  :label="it.label"
                  >{{ it.value }}</el-descriptions-item
                >
              </el-descriptions>
            </el-tab-pane>
            <el-tab-pane label="Banco" name="second" class="my-preview"
              ><bank-priview :is-component="true"
            /></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <pc-footer></pc-footer>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
import { user } from '@/api/index';
import BankPriview from '@/pages/_lang/pc-loan/system/bank/preview/index.vue';
import PcFooter from '@/components/pc-loan/footer.vue';

const { apiGetFullUserinfo } = user;
export default {
  components: {
    'bank-priview': BankPriview,
    PcFooter,
  },
  data() {
    return {
      fullInfo: {},
      size: 'medium',
      activeName: 'first',
    };
  },
  computed: {
    ...mapGetters(['setting', 'login', 'scheme']),
    infoData() {
      return [
        {
          id: 1,
          title: 'Datos personales',
          item: [
            { label: 'Nombre', value: this.getData('firstName') }, // 名
            { label: 'Apellido', value: this.getData('lastName') }, // 姓
            {
              label: 'Segundo apellido',
              value: this.getData('lastMotherName'),
            }, // 二姓
            { label: 'Fecha de nacimiento', value: this.getData('birthday') }, // 出生日期
            { label: 'Número de DNI', value: this.getData('nationalId') }, // INE
            { label: 'Correo electrónico', value: this.getData('email') }, // 邮箱
          ],
        },
        {
          id: 2,
          title: 'Datos de empleo', // 工作信息
          // , class: 'disabled'
          item: [
            {
              label: 'Nombre de la empresa',
              value: this.getJob('companyName'),
            }, // 公司名
            {
              label: 'Estatus labora',
              value: this.formatList(
                this.getJob('workStatus'),
                this.scheme.WORK_STATUS
              ),
            }, // 工作状态
            // 发薪周期本期暂不展示
            // {
            //   label: 'Frecuencia de recibo de ingreso',
            //   value: this.formatList(this.getJob('payrollCycle'), this.scheme.PAY_PERIOD)
            // }, // 收入频率
            {
              label: 'Ingreso mensual',
              value: this.formatList(
                this.getJob('income'),
                this.scheme.MONTHLY_INCOME
              ),
            }, // 月收入
            {
              label: '¿Qué día recibes tu nómina/ingresos (aprox)?',
              value: this.getJob('payDay'),
            }, // 发薪日
          ],
        },

        {
          id: 3,
          title: 'Datos de domicilio',
          item: [
            { label: 'Código postal', value: this.getData('postalCode') }, // 邮编
            { label: 'Comunidad autónoma', value: this.getData('province') }, // 中央省
            { label: 'Provincia', value: this.getData('city') }, // 省
            { label: 'Municipio o población', value: this.getData('colony') }, // 市
            {
              label: 'Nombre de la calle o población',
              value: this.getData('street'),
            }, // 区
            {
              label: 'Dirección concreto',
              value: this.getData('currentAddress'),
            }, // 具体地址
            {
              label: 'Estado civil',
              value: this.formatList(
                this.getData('maritalStatus'),
                this.scheme.MARITAL_STATUS
              ),
            }, // 婚姻状况
          ],
        },
      ];
    },
  },
  created() {
    // this.getInfo();
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    handleClick(tab, event) {},
    getInfo() {
      this.fullInfo = null;
      apiGetFullUserinfo().then((res) => {
        this.fullInfo = res || null;
      });
    },
    onGo() {
      this.$router.push({
        name: `SysLoanWait60___${this.i18n.locale}`,
      });
    },
    getData(key) {
      const o = this.fullInfo;
      return (o && o[key]) || '';
    },
    getJob(key) {
      const o = this.fullInfo;
      const j = (o && o.job_info) || null;
      return (j && j[key]) || '';
    },
    formatList(val, opt) {
      if ((val + '').length === 0) return '-';

      const f = opt.find((_) => _.value === val);
      return (f && this.$t(f.label)) || '-';
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
