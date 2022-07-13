<template>
  <section class="pc-adds">
    <div class="pc-adds_maxAmount">{{ $t('maxAmount') }}</div>
    <div class="pc-adds_registertime">
      {{ $t('registerWay') }}<br />
      <div v-html="$t('registerTime')"></div>
    </div>
  </section>
</template>
<script>
import loan_add from '@/assets/img/pc/loan_add@2x.png';
export default {
  name: 'PcHeaderAdds',
  data() {
    return {
      loan_add: loan_add,
    };
  },
};
</script>
