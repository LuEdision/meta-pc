<template>
  <div class="m-steps">
    <div v-for="(item, index) in list" :key="index" class="m-step">
      <div class="m-step-head">
        <div class="m-step-line"></div>
        <img slot="content" alt="mib" :src="item.icon" />
      </div>
      <div class="m-step-main">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script>
import step1 from '@/assets/img/step/1.png';
import step2 from '@/assets/img/step/2.png';
import step3 from '@/assets/img/step/3.png';
export default {
  computed: {
    list() {
      return [
        {
          name: 'Verificación de identidad',
          icon: step1,
        },
        {
          name: 'Análisis crediticio',
          icon: step2,
        },
        {
          name: 'Obtener dinero',
          icon: step3,
        },
      ];
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
