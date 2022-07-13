<template>
  <section class="pc-sys">
    <div class="pc-sys-wrapper pc-sys-modify">
      <div class="pc-sys-container sys-modify modify-info_body">
        <div class="pc-sys-left">
          <div class="modify-info_label">
            <i class="el-icon-lock"></i>
            <p>
              Estimado usuario,le informamos en este apartado que sus datos
              peronales se encuentran protegidos.
            </p>
          </div>

          <div v-show="showLoanTip" class="modify-info_label2">
            <p>
              Como prestamistas responsables, queremos asegurarnos que
              entendemos cuánto puedes permitirte solicitar.
            </p>

            <i class="el-icon-circle-close" @click="onCloseTip"></i>
          </div>
          <el-form
            ref="formData"
            :model="formData"
            :rules="rules"
            label-width=""
            class="formData"
          >
            <!-- 个人信息 -->
            <div class="m-form-title">Datos personales</div>
            <el-form-item label="Nombre" prop="firstName">
              <el-input
                v-model="formData.firstName"
                placeholder="Escriba el nombre de su DNI"
                @input="doNotNumber"
              ></el-input>
            </el-form-item>
            <el-form-item label="Apellido" prop="lastName">
              <el-input
                v-model="formData.lastName"
                placeholder="Escriba su primer apellido de su DNI"
                @input="doNotNumber2"
              ></el-input>
            </el-form-item>
            <el-form-item label="Segundo apellido" prop="lastMotherName">
              <el-input
                v-model="formData.lastMotherName"
                placeholder="Escriba su segundo apellido de su DNI"
                @input="doNotNumber3"
              ></el-input>
            </el-form-item>
            <el-form-item label="Fecha de nacimiento" prop="birthday">
              <el-date-picker
                v-model="formData.birthday"
                type="date"
                popper-class="custom-date"
                placeholder="Fecha de nacimiento"
                format="dd-MM-yyyy"
                :picker-options="pickerOptions"
                :default-value="maxDate"
                @focus="onDateFocus"
                @change="onSetVal"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="Número de DNI" prop="nationalId">
              <el-input
                v-model="formData.nationalId"
                placeholder="xxxxxxxxx"
                maxlength="9"
                :disabled="isEdit"
                @change="verifyDNI"
              ></el-input>
            </el-form-item>
            <el-form-item label="Correo electrónico personal" prop="email">
              <el-autocomplete
                v-model="formData.email"
                :fetch-suggestions="querySearch"
                :placeholder="$t('mailPlaceholder')"
                :trigger-on-focus="false"
                @select="handleSelect"
                @change="onChange"
              ></el-autocomplete>
            </el-form-item>
            <!-- 工作信息 -->
            <div class="m-form-title">Datos de empleo</div>
            <el-form-item label="Nombre de la empresa" prop="companyName">
              <el-input
                v-model="formData.companyName"
                placeholder="lngrese el nombre de su empresa"
              ></el-input>
            </el-form-item>
            <el-form-item label="Situación laboral" prop="workStatus">
              <el-select
                v-model="formData.workStatus"
                placeholder="Situación laboral"
              >
                <el-option
                  v-for="item in scheme.WORK_STATUS"
                  :key="item.value"
                  :label="$t(item.label)"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              v-show="false"
              label="Frecuencia de recibo de ingreso"
              prop="payrollCycle"
            >
              <el-select
                v-model="formData.payrollCycle"
                placeholder="Frecuencia de recibo de ingreso"
              >
                <el-option
                  v-for="item in scheme.PAY_PERIOD"
                  :key="item.value"
                  :label="$t(item.label)"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="Ingreso mensual" prop="income">
              <el-select
                v-model="formData.income"
                placeholder="Ingreso mensual"
              >
                <el-option
                  v-for="item in scheme.MONTHLY_INCOME"
                  :key="item.value"
                  :label="$t(item.label)"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="¿Qué día recibes tu nómina/ingresos (aprox)?"
              prop="payDay"
            >
              <el-select
                v-model="formData.payDay"
                placeholder="¿Qué día recibes tu nómina/ingresos (aprox)?"
              >
                <el-option
                  v-for="item in payDayOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 地址信息 -->
            <div class="m-form-title">Datos de domicilio</div>
            <el-form-item label="Código postal" prop="postalCode">
              <el-input
                v-model="formData.postalCode"
                placeholder="xxxxx"
                maxlength="5"
                @input="verifyNum"
              ></el-input>
            </el-form-item>

            <el-form-item
              v-show="
                formData.postalCode &&
                formData.postalCode.length === 5 &&
                showCity
              "
              label="Comunidad autónoma"
              prop="province"
            >
              <el-select
                v-model="formData.province"
                placeholder="Comunidad autónoma"
              >
                <el-option
                  v-for="item in provinceOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-show="
                formData.postalCode &&
                formData.postalCode.length === 5 &&
                showCity
              "
              label="Provincia"
              prop="city"
            >
              <el-select v-model="formData.city" placeholder="Provincia">
                <el-option
                  v-for="item in cityOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              v-show="
                formData.postalCode &&
                formData.postalCode.length === 5 &&
                showCity
              "
              label="Municipio o población"
              prop="colony"
            >
              <el-select
                v-model="formData.colony"
                placeholder="Municipio o población"
              >
                <el-option
                  v-for="item in colonyOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              v-show="
                formData.postalCode &&
                formData.postalCode.length === 5 &&
                showCity
              "
              label="Nombre de la calle o población"
              prop="street"
            >
              <el-select
                v-model="formData.street"
                placeholder="Nombre de la calle o población"
              >
                <el-option
                  v-for="item in streetOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item :label="$t('detailAddrerr')" prop="currentAddress">
              <el-input
                v-model="formData.currentAddress"
                placeholder="Introduzca el número y el resto de datos de la dirección"
              ></el-input>
            </el-form-item>

            <el-form-item label="Estado civil" prop="maritalStatus">
              <el-select
                v-model="formData.maritalStatus"
                placeholder="Estado civil"
              >
                <el-option
                  v-for="item in scheme.MARITAL_STATUS"
                  :key="item.value"
                  :label="$t(item.label)"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                :loading="loading"
                data-option="web_clicknextstep3"
                @click="onSubmit('formData')"
                ><span data-option="web_clicknextstep3"
                  >Siguiente</span
                ></el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div class="pc-sys-right">
          <pc-mail :mail-info="facebookUrl"></pc-mail>
        </div>
      </div>
    </div>
    <el-dialog
      title="Proceso sencillo para tu préstamo"
      :visible.sync="dialogVisible"
      top="20vh"
      width="25%"
      center
      :show-close="false"
      :before-close="handleClose"
    >
      <div class="user-modify">
        <img :src="yesImg" />Hasta <span>1.000 €</span>
      </div>
      <div class="user-modify">
        <img :src="yesImg" />Solicitud de <span>3 minutos</span>
      </div>
      <div class="user-modify">
        <img :src="yesImg" />Depósito en <span>3 minutos</span>
      </div>
      <div class="user-modify">
        <img :src="yesImg" /><span>Tasa de</span> interés baja
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button data-option="web_basic_info_back" @click="onLeave"
          ><span data-option="web_basic_info_back">{{
            $t('leave')
          }}</span></el-button
        >
        <el-button
          type="primary"
          data-option="web_basic_info_back"
          @click="onStop"
          ><span data-option="web_basic_info_back">{{
            $t('continues')
          }}</span></el-button
        >
      </span>
    </el-dialog>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
