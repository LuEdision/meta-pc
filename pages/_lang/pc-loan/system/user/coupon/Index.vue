<template>
  <section class="pc-sys">
    <div class="pc-sys-wrapper pc-sys-modify">
      <div class="pc-sys-container sys-modify">
        <div class="pc-sys-left">
          <section class="coupon-usable">
            <div class="coupon-title">Puedo Usar</div>
            <div class="coupon-tips">
              Nota: Solamente se puede usar un cupón a la vez
            </div>
            <div class="coupon-list">
              <div
                v-for="(item, index) in list"
                v-show="item.isUsable === 0"
                :key="index"
                class="coupon-list-item"
              >
                <div class="coupon-custom">
                  <div class="coupon-item_title">
                    <div class="coupon-item_money">
                      {{ item.value }}<span>€</span>
                    </div>
                    <img class="nut-icon" :src="item.img" />
                  </div>

                  <div class="coupon-item_content">
                    <div class="coupon-item_label">{{ item.title }}</div>
                    <span class="coupon-item_date"
                      >Tiempo de expiración: {{ item.dueDate }}</span
                    >
                    <el-button plain type="primary">Aplicar</el-button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="coupon-unusable">
            <div class="coupon-title">Indisponible</div>
            <div class="coupon-tips">
              Nota: Solamente se puede usar un cupón a la vez
            </div>
            <div class="coupon-list">
              <div
                v-for="(item, index) in list"
                v-show="item.isUsable !== 0"
                :key="index"
                class="coupon-list-item disabled"
              >
                <div class="coupon-custom">
                  <div class="coupon-item_title">
                    <div class="coupon-item_money">
                      {{ item.value }}<span>€</span>
                    </div>
                    <img class="nut-icon" :src="item.img" />
                  </div>
                  <div class="coupon-item_content">
                    <div class="coupon-item_label">{{ item.title }}</div>
                    <span class="coupon-item_date"
                      >Tiempo de expiración: {{ item.dueDate }}</span
                    >
                    <el-button type="text" :disabled="true">{{
                      item.isUsable === 1 ? 'Usado' : 'Caducado'
                    }}</el-button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import dayjs from 'dayjs';
import coupon100 from '@/assets/img/coupon/coupon100.png';
import coupon500 from '@/assets/img/coupon/coupon500.png';
import couponDisabled from '@/assets/img/coupon/coupon_disabled.png';
import interest from '@/assets/img/coupon/interest.png';

export default {
  data() {
    return {
      tabValue: 0,
      list: [
        // {
        //   img: coupon100,
        //   title: 'Cupón de reembolso',
        //   value: 100,
        //   dueDate: dayjs(new Date()).format('DD-MM-YYYY'),
        //   isUsable: 0,
        // },
        // {
        //   img: coupon500,
        //   title: 'Cupón de aumento de crédito',
        //   value: 500,
        //   dueDate: dayjs(new Date()).format('DD-MM-YYYY'),
        //   isUsable: 0,
        // },
        // {
        //   img: interest,
        //   title: 'Descuento de intereses moratorios',
        //   value: 500,
        //   dueDate: dayjs(new Date()).format('DD-MM-YYYY'),
        //   isUsable: 0,
        // },
        // {
        //   img: interest,
        //   title: 'Descuento de intereses moratorios',
        //   value: 500,
        //   dueDate: dayjs(new Date()).format('DD-MM-YYYY'),
        //   isUsable: 0,
        // },
        // {
        //   img: interest,
        //   title: 'Descuento de intereses moratorios',
        //   value: 500,
        //   dueDate: dayjs(new Date()).format('DD-MM-YYYY'),
        //   isUsable: 0,
        // },
        // {
        //   img: interest,
        //   title: 'Descuento de intereses moratorios',
        //   value: 500,
        //   dueDate: dayjs(new Date()).format('DD-MM-YYYY'),
        //   isUsable: 0,
        // },
        // {
        //   img: interest,
        //   title: 'Descuento de intereses moratorios',
        //   value: 500,
        //   dueDate: dayjs(new Date()).format('DD-MM-YYYY'),
        //   isUsable: 0,
        // },
        // {
        //   img: interest,
        //   title: 'Descuento de intereses moratorios',
        //   value: 500,
        //   dueDate: dayjs(new Date()).format('DD-MM-YYYY'),
        //   isUsable: 0,
        // },
        // {
        //   img: interest,
        //   title: 'Descuento de intereses moratorios',
        //   value: 500,
        //   dueDate: dayjs(new Date()).format('DD-MM-YYYY'),
        //   isUsable: 0,
        // },
        // {
        //   img: couponDisabled,
        //   title: 'Cupón de reembolso',
        //   value: 100,
        //   dueDate: dayjs(new Date()).format('DD-MM-YYYY'),
        //   isUsable: 1,
        // },
        // {
        //   img: couponDisabled,
        //   title: 'Cupón de aumento de crédito',
        //   value: 500,
        //   dueDate: dayjs(new Date()).format('DD-MM-YYYY'),
        //   isUsable: 2,
        // },
      ],
    };
  },
  methods: {
    onChange: (item) => {},
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
