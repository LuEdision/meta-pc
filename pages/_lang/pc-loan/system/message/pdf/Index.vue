<template>
  <pdf v-if="show" :resource-id="resourceId"></pdf>
</template>
<script>
import Cookies from 'js-cookie';
import Pdf from '@/components/pc-loan/Pdf.vue';
export default {
  components: {
    Pdf,
  },
  data() {
    return {
      show: false,
      resourceId: this.$route.params.rId || this.$route.query.rId,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.show = true;
    });
  },
};
</script>
