<template>
  <el-descriptions-item
    v-if="
      item.status === 3002 && item.hasPenaltyFree && !formatInterestWaiver(item)
    "
  >
    <template slot="label">
      <div class="step-pay-item_title waiver">
        <el-tooltip
          class="item"
          effect="dark"
          :content="`Si paga en los ${item.noPenaltyDays} primeros días
                        desde la fecha de vencimiento, cancelaremos esta
                        comisión por demora.`"
          placement="bottom-start"
        >
          <img :src="tipImg" alt="Mib" />
        </el-tooltip>
        {{ $t('loan.interestWaiver') }}
      </div>
    </template>

    <div class="step-pay-item_content waiver">
      {{
        item.realSurplusPenaltyAmount ? '-' + item.realSurplusPenaltyAmount : 0
      }}
    </div>
  </el-descriptions-item>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    formatInterestWaiver(item) {
      const dueDays = Number(item.overdueDays ?? 0);
      const noPenaltyDays = Number(item.noPenaltyDays ?? 0);
      return dueDays - noPenaltyDays > 0 ? true : false;
    },
  },
};
</script>
