<template>
  <section class="pc-sys">
    <div class="pc-sys-wrapper pc-sys-home invite-home">
      <div class="pc-sys-container home">
        <div class="pc-sys-left invite">
          <div class="left-invite_title">{{ $t('inviteFriends') }}</div>
          <div class="left-invite_body">
            <div
              v-for="(item, index) in inviteList"
              :key="index"
              class="invite-item"
              @click="onShare(item.title)"
            >
              <div class="invite-item_img">
                <img :src="item.url" :alt="item.label" />
              </div>
              <span class="invite-appname">{{ item.title }}</span>
              <div class="invite-btn">
                <el-button type="primary" plain>Invitación</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="pc-sys-right">
          <div class="right-invite_title">Mi código de invitación</div>
          <div class="right-invite_steps">
            {{ inviteCode }}
          </div>
          <div class="right-invite_footer">
            <el-button type="primary" @click="onCopy">{{ copyText }}</el-button>
          </div>
        </div>
      </div>
    </div>
    <pc-footer></pc-footer>
  </section>
</template>
<script>
import PcFooter from '@/components/pc-loan/footer.vue';
import { mapGetters } from 'vuex';
import { user } from '@/api/index';
import {
  copyToClip,
  sendSms,
  sendMail,
  openWhatsapp,
  openMessenger,
  openTwitter,
  openInstagram,
} from '@/utils/index.client';
import MailImg from '@/assets/img/invite/icon_share_mail@2x.png';
import instagramImg from '@/assets/img/invite/instagram@2x.png';
import twitterImg from '@/assets/img/invite/icon_share_twitter@2x.png';
import whatsappImg from '@/assets/img/invite/icon_share_Whatsapp@2x.png';
import messageImg from '@/assets/img/invite/icon_share_message@2x.png';
import messengerImg from '@/assets/img/invite/icon_share_Messenger@2x.png';

const { apiGetUserConfig, apiGetInviteCode } = user;
export default {
  components: {
    PcFooter,
  },
  data() {
    return {
      copyed: false,
      inviteCode: '',
      inviteText: '',
      visible: false,
    };
  },
  computed: {
    ...mapGetters(['login']),
    email() {
      const o = this.login.loginData;
      return (o && o.email) || '';
    },
    mobile() {
      const o = this.login.loginData;
      return (o && o.mobile) || '';
    },
    copyText() {
      return (this.copyed && 'Copiado') || 'Copiar';
    },
    inviteList() {
      return [
        { url: messageImg, title: 'Message', label: 'Message' },
        { url: MailImg, title: 'Mail', label: 'Mail' },
        { url: whatsappImg, title: 'Whatsapp', label: 'WhatsApp' },
        { url: messengerImg, title: 'Messenger', label: 'Messenger' },
        { url: twitterImg, title: 'Twitter', label: 'Twitter' },
        { url: instagramImg, title: 'Instagram', label: 'Instagram' },
      ];
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      apiGetInviteCode().then((res) => {
        this.inviteCode = res.inviteCode || '';
        this.inviteText = res.inviteText || '';
      });
    },
    onInvite() {
      this.visible = true;
    },
    onCopy() {
      if (this.copyed) return;
      this.copyed = true;

      copyToClip(this.inviteText);
      this.$message({
        type: 'success',
        message: this.$t('copySuccess'),
        duration: 2000,
      });
      setTimeout(() => {
        this.copyed = false;
      }, 2000);
    },
    onShare(key) {
      copyToClip(this.inviteText);
      this.$message({
        type: 'success',
        message: `Invitation link copied, please open ${key} and send it`,
        duration: 2000,
      });

      switch (key) {
        case 'SMS':
          sendSms(this.mobile, this.inviteText);
          break;
        case 'Email':
          sendMail(this.email, this.inviteText);
          break;
        case 'WhatsApp':
          openWhatsapp(this.mobile, this.inviteText, false);
          break;
        case 'Messenger':
          openMessenger('', this.inviteText, false);
          break;
        case 'Twitter':
          openTwitter('', this.inviteText, false);
          break;
        case 'Instagram':
          openInstagram('', this.inviteText, false);
          break;
        default:
          break;
      }
    },
  },
};
</script>
<style lang="scss">
@import './index.scss';
</style>
