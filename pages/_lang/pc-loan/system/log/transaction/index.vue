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
            <el-table-column prop="transAmount" label="Importe" width="200">
              <template slot-scope="scope">
                <span class="money" :class="scope.row.transStatus"
                  >{{ formatMoney(scope.row.transAmount) }}€</span
                >
              </template>
            </el-table-column>
            <el-table-column prop="transType" label="Nombre del gasto">
              <template slot-scope="scope">
                <span class="transtype" :class="scope.row.transStatus">{{
                  scope.row.transType
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="transTime" label="Tiempo de solicitud">
              <template slot-scope="scope">
                <span class="date">{{ formatDate(scope.row.transTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="transStatus" label="Estatus del pago">
              <template slot-scope="scope">
                <span class="status">{{
                  formatStatus(scope.row.transStatus)
                }}</span>
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
                </div>
              </template>
            </el-table-column>
          </el-table>
          <p v-if="loading" class="loading">Cargando...</p>
          <p v-if="noMore" class="loading">Soy la línea final</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
import { user } from '@/api/index';
import dayjs from 'dayjs';
import { numFormat, debounceFunc } from '@/utils/index.client';
const { apiCashLog } = user;
export default {
  data() {
    return {
      formData: {
        startDate: dayjs().subtract(30, 'days').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
      },
      pagination: {
        pageSize: 20,
        current: 1,
      },
      noMore: false,
      loading: false,
      logList: [],
      logLen: 0,
      threshold: 100,
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
    formatStatus(d) {
      return d === 'S' ? 'Exito' : d === 'F' ? 'Fracaso' : 'Procesando';
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

      apiCashLog({
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
    onChange() {
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
    onDetail(o) {
      this.$store.commit('loan/setLogData', o);
      this.$nextTick(() => {
        this.$router.push({
          path: 'detail/tran',
          query: {
            from: 'trans',
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
