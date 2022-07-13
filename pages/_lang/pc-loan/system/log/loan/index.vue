<template>
  <section class="pc-sys" style="overflow: hidden">
    <div class="pc-sys-wrapper pc-sys-modify" style="overflow: auto">
      <div class="loan-condition">
        <el-form :inline="true" :model="formData" class="loan-condition-inline">
          <el-form-item label="Desde">
            <el-date-picker
              v-model="formData.startDate"
              align="right"
              type="date"
              format="dd-MM-yyyy"
              value-format="yyyy-MM-dd"
              placeholder="DD-MM-YYYY"
              :picker-options="pickerOptionsStart"
              @change="onChange"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="Hasta">
            <el-date-picker
              v-model="formData.endDate"
              align="right"
              type="date"
              format="dd-MM-yyyy"
              value-format="yyyy-MM-dd"
              placeholder="DD-MM-YYYY"
              :picker-options="pickerOptionsEnd"
              @change="onChange"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="pc-sys-container sys-modify">
        <div class="pc-sys-left">
          <el-table :data="logList" style="width: 100%">
            <el-table-column
              prop="applyAmount"
              label="Monto de préstamo"
              width="200"
            >
              <template slot-scope="scope">
                <span class="money"
                  >{{ formatMoney(scope.row.applyAmount) }}€</span
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="lastDueDate"
              label="Fecha de vebcimiento"
              width="220"
            >
            </el-table-column>
            <el-table-column prop="createTime" label="Tiempo de solicitud">
            </el-table-column>
            <el-table-column prop="totalLimitDays" width="160" label="Período">
            </el-table-column>
            <el-table-column prop="statusName" label="Status">
              <template slot-scope="scope">
                <span
                  :class="'_' + !isStatus ? scope.row.paymentStatus : '3001'"
                  >{{ getTitle(scope.row) }}</span
                >
              </template>
            </el-table-column>
            <el-table-column label="">
              <template slot-scope="scope">
                <div class="btn">
                  <el-button
                    type="text"
                    size="mini"
                    @click="onDetail(scope.row, scope.$index)"
                    >View</el-button
                  >
                  <el-button
                    v-show="showContract(scope.row.paymentStatus)"
                    type="text"
                    size="mini"
                    @click="onShowThirdPartContract(scope.row.paymentId)"
                    >Contrato de préstamo</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
          <p v-if="loading" class="loading">Cargando...</p>
          <p v-if="noMore" class="loading">Soy la línea final</p>
        </div>
      </div>
    </div>
    <el-dialog
      title="Acuerdo de préstamo"
      top="6vh"
      :visible.sync="isShowContract"
      width="80%"
      custom-class="custom-popup"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <pdf v-if="isShowContract" :resource-id="resourceId"></pdf>
    </el-dialog>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
import { loan } from '@/api/index';
import dayjs from 'dayjs';
import { numFormat, debounceFunc } from '@/utils/index.client';
import Pdf from '@/components/pc-loan/Pdf.vue';
const { apiGetLoanLog } = loan;
export default {
  components: {
    Pdf,
  },
  data() {
    return {
      isStatus: false,
      formData: {
        startDate: dayjs().subtract(60, 'days').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
      },
      pagination: {
        pageSize: 20,
        current: 1,
      },
      noMore: false,
      loading: false,
      logList: [],
      threshold: 100,
      logLen: 0,
      pickerOptionsStart: {
        disabledDate: (time) => {
          return time.getTime() > this.startMax.getTime();
        },
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          return time.getTime() < this.endMin.getTime() - 8.64e7;
        },
      },
      isShowContract: false,
      resourceId: '',
    };
  },
  computed: {
    startMax() {
      const start = new Date(
        dayjs(this.format1(this.formData.endDate)).format('YYYY-MM-DD')
      );
      return start;
    },
    endMin() {
      const end = new Date(
        dayjs(this.format1(this.formData.startDate)).format('YYYY-MM-DD')
      );
      return end;
    },
  },
  mounted() {
    this.getData();
    document
      .querySelector('.pc-sys-wrapper')
      .addEventListener('scroll', debounceFunc(this.setTriggerCondition, 500));
  },
  methods: {
    setTriggerCondition() {
      const ele = document.querySelector('.pc-sys-wrapper');
      const scrollHei = ele.scrollHeight;
      const scrollTop = ele.scrollTop;
      const viewHei = ele.clientHeight;
      if (scrollHei - scrollTop - viewHei <= this.threshold) {
        if (this.logLen >= this.pagination.pageSize) {
          this.getData();
        }
      }
    },
    formatMoney(val) {
      return numFormat(Number(val), '.');
    },
    formatDate(d) {
      return dayjs(d).format('DD-MM-YYYY');
    },
    format2(d) {
      if (!d) return '-';

      const o = (d + '').split('-');
      if (o.length >= 3) {
        return this.formatDate(o[2] + o[1] + o[0]);
      }
      return '-';
    },
    format1(d) {
      if (!d) return '';

      const o = (d + '').slice(0, 10).split(/[-/]/g);
      if (o.length >= 3) {
        let date = '';
        if (o[0].length > 2) {
          date = o[0] + o[1] + o[2];
        } else {
          date = o[2] + o[1] + o[0];
        }
        return date;
      }
      return '-';
    },
    getData(done) {
      if (this.loading) return;
      this.loading = true;
      apiGetLoanLog({
        startDate: dayjs(this.format1(this.formData.startDate)).format(
          'YYYY-MM-DD'
        ),
        endDate: dayjs(this.format1(this.formData.endDate)).format(
          'YYYY-MM-DD'
        ),
        pageSize: this.pagination.pageSize,
        pageNo: this.pagination.current,
      })
        .then((res) => {
          this.logList.push(...(res || []));
          this.logList.map((_) => {
            return {
              ..._,
              createTime: this.formatDate(this.format1(_.createTime)),
              lastDueDate: this.format2(_.lastDueDate),
              statusName: this.getTitle(_),
            };
          });
          this.pagination.current++;
          this.logLen = res && (res.length || 0);
          if (this.logLen < this.pagination.pageSize) {
            this.noMore = true;
          } else {
            // this.pagination.current = 1;
            this.noMore = false;
            // this.logList = [];
          }
        })
        .finally(() => {
          done && done();
          this.loading = false;
        });
    },
    onChange(val) {
      if (this.pagination.current !== 1) {
        this.pagination.current = 1;
      }
      this.logList = [];
      this.getData();
    },
    onLoadMore(done) {
      this.pagination.current++;
      this.getData(done);
    },
    onRefresh(done) {
      this.pagination.current = 1;
      this.noMore = false;
      this.logList = [];

      this.getData(done);
    },
    getTitle(o) {
      const list = o.loanList?.filter((item) => {
        return item.status === 3001;
      });
      if (o.paymentStatus === 3001 || list.length > 0) {
        this.isStatus = true;
        return this.$t('loanStatu.3001_1');
      }
      return this.$t(`loanStatu.${o.paymentStatus}`);
    },
    onDetail(o) {
      this.$store.commit('loan/setLogData', {
        ...o,
        title: this.getTitle(o),
      });
      this.$nextTick(() => {
        this.$router.push({
          name: `SysLogDetail___${this.$i18n.locale}`,
          query: {
            from: 'loan',
          },
        });
      });
    },
    showContract(status) {
      const convertStatus = Number(status);
      const stautsList = [2002, 3001, 3002, 4001];
      return stautsList.includes(convertStatus);
    },
    onShowThirdPartContract(id) {
      this.resourceId = id;
      this.isShowContract = true;
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
