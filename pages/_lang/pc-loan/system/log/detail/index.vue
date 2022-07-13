<template>
  <section class="pc-sys">
    <div class="pc-sys-wrapper pc-sys-modify">
      <div class="pc-sys-container sys-modify">
        <div class="pc-sys-left">
          <div class="loan-detail">
            <div v-if="!isLoan" class="detail-box">
              <div
                v-for="(item, index) in loanInfo"
                :key="index"
                class="detail-item"
                :class="item.split ? 'split' : ''"
              >
                <div v-if="!item.split" class="detail-item_label">
                  {{ item.label }}:
                </div>
                <div class="detail-item_value">
                  {{ formatValue(item.field, 0) }}
                </div>
              </div>
            </div>
            <el-collapse
              v-else
              v-model="activeName"
              class="collapse list"
              accordion
            >
              <el-collapse-item
                v-for="(it, i) in list"
                :key="it.loanId"
                class="list-item"
                :name="i"
              >
                <template slot="title">
                  <span class="list-item-title">Cuotas {{ i + 1 }}</span>
                </template>
                <div class="detail-box">
                  <div
                    v-for="(item, index) in loanInfo"
                    :key="index"
                    class="detail-item"
                    :class="item.split ? 'split' : ''"
                  >
                    <div v-if="!item.split" class="detail-item_label">
                      {{ item.label }}:
                    </div>
                    <div class="detail-item_value">
                      {{ formatValue(item.field, i) }}
                    </div>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
