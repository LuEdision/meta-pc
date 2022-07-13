<template>
  <section class="pc-mail">
    <div class="pc-mail_wrapper">
      <div class="pc-mail_header">
        <div class="pc-mail_header__title">{{ $t('mailTitle') }}</div>
        <div class="pc-mail_header__content" v-html="$t('mailTip')"></div>
      </div>
      <div class="pc-mail_body">
        <!-- <div class="pc-mail_body__mobile">
          <img :src="mobileSvg" alt="Mib" />
        </div> -->
        <div class="pc-mail_body__mail">
          <img :src="mailSvg" alt="Mib" />{{ $t('email') }}
        </div>
        <!-- <div class="pc-mail_body__contact">
          <img :src="msgSvg" alt="Mib" /><a
            :href="mailInfo"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ $t('message') }}
          </a>
        </div> -->
      </div>
      <div class="pc-mail_footer">
        <div class="pc-mail_footer__content">To: <span>Meta</span></div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
import mailSvg from '@/assets/img/es/icon_email@2x.png';
import mobileSvg from '@/assets/img/es/icon_phone@2x.png';
import msgSvg from '@/assets/img/es/icon_chat@2x.png';
export default {
  name: 'PcMail',
  props: {
    mailInfo: {
      type: [String, Object, Array],
      default: () => null,
    },
  },
  data() {
    return {
      mailSvg: mailSvg,
      mobileSvg: mobileSvg,
      msgSvg: msgSvg,
    };
  },
  computed: {
    ...mapGetters(['setting']),
    facebookUrl() {
      const o = this.setting.appConfig;
      return (o && o.facebookUrl) || '';
    },
  },
};
</script>