import { user, utils } from '@/api/index';
import { pushHistory } from '@/utils/index.client';
import dayjs from 'dayjs';
import yesImg from '@/assets/img/gou@2x.png';
import PcMail from '@/components/pc-loan/mailContainer.vue';

const { apiGetFullUserinfo, apiUpdateUserinfo } = user;
const { apiQueryPlace } = utils;
export default {
  components: {
    PcMail,
  },
  directives: {
    focus: {
      // 指令的定义
      mounted(el) {
        el.focus();
      },
    },
  },
  data() {
    return {
      isStop: false,
      timer: null,
      dialogVisible: false,
      showLoanTip: false,
      loading: false,
      showClear: false,
      formData: {
        firstName: '',
        lastName: '',
        lastMotherName: '',
        birthday: '',
        nationalId: '',
        email: '',
        companyName: '',
        workStatus: '',
        payrollCycle: '',
        income: '',
        postalCode: '',
        city: '',
        province: '', // 西班牙暂时没有省份
        colony: '', // 镇
        street: '', // 街区
        currentAddress: '',
        maritalStatus: '',
        payDay: '',
      },
      placeList: [],
      showCity: false, // 需要等邮编查询有结果才显示
      citySelectShow: false,
      streetShow: false,
      streetSelectShow: false,
      provinceShow: false,
      colonySelectShow: false,
      isEdit: false,
      isSubmit: false,
      routeQuery: this.$route.query,
      minDate: new Date(new Date().getFullYear() - 60 + 1, 0, 1),
      maxDate: new Date(new Date().getFullYear() - 14, 0, 1),
      restaurants: [],
      email: '',
      isBack: false,
      yesImg: yesImg,
      rules: {
        firstName: [
          {
            required: true,
            message: 'Escriba el nombre de su DNI',
            trigger: 'blur',
          },
          { validator: this.validatePass, trigger: ['blur', 'change'] },
        ],
        lastName: [
          {
            required: true,
            message: 'Escriba su primer apellido de su DNI',
            trigger: 'blur',
          },
        ],
        birthday: [
          {
            type: 'date',
            required: true,
            message: 'Fecha de nacimiento',
            trigger: 'change',
          },
        ],
        nationalId: [
          {
            required: true,
            message: 'Introduzca un DNI correcto',
            trigger: 'blur',
          },
          { min: 9, max: 9, message: '9 caracteres de largo', trigger: 'blur' },
          { validator: this.checkDNI, trigger: ['change', 'blur'] },
        ],
        email: [
          {
            required: true,
            message: 'Correo electrónico personal',
            trigger: ['change', 'blur'],
          },
        ],
        companyName: [
          { required: true, message: 'Nombre de la empresa', trigger: 'blur' },
        ],
        workStatus: [
          {
            required: true,
            message: 'Seleccione Situación laboral',
            trigger: 'change',
          },
        ],
        income: [
          {
            required: true,
            message: 'Por favor seleccione Ingreso mensual',
            trigger: 'change',
          },
        ],
        payDay: [
          {
            required: true,
            message: '¿Qué día recibes tu nómina/ingresos (aprox)?',
            trigger: 'change',
          },
        ],
        postalCode: [
          {
            required: true,
            message: 'Por favor ingrese el código postal',
            trigger: 'blur',
          },
          { validator: this.validatePass2, trigger: ['blur', 'change'] },
        ],
        province: [
          {
            required: true,
            message: 'Por favor selecciona Comunidad autónoma',
            trigger: 'change',
          },
        ],
        city: [
          {
            required: true,
            message: 'Por favor elija Provincia',
            trigger: 'change',
          },
        ],
        colony: [
          {
            required: true,
            message: 'Por favor elija Municipal o población',
            trigger: 'change',
          },
        ],
        street: [
          {
            required: true,
            message: 'Por favor elija Nombre de la calle o población',
            trigger: 'change',
          },
        ],
        maritalStatus: [
          {
            required: true,
            message: 'Por favor elija Estado civil',
            trigger: 'change',
          },
        ],
      },
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() >
              new Date(new Date().getFullYear() - 14, 0, 1).getTime() ||
            time.getTime() <
              new Date(new Date().getFullYear() - 60 + 1, 0, 1).getTime()
          );
        },
      },
    };
  },
  computed: {
    ...mapGetters(['scheme', 'setting', 'bank']),
    facebookUrl() {
      const o = this.setting.appConfig;
      return (o && o.facebookUrl) || '';
    },
    payDayOpt() {
      return Array.from(new Array(31).keys()).map((_) => {
        const v = _ + 1 + '';
        return {
          label: v,
          value: v,
        };
      });
    },
    formatDate() {
      return 'DD/MM/YYYY';
    },
    provinceOpt() {
      const l = this.placeList;
      const obj = {};
      l.forEach((item) => {
        if (!obj[item.province]) {
          obj[item.province] = [item.province];
        } else {
          if (!obj[item.province].includes(item.province)) {
            // 不存在才push进去
            obj[item.province].push(item.province);
          }
        }
      });

      const res = [];
      for (let i in obj) {
        res.push(i);
      }
      const num = res.findIndex((_) => _ === this.formData.province);
      let listData = [];
      listData = res.map((_) => {
        return {
          label: _,
          value: _,
        };
      });

      return listData;
    },
    cityOpt() {
      const { province, city } = this.formData;
      const l = this.placeList.filter((_) => {
        return _.province === province;
      });

      const obj = {};
      l.forEach((item) => {
        if (!obj[item.city]) {
          obj[item.city] = [item.city];
        } else {
          if (!obj[item.city].includes(item.city)) {
            // 不存在才push进去
            obj[item.city].push(item.city);
          }
        }
      });

      const res = [];
      for (let i in obj) {
        res.push(i);
      }

      const num = res.findIndex((_) => _ === this.formData.city);
      let listData = [];
      listData = res.map((_) => {
        return {
          label: _,
          value: _,
        };
      });

      return listData;
    },

    colonyOpt() {
      const { province, city } = this.formData;
      const l = this.placeList.filter((_) => {
        return _.province === province && _.city === city;
      });

      // todo 后期可优化
      const obj = {};
      l.forEach((item) => {
        if (!obj[item.colony]) {
          obj[item.colony] = [item.colony];
        } else {
          if (!obj[item.colony].includes(item.colony)) {
            // 不存在才push进去
            obj[item.colony].push(item.colony);
          }
        }
      });

      const res = [];
      for (let i in obj) {
        res.push(i);
      }
      const num = res.findIndex((_) => _ === this.formData.colony);
      let listData = [];
      listData = res.map((_) => {
        return {
          label: _,
          value: _,
        };
      });

      return listData;
    },
    streetOpt() {
      const { province, city, colony } = this.formData;
      const l = this.placeList.filter((_) => {
        return (
          _.province === province && _.city === city && _.colony === colony
        );
      });

      // todo 后期可优化
      const obj = {};
      l.forEach((item) => {
        if (!obj[item.street]) {
          obj[item.street] = [item.street];
        } else {
          if (!obj[item.street].includes(item.street)) {
            // 不存在才push进去
            obj[item.street].push(item.street);
          }
        }
      });

      const res = [];
      for (let i in obj) {
        res.push(i);
      }
      const num = res.findIndex((_) => _ === this.formData.street);
      let listData = [];
      listData = res.map((_) => {
        return {
          label: _,
          value: _,
        };
      });

      return listData;
    },
  },

  watch: {
    'formData.province'(v) {
      if (v) {
        this.streetShow = true;
      } else {
        this.streetShow = false;
      }
    },
    $route: {
      handler(newVal, oldVal) {},
      immediate: true,
    },
  },
  created() {
    this.dialogVisible = false;
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener(
        'popstate',
        (e) => this.historyCallback(e),
        false
      );
    }
  },

  mounted() {
    this.getInfo();
    this.restaurants = this.loadAll();
  },
  unmounted() {
    window.removeEventListener(
      'popstate',
      (e) => this.historyCallback(e),
      false
    );
  },
  methods: {
    doNotNumber(val) {
      if (!/^([^0-9]*)$/.test(val)) {
        this.formData.firstName = this.formData.firstName.replace(
          /([0-9]*)$/,
          ''
        );
      }
    },
    doNotNumber2(val) {
      if (!/^([^0-9]*)$/.test(val)) {
        this.formData.lastName = this.formData.firstName.replace(
          /([0-9]*)$/,
          ''
        );
      }
    },
    doNotNumber3(val) {
      if (!/^([^0-9]*)$/.test(val)) {
        this.formData.lastMotherName = this.formData.firstName.replace(
          /([0-9]*)$/,
          ''
        );
      }
    },
    validatePass(rule, value, callback) {
      const p2 = value.trim();
      if (!value) {
        return callback(new Error('Escriba el nombre de su DNI'));
      } else if (!/^([^0-9]*)$/.test(p2)) {
        return callback(new Error('No se permiten números'));
      } else {
        return callback();
      }
    },
    validatePass2(rule, value, callback) {
      const p2 = value.trim();
      setTimeout(() => {
        if (!value) {
          return callback(new Error('Por favor ingrese el código postal'));
        } else if (this.placeList.length === 0 && p2.length === 5) {
          return callback(new Error(this.$t('postalCodeError')));
        } else {
          return callback();
        }
      }, 3000);
    },
    checkDNI(rule, value, callback) {
      const v = value + '';
      this.formData.nationalId = v;

      if (v.length < 9) {
        // 号码过长
        return callback(new Error('9 caracteres de largo'));
      }

      if (!/^\d{8}[a-zA-Z]$/.test(v)) {
        // 正则校验失败
        return callback(new Error('Introduzca un DNI correcto'));
      }
      return callback();
    },
    handleClose() {},
    onLeave() {
      this.dialogVisible = false;
      this.isStop = true;
      this.$router.push({
        path: '/sys',
      });
    },
    onStop() {
      this.dialogVisible = false;
      this.isStop = true;
      clearTimeout(this.timer);
      this.timer = null;
      this.$router.go(1);
    },
    unloadPage(e) {
      let that = this;
      if (that.$route.fullPath == '/sys/user/modify') {
        e = e || window.event;
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
          //   that
          //     .$confirm(
          //       `<div class="user-modify"><img src="${that.yesImg}" />Hasta <span>1.000 €</span></div>
          //               <div class="user-modify"><img src="${that.yesImg}" />Solicitud de <span>3 minutos</span></div>
          //               <div class="user-modify"><img src="${that.yesImg}" />Depósito en <span>3 minutos</span></div>
          //               <div class="user-modify"><img src="${that.yesImg}" /><span>Tasa de</span> interés baja</div>`,
          //       'Proceso sencillo para tu préstamo',
          //       {
          //         confirmButtonText: that.$t('continues'),
          //         cancelButtonText: that.$t('leave'),
          //         dangerouslyUseHTMLString: true,
          //       }
          //     )
          //     .then((_) => {

          //     })
          //     .catch((_) => {
          //       that.$router.push({
          //         path: '/sys',
          //       });
          //     });
          e.returnValue = false;
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return false;
      } else {
        window.removeEventListener(
          'beforeunload',
          (e) => this.unloadPage(e),
          false
        );
      }
    },
    querySearch(queryString, cb) {
      const restaurants = this.restaurants;
      const results = queryString
        ? restaurants.map((_) => {
            return {
              value: _.value,
              address: _.address,
            };
          })
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    loadAll() {
      return [
        { value: '@gmail.com', address: '@gmail.com' },
        {
          value: '@yahoo.com',
          address: '@yahoo.com',
        },
        {
          value: '@ymail.com',
          address: '@ymail.com',
        },
        { value: '@live.com', address: '@live.com' },
        {
          value: '@hotmail.com',
          address: '@hotmail.com',
        },
        { value: '@aol.com', address: '@aol.com' },
        {
          value: '@webmail.co.za',
          address: '@webmail.co.za',
        },
        {
          value: '@vodamail.co.za',
          address: '@vodamail.co.za',
        },
        { value: '@iafrica.com', address: '@iafrica.com' },
      ];
    },
    onChange(val) {
      this.email = val;
      const reg = /^([a-zA-Z\d])(\w|-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/;
      if (reg.test(val)) {
        this.formData.email = val;
      }
    },
    handleSelect(item) {
      this.formData.email = this.email.replace(/@.*/gi, '') + item.value;
    },
    valueBlur(e) {
      setTimeout(() => {
        this.showClear = false;
      });
    },
    verifyNum(str) {
      // const reg = /[^\d]/g;
      // const matchRet = this.formData.postalCode
      //   .toString()
      //   .replace(reg, '')
      //   .slice(0, num ?? 5);
      // this.formData.postalCode = matchRet;
      if (str.length === 5) {
        this.onGetPlace();
      } else {
        this.onPlaceClear();
        this.clearPlace();
      }
    },
    historyCallback(event) {
      if (this.$route.path.indexOf('/sys/user/modify') > -1) {
        this.isBack = true;
        if (this.isStop) {
          this.dialogVisible = false;
          this.isStop = false;
        } else {
          this.dialogVisible = true;
        }
        // this.$confirm(
        //   `<div class="user-modify"><img src="${this.yesImg}" />Hasta <span>1.000 €</span></div>
        //               <div class="user-modify"><img src="${this.yesImg}" />Solicitud de <span>3 minutos</span></div>
        //               <div class="user-modify"><img src="${this.yesImg}" />Depósito en <span>3 minutos</span></div>
        //               <div class="user-modify"><img src="${this.yesImg}" /><span>Tasa de</span> interés baja</div>`,
        //   'Proceso sencillo para tu préstamo',
        //   {
        //     confirmButtonText: this.$t('continues'),
        //     cancelButtonText: this.$t('leave'),
        //     dangerouslyUseHTMLString: true,
        //     showClose: false,
        //   }
        // )
        //   .then((_) => {
        //     this.$router.go(1);
        //     return true;
        //   })
        //   .catch((_) => {
        //     if (_ === 'cancel') {
        //       this.$router.go(-1);
        //     }
        //   });
      }
    },
    verifyDNI(val) {
      this.formData.nationalId = val.toUpperCase();
    },
    getInfo() {
      apiGetFullUserinfo().then((res) => {
        const o = this.formData;
        this.showLoanTip =
          res.rewrite === 'N' || !!res.postalCode ? false : true;
        if (this.showLoanTip) {
          this.onShowTip();
        }
        for (let key in o) {
          o[key] = res[key] || '';
          if (key === 'birthday') {
            o[key] = res[key]
              ? dayjs(this.format1(res[key])).toDate() || new Date()
              : '';
          }
        }

        this.isEdit = res.nationalId ? true : false;

        const { job_info } = res;

        o['companyName'] = (job_info && job_info.companyName) || '';
        o['workStatus'] = (job_info && job_info.workStatus) || '';
        o['payrollCycle'] = (job_info && job_info.payrollCycle) || '';
        o['income'] = (job_info && job_info.income) || '';
        o['payDay'] = (job_info && job_info.payDay) || '';

        if (o['province'] && o['postalCode']) {
          this.showCity = true; // 默认
        }
        if (this.formData.postalCode) {
          this.placeProxy();
        }
      });
    },
    onScroll2Mail() {
      document
        .querySelector('.modify-info_body')
        .scrollTo({ top: 550, behavior: 'smooth' });
    },
    onSelectPlace(o) {
      this.formData.street = o.street;
      this.formData.colony = o.colony;
      this.formData.city = o.city;
      this.formData.province = o.province;
    },
    onPlaceClear() {
      this.placeList = [];
    },
    clearPost() {
      this.formData.postalCode = '';
      this.onPlaceClear();
      this.clearPlace();
    },
    clearPlace() {
      // 切换邮编时 清空所有已填写的内容 直到找到对应值 并手动更改
      this.formData.city = null;
      this.formData.province = null;
      this.formData.street = null;
      this.formData.colony = null;
      this.formData.currentAddress = null;
    },
    onGetPlace() {
      const t = this.formData.postalCode.trim();
      this.showCity = false;

      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.placeProxy();
      }, 1000);
    },
    placeProxy() {
      this.placeList = [];

      apiQueryPlace({
        postalCode: this.formData.postalCode,
      })
        .then((res) => {
          this.placeList = res || [];
          this.showCity = true;
        })
        .finally(() => {
          // this.clearPlace();
          if (this.placeList.length === 0) {
            this.showCity = false;
            this.clearPlace();
            this.$message({
              type: 'error',
              message: this.$t('postalCodeError'),
              duration: 2000,
            });
          }
        });
    },
    onCloseTip() {
      this.showLoanTip = false;
    },
    onShowTip() {
      // this.showLoanTip = true;
      document
        .querySelector('.modify-info_body')
        .scrollTo({ top: 100, behavior: 'smooth' });
    },
    onSubmit(formName) {
      // if (this.checkFrom()) {
      //   return;
      // }

      // if (!this.showLoanTip) {
      //   this.onShowTip();
      //   return;
      // }
      this.$store.commit('bank/setOpenBank', 0);
      this.$store.commit('bank/setBankCard', 0);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm(this.$t('modifyPop'), this.$t('wellTip'), {
            confirmButtonText: this.$t('yes'),
            cancelButtonText: this.$t('no'),
            confirmButtonClass: 'msg-confirm-box',
            cancelButtonClass: 'msg-cancel-box',
            type: 'warning',
            center: true,
          })
            .then((_) => {
              this.updateProxy();
            })
            .catch((_) => {});
        } else {
          return false;
        }
      });
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
    updateProxy() {
      if (this.loading) return;
      this.loading = true;

      const o = this.formData;
      apiUpdateUserinfo({
        ...o,
        birthday: dayjs(o.birthday).format(this.formatDate),
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: this.$t('oprSuccess'),
            duration: 2000,
          });
          this.$router.push({
            name: `SysBankPre___${this.$i18n.locale}`,
            query: {
              from: 'info',
            },
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onDateFocus(e) {
      const eleItemWidth = document.querySelector('.el-form-item').clientWidth;
      this.$nextTick(() => {
        const ele = document.querySelector('.custom-date');
        ele.style.width =
          eleItemWidth /
            Number(
              document.documentElement.style.fontSize.replace('px', '') ?? 100
            ) +
          'rem';
      });
    },
    onSetVal(val) {
      // this.formData.birthday = val;
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