import { loan } from '@/api/index';
import dayjs from 'dayjs';
import { numFormat } from '@/utils/index.client';
const { apiGetLoanLog } = loan;
export default {
  data() {
    return {
      formData: {},
      activeName: [0],
      routeQuery: this.$route.query,
    };
  },
  computed: {
    ...mapGetters(['loan', 'scheme']),
    isLoan() {
      return this.routeQuery.from === 'loan';
    },
    loanInfo() {
      if (!this.isLoan) return this.transList;

      return [
        {
          label: 'Folio de préstamo',
          field: 'loanId',
          trans: true,
        },
        {
          label: 'Estatus',
          field: 'paymentStatus',
          trans: true,
        },
        {
          label: 'Tiempo de solicitud', // 创建日期
          field: 'createTime',
        },
        {
          label: 'Tiempo de transferecnia de prestamo', // 放款日期
          field: 'lendOutTime',
        },
        {
          label: '', // 间隔
          value: '',
          split: true,
        },
        {
          label: 'Solicitante', // 借款人
          field: 'customerName',
        },
        // {
        //   label: 'Cuenta beneficiaria',
        //   field: 'sendAccount',
        //   value: this.getData('sendAccount'),
        // },
        {
          label: 'Cuenta', // 借款账号
          field: 'bankAccountNo',
          trans: true,
        },
        {
          label: 'Monto de prestamo', // 申请金额
          field: 'principalAmount',
        },
        {
          label: 'Período',
          field: 'limitDays',
        },
        {
          label: 'Fecha de vencimiento', // 到期日期
          field: 'dueDate',
        },
        {
          label: 'Cargo por servicios', // 服务费
          field: 'postLoanFee',
        },
        {
          label: 'Monto a recibir', // 放款金额
          field: 'amount',
        },
        {
          label: 'Interes penalizado', // 罚息金额
          field: 'penaltyAmount',
        },
        {
          label: 'Interes ordinario', // 利息
          field: 'interestAmount',
        },
      ];
    },
    transList() {
      const transStatus = this.getData('transStatus');
      const transType = this.getData('reqTransType');
      return [
        {
          label: 'Folio de transaccion', // 流水号
          field: 'transNo',
          value: this.getData('transNo'),
        },
        {
          label: 'Tipo', // 支付类型
          field: 'transType',
          value: this.getData('transType'),
        },
        {
          label: 'Causas del fracaso', // 支付状态
          field: 'remark',
          value: this.getData('remark'),
        },
        {
          label: 'Estatus',
          field: 'transStatus',
          value:
            transStatus === 'S'
              ? 'Exito'
              : transStatus === 'P'
              ? 'Procesando'
              : 'Fracaso',
        },
        {
          label: 'Tiempo de transferencia',
          field: 'transTime',
          value: this.format1(this.getData('transTime')),
        },
        {
          label: 'Cuenta',
          field:
            transType.toLowerCase() === 'la' ? 'receiveAccount' : 'sendAccount',
          value:
            transType.toLowerCase() === 'la'
              ? this.getData('receiveAccount')
              : this.getData('sendAccount'),
        },
        {
          label: 'Importe a pagar',
          field: 'transAmount',
          value: this.getData('transAmount') + ' €',
        },
      ];
    },
    list() {
      return this.loan.logData.loanList ?? [];
    },
    postLoanFee() {
      const l = this.list;
      return (l?.length && l[0].postLoanFee) || '-';
    },
    totalRepayAmount() {
      const l = this.list;
      return (l?.length && l[0].totalRepayAmount) || '-';
    },
    surplusPenaltyAmount() {
      const l = this.list;
      return (l?.length && l[0].surplusPenaltyAmount) || '-';
    },
  },
  mounted() {
    // if (this.routeQuery.from) {
    //   sessionStorage.setItem('logDetail', JSON.stringify(this.routeQuery));
    // }
    // const query = sessionStorage.getItem('logDetail');
    // this.routeQuery = query ? JSON.parse(query) : {};
  },
  methods: {
    formatMoney(val) {
      return numFormat(Number(val), '.');
    },
    formatValue(field, index) {
      const transStatus = this.getData('transStatus');
      const formatObj = {
        loanId: this.getPay('loanId', index),
        paymentStatus: this.formatList(
          this.getData('paymentStatus'),
          this.scheme.LOAN_STATUS
        ),
        remark: this.getData('remark'),
        createTime: this.format1(this.getData('createTime')),
        lendOutTime: this.format1(this.getData('lendOutTime')),
        customerName: this.getPay('customerName', index),
        bankAccountNo: this.getPay('bankAccountNo', index),
        principalAmount: this.getPay('principalAmount', index, true),
        limitDays: this.getPay('limitDays', index) + ' Dias',
        dueDate: this.format1(this.getPay('dueDate', index)),
        postLoanFee: this.getPay('postLoanFee', index, true),
        amount: this.getPay('amount', index, true),
        penaltyAmount: this.getPay('penaltyAmount', index, true),
        interestAmount: this.getPay('interestAmount', index, true),
        transNo: this.getData('transNo'),
        transType: this.getData('transType'),
        transStatus:
          transStatus === 'S'
            ? 'Exito'
            : transStatus === 'P'
            ? 'Procesando'
            : 'Fracaso',
        transTime: this.format1(this.getData('transTime')),
        sendAccount: this.getData('sendAccount'),
        receiveAccount: this.getData('receiveAccount'),
        transAmount: this.getData('transAmount') + ' €',
      };
      return formatObj[field];
    },
    format1(d) {
      if (!d) return '-';

      const o = (d + '').slice(0, 10).split('-');
      if (o?.length >= 3) {
        let date = '';
        if (o[0]?.length > 2) {
          date = this.formatDate(o[0] + o[1] + o[2]);
        } else {
          date = this.formatDate(o[2] + o[1] + o[0]);
        }
        return date;
      }
      return '-';
    },
    formatDate(d) {
      const date = dayjs(d).format('DD-MM-YYYY');
      return date;
    },
    getData(key) {
      const o = this.loan.logData;
      let keyValue = '';
      switch (key) {
        case 'principalAmount':
        case 'postLoanFee':
        case 'penaltyAmount':
        case 'amount':
        case 'interestAmount':
        case 'transAmount': {
          keyValue = this.formatMoney(o[key]);
          break;
        }
        case 'paymentStatus': {
          console.log('ooo', o);
          const list = o?.loanList?.filter((item) => {
            return item.status === 3001;
          });
          console.log('list', list);
          if (list?.length > 0) {
            keyValue = '3010';
          } else {
            keyValue = o[key];
          }

          break;
        }
        default: {
          keyValue = o[key];
        }
      }
      return (o && keyValue) || '-';
    },
    getPay(key, i, isMoney = false) {
      const o = this.loan.logData;
      const l = (o && o.loanList) || [];
      const d = (l?.length && l[i]) || null;
      let keyValue = '';
      switch (key) {
        case 'principalAmount':
        case 'postLoanFee':
        case 'penaltyAmount':
        case 'amount':
        case 'interestAmount': {
          const val = d ? d[key] : o[key];
          keyValue = this.formatMoney(val);
          break;
        }
        default: {
          const val = d ? d[key] : o[key];
          keyValue = val;
        }
      }
      const ret =
        (d && keyValue + ((isMoney && ' €') || '')) ||
        (isMoney && '0 €') ||
        '-';
      return ret;
    },
    formatList(val, opt = []) {
      if ((val + '')?.length === 0) return '-';
      if (!opt || opt?.length === 0) return '-';
      return this.$t(opt.find((_) => _.value === Number(val))?.label);
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
